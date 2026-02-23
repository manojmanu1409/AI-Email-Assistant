package com.ai.emailassistant.service;

import com.ai.emailassistant.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.Map;
import reactor.util.retry.Retry;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // Build the prompt
        String prompt = buildPrompt(emailRequest);

        // Prepare the payload for Gemini API
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                                Map.of("text", prompt)
                        })
                });

        // Call Gemini API
        String response = webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(2))
                        .filter(throwable -> throwable instanceof org.springframework.web.reactive.function.client.WebClientResponseException.TooManyRequests)
                        .onRetryExhaustedThrow((retryBackoffSpec, retrySignal) -> retrySignal.failure()))
                .map(res -> {
                    // Extract text from Gemini response structure
                    try {
                        @SuppressWarnings("unchecked")
                        java.util.List<Map<String, Object>> candidates = (java.util.List<Map<String, Object>>) res
                                .get("candidates");
                        if (candidates == null || candidates.isEmpty()) {
                            return "Error generating reply: No candidates found in response";
                        }

                        @SuppressWarnings("unchecked")
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        if (content == null) {
                            return "Error generating reply: No content found in candidate";
                        }

                        @SuppressWarnings("unchecked")
                        java.util.List<Map<String, Object>> parts = (java.util.List<Map<String, Object>>) content
                                .get("parts");
                        if (parts == null || parts.isEmpty()) {
                            return "Error generating reply: No parts found in content";
                        }

                        return (String) parts.get(0).get("text");
                    } catch (Exception e) {
                        return "Error generating reply: " + e.getMessage();
                    }
                })
                .block();

        return response;
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content.\n");
        prompt.append("The tone should be: ").append(emailRequest.getTone()).append("\n");
        prompt.append("Original Email Content: \n").append(emailRequest.getEmailContent());
        prompt.append("\n\nReturn ONLY the generated email body.");
        return prompt.toString();
    }
}
