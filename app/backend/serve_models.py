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
    Returns:
        dict: A dictionary of loaded models.
        object: The loaded scaler.
    """
    global models, scaler
    
    # Check if the models folder exists
    if not os.path.exists(MODELS_FOLDER):
        print(f"Warning: The folder '{MODELS_FOLDER}' does not exist. Skipping model loading.")
        return models, scaler  # Return empty models and None scaler
    
    try:
        # List all files in the models folder with .joblib extension
        model_files = [f for f in os.listdir(MODELS_FOLDER) if f.endswith('.joblib')]
        
        if not model_files:
            print("Warning: No models found in the 'backend/models' folder.")
            return models, scaler  # Return empty models and None scaler
        
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
    
    # Return the models and scaler
    return models, scaler
