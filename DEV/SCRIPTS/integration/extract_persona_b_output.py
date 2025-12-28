#!/usr/bin/env python3
"""
Extract code and integration snippets from Persona B XML output.

Usage:
    # From file
    python extract_persona_b_output.py <input.xml> [--output-dir ./src]

    # From string in Python
    from extract_persona_b_output import main
    result = main(input_file=xml_string, path=False, output_dir='./EXPORT')

    # With pandas
    df['RESULT'].apply(lambda x: main(input_file=x, path=False, output_dir='./EXPORT'))
"""

import argparse
import xml.etree.ElementTree as ET
from pathlib import Path
import sys
from typing import Optional, Dict, Any


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

    return {"module_name": module_name.text.strip(), "slug": slug.text.strip()}


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

        files.append({"path": path, "content": content})

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


def write_files(files: list[dict], output_dir: Path, dry_run: bool = False) -> int:
    """Write extracted files to filesystem.

    Returns:
        Number of files written
    """
    count = 0
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
        count += 1

    return count


def write_integration_snippets(
    integration: dict, output_dir: Path, slug: str, dry_run: bool = False
) -> int:
    """Write integration snippets to separate files for easy reference.

    Returns:
        Number of snippets written
    """
    integration_dir = output_dir / "modules" / slug / "integration"

    if not integration:
        return 0

    if dry_run:
        print(f"📁 Would create integration snippets in: {integration_dir}")
        return 0

    integration_dir.mkdir(parents=True, exist_ok=True)

    count = 0
    for key, content in integration.items():
        snippet_path = integration_dir / f"{key}.txt"
        snippet_path.write_text(content, encoding="utf-8")
        print(f"✅ Integration snippet: {snippet_path}")
        count += 1

    return count


def write_plan(plan: str, output_dir: Path, slug: str, dry_run: bool = False) -> int:
    """Write implementation plan to file for reference.

    Returns:
        1 if plan written, 0 otherwise
    """
    if not plan:
        return 0

    plan_path = output_dir / "modules" / slug / "PLAN.md"

    if dry_run:
        print(f"📄 Would write plan: {plan_path}")
        return 0

    plan_path.parent.mkdir(parents=True, exist_ok=True)
    plan_path.write_text(plan, encoding="utf-8")
    print(f"✅ Plan written: {plan_path}")
    return 1


def print_summary(module_info: dict, files: list[dict], integration: dict):
    """Print extraction summary."""
    print("\n" + "=" * 60)
    print("📦 EXTRACTION SUMMARY")
    print("=" * 60)
    print(f"Module Name: {module_info['module_name']}")
    print(f"Slug: {module_info['slug']}")
    print(f"\nFiles extracted: {len(files)}")
    for file_info in files:
        print(f"  - {file_info['path']}")

    print(f"\nIntegration snippets: {len(integration)}")
    for key in integration.keys():
        print(f"  - {key}")
    print("=" * 60 + "\n")


