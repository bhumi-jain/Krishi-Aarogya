from flask import Flask, request, render_template, jsonify
import numpy as np
import joblib
import xgboost as xgb
import logging
from flask_cors import CORS  # To enable cross-origin requests

app = Flask(__name__)
CORS(app)  # Allow frontend to call the backend API

# Set up logging for debugging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(message)s')

# Load the model, scaler, and encoder
model = xgb.Booster(model_file='models/xgboost_model.json')
scaler = joblib.load('models/scaler_xgboost.pkl')
label_encoder = joblib.load('models/label_encoder_xgboost.pkl')

# Define time mapping
time_mapping = {"Day": 0, "Night": 1}

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Accept JSON payload
        params = [
            float(data['soil_nitrogen']),    # Nitrogen
            float(data['soil_phosphorus']),  # Phosphorus
            float(data['soil_potassium']),   # Potassium
            float(data['soil_ph']),          # pH
            float(data['temperature']),      # Temperature
            float(data['humidity']),         # Humidity
            float(data['rainfall']),         # Rainfall
            time_mapping[data['time']],      # Time of Day
            float(data['ndvi']),             # NDVI
        ]
        
        logging.debug(f"Input parameters: {params}")
        
        # Preprocessing
        features = np.array(params).reshape(1, -1)
        scaled_features = scaler.transform(features)
        logging.debug(f"Scaled features: {scaled_features}")
        
        # Create DMatrix and predict
        dmatrix = xgb.DMatrix(scaled_features)
        predictions = model.predict(dmatrix)
        predicted_label = label_encoder.inverse_transform([np.argmax(predictions, axis=1)[0]])
        logging.debug(f"Predicted label: {predicted_label}")
        
        return jsonify({"Predicted Label": predicted_label[0]})
    
    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)  # Changed port to 5001
