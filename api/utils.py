from randomcolor import RandomColor


def generate_color():
    rc = RandomColor()
    return rc.generate(hue='blue', luminosity='light')[0]
