import os
import google.generativeai as genai

# Setup Gemini API - Expects GEMINI_API_KEY environment variable
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# We use the user's selected Gemini model for the hackathon (Gemini 1.5 Flash recommended for speed)
# However for this demo, we'll try to fallback gracefully if no API key is provided
def get_model():
    try:
        return genai.GenerativeModel('gemini-1.5-flash')
    except Exception as e:
        print(f"Warning: Gemini model initialization failed: {e}")
        return None

def generate_insight(history, current_match):
    """Generates personalized insight based on fan history"""
    model = get_model()
    
    if not model or not api_key:
        return {
            "insight": "You predict batting heavy teams well but underestimate bowlers.",
            "suggested_prediction": f"Wait for {current_match.get('teamA', {}).get('short', 'Team A')}'s bowling to make an impact.",
            "confidence_tip": "Based on your history, take the under on total runs.",
            "challenge": "Try predicting the top wicket-taker this match for a 2x XP bonus"
        }
        
    prompt = f"""
    You are the DhamkaBox AI Coach, an expert cricket analyst inside a gamified sports app.
    Your goal is to give a short, punchy, personalized prediction tip to a fan.
    
    Fan History Context:
    They have made {len(history)} past predictions. 
    (Assume they are slightly biased towards star batsmen).
    
    Current Match:
    {current_match.get('teamA', {}).get('name', 'Team A')} vs {current_match.get('teamB', {}).get('name', 'Team B')}
    Venue: {current_match.get('venue', 'Unknown')}
    
    Provide a JSON response with exactly these 4 keys (no markdown formatting, just raw JSON):
    - insight: A 1-sentence observation about their past prediction style.
    - suggested_prediction: A 1-sentence tip on what to predict for THIS match.
    - confidence_tip: A short, actionable stat-based tip (e.g., "Take the under on total runs").
    - challenge: A fun dare for them to try (e.g., "Predict the top scorer correctly today for a 3x XP bonus").
    """
    
    try:
        response = model.generate_content(prompt)
        # Parse JSON from response.text (strip markdown if present)
        text = response.text.replace("```json", "").replace("```", "").strip()
        import json
        return json.loads(text)
    except Exception as e:
        print(f"Gemini API error: {e}")
        # Fallback
        return {
            "insight": "You are a rising star in predictions.",
            "suggested_prediction": f"Back the home team to perform well at {current_match.get('venue', 'their stadium')}.",
            "confidence_tip": "Look out for early wickets in the powerplay.",
            "challenge": "Predict the exact winner today for 50 bonus XP!"
        }
