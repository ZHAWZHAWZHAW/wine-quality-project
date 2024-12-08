import os
import joblib

# Folder where models and scaler are stored
MODELS_FOLDER = 'backend/models'

# Dictionary to store models
models = {}
scaler = None

def load_models():
    """
    Load all models and the scaler from the models folder and store them in the models dictionary.
    """
    global models, scaler
    try:
        # List all files in the models folder with .joblib extension
        model_files = [f for f in os.listdir(MODELS_FOLDER) if f.endswith('.joblib')]
        
        # Load each model and add it to the models dictionary
        for model_file in model_files:
            model_path = os.path.join(MODELS_FOLDER, model_file)
            model_name = os.path.splitext(model_file)[0]
            
            # Load scaler
            if model_name == 'scaler':
                scaler = joblib.load(model_path)
                print("Scaler loaded successfully.")
            else:
                models[model_name] = joblib.load(model_path)
        
        print(f"Models loaded successfully: {', '.join(models.keys())}")
    except Exception as e:
        print(f"Error loading models and scaler: {str(e)}")

# Call the function to load models and scaler when the module is imported
load_models()
