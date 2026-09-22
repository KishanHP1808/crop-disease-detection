# 🌿 AgriGuard AI

<p align="center">
  <img src="https://img.shields.io/badge/AgriGuard-AI%20Smart%20Farming-2E7D32?style=for-the-badge&logo=leaf" alt="AgriGuard AI">
  <img src="https://img.shields.io/badge/Django-5.x-092E20?style=for-the-badge&logo=django" alt="Django">
  <img src="https://img.shields.io/badge/Django%20REST%20Framework-API-A30000?style=for-the-badge&logo=django" alt="Django REST Framework">
  <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python" alt="Python">
  <img src="https://img.shields.io/badge/SQLite-Development-003B57?style=for-the-badge&logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/PWA-Supported-5A0FC8?style=for-the-badge" alt="PWA">
</p>

<p align="center">
  <b>An AI-powered precision agriculture platform for crop health, soil intelligence, weather awareness, farm records, and market decisions.</b>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-api">API</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🌾 Overview

**AgriGuard AI** is a full-stack smart farming platform built with **Django** and **Django REST Framework**.

The application brings multiple agricultural workflows into one platform:

- 📷 Crop disease detection from leaf images
- 🧪 Soil health and NPK analysis
- 🌦️ Weather information and spray-safety guidance
- 📈 Agricultural market-price tracking
- 🏛️ Government agriculture scheme discovery
- 🤖 Farmer-focused AI chatbot
- 👨‍🌾 Farm, field, and financial record management
- 👨‍🔬 Agriculture expert discovery and appointment booking
- 📍 Agriculture shop, diagnostic, storage, and market locations
- 📱 Progressive Web App support
- 🐳 Docker-based deployment

The project is designed as a practical smart-agriculture application rather than a standalone machine-learning demo.

---

## ✨ Features

### 🔬 AI Crop Disease Detection
Upload or capture a crop-leaf image and generate a disease report containing:

- Detected disease
- Confidence score
- Severity classification
- Affected-area estimate
- Symptoms and probable causes
- Organic treatment suggestions
- Chemical treatment guidance
- Recommended agricultural inputs
- Prevention tips
- Recovery-time estimate
- Printable PDF report

The disease knowledge base is maintained in the backend and is connected to the diagnostic workflow.

### 🧪 Soil Health Intelligence
The soil module evaluates:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Soil pH
- Organic carbon
- Moisture

It generates a soil-health score and recommendations based on nutrient and pH levels.

### 🌤️ Weather & Field Suitability
The platform provides weather-related agricultural assistance, including:

- Current weather information
- Forecast-oriented data
- Weather-based crop/field suitability
- Spray-safety guidance
- Extreme-condition alerts

### 📊 Agricultural Market Prices
Farmers can manage and view crop-market information such as:

- Market/mandi name
- Crop
- State
- Current price
- Previous price
- Percentage change
- Demand level
- Suggested selling day

### 🏛️ Government Schemes
The platform stores agricultural government schemes with:

- Scheme title
- Category
- Eligibility
- Required documents
- Funding information
- Deadline
- Application URL
- State coverage
- Bookmark support

### 🤖 AI Farmer Assistant
The chatbot can respond to common agriculture-related questions and provide guidance on:

- Crop diseases
- Organic remedies
- Fungicides and pesticides
- Crop-specific treatments
- Weather and spray safety
- Government schemes

### 👨‍🌾 Farm & Field Management
Users can maintain:

- Multiple farms
- Farm area and soil type
- Village/state
- GPS coordinates
- Individual fields
- Crops assigned to fields
- Planting dates
- QR identifiers

### 💰 Farm Financial Records
The farm-record module supports entries for:

- Income
- Expenses
- Harvest yield
- Seeds
- Fertilizers
- Pesticides
- Equipment rental
- Worker/labor costs

### 👨‍🔬 Expert Consultation
Experts can have profiles containing:

- Specialization
- Qualification
- Experience
- Rating
- Consultation fee
- Availability

Farmers can create appointments and store meeting links.

### 📍 Agriculture Location Services
The platform supports locations for:

- Agriculture stores
- Plant hospitals / diagnostic labs
- Warehouses
- Cold-storage facilities
- Markets / mandis

