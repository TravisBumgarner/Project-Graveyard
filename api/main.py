import uuid

from flask import Flask, send_file, request, jsonify, send_from_directory
from PIL import Image, ImageDraw, ImageFont
import imageio
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def text_to_image(text, width, height, foreground_color, background_color):
    image = Image.new("RGB", (width, height), color=background_color)
    font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 15)
    d = ImageDraw.Draw(image)
    d.text((10, 10), text, font=font, fill=foreground_color)
    return image


@app.route("/ok")
def ok():
    return "Server is running!"


@app.route("/images/<filename>")
def images(filename):
    return send_from_directory("images", filename)


@app.route("/process", methods=["post", "get"])
def process():
    data = request.get_json()
    print(data)
    frames = data["frames"]
    width = int(data["width"])
    height = int(data["height"])
    frame_rate = int(data["frame_rate"])
    foreground_color = data["foreground_color"]
    background_color = data["background_color"]

    images = [
        text_to_image(
            text=frame,
            width=width,
            height=height,
            foreground_color=foreground_color,
            background_color=background_color,
        )
        for frame in frames
    ]
    params = {"duration": (1 / frame_rate)}
    filename = f"{uuid.uuid4().hex[:12].lower()}.gif"
    file_path = f"./images/{filename}"
    file_url = f"http://localhost:5000/images/{filename}"

    imageio.mimsave(file_path, images, **params)
    return jsonify({"url": file_url})
