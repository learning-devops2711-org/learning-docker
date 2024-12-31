# Use a lightweight Python image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir flask

# Expose the application's port
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
