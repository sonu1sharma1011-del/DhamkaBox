# DhamkaBox

DhamkaBox is a gamified cricket fan engagement platform built for IPL match-by-match experiences. It turns every IPL match into an interactive game where fans predict outcomes, build streaks, earn XP, unlock badges, and climb leaderboards.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Python FastAPI
- **AI**: Gemini 1.5 Flash (Google AI)
- **Deployment**: Dockerized for Google Cloud Run

## Project Structure
```text
dhamkabox/
├── frontend/       # React app
├── backend/        # FastAPI backend
└── Dockerfile      # Cloud Run deployment config
```

## Running Locally

### 1. Backend (FastAPI + Gemini)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Start the server
uvicorn main:app --reload
```
The backend will run on `http://127.0.0.1:8000`

### 2. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://127.0.0.1:5173`

## Features
- **Match Predictions**: Earn XP for correctly predicting match outcomes.
- **Streak System**: Daily engagement unlocks special streak badges and XP multipliers.
- **Badges**: Unlock custom milestones (e.g. "Sharp Shooter", "Mastermind").
- **Gemini AI Coach**: Get personalized insight based on your prediction history and behavior.