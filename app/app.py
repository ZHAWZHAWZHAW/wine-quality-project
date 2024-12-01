import os
from flask import Flask, render_template, request
import numpy as np
from joblib import load

# Flask-App initialisieren
app = Flask(__name__)

# Dynamischer Pfad zum Ordner 'models'
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "models/")

models = {
    "Random Forest": load(os.path.join(model_path, "random_forest_model.joblib")),
    "Logistic Regression": load(os.path.join(model_path, "logistic_regression_model.joblib")),
    "SVC": load(os.path.join(model_path, "svc_model.joblib"))
}
scaler = load(os.path.join(model_path, "scaler.joblib"))

# Home-Route
@app.route('/')
def index():
    return render_template('index.html', models=list(models.keys()))

# Vorhersage-Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Eingaben aus dem Formular abrufen
        fixed_acidity = float(request.form['fixed_acidity'])
        volatile_acidity = float(request.form['volatile_acidity'])
        citric_acid = float(request.form['citric_acid'])
        residual_sugar = float(request.form['residual_sugar'])
        chlorides = float(request.form['chlorides'])
        free_sulfur_dioxide = float(request.form['free_sulfur_dioxide'])
        total_sulfur_dioxide = float(request.form['total_sulfur_dioxide'])
        density = float(request.form['density'])
        pH = float(request.form['pH'])
        sulphates = float(request.form['sulphates'])
        alcohol = float(request.form['alcohol'])

        # Eingaben in ein numpy-Array umwandeln
        features = np.array([[fixed_acidity, volatile_acidity, citric_acid,
                              residual_sugar, chlorides, free_sulfur_dioxide,
                              total_sulfur_dioxide, density, pH, sulphates, alcohol]])

        # Daten skalieren
        scaled_features = scaler.transform(features)

        # Modellwahl
        selected_model = request.form.get('model')
        if selected_model == "All":
            # Ergebnisse aller Modelle berechnen
            predictions = {
                model_name: model.predict(scaled_features)[0]
                for model_name, model in models.items()
            }
            return render_template('index.html', predictions=predictions, models=list(models.keys()))
        else:
            # Nur ein Modell verwenden
            model = models[selected_model]
            prediction = model.predict(scaled_features)[0]
            return render_template('index.html', prediction=prediction, models=list(models.keys()))

    except Exception as e:
        return render_template('index.html', error=str(e), models=list(models.keys()))

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)