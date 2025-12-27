#!/usr/bin/env python3
"""
Extract code and integration snippets from Persona B XML output.

Usage:
    python extract_persona_b_output.py <input.xml> [--output-dir ./src]
    python extract_persona_b_output.py persona_b_response.xml --output-dir ../cinematic-react-patterns/src
"""

import argparse
import xml.etree.ElementTree as ET
from pathlib import Path
import sys


def parse_xml(xml_content: str) -> ET.Element:
    """Parse XML string and return root element."""
    try:
        root = ET.fromstring(xml_content)
        return root
    except ET.ParseError as e:
        print(f"❌ XML parsing error: {e}")
        sys.exit(1)


def extract_module_info(root: ET.Element) -> dict:
    """Extract basic module information."""
    module_name = root.find("module_name")
    slug = root.find("slug")
    
    if module_name is None or slug is None:
        print("❌ Missing required fields: module_name or slug")
        sys.exit(1)
    
    return {
        "module_name": module_name.text.strip(),
        "slug": slug.text.strip()
    }


def extract_plan(root: ET.Element) -> str | None:
    """Extract implementation plan."""
    plan = root.find("plan")
    return plan.text.strip() if plan is not None and plan.text else None


def extract_files(root: ET.Element) -> list[dict]:
    """Extract file paths and contents."""
    files = []
    files_element = root.find("files")
    
    if files_element is None:
        print("❌ No <files> section found")
        return files
    
    for file_element in files_element.findall("file"):
        path_element = file_element.find("path")
        content_element = file_element.find("content")
        
        if path_element is None or content_element is None:
            print("⚠️  Skipping file entry with missing path or content")
            continue
        
        path = path_element.text.strip()
        content = content_element.text.strip() if content_element.text else ""
        
        files.append({
            "path": path,
            "content": content
        })
    
    return files


def extract_integration(root: ET.Element) -> dict:
    """Extract integration snippets."""
    integration_element = root.find("integration")
    
    if integration_element is None:
        print("⚠️  No <integration> section found")
        return {}
    
    integration = {}
    
    for key in ["route", "import", "home_card"]:
        element = integration_element.find(key)
        if element is not None and element.text:
            integration[key] = element.text.strip()
    
    return integration


def write_files(files: list[dict], output_dir: Path, dry_run: bool = False):
    """Write extracted files to filesystem."""
    for file_info in files:
        file_path = Path(file_info["path"])
        
        # Remove 'src/' prefix if output_dir already points to src
        if file_path.parts[0] == "src":
            file_path = Path(*file_path.parts[1:])
        
        full_path = output_dir / file_path
        
        if dry_run:
            print(f"📄 Would write: {full_path}")
            continue
        
        # Create parent directories
        full_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Write file
        full_path.write_text(file_info["content"], encoding="utf-8")
        print(f"✅ Written: {full_path}")


def write_integration_snippets(integration: dict, output_dir: Path, slug: str, dry_run: bool = False):
    """Write integration snippets to separate files for easy reference."""
    integration_dir = output_dir / "modules" / slug / "integration"
    
    if not integration:
        return
    
    if dry_run:
        print(f"📁 Would create integration snippets in: {integration_dir}")
        return
    
    integration_dir.mkdir(parents=True, exist_ok=True)
    
    for key, content in integration.items():
        snippet_path = integration_dir / f"{key}.txt"
        snippet_path.write_text(content, encoding="utf-8")
        print(f"✅ Integration snippet: {snippet_path}")


def write_plan(plan: str, output_dir: Path, slug: str, dry_run: bool = False):
    """Write implementation plan to file for reference."""
    if not plan:
        return
    
    plan_path = output_dir / "modules" / slug / "PLAN.md"
    
    if dry_run:
        print(f"📄 Would write plan: {plan_path}")
        return
    
    plan_path.parent.mkdir(parents=True, exist_ok=True)
    plan_path.write_text(plan, encoding="utf-8")
    print(f"✅ Plan written: {plan_path}")


def print_summary(module_info: dict, files: list[dict], integration: dict):
    """Print extraction summary."""
    print("\n" + "="*60)
    print("📦 EXTRACTION SUMMARY")
    print("="*60)
    print(f"Module Name: {module_info['module_name']}")
    print(f"Slug: {module_info['slug']}")
    print(f"\nFiles extracted: {len(files)}")
    for file_info in files:
        print(f"  - {file_info['path']}")
    
    print(f"\nIntegration snippets: {len(integration)}")
    for key in integration.keys():
        print(f"  - {key}")
    print("="*60 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description="Extract code from Persona B XML output",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Extract to current directory (dry run)
  python extract_persona_b_output.py response.xml --dry-run
  
  # Extract to project src directory
  python extract_persona_b_output.py response.xml --output-dir ../cinematic-react-patterns/src
  
  # Extract and save integration snippets
  python extract_persona_b_output.py response.xml --output-dir ./src --save-snippets
        """
    )
    
    parser.add_argument(
        "input_file",
        type=str,
        help="Path to XML file containing Persona B output"
    )
    
    parser.add_argument(
        "--output-dir",
        type=str,
        default="./src",
        help="Output directory for extracted files (default: ./src)"
    )
    
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be extracted without writing files"
    )
    
    parser.add_argument(
        "--save-snippets",
        action="store_true",
        help="Save integration snippets to separate files"
    )
    
    parser.add_argument(
        "--save-plan",
        action="store_true",
        help="Save implementation plan to PLAN.md"
    )
    
    args = parser.parse_args()
    
    # Read input file
    input_path = Path(args.input_file)
    if not input_path.exists():
        print(f"❌ Input file not found: {input_path}")
        sys.exit(1)
    
    xml_content = input_path.read_text(encoding="utf-8")
    
    # Parse XML
    print(f"📖 Reading: {input_path}")
    root = parse_xml(xml_content)
    
    # Extract components
    module_info = extract_module_info(root)
    plan = extract_plan(root)
    files = extract_files(root)
    integration = extract_integration(root)
    
    # Print summary
    print_summary(module_info, files, integration)
    
    if args.dry_run:
        print("🔍 DRY RUN - No files will be written\n")
    
    # Set output directory
    output_dir = Path(args.output_dir)
    
    # Write files
    write_files(files, output_dir, dry_run=args.dry_run)
    
    # Write integration snippets if requested
    if args.save_snippets:
        write_integration_snippets(integration, output_dir, module_info["slug"], dry_run=args.dry_run)
    
    # Write plan if requested
    if args.save_plan and plan:
        write_plan(plan, output_dir, module_info["slug"], dry_run=args.dry_run)
    
    if not args.dry_run:
        print("\n✨ Extraction complete!")
        print(f"\n📋 Next steps:")
        print(f"1. Add import to App.tsx:")
        if "import" in integration:
            print(f"   {integration['import']}")
        print(f"\n2. Add route to App.tsx:")
        if "route" in integration:
            print(f"   {integration['route']}")
        print(f"\n3. Add card to src/modules/home/index.tsx:")
        if "home_card" in integration:
            print(f"   {integration['home_card']}")
    else:
        print("\n💡 Run without --dry-run to write files")


if __name__ == "__main__":
    main()
