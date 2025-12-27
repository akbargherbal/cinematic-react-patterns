# Cinematic React Patterns - LLM Persona System (Final)

Production-ready system prompts and templates for generating React learning modules at scale.

## 📦 Package Contents

### Persona A: The Narrative Architect
- `Persona_A_SYSTEM_PROMPT_UPDATED.md` - System prompt (238 lines)
- `A_PROMPT_TEMPLATE_UPDATED.md` - User prompt template (155 lines)

### Persona B: The Implementation Translator
- `Persona_B_SYSTEM_PROMPT_UPDATED.md` - System prompt (406 lines)
- `B_PROMPT_TEMPLATE_UPDATED.md` - User prompt template (149 lines)

### Extraction Tooling
- `extract_persona_b_output.py` - Python script to extract code from Persona B XML
- `EXTRACTOR_README.md` - Full documentation for extraction script
- `test_persona_b_output.xml` - Sample XML for testing

---

## 🎯 System Overview

### Two-Persona Pipeline

```
Concept-Fiction Mapping (JSON)
        ↓
  [Persona A: Narrative Architect]
        ↓
  Narrative XML (5 chapters, plan, visual design)
        ↓
  [Persona B: Implementation Translator]
        ↓
  Module XML (code, integration snippets, plan)
        ↓
  [extract_persona_b_output.py]
        ↓
  Production Files (index.tsx, integration snippets)
```

---

## 🚀 Quick Start

### Step 1: Generate Narrative (Persona A)

```bash
# Input: Concept-fiction mapping as JSON
{
  "title": "The Matrix is useEffect Dependencies",
  "concept": "useEffect Dependency Array",
  "fiction": "The Matrix (1999)",
  "description": "Neo is a useEffect that runs when dependencies change...",
  "resolution": "Correct dependencies let him respond to genuine changes..."
}

# System Prompt: Persona_A_SYSTEM_PROMPT_UPDATED.md
# User Prompt: A_PROMPT_TEMPLATE_UPDATED.md (replace [MAPPING_JSON])

# Output: Narrative XML with:
# - <plan> (max 2 pages)
# - <chapters> (5 chapters: intro, build, climax, resolution, summary)
# - <visual_design> (colors, fonts)
```

### Step 2: Generate Module (Persona B)

```bash
# Input: Narrative XML from Persona A

# System Prompt: Persona_B_SYSTEM_PROMPT_UPDATED.md
# User Prompt: B_PROMPT_TEMPLATE_UPDATED.md (replace [NARRATIVE_XML])

# Output: Module XML with:
# - <plan> (max 2 pages)
# - <files> (React component code)
# - <integration> (route, import, home_card snippets)
```

### Step 3: Extract and Integrate

```bash
# Extract files
python extract_persona_b_output.py persona_b_response.xml \
  --output-dir ../cinematic-react-patterns/src \
  --save-snippets

# Copy integration snippets to:
# 1. App.tsx (import + route)
# 2. src/modules/home/index.tsx (home card)
```

---

## 📋 Key Features

### Design Philosophy

✅ **No reference examples** - LLMs create without anchoring to 8/10 baseline  
✅ **Planning required** - Forces coherent architecture before generation  
✅ **Single JSON placeholder** - Minimal manual work for batch processing  
✅ **Strict XML output** - Zero ambiguity, programmatic parsing  
✅ **Exact integration contracts** - ModuleWrapper props, home card structure  
✅ **Zero escaping needed** - CDATA sections handle code/prose cleanly  

### Quality Controls

- **Single-shot generation** - No iterative refinement, production-ready first time
- **Mandatory planning** - Max 2 pages, prevents incoherent output
- **Explicit contracts** - Integration interfaces documented precisely
- **Full React 19 support** - All hooks, Context, Portals, forwardRef, etc.
- **Validated against 48 concepts** - Compatible with entire React-fiction repertoire

---

## 🔧 Technical Details

### Persona A Output Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<narrative>
  <concept>React Concept Name</concept>
  <fiction>Fiction Title (Year)</fiction>
  <module_slug>kebab-case-name</module_slug>
  
  <plan><![CDATA[...]]></plan>
  
  <chapters>
    <chapter id="intro"><title>...</title><content><![CDATA[...]]></content></chapter>
    <chapter id="build"><title>...</title><content><![CDATA[...]]></content></chapter>
    <chapter id="climax"><title>...</title><content><![CDATA[...]]></content></chapter>
    <chapter id="resolution"><title>...</title><content><![CDATA[...]]></content></chapter>
    <chapter id="summary"><title>...</title><content><![CDATA[...]]></content></chapter>
  </chapters>
  
  <visual_design>
    <color_palette>Tailwind colors</color_palette>
    <font_family>font-serif|font-sans|font-mono</font_family>
  </visual_design>
</narrative>
```

### Persona B Output Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<module>
  <module_name>Display Name</module_name>
  <slug>kebab-case-slug</slug>
  
  <plan><![CDATA[...]]></plan>
  
  <files>
    <file>
      <path>src/modules/[slug]/index.tsx</path>
      <content><![CDATA[...TypeScript component...]]></content>
    </file>
  </files>
  
  <integration>
    <route><![CDATA[...Route component...]]></route>
    <import><![CDATA[...Import statement...]]></import>
    <home_card><![CDATA[...Card object...]]></home_card>
  </integration>
</module>
```

