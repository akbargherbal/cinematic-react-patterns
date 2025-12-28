import pandas as pd
import re
import xml.etree.ElementTree as ET

df = pd.read_pickle("./RESULTS.pkl")

def clean_xml_string(s: str) -> str:
    """Clean XML string by removing markdown fences and extracting XML content."""
    s = s.strip()
    s = re.sub(r'^```xml\s*\n', '', s, flags=re.MULTILINE)
    s = re.sub(r'^```\s*\n', '', s, flags=re.MULTILINE)
    s = re.sub(r'\n```\s*$', '', s, flags=re.MULTILINE)
    s = s.strip('`').strip()
    
    xml_start = s.find('<?xml')
    if xml_start > 0:
        s = s[xml_start:]
    
    xml_end = s.find('</module>')
    if xml_end > 0:
        s = s[:xml_end + len('</module>')]
    
    return s.strip()

df["RESULT"] = df["RESULT"].apply(clean_xml_string)

# Failed modules: 7, 9, 26 (0-indexed: 6, 8, 25)
failed_indices = [6, 8, 25]

print("=" * 60)
print("DIAGNOSING FAILED XML MODULES")
print("=" * 60)

for idx in failed_indices:
    xml = df["RESULT"].iloc[idx]
    
    print(f"\n{'=' * 60}")
    print(f"MODULE {idx + 1}")
    print('=' * 60)
    
    # Try to parse and see the exact error
    try:
        ET.fromstring(xml)
        print("✅ Parses successfully now!")
    except ET.ParseError as e:
        print(f"❌ Parse error: {e}")
        
        # Extract line and column
        error_match = re.search(r'line (\d+), column (\d+)', str(e))
        if error_match:
            error_line = int(error_match.group(1))
            error_col = int(error_match.group(2))
            
            # Show the problematic line
            lines = xml.split('\n')
            if error_line <= len(lines):
                print(f"\nProblematic line {error_line}:")
                print(f"  {lines[error_line - 1]}")
                print(f"  {' ' * (error_col - 1)}^ (column {error_col})")
                
                # Show context (line before and after)
                if error_line > 1:
                    print(f"\nLine {error_line - 1}: {lines[error_line - 2]}")
                print(f"Line {error_line}: {lines[error_line - 1]}")
                if error_line < len(lines):
                    print(f"Line {error_line + 1}: {lines[error_line]}")
    
    # Show first 500 characters for manual inspection
    print(f"\nFirst 500 characters:")
    print(xml[:500])
    print("\n...")
    
    # Check for common issues
    print("\nCommon issues check:")
    print(f"  - Contains unescaped '&': {bool(re.search(r'&(?!amp;|lt;|gt;|quot;|apos;)', xml))}")
    print(f"  - Contains '<' outside tags: {'< ' in xml or ' >' in xml}")
    # Check for smart quotes using character codes to avoid f-string conflicts
    has_smart_quotes = bool(re.search(r'[\u201C\u201D\u2018\u2019]', xml))
    print(f"  - Contains smart quotes: {has_smart_quotes}")

print("\n" + "=" * 60)
print("RECOMMENDED FIXES")
print("=" * 60)
print("""
1. If you see unescaped '&', replace with '&amp;'
2. If you see smart quotes ("" ''), replace with regular quotes
3. If you see '<' or '>' in text, ensure they're in CDATA sections
4. If it's in the slug/name, use only alphanumeric + hyphens

You can manually fix these 3 XMLs in your DataFrame and re-run.
""")