def main(
    input_file: Optional[str] = None,
    output_dir: Optional[str] = None,
    path: bool = True,
    dry_run: bool = False,
    save_snippets: bool = False,
    save_plan: bool = False,
    **kwargs,
) -> Dict[str, Any]:
    """Extract code from Persona B XML output.

    Args:
        input_file: Either a file path (if path=True) or XML string (if path=False)
        output_dir: Output directory for extracted files (default: ./src)
        path: If True, treat input_file as file path; if False, treat as XML string
        dry_run: Show what would be extracted without writing files
        save_snippets: Save integration snippets to separate files
        save_plan: Save implementation plan to PLAN.md
        **kwargs: Additional arguments for future extensibility

    Returns:
        Dict containing:
            - success (bool): Whether extraction succeeded
            - files_written (int): Number of files written
            - output_dir (Path): Where files were written
            - module_info (dict): Extracted module information
            - errors (list): Any errors encountered

    Raises:
        FileNotFoundError: If path=True and input_file doesn't exist
        ValueError: If required arguments are missing

    Examples:
        # From file path
        result = main(input_file='response.xml', output_dir='./src')

        # From XML string
        xml_str = '<response>...</response>'
        result = main(input_file=xml_str, path=False, output_dir='./src')

        # With pandas DataFrame
        df['RESULT'].apply(lambda x: main(input_file=x, path=False, output_dir='./EXPORT'))
    """
    # Handle None/missing arguments
    if input_file is None:
        raise ValueError("input_file is required")

    if output_dir is None:
        output_dir = "./src"

    # Initialize result dictionary
    result = {
        "success": False,
        "files_written": 0,
        "output_dir": Path(output_dir),
        "module_info": {},
        "errors": [],
        "warnings": [],
    }

    try:
        # Read XML content based on path parameter
        if path:
            # Treat input_file as a file path
            input_path = Path(input_file)
            if not input_path.exists():
                raise FileNotFoundError(f"Input file not found: {input_path}")

            print(f"📖 Reading: {input_path}")
            xml_content = input_path.read_text(encoding="utf-8")
        else:
            # Treat input_file as XML string directly
            xml_content = input_file
            print("📖 Processing XML string")

        # Parse XML
        root = parse_xml(xml_content)

        # Extract components
        module_info = extract_module_info(root)
        plan = extract_plan(root)
        files = extract_files(root)
        integration = extract_integration(root)

        result["module_info"] = module_info
        result["files"] = files
        result["integration"] = integration
        result["plan"] = plan

        # Print summary
        print_summary(module_info, files, integration)

        if dry_run:
            print("🔍 DRY RUN - No files will be written\n")
            result["warnings"].append("Dry run mode - no files written")

        # Set output directory
        output_dir_path = Path(output_dir)

        # Write files
        files_written = write_files(files, output_dir_path, dry_run=dry_run)
        result["files_written"] += files_written

        # Write integration snippets if requested
        if save_snippets:
            snippets_written = write_integration_snippets(
                integration, output_dir_path, module_info["slug"], dry_run=dry_run
            )
            result["files_written"] += snippets_written

        # Write plan if requested
        if save_plan and plan:
            plan_written = write_plan(
                plan, output_dir_path, module_info["slug"], dry_run=dry_run
            )
            result["files_written"] += plan_written

        if not dry_run:
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

        result["success"] = True

    except FileNotFoundError as e:
        result["errors"].append(str(e))
        print(f"❌ {e}")
    except Exception as e:
        result["errors"].append(f"Unexpected error: {str(e)}")
        print(f"❌ Unexpected error: {e}")
        import traceback

        traceback.print_exc()

    return result


def parse_args(argv: Optional[list] = None) -> argparse.Namespace:
    """Parse command-line arguments.

    Args:
        argv: List of arguments to parse, or None to use sys.argv

    Returns:
        Parsed argument namespace
    """
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
        """,
    )

    parser.add_argument(
        "input_file", type=str, help="Path to XML file containing Persona B output"
    )

    parser.add_argument(
        "--output-dir",
        type=str,
        default="./src",
        help="Output directory for extracted files (default: ./src)",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be extracted without writing files",
    )

    parser.add_argument(
        "--save-snippets",
        action="store_true",
        help="Save integration snippets to separate files",
    )

    parser.add_argument(
        "--save-plan", action="store_true", help="Save implementation plan to PLAN.md"
    )

    return parser.parse_args(argv)


def cli_main(argv: Optional[list] = None) -> int:
    """Command-line interface entry point.

    Args:
        argv: List of arguments to parse, or None to use sys.argv

    Returns:
        Exit code (0 for success, 1 for failure)
    """
    args = parse_args(argv)

    result = main(
        input_file=args.input_file,
        output_dir=args.output_dir,
        path=True,  # CLI always uses file paths
        dry_run=args.dry_run,
        save_snippets=args.save_snippets,
        save_plan=args.save_plan,
    )

    return 0 if result["success"] else 1


if __name__ == "__main__":
    sys.exit(cli_main())
