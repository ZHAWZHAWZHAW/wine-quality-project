# Step 1: Build the frontend
FROM node:16 as build-frontend

WORKDIR /app/frontend
COPY app/frontend/package.json app/frontend/package-lock.json /app/frontend/
RUN npm install
RUN npm run build

# Step 2: Set up the backend
FROM python:3.12-slim as build-backend

WORKDIR /app

# Copy the requirements and install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Set the FLASK_APP environment variable to the location of app.py
ENV FLASK_APP=/app/app.py

# Copy the backend code (app/backend) and the app.py file
COPY app/backend /app/backend/
COPY app/app.py /app/app.py

# Copy only the built frontend (from the dist folder)
COPY --from=build-frontend /app/frontend/dist /app/frontend

# Command to output file structure and then run the Flask app
CMD ls /app && flask run --host=0.0.0.0 --port=5000
