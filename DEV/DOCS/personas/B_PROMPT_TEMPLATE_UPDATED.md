# The Implementation Translator - Prompt Template

## Your Task

You are receiving a **narrative document** (XML format) that teaches a React concept through fiction. Your job is to transform this narrative into a **production-ready React module** that integrates seamlessly into the existing codebase.

---

## Input: Narrative XML

```xml
[NARRATIVE_XML]
```

---

## Your Deliverable

Create a **complete React module** with:

### 1. High-Level Implementation Plan

Before writing code, create a **concise plan** (maximum 2 pages) that:

- Maps narrative chapters to UI sections
- Identifies interactive demonstrations needed for the React concept
- Plans state management approach
- Outlines visual design implementation
- Ensures component architecture is sound

**Remember**: The plan is an architectural sketch, not pseudo-code. Save the implementation for the actual component.

### 2. Main Component File

**Path**: `src/modules/[slug]/index.tsx`

Must include:
- TypeScript imports and type definitions
- Functional component with hooks
- Chapter-based navigation (5 chapters from narrative)
- Interactive demonstrations of the React concept
- Tailwind CSS styling matching the visual design from narrative
- Default export

### 3. Integration Instructions

Provide exact snippets for:
- Import statement for `App.tsx`
- Route definition for `App.tsx`
- Home page card object for `src/modules/home/index.tsx`

---

## Quality Requirements

Your module must:

✓ Teach the React concept through interactive demonstrations
✓ Preserve the narrative's metaphorical teaching power
✓ Follow the exact integration contracts (ModuleWrapper props, home card structure)
✓ Use only available dependencies (React 19, lucide-react, Tailwind)
✓ Be production-ready with no TODOs or placeholders
✓ Be fully responsive (320px - 1440px+)

---

## Output Format

**YOU MUST OUTPUT ONLY VALID XML. NO PREAMBLE. NO EXPLANATION.**

Follow this exact structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<module>
  <module_name>Display Name</module_name>
  <slug>kebab-case-slug</slug>
  
  <plan><![CDATA[
High-level implementation plan.
Maximum 2 pages.

Example structure:
- Component architecture: chapter state, navigation, demo sections
- State management: useState for chapter, useEffect for animations
- Visual design: colors from narrative, layout approach
- Interactive demonstrations: [specific React concept demos]
- Responsive strategy: mobile-first, breakpoints
  ]]></plan>
  
  <files>
    <file>
      <path>src/modules/[slug]/index.tsx</path>
      <content><![CDATA[
// Complete React component code
// Production-ready TypeScript
// No TODOs, no placeholders
      ]]></content>
    </file>
  </files>
  
  <integration>
    <route><![CDATA[
<Route
  path="/slug"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-300"
      fontClass="font-serif"
    >
      <ModuleName />
    </ModuleWrapper>
  }
/>
    ]]></route>
    
    <import><![CDATA[
import ModuleName from "@modules/slug";
    ]]></import>
    
    <home_card><![CDATA[
{
  path: "/slug",
  title: "Fiction Title",
  subtitle: "Character/Setting, Year",
  concept: "React Concept Name",
  icon: IconName,
  colorClass: "text-color-500",
  bgClass: "bg-color-950/20 border-color-500/30 hover:border-color-500"
}
    ]]></home_card>
  </integration>
</module>
```

**Remember**: 
- Include the `<plan>` section first (maximum 2 pages)
- All code in CDATA sections
- Integration snippets must be copy-paste ready
- Use exact values (not placeholders) in integration snippets
- No text outside XML tags

---

## Begin Generation

Using the narrative XML provided above, generate the module XML now.
