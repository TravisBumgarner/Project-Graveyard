from string import printable as p

def strip_weird_chars(s):
    printable = set(p)
    return filter(lambda x: x in printable, s)

