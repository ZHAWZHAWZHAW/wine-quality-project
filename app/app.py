import os
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
from joblib import load
import shap
import matplotlib.pyplot as plt
import matplotlib
import io
import base64
import pandas as pd
from backend.colab_links import read_colab_links

matplotlib.use('Agg')

# Flask-App initialisieren
app = Flask(__name__)
CORS(app)

# Dynamischer Pfad zum Ordner 'models'
#base_dir = os.path.dirname(os.path.abspath(__file__))
#model_path = os.path.join(base_dir, "models/")

#models = {
#    "Random Forest": load(os.path.join(model_path, "random_forest_model.joblib")),
#    "Logistic Regression": load(os.path.join(model_path, "logistic_regression_model.joblib")),
#    "SVC": load(os.path.join(model_path, "svc_model.joblib"))
#}
#scaler = load(os.path.join(model_path, "scaler.joblib"))

# Path to the 'instructions' folder
instructions_folder = os.path.join(os.path.dirname(__file__), 'backend/instructions')

# Home-Route
@app.route('/')
def index():
    # Ein leeres Dictionary für form_values, damit die Seite korrekt geladen wird
    return render_template('index.html', models=list(models.keys()), form_values={})

@app.route('/get_colab_links', methods=['GET'])
def get_colab_links():
    links = read_colab_links('backend/colab_links.txt')
    return jsonify(links)  # Send links as a JSON response

@app.route('/instructions/<filename>', methods=['GET'])
def serve_instruction_file(filename):
    # Serve the image files from the 'instructions' folder
    return send_from_directory(instructions_folder, filename)

# Vorhersage-Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form inputs
        form_values = {
            'type': request.form.get('type', '1'),  # Default to 1 (white wine)
            'fixed_acidity': request.form.get('fixed_acidity'),
            'volatile_acidity': request.form.get('volatile_acidity'),
            'citric_acid': request.form.get('citric_acid'),
            'residual_sugar': request.form.get('residual_sugar'),
            'chlorides': request.form.get('chlorides'),
            'free_sulfur_dioxide': request.form.get('free_sulfur_dioxide'),
            'total_sulfur_dioxide': request.form.get('total_sulfur_dioxide'),
            'density': request.form.get('density'),
            'pH': request.form.get('pH'),
            'sulphates': request.form.get('sulphates'),
            'alcohol': request.form.get('alcohol')
        }

        # Ensure all features are included
        #all_features = ['type', 'fixed_acidity', 'volatile_acidity', 'citric_acid', 'residual_sugar',
        #                'chlorides', 'free_sulfur_dioxide', 'total_sulfur_dioxide', 'density',
        #                'pH', 'sulphates', 'alcohol']
        
        all_features = ['type', 'fixed acidity', 'volatile acidity', 'citric acid', 'residual sugar',
                        'chlorides', 'free sulfur dioxide', 'total sulfur dioxide', 'density',
                        'pH', 'sulphates', 'alcohol']

        # Fill missing values with defaults and convert to float
        features = [float(form_values.get(feature, 0)) for feature in all_features]

        # Convert to numpy array
        #features = np.array(features)
        features_df = pd.DataFrame([features], columns=all_features)

        # Scale features
        #scaled_features = scaler.transform(features)
        try:
        # Scale features using the scaler
            scaled_features = scaler.transform(features_df)
            # Debug: Print the scaled features and check the shape
        except Exception as e:
            # Catch and print the error
            print("Error during scaling:", str(e))

        # Model selection
        selected_model = request.form.get('model')
        shap_data = None

        if selected_model == "All":
            # Predict using all models
            predictions = {
                model_name: model.predict(scaled_features)[0]
                for model_name, model in models.items()
            }
            return render_template(
                'index.html',
                predictions=predictions,
                models=list(models.keys()),
                form_values=form_values
            )
        else:
            # Predict using the selected model
            model = models[selected_model]
            #model = models["Random Forest"]
            prediction = model.predict(scaled_features)[0]

            # SHAP explanation generation
            explainer = shap.Explainer(model, masker=shap.maskers.Independent(features_df))
            shap_values = explainer(scaled_features)
            shap_values.feature_names = all_features

            # Create SHAP plot
            fig = plt.figure()

            # If the shape is (1, 12, 4), extract the first output's explanation
            if shap_values.shape[2] == 4:
                # Extract the explanation for the first prediction and first output (output 0)
                explanation = shap_values[0, :, 0]  # First prediction, first output
                shap.waterfall_plot(explanation, max_display=10)

            else:
                print("Unexpected shape for SHAP values")

            
            for label in fig.get_axes()[0].get_xticklabels() + fig.get_axes()[0].get_yticklabels():
                label.set_fontsize(8)
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=300)
            buf.seek(0)
            shap_data = base64.b64encode(buf.getvalue()).decode('utf-8')
            buf.close()
            plt.close()

            return render_template(
                'index.html',
                prediction=prediction,
                models=list(models.keys()),
                shap_data=shap_data,  # Pass SHAP visualization
                form_values=form_values
            )
    except Exception as e:
        return render_template(
            'index.html',
            error=str(e),
            models=list(models.keys()),
            form_values=form_values
        )
    

   
if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)