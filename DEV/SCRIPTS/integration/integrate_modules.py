#!/usr/bin/env python3
"""
Integrate LLM-generated React modules by processing XML strings.

Reads current App.tsx and home/index.tsx, applies all module integrations,
and outputs modified files to a specified directory.

Usage as a library:
    from integrate_modules import integrate_modules
    
    xml_strings = [xml1, xml2, xml3, ...]  # Your list of XML strings
    
    result = integrate_modules(
        xml_contents=xml_strings,
        current_app_tsx="path/to/current/src/App.tsx",
        current_home_tsx="path/to/current/src/modules/home/index.tsx",
        output_dir="./output"
    )

Usage as CLI:
    python integrate_modules.py \\
        --app-tsx ./src/App.tsx \\
        --home-tsx ./src/modules/home/index.tsx \\
        --output-dir ./output \\
        response1.xml response2.xml response3.xml
"""

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple


def parse_xml_string(xml_content: str) -> ET.Element:
    """Parse XML string and return root element."""
    try:
        return ET.fromstring(xml_content)
    except ET.ParseError as e:
        raise ValueError(f"XML parsing error: {e}")


def extract_integration_from_xml(xml_content: str) -> Dict[str, str]:
    """Extract integration snippets from XML string.
    
    Returns dict with keys: import, route, home_card
    """
    root = parse_xml_string(xml_content)
    integration_element = root.find("integration")
    
    if integration_element is None:
        return {}
    
    integration = {}
    for key in ["route", "import", "home_card"]:
        element = integration_element.find(key)
        if element is not None and element.text:
            integration[key] = element.text.strip()
    
    return integration


def extract_icon_from_home_card(home_card_code: str) -> Optional[str]:
    """Extract icon name from home_card object."""
    match = re.search(r'icon:\s*(\w+)', home_card_code)
    return match.group(1) if match else None


def extract_component_name(import_statement: str) -> Optional[str]:
    """Extract component name from import statement."""
    match = re.search(r'import\s+(\w+)\s+from', import_statement)
    return match.group(1) if match else None


def extract_path_from_route(route_code: str) -> Optional[str]:
    """Extract path from route definition."""
    match = re.search(r'path="([^"]+)"', route_code)
    return match.group(1) if match else None


def extract_path_from_home_card(home_card_code: str) -> Optional[str]:
    """Extract path from home_card object."""
    match = re.search(r'path:\s*["\']([^"\']+)["\']', home_card_code)
    return match.group(1) if match else None


def add_imports_to_app_tsx(content: str, imports: List[str]) -> str:
    """Add multiple import statements to App.tsx after last module import."""
    # Find position after last module import
    module_import_pattern = r'import\s+\w+\s+from\s+["\']@modules/[^"\']+["\'];?\s*\n'
    matches = list(re.finditer(module_import_pattern, content))
    
    if not matches:
        # Fallback: after "// Import modules" comment
        modules_comment = content.find("// Import modules")
        if modules_comment != -1:
            pos = content.find("\n", modules_comment) + 1
        else:
            # Fallback: after react-router-dom import
            pos = content.find('} from "react-router-dom";')
            if pos != -1:
                pos = content.find("\n", pos) + 1
            else:
                return content
    else:
        pos = matches[-1].end()
    
    # Prepare imports
    import_lines = []
    for imp in imports:
        imp_line = imp.strip()
        if not imp_line.endswith(';'):
            imp_line += ';'
        import_lines.append(imp_line)
    
    imports_block = '\n'.join(import_lines) + '\n'
    
    return content[:pos] + imports_block + content[pos:]


def add_routes_to_app_tsx(content: str, routes: List[str]) -> str:
    """Add multiple route definitions to App.tsx before 404 fallback."""
    # Find 404 fallback position
    fallback_comment = content.find("{/* 404 Fallback */}")
    if fallback_comment == -1:
        fallback_route = content.find('path="*"')
        if fallback_route != -1:
            fallback_comment = content.rfind("<Route", 0, fallback_route)
    
    if fallback_comment == -1:
        return content
    
    # Prepare routes with proper indentation
    routes_block = ""
    for route in routes:
        route_lines = route.strip().split('\n')
        indented_route = '\n'.join('        ' + line if line.strip() else ''
                                    for line in route_lines)
        routes_block += '\n' + indented_route + '\n'
    
    routes_block += '\n'
    
    return content[:fallback_comment] + routes_block + content[fallback_comment:]


