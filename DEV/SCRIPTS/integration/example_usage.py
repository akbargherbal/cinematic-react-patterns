#!/usr/bin/env python3
"""
Example: Using integrate_modules with XML strings in Python.

This shows how to use the integrate_modules function directly
with a list of XML strings (not files).
"""

from integrate_modules import integrate_modules

# Your list of 48 XML strings
xml_strings = [
    """<?xml version="1.0" encoding="UTF-8"?>
<module>
  <module_name>Example Module 1</module_name>
  <slug>example-one</slug>
  <integration>
    <import><![CDATA[
import ExampleOne from "@modules/example-one";
    ]]></import>
    <route><![CDATA[
<Route
  path="/example-one"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-300"
    >
      <ExampleOne />
    </ModuleWrapper>
  }
/>
    ]]></route>
    <home_card><![CDATA[
{
  path: "/example-one",
  title: "Example One",
  subtitle: "Demo, 2024",
  concept: "Example Concept",
  icon: Star,
  colorClass: "text-blue-500",
  bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
}
    ]]></home_card>
  </integration>
</module>
""",
    # ... add your other 47 XML strings here
    """<?xml version="1.0" encoding="UTF-8"?>
<module>
  <module_name>Example Module 2</module_name>
  <slug>example-two</slug>
  <integration>
    <import><![CDATA[
import ExampleTwo from "@modules/example-two";
    ]]></import>
    <route><![CDATA[
<Route
  path="/example-two"
  element={
    <ModuleWrapper
      bgClass="bg-emerald-950"
      textClass="text-slate-200"
    >
      <ExampleTwo />
    </ModuleWrapper>
  }
/>
    ]]></route>
    <home_card><![CDATA[
{
  path: "/example-two",
  title: "Example Two",
  subtitle: "Another Demo, 2024",
  concept: "Another Concept",
  icon: Zap,
  colorClass: "text-emerald-500",
  bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
}
    ]]></home_card>
  </integration>
</module>
"""
]

# Run the integration
result = integrate_modules(
    xml_contents=xml_strings,
    current_app_tsx="../my-project/src/App.tsx",
    current_home_tsx="../my-project/src/modules/home/index.tsx",
    output_dir="./integrated-output"
)

# Check results
if result["success"]:
    print(f"\n✅ Success!")
    print(f"   Processed: {result['processed']} modules")
    print(f"   Skipped: {result['skipped']} modules")
    print(f"\n📂 Output files:")
    print(f"   {result['output_files']['app_tsx']}")
    print(f"   {result['output_files']['home_tsx']}")
else:
    print(f"\n❌ Failed with errors:")
    for error in result["errors"]:
        print(f"   - {error}")
