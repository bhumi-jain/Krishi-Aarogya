# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory
WORKDIR /Backend_ML

# Copy the requirements file into the container
COPY requirements.txt /Backend_ML/requirements.txt

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . /Backend_ML

# Expose the port Flask runs on
EXPOSE 8000

# Command to run the Flask app
CMD ["python", "Backend_ML/run.py"]