def add_icons_to_home_tsx(content: str, icons: List[str]) -> str:
    """Add multiple icons to lucide-react imports in home/index.tsx."""
    import_pattern = r'import\s+\{([^}]+)\}\s+from\s+["\']lucide-react["\'];?'
    match = re.search(import_pattern, content)
    
    if not match:
        return content
    
    existing_imports = match.group(1)
    
    # Get list of currently imported icons
    current_icons = set(icon.strip() for icon in existing_imports.split(','))
    
    # Add new icons that don't exist
    new_icons = [icon for icon in icons if icon not in current_icons]
    
    if not new_icons:
        return content
    
    # Create new import line
    all_imports = existing_imports.rstrip() + ', ' + ', '.join(new_icons)
    new_import_line = f'import {{ {all_imports} }} from "lucide-react";'
    
    return content[:match.start()] + new_import_line + content[match.end():]


def add_modules_to_home_tsx(content: str, module_cards: List[str]) -> str:
    """Add multiple module objects to modules array in home/index.tsx."""
    modules_array_pattern = r'const modules: Module\[\] = \[(.*?)\];'
    match = re.search(modules_array_pattern, content, re.DOTALL)
    
    if not match:
        return content
    
    array_content = match.group(1)
    array_start = match.start(1)
    array_end = match.end(1)
    
    # Build new array content
    new_array_content = array_content.rstrip()
    
    for card in module_cards:
        card_lines = card.strip().split('\n')
        indented_card = '\n'.join('  ' + line if line.strip() else ''
                                   for line in card_lines)
        new_array_content += ',\n\n' + indented_card
    
    new_array_content += '\n'
    
    return content[:array_start] + new_array_content + content[array_end:]


def integrate_modules(
    xml_contents: List[str],
    current_app_tsx: str,
    current_home_tsx: str,
    output_dir: str,
) -> Dict[str, Any]:
    """Integrate multiple modules from XML strings.
    
    Args:
        xml_contents: List of XML strings containing integration snippets
        current_app_tsx: Path to current App.tsx file
        current_home_tsx: Path to current home/index.tsx file
        output_dir: Directory where modified files will be written
        
    Returns:
        Dict containing operation results
    """
    result = {
        "success": False,
        "total_modules": len(xml_contents),
        "processed": 0,
        "skipped": 0,
        "errors": [],
        "modules": []
    }
    
    # Read current files
    try:
        app_path = Path(current_app_tsx)
        home_path = Path(current_home_tsx)
        
        if not app_path.exists():
            result["errors"].append(f"App.tsx not found: {current_app_tsx}")
            return result
        
        if not home_path.exists():
            result["errors"].append(f"home/index.tsx not found: {current_home_tsx}")
            return result
        
        print(f"📖 Reading current files...")
        print(f"   App.tsx: {app_path}")
        print(f"   home/index.tsx: {home_path}")
        
        app_content = app_path.read_text(encoding="utf-8")
        home_content = home_path.read_text(encoding="utf-8")
        
    except Exception as e:
        result["errors"].append(f"Error reading files: {e}")
        return result
    
    # Collect all integrations
    all_imports = []
    all_routes = []
    all_icons = []
    all_cards = []
    
    print(f"\n🔍 Processing {len(xml_contents)} XML strings...")
    print("=" * 60)
    
    for i, xml_content in enumerate(xml_contents, 1):
        try:
            integration = extract_integration_from_xml(xml_content)
            
            if not integration:
                result["skipped"] += 1
                result["modules"].append({
                    "index": i,
                    "status": "skipped",
                    "reason": "No integration section found"
                })
                print(f"[{i}/{len(xml_contents)}] ⏭️  Skipped - no integration section")
                continue
            
            # Validate required fields
            if not all(k in integration for k in ["import", "route", "home_card"]):
                result["skipped"] += 1
                result["modules"].append({
                    "index": i,
                    "status": "skipped",
                    "reason": "Missing required fields"
                })
                print(f"[{i}/{len(xml_contents)}] ⏭️  Skipped - missing fields")
                continue
            
            # Extract metadata
            component_name = extract_component_name(integration["import"])
            route_path = extract_path_from_route(integration["route"])
            card_path = extract_path_from_home_card(integration["home_card"])
            icon_name = extract_icon_from_home_card(integration["home_card"])
            
            if not component_name:
                result["skipped"] += 1
                result["modules"].append({
                    "index": i,
                    "status": "skipped",
                    "reason": "Could not extract component name"
                })
                print(f"[{i}/{len(xml_contents)}] ⏭️  Skipped - no component name")
                continue
            
            # Check for duplicates in current files
            is_duplicate = False
            
            # Check if already in current files
            if component_name in app_content and route_path and f'path="{route_path}"' in app_content:
                is_duplicate = True
            
            if card_path and (f'path: "{card_path}"' in home_content or f"path: '{card_path}'" in home_content):
                is_duplicate = True
            
            # Check if already in our pending additions
            if route_path and any(f'path="{route_path}"' in r for r in all_routes):
                is_duplicate = True
            
            if is_duplicate:
                result["skipped"] += 1
                result["modules"].append({
                    "index": i,
                    "component": component_name,
                    "status": "skipped",
                    "reason": "Already exists"
                })
                print(f"[{i}/{len(xml_contents)}] ⏭️  {component_name} - already exists")
                continue
            
            # Add to collections
            all_imports.append(integration["import"])
            all_routes.append(integration["route"])
            all_cards.append(integration["home_card"])
            if icon_name:
                all_icons.append(icon_name)
            
            result["processed"] += 1
            result["modules"].append({
                "index": i,
                "component": component_name,
                "icon": icon_name,
                "path": route_path,
                "status": "processed"
            })
            print(f"[{i}/{len(xml_contents)}] ✅ {component_name} (icon: {icon_name}, path: {route_path})")
            
        except Exception as e:
            result["errors"].append(f"Module {i}: {str(e)}")
            result["modules"].append({
                "index": i,
                "status": "error",
                "error": str(e)
            })
            print(f"[{i}/{len(xml_contents)}] ❌ Error: {e}")
    
    print("=" * 60)
    
    if result["processed"] == 0:
        print("\n⚠️  No new modules to integrate")
        result["success"] = True
        return result
    
    # Apply all changes
    print(f"\n🔧 Applying {result['processed']} integrations...")
    
    try:
        # Modify App.tsx
        if all_imports:
            app_content = add_imports_to_app_tsx(app_content, all_imports)
            print(f"   ✅ Added {len(all_imports)} imports to App.tsx")
        
        if all_routes:
            app_content = add_routes_to_app_tsx(app_content, all_routes)
            print(f"   ✅ Added {len(all_routes)} routes to App.tsx")
        
        # Modify home/index.tsx
        if all_icons:
            home_content = add_icons_to_home_tsx(home_content, all_icons)
            print(f"   ✅ Added {len(set(all_icons))} icons to home/index.tsx")
        
        if all_cards:
            home_content = add_modules_to_home_tsx(home_content, all_cards)
            print(f"   ✅ Added {len(all_cards)} module cards to home/index.tsx")
        
        # Write output files
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        app_output = output_path / "App.tsx"
        home_output = output_path / "home-index.tsx"
        
        app_output.write_text(app_content, encoding="utf-8")
        home_output.write_text(home_content, encoding="utf-8")
        
        print(f"\n✨ Files written to {output_dir}:")
        print(f"   📄 App.tsx")
        print(f"   📄 home-index.tsx")
        print(f"\n📋 Next steps:")
        print(f"   1. Copy {app_output} to your project's src/App.tsx")
        print(f"   2. Copy {home_output} to your project's src/modules/home/index.tsx")
        
        result["success"] = True
        result["output_files"] = {
            "app_tsx": str(app_output),
            "home_tsx": str(home_output)
        }
        
    except Exception as e:
        result["errors"].append(f"Error writing files: {e}")
        return result
    
    return result


