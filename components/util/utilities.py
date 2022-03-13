import base64


def left(s, amount):
    return s[:amount]


def right(s, amount):
    return s[-amount:]


def mid(s, offset, amount):
    return s[offset:offset+amount]


def encode_id(_id=None):
    if _id:
        new_encode = _id.encode('ascii')
        return new_encode

    return None


def decode_id(_id=None):
    if _id:
        encoded = base64.b64decode(_id)
        decoded = encoded.decode('ascii')
        return decoded

    return None

