import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import matplotlib
import pandas as pd
from backend.colab_links import read_colab_links
from backend.upload import handle_file_upload
from backend.serve_plots import get_plots
from backend.serve_models import models, scaler
from backend.xai import get_shap_visualization

matplotlib.use('Agg')

# Flask-App initialisieren
app = Flask(__name__)
CORS(app)

# Flask-App initialisieren
app = Flask(__name__, static_folder='frontend/dist', static_url_path='/')

# Home-Route
@app.route('/')
def index():
    # Serve the index.html file from the build directory
    return send_from_directory(os.path.join(app.static_folder), 'index.html')

# Route to serve static assets (JS, CSS, images) from the dist folder
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('frontend/dist', filename)

@app.route('/get_colab_links', methods=['GET'])
def get_colab_links():
    links = read_colab_links('backend/colab_links.txt')
    return jsonify(links)  # Send links as a JSON response

@app.route('/get_plots', methods=['GET'])
def get_plots_route():
    try:
        plots = get_plots()
        if not plots:
            return jsonify({"error": "Plots folder not found"}), 404
        return jsonify(plots)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# Route to serve an image from a specific folder
@app.route('/plots/<folder_name>/<filename>', methods=['GET'])
def serve_image(folder_name, filename):
    folder_path = os.path.join(os.getcwd(), 'backend', 'plots', folder_name)
    
    # Ensure the folder exists and that the file is a PNG file
    if os.path.isdir(folder_path) and filename.endswith('.png'):
        # Check if the file exists in the folder
        if filename in os.listdir(folder_path):
            return send_from_directory(folder_path, filename)
        else:
            return jsonify({"error": "File not found"}), 404
    return jsonify({"error": "Invalid folder or file"}), 400

@app.route('/upload_zip', methods=['POST'])
def upload_zip():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Pass the file to the handle_file_upload function
        file_path = handle_file_upload(file)
        return jsonify({'message': 'File uploaded successfully', 'file_path': file_path}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 400  # Handle file validation error

# Vorhersage-Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON object from the request
        data = request.get_json()

        # Map user-friendly model names to the full model names
        model_name_map = {
            'Random Forest': 'random_forest_model',
            'Logistic Regression': 'logistic_regression_model',
            'SVC': 'svc_model'
        }

        # Extract features from the JSON data
        all_features = ['type', 'fixed acidity', 'volatile acidity', 'citric acid', 
                        'chlorides', 'free sulfur dioxide', 'density', 'sulphates', 'alcohol']

        # If any features are missing from the input data, default them to 0 (or any other default value you prefer)
        features = [float(data.get(feature, 0)) for feature in all_features]

        # Convert to pandas DataFrame
        features_df = pd.DataFrame([features], columns=all_features)

        # Scale features
        try:
            scaled_features = scaler.transform(features_df)
        except Exception as e:
            print("Error during scaling:", str(e))

        # Get the model name from the JSON data
        selected_model = data.get('model')

        # Map the model name to the full name
        full_model_name = model_name_map.get(selected_model, selected_model)

        if full_model_name == "All":
            # Predict using all models
            predictions = {
                model_name: model.predict(scaled_features)[0]
                for model_name, model in models.items()
            }
            
            # Get SHAP visualizations for all models
            shap_data = {
                model_name: (
                    get_shap_visualization(model, scaler, features_df, all_features, model_name)
                )
                for model_name, model in models.items()
            }


            return jsonify({
                'predictions': predictions,
                'shap_data': shap_data  # Include SHAP data for all models
            })
        else:
            # Check if the model exists in the dictionary
            if full_model_name not in models:
                return jsonify({"error": f"Model '{full_model_name}' not found"}), 400

            # Predict using the selected model
            model = models[full_model_name]
            prediction = model.predict(scaled_features)[0]
            # Get SHAP visualization for the selected model
            shap_data = {
                full_model_name: (
                    get_shap_visualization(model, scaler, features_df, all_features, full_model_name)
                )
            }          

            # Return the prediction and SHAP data as JSON response
            return jsonify({
                'prediction': prediction,
                'shap_data': shap_data  # Include SHAP visualization for the selected model
            })

    except Exception as e:
        # Handle errors and send them back as JSON
        return jsonify({
            'error': str(e)
        })


   
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)