# __backend/colab_links.py

def read_colab_links(file_path):
    links = []
    try:
        with open(file_path, 'r') as file:
            lines = file.readlines()
            for line in lines:
                # Split the line into URL and description
                parts = line.split(' ', 1)  # Split only on the first space
                if len(parts) == 2:
                    link = parts[0].strip()  # The link is the first part
                    description = parts[1].strip()  # The description is the second part
                    links.append({'link': link, 'description': description})  # Store as a dictionary
    except FileNotFoundError:
        print(f"Error: The file {file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
    return links
