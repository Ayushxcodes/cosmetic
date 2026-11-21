import os
import shutil
import re
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MM_DIR = os.path.join(BASE_DIR, "Marketing Materials-20261121T133543Z-1-001", "Marketing Materials")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
PACKSHOTS_DEST = os.path.join(PUBLIC_DIR, "products", "packshots")
PROSHOTS_DEST = os.path.join(PUBLIC_DIR, "products", "pro-shots")

os.makedirs(PACKSHOTS_DEST, exist_ok=True)
os.makedirs(PROSHOTS_DEST, exist_ok=True)

# Helper to sanitize filename
def sanitize_filename(filename):
    name_map = {
        "4936201109968 yuiha_bottle_omote.jpg": "4936201109968-yuiha-bottle-omote.jpg",
        "4936201109968 yuiha_bottle_ura.jpg": "4936201109968-yuiha-bottle-ura.jpg",
        "4936201109968 yuiha_box_ura.jpg": "4936201109968-yuiha-box-ura.jpg",
        "DSC01987畑中レタッチ.jpg": "dsc01987-retouch.jpg",
        "DSC02001畑中レタッチ.jpg": "dsc02001-retouch.jpg",
        "DSC02006畑中レタッチ.jpg": "dsc02006-retouch.jpg",
        "DSC02026畑中レタッチ.jpg": "dsc02026-retouch.jpg",
        "DSC02030畑中レタッチA.jpg": "dsc02030-retouch-a.jpg",
        "DSC02030畑中レタッチB.jpg": "dsc02030-retouch-b.jpg",
        "DSC02036畑中レタッチ.jpg": "dsc02036-retouch.jpg",
        "ReLUCE Shiny Freesia.jpg": "reluce-shiny-freesia.jpg",
        "Reluce .png": "reluce-banner.png",
        "ミルク.jpg": "reluce-milk.jpg",
        "ハンド.jpg": "reluce-hand-1.jpg",
        "ハンド_2.jpg": "reluce-hand-2.jpg",
        "ハンド_3.jpg": "reluce-hand-3.jpg",
        "ハンド＿5.png": "reluce-hand-5.png",
        "250521_インスタ.png": "reluce-insta.png",
        "4936201106424.PT01.jpg": "4936201106424-pt01.jpg",
        "4936201106431.PT01.jpg": "4936201106431-pt01.jpg",
        "4936201106912_n_rimen.jpg": "4936201106912-rimen.jpg",
        "4936201110117_rimen.jpg": "4936201110117-rimen.jpg",
        "4936201110162_rimen.jpg": "4936201110162-rimen.jpg",
        "4936201108787_1.jpg": "4936201108787-back.jpg",
        "4936201108794_1.jpg": "4936201108794-back.jpg",
        "4936201105755_2.jpg": "4936201105755-back.jpg",
        "4936201105878_2.jpg": "4936201105878-back.jpg",
        "4936201107599_1.jpg": "4936201107599-back.jpg",
        "4936201103591_1.jpg": "4936201103591-back.jpg",
        "4936201108923_02.jpg": "4936201108923-back.jpg",
        "4936201108930_02.jpg": "4936201108930-back.jpg",
        "4936201109395_2.jpg": "4936201109395-back.jpg",
        "4936201109401_2.jpg": "4936201109401-back.jpg",
        "DSC02009.jpg": "chanosui-sunscreen-front.jpg",
        "DSC02011.jpg": "chanosui-sunscreen-back.jpg"
    }
    if filename in name_map:
        return name_map[filename]
    base, ext = os.path.splitext(filename)
    if ext.lower() == ".tif":
        return f"{base.lower()}.webp"
    clean = re.sub(r"[^\w\.\-]", "-", filename.lower())
    clean = re.sub(r"-+", "-", clean)
    return clean

# 1. Process Product Packshots
packshots_src = os.path.join(MM_DIR, "Product Packshots")
packshot_file_map = {} # original -> web path
for f in os.listdir(packshots_src):
    src_file = os.path.join(packshots_src, f)
    if not os.path.isfile(src_file):
        continue
    dest_name = sanitize_filename(f)
    dest_file = os.path.join(PACKSHOTS_DEST, dest_name)
    shutil.copy2(src_file, dest_file)
    # Also save with original name if different, for maximum compatibility
    if dest_name != f:
        orig_dest = os.path.join(PACKSHOTS_DEST, f)
        shutil.copy2(src_file, orig_dest)
    packshot_file_map[f] = f"/products/packshots/{dest_name}"

