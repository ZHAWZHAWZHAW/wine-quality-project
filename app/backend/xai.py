import shap
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd

# Function to create SHAP explanation and convert to image
def get_shap_visualization(model, scaler, features_df, all_features, full_model_name):
    try:
        # Scale the features using the same scaler
        scaled_features = scaler.transform(features_df)

        # SHAP explanation generation with masker
        explainer = shap.Explainer(model, masker=shap.maskers.Independent(features_df))
        # Disable additivity check (allowing small differences between model output and SHAP sum)
        if full_model_name == 'random_forest_model':
            shap_values = explainer(scaled_features, check_additivity=False)  # Include check_additivity for Random Forest
        else:
            shap_values = explainer(scaled_features)  # Don't include check_additivity for other models
        
        # Set the feature names
        shap_values.feature_names = all_features

        # Dictionary to hold plots
        plots = {}

        # 1. Waterfall Plot
        try:
            fig = plt.figure()
            if shap_values.shape[2] == 4:
                # Extract the explanation for the first prediction and first output (output 0)
                explanation = shap_values[0, :, 0]  # First prediction, first output
                shap.waterfall_plot(explanation, max_display=10)
            else:
                print("Unexpected shape for SHAP values")

            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=300)
            buf.seek(0)
            plots['waterfall'] = base64.b64encode(buf.getvalue()).decode('utf-8')
            buf.close()
            plt.close()
        except Exception as e:
            print(f"Error generating waterfall plot: {e}")

        # 2. Force Plot
        try:
            # Create an Explanation object from the SHAP values
            explanation = shap.Explanation(
                values=shap_values.values[0][:, 0],  # SHAP values for the first prediction, first output
                base_values=explainer.expected_value[0],  # Expected value for the first output
                data=features_df.iloc[0],  # Feature values for the first instance
                feature_names=all_features
            )

            # Generate the force plot using matplotlib backend
            fig = plt.figure()
            shap.force_plot(
                base_value=explanation.base_values,
                shap_values=explanation.values,
                features=explanation.data,
                feature_names=explanation.feature_names,
                matplotlib=True  # Enable matplotlib rendering
            )

            # Save the plot as an image
            buf = io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=300)
            buf.seek(0)
            plots['force'] = base64.b64encode(buf.getvalue()).decode('utf-8')
            buf.close()
            plt.close()
        except Exception as e:
            print(f"Error generating force plot: {e}")


        return plots  # Return the dictionary with plot data
    except Exception as e:
        print(f"Error generating SHAP visualizations: {e}")
        return None
