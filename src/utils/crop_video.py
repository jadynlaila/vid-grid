import os

# Get the script directory and adjust path to the 'public' folder
script_dir = os.path.dirname(os.path.abspath(__file__))
public_folder = os.path.abspath(os.path.join(script_dir, "../..", "public"))  # Adjust path to the public folder

input_video = os.path.join(public_folder, "tvs.mp4")
input_name = os.path.splitext(os.path.basename(input_video))[0]

numRows = 3
numCols = 3
video_width = 800  # Final video width after resizing
video_height = 500  # Final video height after resizing
crop_width = video_width // numCols  # Integer division to avoid floating-point issues
crop_height = video_height // numRows

# Ensure output folder is inside the public folder
output_folder = os.path.abspath(os.path.join(public_folder, f"{input_name}_cropped"))
os.makedirs(output_folder, exist_ok=True)

# Resize the video to the correct dimensions
resized_video = os.path.join(output_folder, f"{input_name}_resized.mp4")
cmd_resize = f'ffmpeg -i "{input_video}" -vf "scale={video_width}:{video_height}" "{resized_video}"'
os.system(cmd_resize)
print(f"✅ Resized video saved as: {resized_video}")

# Loop through row and column indices for cropping
for rowIndex in range(numRows):
    for colIndex in range(numCols):
        x = colIndex * crop_width  # Calculate exact x position
        y = rowIndex * crop_height  # Calculate exact y position

        output_video = os.path.join(output_folder, f"{rowIndex}_{colIndex}.mp4")

        # Crop the resized video to create grid sections
        cmd_crop = f'ffmpeg -i "{resized_video}" -filter:v "crop={crop_width}:{crop_height}:{x}:{y}" "{output_video}"'
        os.system(cmd_crop)
        print(f"✅ Created {output_video}")

print("\n✅ All cropped videos have been saved in:", output_folder)
