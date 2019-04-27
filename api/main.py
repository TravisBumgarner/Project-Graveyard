import uuid

from flask import Flask, send_file
from PIL import Image, ImageDraw, ImageFont
import imageio

app = Flask(__name__)


def text_to_image(text, width, height, text_color, background_color):
    image = Image.new("RGB", (width, height), color=background_color)
    font = ImageFont.truetype("/Library/Fonts/Arial.ttf", 15)
    d = ImageDraw.Draw(image)
    d.text((10, 10), text, font=font, fill=text_color)
    return image


@app.route("/ok")
def ok():
    return "Server is running!"


@app.route("/process_frames")
def process_frames():
    texts = ["Thorn", "butts", "pain", "in", "my", "thorn", "butt"]
    width = 100
    height = 100
    text_color = (0, 0, 0)
    background_color = (255, 255, 255)
    images = [
        text_to_image(
            text=text,
            width=width,
            height=height,
            text_color=text_color,
            background_color=background_color,
        )
        for text in texts
    ]
    params = {"duration": (1 / 2)}
    filename = f"./{uuid.uuid4().hex[:12].lower()}.gif"
    imageio.mimsave(filename, images, **params)
    return send_file(filename)
