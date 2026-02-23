import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/email";

export const generateEmailReply = async (emailContent, tone) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate`, {
            emailContent,
            tone
        });
        return response.data;
    } catch (error) {
        console.error("Error generating email reply:", error);
        throw error;
    }
};
