# Hospital Management System

> Complete HMS with patient registration, appointment scheduling (conflict detection), billing with insurance, pharmacy inventory, and lab management.

## 🚀 Overview

A comprehensive Hospital Management System covering the full patient lifecycle — from registration through appointment scheduling, treatment, billing (with insurance calculations), pharmacy dispensing, and lab result management. Built with Node.js, Express, and Zod validation.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏥 Patient Management | Register, search, medical history, allergies |
| 📅 Appointments | Schedule with doctor conflict detection |
| 💰 Billing | Auto-generate invoices with insurance/discount |
| 💊 Pharmacy | Inventory tracking + dispense with stock deduction |
| 🧪 Lab Orders | Order tests, submit results |
| 👨‍⚕️ Staff Management | Doctor/nurse/admin roles |
| 📄 PDF Reports | Invoice and lab report generation |
| 📧 Email Notifications | Appointment reminders via Nodemailer |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express, TypeScript |
| Validation | Zod |
| Database | PostgreSQL + Prisma |
| PDF | PDFKit |
| Email | Nodemailer |
| Scheduling | node-cron |

## ⚡ Quick Start

```bash
npm install
cp .env.example .env
npm run dev
```

Server at `http://localhost:5000`

### API Modules

| Module | Base Path | Key Endpoints |
|--------|-----------|--------------|
| Patients | `/api/patients` | CRUD + search |
| Appointments | `/api/appointments` | Schedule, status update |
| Billing | `/api/billing` | Generate invoice, mark paid |
| Pharmacy | `/api/pharmacy` | Inventory, dispense |
| Lab | `/api/lab` | Order tests, submit results |
| Staff | `/api/staff` | Register staff |

## 📄 License

MIT
