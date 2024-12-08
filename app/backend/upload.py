import os
import zipfile
from werkzeug.utils import secure_filename

# Define a folder where uploaded files will be saved (directly in the backend folder)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'backend')  # Save directly in the backend folder
ALLOWED_EXTENSIONS = {'zip'}

# Create the upload folder if it does not exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to handle file upload and unzip
def handle_file_upload(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)  # Secure the file name
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)  # Save the file to the server
        
        # Now unzip the file in the same directory
        try:
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                zip_ref.extractall(UPLOAD_FOLDER)  # Extract contents into the backend folder
            return f"File uploaded and unzipped successfully: {file_path}"
        except zipfile.BadZipFile:
            raise ValueError("The uploaded file is not a valid zip file.")
    else:
        raise ValueError("Invalid file format. Only .zip files are allowed.")
