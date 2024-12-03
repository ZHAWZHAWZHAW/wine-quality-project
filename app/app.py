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
    # Ein leeres Dictionary für form_values, damit die Seite korrekt geladen wird
    return render_template('index.html', models=list(models.keys()), form_values={})

# Vorhersage-Route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Eingaben aus dem Formular abrufen
        form_values = {
            'type': request.form.get('type', '1'),  # Standardwert: 1 für Weißwein
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

        # Alle Features sicherstellen
        all_features = ['type', 'fixed_acidity', 'volatile_acidity', 'citric_acid', 'residual_sugar',
                        'chlorides', 'free_sulfur_dioxide', 'total_sulfur_dioxide', 'density',
                        'pH', 'sulphates', 'alcohol']

        # Fehlende Werte auffüllen mit Standardwerten
        features = [float(form_values.get(feature, 0)) for feature in all_features]

        # Eingaben in ein numpy-Array umwandeln
        features = np.array([features])

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
            return render_template(
                'index.html', 
                predictions=predictions, 
                models=list(models.keys()), 
                form_values=form_values  # Formulardaten an Template zurückgeben
            )
        else:
            # Nur ein Modell verwenden
            model = models[selected_model]
            prediction = model.predict(scaled_features)[0]
            return render_template(
                'index.html', 
                prediction=prediction, 
                models=list(models.keys()), 
                form_values=form_values  # Formulardaten an Template zurückgeben
            )

    except Exception as e:
        return render_template(
            'index.html', 
            error=str(e), 
            models=list(models.keys()), 
            form_values=form_values  # Formulardaten an Template zurückgeben
        )

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)