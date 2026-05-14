FROM python:3.9-slim as backend

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

# Since this is a simple setup, we'll serve everything using Uvicorn
# In a real app, you might build frontend and serve via Nginx
# but for hackathon/Cloud Run simplicity we run the backend on port 8080

ENV PORT=8080
EXPOSE $PORT

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