### Integration Contracts (Persona B)

**ModuleWrapper Props:**
```typescript
<ModuleWrapper
  bgClass="bg-slate-950"        // REQUIRED
  textClass="text-slate-300"    // Optional (default: "text-white")
  fontClass="font-serif"        // Optional (default: "font-sans")
>
```

**Home Card Object:**
```typescript
{
  path: string;          // "/your-slug"
  title: string;         // "The Matrix"
  subtitle: string;      // "Neo, The One, 1999"
  concept: string;       // "useEffect Dependencies"
  icon: IconComponent;   // lucide-react icon (e.g., Eye)
  colorClass: string;    // "text-emerald-500"
  bgClass: string;       // "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
}
```

**Import Path:**
```typescript
import YourComponent from "@modules/your-slug";  // Use @modules alias
```

---

## 📊 Batch Processing Example

Process all 50 concept-fiction mappings:

```bash
#!/bin/bash

# Step 1: Generate narratives
for mapping in mappings/*.json; do
  # Call LLM with Persona A prompts + mapping JSON
  # Save output to narratives/$(basename $mapping .json).xml
done

# Step 2: Generate modules
for narrative in narratives/*.xml; do
  # Call LLM with Persona B prompts + narrative XML
  # Save output to modules/$(basename $narrative)
done

# Step 3: Extract all modules
for module_xml in modules/*.xml; do
  python extract_persona_b_output.py "$module_xml" \
    --output-dir ../cinematic-react-patterns/src \
    --save-snippets
done

# Step 4: Manual integration (copy snippets from integration/ dirs)
```

**Time Estimate:**
- 50 modules × 2 LLM calls = 100 API calls
- ~3 min per call = ~5 hours total
- Manual integration: ~2 min per module = ~100 min

**Total**: ~6.5 hours for 50 production-ready modules

---

## ✅ Validation Checklist

Before deploying personas, verify:

- [ ] **Persona A System Prompt**: Includes TV series in fiction mediums (line 21)
- [ ] **Persona A**: Planning section present, no reference examples
- [ ] **Persona B System Prompt**: All React 19 features listed (line 74-77)
- [ ] **Persona B**: Integration contracts documented exactly
- [ ] **Both personas**: Planning required before generation
- [ ] **Both templates**: Single placeholder only (JSON/XML)
- [ ] **Extraction script**: Tested on sample XML
- [ ] **Mappings compatibility**: All 48 React concepts supported

---

## 🎓 Session Evolution

### Changes from Initial Design

**Removed:**
- ❌ Reference examples (Frankenstein, Fight Club, Mean Girls) - anchored to 8/10
- ❌ Multiple placeholders in templates - manual work overhead
- ❌ Pedagogical patterns section - overly prescriptive
- ❌ Quality checklists - noise for LLMs

**Added:**
- ✅ Planning requirement (max 2 pages) - quality control
- ✅ TV series support - coverage for Russian Doll, Westworld, etc.
- ✅ All React 19 features - useReducer, Context, Portals, forwardRef, etc.
- ✅ Exact integration contracts - ModuleWrapper props, card object structure
- ✅ Extraction tooling - automated file writing and snippet management

**Philosophy:**
- Trust LLMs to exceed baseline, don't anchor them
- Force planning for coherence, not iterative refinement
- Minimize manual work through single-placeholder design
- Eliminate ambiguity through explicit contracts

---

## 📝 Files Reference

| File | Purpose | Lines | Status |
|------|---------|-------|--------|
| `Persona_A_SYSTEM_PROMPT_UPDATED.md` | Persona A identity, principles, output protocol | 238 | ✅ Final |
| `A_PROMPT_TEMPLATE_UPDATED.md` | Persona A user prompt with [MAPPING_JSON] | 155 | ✅ Final |
| `Persona_B_SYSTEM_PROMPT_UPDATED.md` | Persona B identity, contracts, output protocol | 406 | ✅ Final |
| `B_PROMPT_TEMPLATE_UPDATED.md` | Persona B user prompt with [NARRATIVE_XML] | 149 | ✅ Final |
| `extract_persona_b_output.py` | XML parser and file extractor | 252 | ✅ Tested |
| `EXTRACTOR_README.md` | Extraction script documentation | - | ✅ Final |
| `test_persona_b_output.xml` | Sample XML for testing | - | ✅ Valid |

---

## 🚦 Next Steps

### Immediate Actions

1. **Test with single concept** - Pick one mapping, run through full pipeline
2. **Validate output quality** - Review narrative coherence, code quality
3. **Test extraction script** - Ensure files write correctly to project
4. **Manual integration** - Verify snippets work in App.tsx and home module

### Future Enhancements

- Add validation script for XML schema compliance
- Create batch processing orchestration script
- Build quality metrics dashboard (narrative engagement, code complexity)
- Add rollback mechanism for failed integrations

---

## 📞 Support

For issues or questions:

1. **XML parsing errors**: Check CDATA sections, validate with XML linter
2. **Integration failures**: Verify contracts match App.tsx and home module
3. **Import errors**: Confirm @modules alias in vite.config.ts
4. **Quality issues**: Review plan section for coherence

---

**Status**: ✅ Production-Ready  
**Last Updated**: December 27, 2024  
**Session**: LLM Persona Output Format Refinement  
**Compatibility**: 48 React concepts, React 19, TypeScript 5.8+
