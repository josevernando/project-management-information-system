# Project Management Information System (PMIS)

A full-stack Project Management Information System built with **Go (Gin)** for the backend and **React + Tailwind** for the frontend.  
This MVP includes task management, project tracking, employee management, AI-generated activity summaries, and downloadable DOCX reports.

---

## 🚀 Features (MVP)
### **🗂 Project & Task Management**
- Create and update projects
- Track task progress
- Dropdown selection for project status & task status
- Employee assignment

### **⏱ Activity Tracking**
- Log project-related activities per user
- Activity history with timestamps

### **🤖 AI-Powered Summary**
- Automatic narrative summary using **Ollama Local Model**
- Generates a DOCX report using activity logs
- Uses a template-based DOCX system

### **👥 Employee Directory**
- Manage employee profiles
- View name, email, and role

### **🔐 Auth & Permissions**
- Login system with JWT
- User state stored in frontend
- Profile page included

### **🖥 Tech Stack**
#### **Backend**
- Go (Golang)
- Gin Framework
- GORM
- PostgreSQL
- Ollama (Llama 3.1 model)
- DOCX generator (template-based)

#### **Frontend**
- React + Vite
- TailwindCSS
- React Router
- Axios
- Lucide Icons

---

## ⚙️ Installation & Setup

### **Backend Setup**
```bash
cd backend
go mod tidy
go run main.go
```

### **To run Ollama**
```bash
To run Ollama
ollama pull llama3.1
ollama serve
```

### **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```