def main():
    parser = argparse.ArgumentParser(
        description="Integrate modules from XML files",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example:
  python integrate_modules.py \\
      --app-tsx ./src/App.tsx \\
      --home-tsx ./src/modules/home/index.tsx \\
      --output-dir ./output \\
      module1.xml module2.xml module3.xml
        """
    )
    
    parser.add_argument(
        "xml_files",
        nargs="+",
        help="XML files containing integration snippets"
    )
    
    parser.add_argument(
        "--app-tsx",
        required=True,
        help="Path to current App.tsx"
    )
    
    parser.add_argument(
        "--home-tsx",
        required=True,
        help="Path to current home/index.tsx"
    )
    
    parser.add_argument(
        "--output-dir",
        default="./output",
        help="Output directory for modified files (default: ./output)"
    )
    
    args = parser.parse_args()
    
    # Read XML files
    xml_contents = []
    for xml_file in args.xml_files:
        try:
            xml_contents.append(Path(xml_file).read_text(encoding="utf-8"))
        except Exception as e:
            print(f"❌ Error reading {xml_file}: {e}")
            return 1
    
    result = integrate_modules(
        xml_contents=xml_contents,
        current_app_tsx=args.app_tsx,
        current_home_tsx=args.home_tsx,
        output_dir=args.output_dir
    )
    
    # Print summary
    print("\n" + "=" * 60)
    print("📊 INTEGRATION SUMMARY")
    print("=" * 60)
    print(f"Total XML inputs:     {result['total_modules']}")
    print(f"Successfully added:   {result['processed']}")
    print(f"Skipped (duplicates): {result['skipped']}")
    print(f"Errors:               {len(result['errors'])}")
    print("=" * 60)
    
    if result["errors"]:
        print("\n❌ Errors:")
        for error in result["errors"]:
            print(f"   - {error}")
    
    return 0 if result["success"] else 1


if __name__ == "__main__":
    sys.exit(main())
