
# 🚀 Dockbox — Online Code Execution Platform with Docker

![Dockbox Animation](https://your-gif-or-animation-url.com)

**Dockbox** is a full-stack web application that enables users to write, run, and execute code in real-time directly from their browser using Docker containers. It supports multiple programming languages and provides a secure, isolated environment for each execution — just like an online compiler.

---

## 🧠 About the Project

Built by **Gauri Patil**, Dockbox is designed to simulate a real-world online code execution engine for students, developers, and learners — without requiring any local setup. The backend leverages Docker to run code securely in language-specific containers.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, CodeMirror
- **Backend**: Node.js, Express.js
- **Containerization**: Docker
- **Database**: MongoDB (Atlas/local)
- **Others**: REST APIs, Axios, Docker CLI

---

## ✨ Features

- 🌐 Multi-language code execution (Python, C++, JavaScript, etc.)
- 🐳 Docker-based isolated sandbox environment
- 📄 Clean, responsive UI with real-time output display
- 🧠 Future support for session-saving and authentication
- 🔐 Secure backend architecture using ephemeral containers

---

## 📸 Screenshots

> *(Add actual screenshots or GIFs below)*

```
![Dockbox UI](https://raw.githubusercontent.com/Codeted0/Dockbox/master/Editor.png)


```

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Docker installed and running
- MongoDB URI or local instance

---

### 1. Clone the Repository

```bash
git clone https://github.com/Codeted0/Dockbox.git
cd Dockbox
```

### 2. Backend Setup

```bash
cd backend
npm install
node index.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## ⚙️ How It Works

1. User writes code and selects the language.
2. Code is sent to the backend API.
3. Backend spins up a Docker container with the required environment.
4. Code is executed inside the container.
5. Output is returned and displayed in the frontend.
6. Container is destroyed post execution.

---

## 🔐 Security

- All executions are sandboxed inside Docker containers.
- No shared environment or file system.
- Containers auto-remove after execution to ensure system safety.

---

## 🚧 Roadmap

- [x] Multi-language support (Python, JS, C++)
- [ ] Code history & session saving
- [ ] User login and dashboard
- [ ] Deploy with Docker Compose or Kubernetes
- [ ] Advanced analytics for performance tracking

---

## 📜 License

This project is licensed under the **MIT License** © 2025 **Gauri Patil**

---

## 🙋‍♀️ Author

**Gauri Patil**  
Full Stack Developer | DevOps Enthusiast | CS Engineer  
📫 Email: gauri.yourmail@example.com  
🔗 [LinkedIn](www.linkedin.com/in/gauri-patil-196009263)  
🐙 [GitHub](https://github.com/Codeted0)

---

> 💡 “The best way to learn is by building — Dockbox is my way of learning, exploring, and creating.”
