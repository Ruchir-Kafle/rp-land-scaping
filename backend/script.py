from PIL import Image
import os

def generate_carousel_images():
    # Create output directory if it doesn't exist
    output_dir = "images"
    os.makedirs(output_dir, exist_ok=True)

    # Define some colors for variety
    colors = [
        (255, 0, 0),     # Red
        (0, 255, 0),     # Green
        (0, 0, 255),     # Blue
        (255, 255, 0),   # Yellow
        (255, 0, 255),   # Magenta
        (0, 255, 255),   # Cyan
        (128, 0, 128),   # Purple
        (255, 165, 0),   # Orange
        (192, 192, 192)  # Gray
    ]

    # Generate 3 carousels with 3 images each
    for carousel in range(3):
        for img_num in range(3):
            # Pick a color
            color = colors[(carousel * 3 + img_num) % len(colors)]
            # Create solid color image
            img = Image.new("RGB", (800, 600), color)
            # File path
            file_path = os.path.join(output_dir, f"carousel{carousel}image{img_num}.jpg")
            # Save image
            img.save(file_path)
            print(f"Saved {file_path}")

if __name__ == "__main__":
    generate_carousel_images()
