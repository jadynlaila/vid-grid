import os

# Get the absolute path of the script's directory (utils folder)
script_dir = os.path.dirname(os.path.abspath(__file__))

# Navigate one level up to the public folder
public_folder = os.path.abspath(os.path.join(script_dir, ".."))  # Moves out of 'utils' into 'public'

# Input video file (ensure correct relative path from the utils folder)
input_video = os.path.join(public_folder, "tvs.mp4")
input_name = os.path.splitext(os.path.basename(input_video))[0]  # Extracts file name without extension

# Set grid dimensions
numRows = 3
numCols = 3
video_width = 800
video_height = 500
crop_width = video_width // numCols  # Integer division to avoid floating-point issues
crop_height = video_height // numRows

# Ensure output folder is inside the public folder
output_folder = os.path.abspath(os.path.join(public_folder, f"{input_name}_cropped"))
os.makedirs(output_folder, exist_ok=True)

# Loop through row and column indices
for rowIndex in range(numRows):
    for colIndex in range(numCols):
        x = colIndex * crop_width  # Calculate exact x position
        y = rowIndex * crop_height  # Calculate exact y position

        output_video = os.path.join(output_folder, f"{rowIndex}_{colIndex}.mp4")

        cmd = f'ffmpeg -i "{input_video}" -filter:v "crop={crop_width}:{crop_height}:{x}:{y}" "{output_video}"'
        os.system(cmd)
        print(f"✅ Created {output_video}")

print("\n✅ All cropped videos have been saved in:", output_folder)
