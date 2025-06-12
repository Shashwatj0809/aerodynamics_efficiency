# 🏎️ F1 Aerodynamic & Telemetry Analysis Platform

This project consists of two full-stack web applications:

1. **Aerodynamic Performance Monitoring Tool** – Predicts downforce loss based on car setup, track conditions, and wing configurations using ML models.
2. **F1 Telemetry Maintenance Platform** – Analyzes telemetry data to forecast maintenance needs using LSTM and traditional regression techniques.

---

## 🚀 Tech Stack

**Frontend:** Vue.js  
**Backend:** FastAPI (Python)  
**Database:** PostgreSQL  
**ML Models:** Regression, Random Forest, LSTM  
**Visualization:** Chart.js / Plotly  
**Others:** Pandas, Scikit-learn, NumPy

---

## 📁 Project Structure

```bash
project-root/
│
├── frontend/              # Vue.js frontend for both apps
│   ├── public/
│   └── src/
│       ├── components/
│       └── views/
│
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── ml_models/
│
├── data/                  # Sample datasets and preprocessed telemetry
│
└── README.md
