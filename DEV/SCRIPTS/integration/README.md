# Module Integration Script

Simple Python script that processes XML strings and outputs modified `App.tsx` and `home/index.tsx` files.

## The Problem It Solves

You have 48 XML strings (from LLM responses) containing React module integration snippets. You need to:
1. Add imports to `App.tsx`
2. Add routes to `App.tsx`  
3. Add icon imports to `home/index.tsx`
4. Add module cards to `home/index.tsx`

This script does all of that automatically.

## How It Works

```
Current App.tsx + Current home/index.tsx + 48 XML strings
                        ↓
            integrate_modules() function
                        ↓
    Modified App.tsx + Modified home/index.tsx
                        ↓
        You copy them to your project
```

## Usage

### As a Library (Recommended for Your Use Case)

```python
from integrate_modules import integrate_modules

# Your 48 XML strings
xml_strings = [xml1, xml2, xml3, ...]  # Python strings, not files

# Process them
result = integrate_modules(
    xml_contents=xml_strings,
    current_app_tsx="path/to/your/project/src/App.tsx",
    current_home_tsx="path/to/your/project/src/modules/home/index.tsx",
    output_dir="./output"
)

# Results
if result["success"]:
    print(f"✅ Processed {result['processed']} modules")
    # Copy files from ./output to your project
else:
    print("❌ Errors:", result["errors"])
```

### As CLI (If You Have XML Files)

```bash
python integrate_modules.py \
    --app-tsx ./src/App.tsx \
    --home-tsx ./src/modules/home/index.tsx \
    --output-dir ./output \
    module1.xml module2.xml module3.xml
```

## What It Does

### To App.tsx:
- Adds import after last module import
- Adds route before 404 fallback
- Preserves exact formatting

### To home/index.tsx:
- Adds icons to lucide-react import
- Adds module card objects to modules array
- Preserves exact formatting

### Duplicate Detection:
- Skips modules already in current files
- Skips duplicate modules in your XML list
- Safe to run multiple times

## Output

Creates two files in `output_dir`:
- `App.tsx` - Modified version ready to copy
- `home-index.tsx` - Modified version ready to copy

## Example Workflow

```python
# 1. Import the function
from integrate_modules import integrate_modules

# 2. Load your XML strings (you probably already have these)
xml_list = [...]  # Your 48 XML strings

# 3. Run integration
result = integrate_modules(
    xml_contents=xml_list,
    current_app_tsx="/path/to/project/src/App.tsx",
    current_home_tsx="/path/to/project/src/modules/home/index.tsx", 
    output_dir="./integrated"
)

# 4. Check results
print(f"Processed: {result['processed']}")
print(f"Skipped: {result['skipped']}")
print(f"Errors: {len(result['errors'])}")

# 5. Copy the output files to your project
#    cp ./integrated/App.tsx /path/to/project/src/
#    cp ./integrated/home-index.tsx /path/to/project/src/modules/home/index.tsx
```

## Result Object

```python
{
    "success": True/False,
    "total_modules": 48,
    "processed": 42,        # Successfully added
    "skipped": 6,           # Duplicates or errors
    "errors": [],           # List of error messages
    "modules": [            # Details for each module
        {
            "index": 1,
            "component": "MatrixDependencies",
            "icon": "Zap",
            "path": "/matrix-dependencies",
            "status": "processed"
        },
        ...
    ],
    "output_files": {
        "app_tsx": "/path/to/output/App.tsx",
        "home_tsx": "/path/to/output/home-index.tsx"
    }
}
```

## Error Handling

**Graceful handling:**
- Skips modules with missing integration sections
- Skips modules with missing required fields
- Skips duplicate modules
- Continues processing even if one module fails
- Reports all errors at the end

**You get:**
- Count of successful vs failed modules
- List of what went wrong
- Modified files only if at least one module succeeded

## Key Features

✅ **Works with Python strings** (not files)  
✅ **Batch processes all modules at once**  
✅ **Detects duplicates** (won't add twice)  
✅ **Run from anywhere** (doesn't need to be in project dir)  
✅ **Preserves formatting** (your code style stays intact)  
✅ **Detailed results** (know exactly what happened)

## See Also

- `example_usage.py` - Shows how to use with Python strings
- Original `extract_persona_b_output.py` - For extracting module files from XML