print(f"Processed {len(packshot_file_map)} packshots to {PACKSHOTS_DEST}")

# 2. Process Pro Shots per brand
brand_dir_map = {
    "Cha no Sui": "cha-no-sui",
    "dotbye": "dotbye",
    "JUNSUHADA": "junsuhada",
    "Kankitsu Ohji": "kankitsu-ohji",
    "Latte Botanical": "latte-botanical",
    "ReLUCE": "reluce",
    "Savon Doron": "savon-doron"
}

proshot_file_map = {} # (brand_key, original_file) -> web path
proshots_src = os.path.join(MM_DIR, "Pro Shots")
for brand_dir in os.listdir(proshots_src):
    brand_path = os.path.join(proshots_src, brand_dir)
    if not os.path.isdir(brand_path):
        continue
    brand_slug = brand_dir_map.get(brand_dir, sanitize_filename(brand_dir))
    target_dir = os.path.join(PROSHOTS_DEST, brand_slug)
    os.makedirs(target_dir, exist_ok=True)
    for f in os.listdir(brand_path):
        src_file = os.path.join(brand_path, f)
        if not os.path.isfile(src_file):
            continue
        ext = os.path.splitext(f)[1].lower()
        if ext in [".mp4", ".mov"]:
            continue # skip large video files for product image gallery
        
        dest_name = sanitize_filename(f)
        dest_file = os.path.join(target_dir, dest_name)
        
        if ext == ".tif":
            try:
                im = Image.open(src_file)
                # Convert RGBA/CMYK if needed
                if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
                    im.save(dest_file, "WEBP", quality=92)
                else:
                    im = im.convert("RGB")
                    im.save(dest_file, "WEBP", quality=92)
                proshot_file_map[(brand_dir, f)] = f"/products/pro-shots/{brand_slug}/{dest_name}"
            except Exception as e:
                print(f"Error converting TIFF {src_file}: {e}")
        else:
            shutil.copy2(src_file, dest_file)
            proshot_file_map[(brand_dir, f)] = f"/products/pro-shots/{brand_slug}/{dest_name}"

print(f"Processed {len(proshot_file_map)} pro shots across {len(brand_dir_map)} brands")

# 3. Legacy image1.png to image32.jpg overwrite mapping
legacy_source_map = {
    "image1.png": packshot_file_map["4936201106424.jpg"],
    "image2.png": packshot_file_map["4936201106431.jpg"],
    "image3.png": packshot_file_map["4936201105755.jpg"],
    "image4.png": packshot_file_map["4936201107599.jpg"],
    "image5.png": packshot_file_map["4936201105878.jpg"],
    "image6.png": packshot_file_map["4936201103591.jpg"],
    "image7.png": proshot_file_map.get(("Kankitsu Ohji", "1.png"), ""),
    "image8.png": proshot_file_map.get(("Kankitsu Ohji", "kankitsu_web_image_01.jpg"), ""),
    "image9.png": packshot_file_map["4936201106424.PT01.jpg"],
    "image10.png": packshot_file_map["4936201103591_1.jpg"],
    "image11.png": proshot_file_map.get(("Latte Botanical", "latte_3sku.jpg"), ""),
    "image12.png": proshot_file_map.get(("Latte Botanical", "latte_4sku.jpg"), ""),
    "image13.png": proshot_file_map.get(("Latte Botanical", "new_latte_2sku_b.jpg"), ""),
    "image14.png": packshot_file_map["4936201109654.jpg"],
    "image15.png": packshot_file_map["4936201108923.jpg"],
    "image16.png": packshot_file_map["4936201108787.jpg"],
    "image17.png": packshot_file_map["4936201108794.jpg"],
    "image18.png": packshot_file_map["4936201108930.jpg"],
    "image19.jpg": packshot_file_map["4936201109395.jpg"],
    "image20.jpg": packshot_file_map["4936201109401.jpg"],
    "image21.png": proshot_file_map.get(("Latte Botanical", "33964.jpg"), ""),
    "image22.jpg": packshot_file_map["4936201108930_02.jpg"],
    "image23.jpg": packshot_file_map["4936201110162.jpg"],
    "image24.jpg": packshot_file_map["4936201110162_rimen.jpg"],
    "image25.jpg": packshot_file_map["4936201106912.jpg"],
    "image26.jpg": proshot_file_map.get(("dotbye", "Dotbye.jpg"), ""),
    "image27.jpg": packshot_file_map["4936201110117.jpg"],
    "image28.jpg": proshot_file_map.get(("ReLUCE", "ミルク.jpg"), ""),
    "image29.jpg": proshot_file_map.get(("ReLUCE", "0207.jpg"), ""),
    "image30.jpg": proshot_file_map.get(("ReLUCE", "0221.jpg"), ""),
    "image31.jpg": packshot_file_map["DSC02009.jpg"],
    "image32.jpg": packshot_file_map["4936201109968_ec.jpg"]
}