### 📱 Progressive Web App
The project includes PWA support through:

- Web app manifest
- Service worker
- Installable app metadata
- Cached front-end assets

An Android APK download endpoint is also included in the application.

---

## 🧠 Architecture

```text
┌──────────────────────────────────────────────────────────┐
│                    AgriGuard AI UI                       │
│     HTML + CSS + Vanilla JavaScript + Chart.js + Maps   │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│                 Django Application Layer                 │
│                  Views + Templates + Auth               │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│                Django REST Framework API                 │
│        Auth • Disease • Soil • Weather • Market         │
│       Schemes • Farms • Experts • Chatbot • Records     │
└───────────────┬───────────────────┬──────────────────────┘
                │                   │
                ▼                   ▼
        ┌───────────────┐   ┌─────────────────┐
        │ AI / Disease  │   │ External Data   │
        │ Engine        │   │ & Services      │
        └───────┬───────┘   └────────┬────────┘
                │                    │
                └──────────┬─────────┘
                           ▼
                  ┌──────────────────┐
                  │ Database Layer   │
                  │ SQLite / Postgres│
                  └──────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Django 5+, Django REST Framework |
| Authentication | JWT + Session Authentication |
| Image Processing | Pillow |
| Reporting | ReportLab |
| Database | SQLite for development, PostgreSQL-ready deployment |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Charts | Chart.js |
| Maps | Leaflet |
| Server | Gunicorn |
| Deployment | Docker, Docker Compose, Render configuration |
| Progressive Web App | Web App Manifest + Service Worker |

---

## 📁 Project Structure

```text
crop-disease-detection/
│
├── agriguard_backend/       # Django project configuration
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── api/                     # Main application and REST API
│   ├── ai_engine.py         # Disease/AI engine
│   ├── models.py            # Database models
│   ├── serializers.py       # DRF serializers
│   ├── views.py             # API/business logic
│   ├── urls.py              # API routes
│   ├── admin.py
│   ├── signals.py
│   └── migrations/
│
├── templates/
│   ├── index.html
│   └── admin_portal.html
│
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   ├── images/
│   ├── downloads/
│   └── manifest.json
│
├── media/
│   └── disease_scans/
│
├── requirements.txt
├── manage.py
├── Dockerfile
├── docker-compose.yml
├── render.yaml
├── Procfile
├── manifest.json
└── sw.js
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KishanHP1808/crop-disease-detection.git
cd crop-disease-detection
```

### 2. Create a virtual environment

**Windows**

```powershell
python -m venv .venv
.venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Apply migrations

```bash
python manage.py migrate
```

### 5. Seed application data

```bash
python manage.py seed_data
```

### 6. Collect static files

```bash
python manage.py collectstatic --noinput
```

### 7. Start the development server

```bash
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/
```

---

## 🔐 Environment Variables

The project reads optional configuration from environment variables.

Example:

```env
DEBUG=True
SECRET_KEY=your-secret-key

OPENWEATHER_API_KEY=your_openweather_api_key

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
DEFAULT_FROM_EMAIL=AgriGuard AI Platform <your_email@gmail.com>
```

> **Security:** Never commit real API keys, passwords, or production secrets to GitHub. Use environment variables or your hosting provider's secret-management system.

---

## 📡 REST API

The API is organized under the Django REST Framework application.

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register/` | Register user |
| POST | `/api/auth/login/` | Login and obtain JWT tokens |
| POST | `/api/auth/otp-verify/` | Verify OTP |
| POST | `/api/auth/verify-admin-pin/` | Verify admin PIN |
| GET | `/api/auth/me/` | Get current user |

### AI & Agriculture Services

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/detect-disease/` | Analyze crop image |
| GET | `/api/report-pdf/<id>/` | Generate printable diagnosis report |
| POST | `/api/soil-health/` | Calculate soil-health recommendations |
| GET | `/api/weather/` | Weather information |
| GET | `/api/weather/suitability/` | Weather suitability information |
| POST | `/api/chatbot/` | Ask the agriculture assistant |
| GET | `/api/analytics/` | Dashboard analytics |
| GET | `/api/redzone-status/` | Check alert/red-zone status |
| GET | `/api/download/apk/` | Download Android package endpoint |

