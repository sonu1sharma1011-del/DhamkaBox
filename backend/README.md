# DhamkaBox API

## Setup Instructions

1. Install Python 3.9+
2. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. Set your Gemini API key in a `.env` file (or set as environment variable `GEMINI_API_KEY`)
4. Run the development server:
   ```bash
   uvicorn main:app --reload
   ```

## Endpoints

- `POST /api/personalise`: Get personalized insights
- `POST /api/generate-challenge`: Get a daily challenge