legacy_dir = os.path.join(PUBLIC_DIR, "products")
for legacy_file, new_rel_path in legacy_source_map.items():
    if not new_rel_path:
        continue
    source_disk_path = os.path.join(PUBLIC_DIR, new_rel_path.lstrip("/"))
    target_legacy_path = os.path.join(legacy_dir, legacy_file)
    if os.path.exists(source_disk_path):
        try:
            im = Image.open(source_disk_path)
            # save in same format as extension
            if legacy_file.endswith(".png"):
                im.save(target_legacy_path, "PNG")
            else:
                if im.mode in ("RGBA", "P"):
                    im = im.convert("RGB")
                im.save(target_legacy_path, "JPEG", quality=95)
        except Exception as e:
            print(f"Error copying {legacy_file}: {e}")

print("Legacy images updated with high-resolution copies.")

# 4. Product catalog mapping
catalog_updates = {
    "cha-no-sui-matcha-facial-wash-foam": {
        "image": packshot_file_map["4936201108787.jpg"],
        "gallery": [
            packshot_file_map["4936201108787.jpg"],
            packshot_file_map["4936201108787_1.jpg"],
            proshot_file_map[("Cha no Sui", "chanosui.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02001畑中レタッチ.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02006畑中レタッチ.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02030畑中レタッチA.jpg")],
            proshot_file_map[("Cha no Sui", "15088.tif")],
            proshot_file_map[("Cha no Sui", "15091.tif")]
        ]
    },
    "cha-no-sui-matcha-cleansing-gel": {
        "image": packshot_file_map["4936201108794.jpg"],
        "gallery": [
            packshot_file_map["4936201108794.jpg"],
            packshot_file_map["4936201108794_1.jpg"],
            proshot_file_map[("Cha no Sui", "chanosui.jpg")],
            proshot_file_map[("Cha no Sui", "DSC01987畑中レタッチ.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02026畑中レタッチ.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02030畑中レタッチB.jpg")],
            proshot_file_map[("Cha no Sui", "15092.tif")],
            proshot_file_map[("Cha no Sui", "15094.tif")]
        ]
    },
    "cha-no-sui-matcha-waterproof-sunscreen-cream-spf50-pa": {
        "image": packshot_file_map["DSC02009.jpg"],
        "gallery": [
            packshot_file_map["DSC02009.jpg"],
            packshot_file_map["DSC02011.jpg"],
            proshot_file_map[("Cha no Sui", "chanosui.jpg")],
            proshot_file_map[("Cha no Sui", "DSC02036畑中レタッチ.jpg")],
            proshot_file_map[("Cha no Sui", "15096.tif")],
            proshot_file_map[("Cha no Sui", "15098.tif")]
        ]
    },
    "dotbye-pore-cleansing-oil": {
        "image": packshot_file_map["4936201109654.jpg"],
        "gallery": [
            packshot_file_map["4936201109654.jpg"],
            proshot_file_map[("dotbye", "Dotbye.jpg")],
            proshot_file_map[("dotbye", "1.png")],
            proshot_file_map[("dotbye", "2.png")],
            proshot_file_map[("dotbye", "3.png")],
            proshot_file_map[("dotbye", "4.png")],
            proshot_file_map[("dotbye", "4936201109371_07.jpg")],
            proshot_file_map[("dotbye", "20486.tif")],
            proshot_file_map[("dotbye", "15106.tif")]
        ]
    },
    "kankitsu-ohji-black-peeling-gel-ex": {
        "image": packshot_file_map["4936201110117.jpg"],
        "gallery": [
            packshot_file_map["4936201110117.jpg"],
            packshot_file_map["4936201110117_rimen.jpg"],
            proshot_file_map[("Kankitsu Ohji", "kankitsu_web_image_01.jpg")],
            proshot_file_map[("Kankitsu Ohji", "9291_2.jpg")],
            proshot_file_map[("Kankitsu Ohji", "7.png")],
            proshot_file_map[("Kankitsu Ohji", "8.png")]
        ]
    },
    "kankitsu-ohji-facial-peeling-gel-sp": {
        "image": packshot_file_map["4936201106424.jpg"],
        "gallery": [
            packshot_file_map["4936201106424.jpg"],
            packshot_file_map["4936201106424.PT01.jpg"],
            proshot_file_map[("Kankitsu Ohji", "kankitsu_web_image_01.jpg")],
            proshot_file_map[("Kankitsu Ohji", "1.png")],
            proshot_file_map[("Kankitsu Ohji", "9069.jpg")]
        ]
    },
    "kankitsu-ohji-facial-clear-whip-sp": {
        "image": packshot_file_map["4936201106431.jpg"],
        "gallery": [
            packshot_file_map["4936201106431.jpg"],
            packshot_file_map["4936201106431.PT01.jpg"],
            proshot_file_map[("Kankitsu Ohji", "kankitsu_web_image_02.jpg")],
            proshot_file_map[("Kankitsu Ohji", "2.png")],
            proshot_file_map[("Kankitsu Ohji", "3.png")],
            proshot_file_map[("Kankitsu Ohji", "9073.jpg")]
        ]
    },
    "kankitsu-ohji-clay-foam-sp": {
        "image": packshot_file_map["4936201106912.jpg"],
        "gallery": [
            packshot_file_map["4936201106912.jpg"],
            packshot_file_map["4936201106912_n_rimen.jpg"],
            proshot_file_map[("Kankitsu Ohji", "kankitsu_web_image_03.jpg")],
            proshot_file_map[("Kankitsu Ohji", "4.png")],
            proshot_file_map[("Kankitsu Ohji", "5.png")],
            proshot_file_map[("Kankitsu Ohji", "6.png")]
        ]
    },
    "savon-doron-daily-esthe-face-wash-charcoal": {
        "image": packshot_file_map["4936201105755.jpg"],
        "gallery": [
            packshot_file_map["4936201105755.jpg"],
            packshot_file_map["4936201105755_2.jpg"],
            proshot_file_map[("Savon Doron", "DSC08403.jpg")],
            proshot_file_map[("Savon Doron", "41278.jpg")],
            proshot_file_map[("Savon Doron", "DSC08404re.jpg")]
        ]
    },
    "savon-doron-clay-vita-c-faical-wash": {
        "image": packshot_file_map["4936201107599.jpg"],
        "gallery": [
            packshot_file_map["4936201107599.jpg"],
            packshot_file_map["4936201107599_1.jpg"],
            proshot_file_map[("Savon Doron", "41278.jpg")],
            proshot_file_map[("Savon Doron", "DSC08403.jpg")],
            proshot_file_map[("Savon Doron", "DSC08404re.jpg")]
        ]
    },
    "latte-botanical-cleanse-gel": {
        "image": packshot_file_map["4936201103591.jpg"],
        "gallery": [
            packshot_file_map["4936201103591.jpg"],
            packshot_file_map["4936201103591_1.jpg"],
            proshot_file_map[("Latte Botanical", "33964.jpg")],
            proshot_file_map[("Latte Botanical", "latte_3sku.jpg")],
            proshot_file_map[("Latte Botanical", "latte_4sku.jpg")],
            proshot_file_map[("Latte Botanical", "new_latte_2sku_b.jpg")]
        ]
    },
    "yuiha-goshinboku-aroma-mist-hinoki-2026-winter-new": {
        "image": packshot_file_map["4936201109968_ec.jpg"],
        "gallery": [
            packshot_file_map["4936201109968_ec.jpg"],
            packshot_file_map["4936201109968 yuiha_bottle_omote.jpg"],
            packshot_file_map["4936201109968.jpg"],
            packshot_file_map["4936201109968 yuiha_bottle_ura.jpg"],
            packshot_file_map["4936201109968 yuiha_box_ura.jpg"]
        ]
    },
    "reluce-skin-milk-lotion-shiny-freesia": {
        "image": packshot_file_map["4936201108923.jpg"],
        "gallery": [
            packshot_file_map["4936201108923.jpg"],
            packshot_file_map["4936201108923_02.jpg"],
            proshot_file_map[("ReLUCE", "ReLUCE Shiny Freesia.jpg")],
            proshot_file_map[("ReLUCE", "ミルク.jpg")],
            proshot_file_map[("ReLUCE", "ハンド.jpg")],
            proshot_file_map[("ReLUCE", "ハンド_2.jpg")],
            proshot_file_map[("ReLUCE", "6sku.jpg")]
        ]
    },
    "reluce-glitter-serum-fragrance-shiny-freesia": {
        "image": packshot_file_map["4936201109395.jpg"],
        "gallery": [
            packshot_file_map["4936201109395.jpg"],
            packshot_file_map["4936201109395_2.jpg"],
            proshot_file_map[("ReLUCE", "4936201109395_07.jpg")],
            proshot_file_map[("ReLUCE", "4936201109395_08.jpg")],
            proshot_file_map[("ReLUCE", "ハンド_3.jpg")],
            proshot_file_map[("ReLUCE", "6sku_2.png")]
        ]
    },
    "reluce-skin-milk-lotion-prism-lily": {
        "image": packshot_file_map["4936201108930.jpg"],
        "gallery": [
            packshot_file_map["4936201108930.jpg"],
            packshot_file_map["4936201108930_02.jpg"],
            proshot_file_map[("ReLUCE", "ミルク.jpg")],
            proshot_file_map[("ReLUCE", "ハンド＿5.png")],
            proshot_file_map[("ReLUCE", "6sku.jpg")],
            proshot_file_map[("ReLUCE", "6sku_3.png")]
        ]
    },
    "reluce-glitter-serum-fragrance-prism-lily": {
        "image": packshot_file_map["4936201109401.jpg"],
        "gallery": [
            packshot_file_map["4936201109401.jpg"],
            packshot_file_map["4936201109401_2.jpg"],
            proshot_file_map[("ReLUCE", "ReLUCE.jpg")],
            proshot_file_map[("ReLUCE", "6sku_2.png")],
            proshot_file_map[("ReLUCE", "0117.jpg")],
            proshot_file_map[("ReLUCE", "0124.JPG")]
        ]
    },
    "reluce-fragrance-ice-mist-peach-sorbet": {
        "image": packshot_file_map["4936201110162.jpg"],
        "gallery": [
            packshot_file_map["4936201110162.jpg"],
            packshot_file_map["4936201110162_rimen.jpg"],
            proshot_file_map[("ReLUCE", "6sku.jpg")],
            proshot_file_map[("ReLUCE", "0207.jpg")],
            proshot_file_map[("ReLUCE", "0221.jpg")],
            proshot_file_map[("ReLUCE", "0314.jpg")]
        ]
    },
    "junsuhada-medicated-japanese-peppermint-water-mist": {
        "image": packshot_file_map["4936201105878.jpg"],
        "gallery": [
            packshot_file_map["4936201105878.jpg"],
            packshot_file_map["4936201105878_2.jpg"],
            proshot_file_map[("JUNSUHADA", "9076.jpg")],
            proshot_file_map[("JUNSUHADA", "DSC_0103.jpg")],
            proshot_file_map[("JUNSUHADA", "9074.tif")],
            proshot_file_map[("JUNSUHADA", "9078.tif")]
        ]
    }
}

# 5. Save the mapping to a JSON file so TypeScript seed can import or read it
import json
output_json = os.path.join(BASE_DIR, "scripts", "catalog_image_mapping.json")
with open(output_json, "w") as out:
    json.dump(catalog_updates, out, indent=2)

print(f"Catalog image mapping successfully saved to {output_json}")
