package com.ai.emailassistant.controller;

import com.ai.emailassistant.dto.EmailRequest;
import com.ai.emailassistant.dto.EmailResponse;
import com.ai.emailassistant.service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<EmailResponse> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(new EmailResponse(response));
    }

    @ExceptionHandler(WebClientResponseException.TooManyRequests.class)
    public ResponseEntity<String> handleRateLimit(WebClientResponseException.TooManyRequests ex) {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body("Rate limit exceeded. Please try again later.");
    }
}
