import json
import re
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEED_PATH = os.path.join(BASE_DIR, "prisma", "seed.ts")
MAPPING_PATH = os.path.join(BASE_DIR, "scripts", "catalog_image_mapping.json")

with open(MAPPING_PATH, "r") as f:
    mapping = json.load(f)

with open(SEED_PATH, "r") as f:
    seed_content = f.read()

# Update INITIAL_PRODUCTS in seed.ts
# We parse the array and replace image and gallery
for pid, data in mapping.items():
    # Match the product block by its ID
    # Regex to find id: "pid" ... image: "..." ... gallery: [...]
    pattern = rf'({{\s*"id":\s*"{pid}",.+?"image":\s*)"[^"]+",(\s*"gallery":\s*)\[[^\]]*\]'
    replacement_gallery = json.dumps(data["gallery"], indent=6)
    # Adjust indentation
    replacement_gallery = replacement_gallery.replace('\n', '\n      ')
    new_sub = rf'\g<1>"{data["image"]}",\g<2>{replacement_gallery}'
    
    seed_content, count = re.subn(pattern, new_sub, seed_content, count=1, flags=re.DOTALL)
    if count == 0:
        print(f"Warning: could not match product {pid}")
    else:
        print(f"Updated product {pid} in seed.ts")

# Update sample orders in seed.ts
order_replacements = {
    'productId: "cha-no-sui-matcha-facial-wash-foam",\n            name: "CHA NO SUI Matcha Facial Wash Foam",\n            price: 38,\n            quantity: 1,\n            image: "/products/image16.png"':
    'productId: "cha-no-sui-matcha-facial-wash-foam",\n            name: "CHA NO SUI Matcha Facial Wash Foam",\n            price: 38,\n            quantity: 1,\n            image: "/products/packshots/4936201108787.jpg"',

    'productId: "dotbye-pore-cleansing-oil",\n            name: "dotbye Pore Cleansing Oil",\n            price: 54,\n            quantity: 1,\n            image: "/products/image14.png"':
    'productId: "dotbye-pore-cleansing-oil",\n            name: "dotbye Pore Cleansing Oil",\n            price: 54,\n            quantity: 1,\n            image: "/products/packshots/4936201109654.jpg"',

    'productId: "yuiha-goshinboku-aroma-mist-hinoki-2026-winter-new",\n            name: "YUIHA Goshinboku Aroma Mist Hinoki (2026 Winter NEW)",\n            price: 52,\n            quantity: 2,\n            image: "/products/image32.jpg"':
    'productId: "yuiha-goshinboku-aroma-mist-hinoki-2026-winter-new",\n            name: "YUIHA Goshinboku Aroma Mist Hinoki (2026 Winter NEW)",\n            price: 52,\n            quantity: 2,\n            image: "/products/packshots/4936201109968_ec.jpg"',

    'productId: "cha-no-sui-matcha-waterproof-sunscreen-cream-spf50-pa",\n            name: "CHA NO SUI Matcha Waterproof Sunscreen Cream (SPF50+ PA++++)",\n            price: 48,\n            quantity: 1,\n            image: "/products/image31.jpg"':
    'productId: "cha-no-sui-matcha-waterproof-sunscreen-cream-spf50-pa",\n            name: "CHA NO SUI Matcha Waterproof Sunscreen Cream (SPF50+ PA++++)",\n            price: 48,\n            quantity: 1,\n            image: "/products/packshots/chanosui-sunscreen-front.jpg"',

    'productId: "junsuhada-medicated-japanese-peppermint-water-mist",\n            name: "JUNSUHADA Medicated Japanese Peppermint Water Mist",\n            price: 56,\n            quantity: 1,\n            image: "/products/image5.png"':
    'productId: "junsuhada-medicated-japanese-peppermint-water-mist",\n            name: "JUNSUHADA Medicated Japanese Peppermint Water Mist",\n            price: 56,\n            quantity: 1,\n            image: "/products/packshots/4936201105878.jpg"'
}

for old_str, new_str in order_replacements.items():
    if old_str in seed_content:
        seed_content = seed_content.replace(old_str, new_str)
        print("Updated order item reference in seed.ts")

with open(SEED_PATH, "w") as f:
    f.write(seed_content)

print("prisma/seed.ts updated successfully!")
