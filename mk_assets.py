import os
import sys


def get_identity(asset_name: str):
    result = ""
    stem, _ = os.path.splitext(asset_name)
    for part in stem.split("-"):
        result += part.capitalize()
    return result


def get_assets() -> list[str]:
    return os.listdir("../qin_desk/public/assets")


def mk_assets():
    print("Making 'src/qin-assets.ts'...")
    with open('src/qin-assets.ts', 'w') as file:
        file.write("export enum QinAsset {\n")
        for asset_name in get_assets():
            identity = get_identity(asset_name)
            file.write('  ' + identity + ' = "' + asset_name + '",\n')
        file.write('}\n')
        file.write('\n')
        file.write('export function qinAssetUrl(asset: QinAsset): string {\n')
        file.write('  return "/pub/qin_desk/assets/" + asset;\n')
        file.write('}\n')
        file.write('\n')
        file.write('export function qinUrlAsset(url: string): QinAsset {\n')
        file.write('  const asset = url.substring(url.lastIndexOf("/") + 1);\n')
        file.write('  return asset as QinAsset;\n')
        file.write('}\n')


if __name__ == "__main__":
    mk_assets()
else:
    sys.modules[__name__] = mk_assets
