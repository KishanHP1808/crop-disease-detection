# AgriGuard AI – Intelligent Crop Disease Detection & Smart Farming Platform

![AgriGuard AI](https://img.shields.io/badge/AgriGuard-AI%20Smart%20Farming-2E7D32?style=for-the-badge&logo=leaf)
![Django](https://img.shields.io/badge/Backend-Django%205%20%2B%20DRF-092E20?style=for-the-badge&logo=django)
![AI ML](https://img.shields.io/badge/AI%20Engine-Vision%20Classifier-FFC107?style=for-the-badge&logo=python)

AgriGuard AI is an enterprise-grade, full-stack, production-ready precision agriculture platform designed for farmers, plant pathologists, government officers, and agricultural store owners.

---

## 🌟 Key Features

1. **AI Vision Crop Disease Detection**: Upload or capture crop leaf photos to instantly diagnose 50+ diseases across 20+ supported crops (Rice, Wheat, Tomato, Potato, Maize, Cotton, Chili, Sugarcane, Banana, Coffee, etc.).
2. **Comprehensive Diagnostic Report**: Confidence score, severity breakdown (Low, Medium, High, Critical), affected leaf canopy percentage, organic remedies, chemical fungicides, and downloadable PDF certificates.
3. **Soil Health NPK Diagnostic Engine**: Calculate soil health index (0–100) and receive custom Nitrogen, Phosphorus, Potassium, and pH balancing recommendations.
4. **Real-Time Weather & Extreme Alerts**: 7-day weather forecast with rain warnings, frost alerts, heatwave warnings, and UV index.
5. **APMC Mandi Market Prices**: Real-time commodity price tracking with historical line charts and AI-driven "Best Day to Sell" recommendations.
6. **Government Scheme Aggregator**: Search, filter, and apply for PM-KISAN, PMFBY crop insurance, Soil Health Card, and SMAM equipment subsidies.
7. **Expert Consultation Hub**: Appointment scheduler for certified plant pathologists and agronomists with video call links.
8. **Financial Ledger & Farm Records**: Expense, income, labor wages, harvest yield tracker with interactive financial charts and CSV export.
9. **Interactive Store & Hospital Locator**: Leaflet map pinpointing nearby agriculture stores, plant diagnostic hospitals, cold storages, and soil testing labs.
10. **24/7 AI Voice Assistant & Multilingual Support**: Speech-to-Text & Text-to-Speech support in 7 Indian languages (English, Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi).
11. **PWA Support**: Progressive Web App with offline caching capabilities (`manifest.json` & `sw.js`).

---

## 🛠️ Architecture & Tech Stack

- **Backend**: Django 5.0+, Django REST Framework (DRF), SimpleJWT Authentication.
- **AI/ML Engine**: Custom vision heuristic & neural feature extraction pipeline (`api/ai_engine.py`).
- **Frontend**: Vanilla JS SPA with Glassmorphic design system, CSS variables, Chart.js, Leaflet Maps.
- **Database**: SQLite (default dev) / PostgreSQL (production containerized).
- **Deployment**: Docker, Docker Compose, Gunicorn.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Python 3.11+
- Node.js (optional)

### 2. Environment Setup & Execution

```bash
# Clone or open workspace directory
cd "c:\Users\dell\OneDrive\Desktop\crop disease detection"

# Activate Virtual Environment
.venv\Scripts\activate

# Run Database Migrations
python manage.py migrate

# Seed Data (20+ crops, 30+ diseases, market prices, schemes)
python manage.py seed_data

# Launch Local Development Server
python manage.py runserver 0.0.0.0:8000
```

Open `http://localhost:8000/` in your browser to access the complete application!

---

## 📡 REST API Documentation Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register/` | Register new farmer / expert user |
| `POST` | `/api/v1/auth/login/` | Obtain JWT Access & Refresh tokens |
| `POST` | `/api/v1/detect-disease/` | Upload leaf image for AI diagnosis |
| `GET` | `/api/v1/report-pdf/<id>/` | Download/Print PDF diagnostic report |
| `POST` | `/api/v1/soil-health/` | Calculate NPK balance & soil score |
| `GET` | `/api/v1/weather/` | Fetch current weather & 7-day forecast |
| `GET` | `/api/v1/market-prices/` | List live APMC Mandi commodity prices |
| `GET` | `/api/v1/schemes/` | List government agricultural schemes |
| `POST` | `/api/v1/chatbot/` | Send query to 24/7 AI Farmer Assistant |
| `GET` | `/api/v1/analytics/` | Fetch overview metrics for dashboard |

---

## 🐳 Docker Production Deployment

```bash
# Build and run containers with Docker Compose
docker-compose up --build -d
```

Access the containerized app at `http://localhost:8000/`.
