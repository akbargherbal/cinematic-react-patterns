import pandas as pd
import re
from integrate_modules import integrate_modules


def clean_xml_string(s: str) -> str:
    """Clean XML string by removing markdown fences and extracting XML content."""
    s = s.strip()

    # Remove markdown code fences with language identifier
    s = re.sub(r"^```xml\s*\n", "", s, flags=re.MULTILINE)
    s = re.sub(r"^```\s*\n", "", s, flags=re.MULTILINE)
    s = re.sub(r"\n```\s*$", "", s, flags=re.MULTILINE)

    # Remove any remaining ``` markers
    s = s.strip("`").strip()

    # Find the actual XML start if there's junk before it
    xml_start = s.find("<?xml")
    if xml_start > 0:
        s = s[xml_start:]

    # Find the XML end if there's junk after it
    xml_end = s.find("</module>")
    if xml_end > 0:
        s = s[: xml_end + len("</module>")]

    return s.strip()


def fix_xml_encoding_issues(s: str) -> str:
    """Fix common XML encoding issues."""
    # Replace smart quotes with regular quotes
    s = s.replace('"', '"').replace('"', '"')
    s = s.replace(""", "'").replace(""", "'")

    # Fix common unescaped characters IN ATTRIBUTE VALUES AND TEXT
    # This is tricky - we need to avoid breaking CDATA sections

    # Strategy: Only fix ampersands that are NOT already part of entities
    # Match & that's NOT followed by amp; lt; gt; quot; apos; or #
    s = re.sub(r"&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)", "&amp;", s)

    return s


# Load data
df = pd.read_pickle("./RESULTS.pkl")

# Clean XML strings
print("🧹 Cleaning XML strings...")
df["RESULT"] = df["RESULT"].apply(clean_xml_string)

# Apply encoding fixes
print("🔧 Fixing XML encoding issues...")
df["RESULT"] = df["RESULT"].apply(fix_xml_encoding_issues)

# Verify cleaning worked
valid_count = df["RESULT"].str.startswith("<?xml").sum()
print(f"   Valid XML strings: {valid_count}/{len(df)}")

# Get list of XML strings
xml_list = df["RESULT"].tolist()

print(f"\n📦 Processing {len(xml_list)} modules...")

# Run integration
result = integrate_modules(
    xml_contents=xml_list,
    current_app_tsx="../../../src/App.tsx",
    current_home_tsx="../../../src/modules/home/index.tsx",
    output_dir="./integrated",
)

# Print summary
print("\n" + "=" * 60)
print("FINAL SUMMARY")
print("=" * 60)
print(f"Total modules: {result['total_modules']}")
print(f"Successfully integrated: {result['processed']}")
print(f"Skipped (duplicates): {result['skipped']}")
print(f"Errors: {len(result['errors'])}")

if result["errors"]:
    print("\n❌ Errors encountered:")
    for i, error in enumerate(result["errors"], 1):
        print(f"   {i}. {error}")

    print("\n💡 To diagnose these errors, run:")
    print("   python diagnose_failed_xml.py")

if result["success"]:
    print("\n✅ Integration complete!")
    print(f"\nOutput files:")
    print(f"   {result['output_files']['app_tsx']}")
    print(f"   {result['output_files']['home_tsx']}")
