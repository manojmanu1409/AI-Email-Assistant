# 📧 Smart AI Email Reply Assistant

An AI-powered web application that automatically generates professional email replies using Large Language Models (LLMs).

Built with **React (Frontend)** and **Spring Boot (Backend)**, integrated with **Google Gemini API** for intelligent email response generation.

---

## 🚀 Features

- ✨ Generate AI-powered email replies instantly  
- 🎯 Tone customization (Professional, Friendly, Formal, Casual)  
- ⚡ Real-time response generation  
- 🔒 Secure REST API integration  
- 🖥️ Clean and responsive UI  
- 📄 Export generated reply as PDF  

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- JavaScript  
- Axios  
- HTML5 / CSS3  

### Backend
- Java  
- Spring Boot  
- REST APIs  
- Lombok  
- Maven  

### AI Integration
- Google Gemini API  

---

## 📂 Project Structure

```
AI-Email-Assistant/
│
├── frontend/        # React Application
│
├── backend/         # Spring Boot Application
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/AI-Email-Assistant.git
cd AI-Email-Assistant
```

---

### 2️⃣ Backend Setup (Spring Boot)

Navigate to backend folder:

```bash
cd backend
```

Add your Gemini API key in `application.properties`:

```properties
gemini.api.key=YOUR_API_KEY
```

Run the application:

```bash
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup (React)

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔄 API Endpoint

### Generate Email Reply

**POST** `/api/email/generate`

### Request Body

```json
{
  "emailContent": "Write a reply for meeting reschedule request",
  "tone": "Professional"
}
```

### Response

```json
{
  "generatedReply": "Thank you for your email. I would be happy to reschedule..."
}
```

---

## 🧠 How It Works

1. User enters email content.
2. User selects preferred tone.
3. Frontend sends request to Spring Boot backend.
4. Backend calls Gemini API.
5. AI generates response.
6. Reply is returned and displayed on the UI.

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| gemini.api.key | Your Google Gemini API key |

⚠️ **Important:** Never commit your API keys to GitHub.

---

## 📈 Future Enhancements

- Gmail Integration  
- Email Summarization  
- Multi-language Support  
- Conversation Memory  
- AI Reply Quality Scoring  

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Manoj Kumar M.**  
AI & Full Stack Developer  
