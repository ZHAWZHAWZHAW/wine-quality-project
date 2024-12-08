import os

# Define the path where plots are stored
PLOTS_FOLDER = os.path.join(os.getcwd(), 'backend', 'plots')

# Function to get all folder names and their respective .png files
def get_plots():
    # Ensure that the plots folder exists, and if not, create it
    if not os.path.exists(PLOTS_FOLDER):
        print(f"Warning: {PLOTS_FOLDER} does not exist. Creating the folder.")
        os.makedirs(PLOTS_FOLDER)

    # Dictionary to hold folder names and the corresponding list of PNG images
    plots = {}

    # Loop through each subfolder in the plots directory
    for folder_name in os.listdir(PLOTS_FOLDER):
        folder_path = os.path.join(PLOTS_FOLDER, folder_name)
        
        if os.path.isdir(folder_path):
            # Get all .png files in the folder
            png_files = [
                file for file in os.listdir(folder_path)
                if file.endswith('.png')
            ]
            # Add the folder name and its PNG files to the dictionary
            plots[folder_name] = png_files
    
    return plots
