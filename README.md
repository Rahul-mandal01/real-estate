# 🏢 Rentiful - Find Your Perfect Home (Full Stack)
 **Discover and rent your ideal property with Rentiful, your trusted real estate companion.**

A **scalable, enterprise-grade Real Estate Rental Application** built using **Next.js**, **Node.js**, and **AWS Cloud Services**.
This project demonstrates how to design, develop, and deploy a **modern full-stack application** with secure authentication, cloud infrastructure, and clean architecture.

---

## 🚀 Tech Stack

### Frontend

* **Next.js** (App Router)
* **TypeScript**
* **Redux Toolkit** (state management)
* **Tailwind CSS**
* **Shadcn UI**
* **Framer Motion** (animations)
* **React Hook Form**
* **Zod** (schema validation)

### Backend

* **Node.js**
* **Express.js**
* **PostgreSQL (Database)**
* **AWS EC2**
* **AWS API Gateway**
* **AWS RDS** (PostgreSQL)
* **AWS S3** (image & asset storage)
* **AWS Amplify**

### Authentication

* **AWS Cognito** (secure user authentication & authorization)

## 🧰 Development & Database Tools

* **pgAdmin 4** – PostgreSQL database administration & monitoring
* **PostgreSQL** – Relational database (AWS RDS)
* **Git & GitHub** – Version control
* **AWS Console** – Cloud infrastructure management


---

## ✨ Features

* 🏠 Browse rental properties with filters
* 📍 Location-based property search
* 👤 Secure user authentication using AWS Cognito
* 🖼️ Property image upload using AWS S3
* 📦 Scalable backend hosted on AWS EC2
* 🔒 API security with API Gateway
* ⚡ Optimized frontend with Next.js & server-side rendering
* 🎨 Modern UI with Tailwind + Shadcn
* 🧩 Form validation with React Hook Form & Zod

---

## 🏗️ Architecture Overview

```txt
Frontend (Next.js)
        |
        |  API Requests
        v
API Gateway
        |
        v
Backend (Node.js + Express on EC2)
        |
        v
Database (AWS RDS)
        |
        v
Storage (AWS S3)
```

Authentication is handled separately via **AWS Cognito**, ensuring secure and scalable user management.

---

## 📚 Purpose of This Project

This repository is built to:

* Learn **real-world full-stack architecture**
* Understand **AWS services integration**
* Practice **enterprise-level scalability**
* Build a production-ready application using modern tools

It is ideal for developers who want hands-on experience with **cloud-based full-stack development**.

---

## 🛠️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/Rahul-mandal01/real-estate.git
cd real-estate
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file and configure:

* AWS credentials
* Cognito details
* Database connection
* API URLs

---

## 📌 Future Improvements

* Advanced property recommendations
* Admin dashboard
* Booking & payment integration
* Role-based access control
* Performance optimizations

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you like this project, consider giving it a star!
