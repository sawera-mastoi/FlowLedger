import re

C32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"

with open("multi-send.clar") as f:
    text = f.read()

addresses = re.findall(r"'SP[A-Z0-9]+", text)
for a in addresses:
    addr = a[1:] # remove quote
    if not all(c in C32 for c in addr):
        print(f"Invalid char in {addr}")
        continue
