from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from gemini_coach import generate_insight

app = FastAPI(title="DhamkaBox Backend")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchContext(BaseModel):
    id: str
    teamA: Dict[str, str]
    teamB: Dict[str, str]
    venue: str
    time: str

class PersonaliseRequest(BaseModel):
    history: List[Any]
    current_match: MatchContext

@app.get("/")
def read_root():
    return {"status": "ok", "message": "DhamkaBox API is running"}

@app.post("/api/personalise")
def get_personalisation(req: PersonaliseRequest):
    """Get personalized insight from Gemini AI based on fan history"""
    insight = generate_insight(req.history, req.current_match.dict())
    return insight

@app.post("/api/generate-challenge")
def generate_challenge(req: PersonaliseRequest):
    """Generate a daily challenge (mock implementation for now)"""
    return {
        "challenge": "Predict the match winner AND top scorer correctly today for a 3x XP bonus — based on your strength in predicting match outcomes!"
    }