### REST Resources

| Resource | Base Endpoint |
|---|---|
| Crops | `/api/crops/` |
| Diseases | `/api/diseases/` |
| Farms | `/api/farms/` |
| Fields | `/api/fields/` |
| Market Prices | `/api/market-prices/` |
| Government Schemes | `/api/schemes/` |
| Experts | `/api/experts/` |
| Appointments | `/api/appointments/` |
| Agriculture Shops | `/api/shops/` |
| Farm Records | `/api/farm-records/` |

> Note: The Django project mounts the API application under the project's main URL configuration. Check `agriguard_backend/urls.py` if you change the API prefix.

---

## 🐳 Run with Docker

### Docker Compose

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8000/
```

The repository includes a Docker setup with a web service and PostgreSQL service for containerized deployment.

---

## ☁️ Render Deployment

The repository includes:

- `render.yaml`
- `Procfile`
- `Dockerfile`

The Render configuration installs dependencies, runs migrations, and starts the application with Gunicorn.

Typical build command:

```bash
pip install -r requirements.txt && python manage.py migrate
```

Typical start command:

```bash
gunicorn agriguard_backend.wsgi:application --bind 0.0.0.0:$PORT
```

---

## 🔄 Application Flow

```text
User
  │
  ├── Uploads crop image
  │          │
  │          ▼
  │    Disease Detection Engine
  │          │
  │          ▼
  │    Diagnostic Report
  │          │
  │          ├── Disease
  │          ├── Confidence
  │          ├── Severity
  │          ├── Treatment
  │          └── Prevention
  │
  ├── Checks soil values ──────► Soil Health Engine
  │
  ├── Checks weather ──────────► Weather Service
  │
  ├── Checks crop prices ──────► Market Module
  │
  ├── Finds schemes ───────────► Government Scheme Module
  │
  ├── Talks to assistant ──────► Agriculture Chatbot
  │
  └── Manages farm data ───────► Farm & Finance Modules
```

---

## 📊 Core Data Models

The backend defines models for:

- Users and roles
- Farms
- Fields
- Crops
- Diseases
- Disease reports
- Soil records
- Weather records
- Market prices
- Government schemes
- Scheme bookmarks
- Soil-health records
- Expert profiles
- Appointments
- Agriculture shops
- Farm records
- Audit logs

These models allow the application to combine disease intelligence with farm, field, financial, and agricultural-support data.

---

## 🎯 Use Cases

AgriGuard AI can be used as:

- A smart-farming prototype for academic projects
- A precision-agriculture demonstration
- A crop-health monitoring platform
- A Django + REST API portfolio project
- A foundation for a farmer-support mobile/PWA application
- A base for integrating trained computer-vision models later

---

## 🔮 Future Improvements

Potential next steps include:

- Replace heuristic disease detection with a trained CNN/ViT model
- Add model evaluation metrics and confusion matrices
- Introduce role-based permissions across all API resources
- Add PostgreSQL as the standard production database
- Add automated tests and CI/CD
- Improve multilingual speech interaction
- Add image segmentation for more precise affected-area estimation
- Add real-time crop-price APIs
- Add push notifications for weather and crop-health alerts
- Add stronger API documentation with OpenAPI / Swagger
- Add production observability, logging, and monitoring

---

## ⚠️ Disclaimer

AgriGuard AI is an educational and software-development project. Disease detection and treatment information should not be treated as a substitute for diagnosis by a qualified agricultural professional. Pesticide and fertilizer decisions should follow local regulations, product labels, and expert guidance.

---

## 👨‍💻 Author

**Kishan H.P**

Frontend & Web Development • AI/ML Projects • UI/UX

GitHub: [@KishanHP1808](https://github.com/KishanHP1808)

---

## ⭐ Support the Project

If you find this project useful:

- ⭐ Star the repository
- 🍴 Fork it
- 🐛 Open an issue
- 💡 Suggest improvements
- 🔧 Submit a pull request

---

<p align="center">
  Built with 🌿 Python, Django, REST APIs, and AI for smarter agriculture.
</p>
