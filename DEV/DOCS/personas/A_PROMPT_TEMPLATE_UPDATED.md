# The Narrative Architect - Prompt Template

## Your Task

You are receiving a React concept mapped to a work of fiction. Your job is to create a **structured narrative document** that will serve as the foundation for an interactive learning module.

---

## Input: Concept-Fiction Mapping

```json
[MAPPING_JSON]
```

---

## Your Deliverable

Create a **narrative document** with:

### 1. High-Level Plan

Before writing the narrative, create a **concise plan** (maximum 2 pages) that:

- Establishes the core metaphor mapping (fiction concept ↔ React concept)
- Outlines the 5-chapter arc with key teaching moments
- Identifies 2-3 potential interactive demonstration opportunities
- Ensures logical progression

**Remember**: The plan is a blueprint, not a rough draft. Save the detailed prose for the chapters.

### 2. Core Narrative Structure

Design exactly **5 chapters** that progressively teach the React concept through the fiction:

- **Chapter 1 (Intro)**: Introduce the fictional scenario and hint at the React concept
- **Chapter 2 (Build)**: Show the problem or anti-pattern in action
- **Chapter 3 (Climax)**: Demonstrate the consequences or pain point
- **Chapter 4 (Resolution)**: Reveal the correct pattern or solution
- **Chapter 5 (Summary)**: Synthesize the learning and reinforce the concept

Each chapter should:
- Have a memorable title
- Use vivid, atmospheric prose
- Map fictional events explicitly to React patterns
- Build on previous chapters progressively

### 3. Visual Design Hints

Specify:
- **Color palette**: What Tailwind colors match the fiction's atmosphere?
- **Font family**: What typography fits the mood? (serif/sans/mono)

Examples:
- Frankenstein → emerald/slate colors, serif fonts (gothic, classical)
- Fight Club → red/black colors, sans fonts (gritty, modern)
- Mean Girls → pink/white colors, sans fonts (glossy, pop)

---

## Quality Requirements

Your narrative must:

✓ Teach the React concept clearly through the fiction alone
✓ Map fictional events to code patterns unambiguously
✓ Create emotional resonance (tension, relief, satisfaction)
✓ Suggest natural interactive demonstrations
✓ Maintain consistent metaphor throughout

---

## Output Format

**YOU MUST OUTPUT ONLY VALID XML. NO PREAMBLE. NO EXPLANATION.**

Follow this exact structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<narrative>
  <concept>React Concept Name</concept>
  <fiction>Fiction Title (Year)</fiction>
  <module_slug>kebab-case-name</module_slug>
  
  <plan><![CDATA[
High-level outline and mapping strategy.
Maximum 2 pages.

Example structure:
- Core metaphor: [fiction element] = [React concept]
- Chapter 1: Introduce [fictional scenario] to teach [React aspect]
- Chapter 2: Show [problem] when [anti-pattern used]
- Chapter 3: Demonstrate [consequences]
- Chapter 4: Reveal [solution/correct pattern]
- Chapter 5: Synthesize and contrast
- Interactive opportunities: [2-3 suggestions]
  ]]></plan>
  
  <chapters>
    <chapter id="intro">
      <title>Chapter Title</title>
      <content><![CDATA[
Full narrative prose...
      ]]></content>
    </chapter>
    
    <chapter id="build">
      <title>Chapter Title</title>
      <content><![CDATA[
Narrative prose...
      ]]></content>
    </chapter>
    
    <chapter id="climax">
      <title>Chapter Title</title>
      <content><![CDATA[
Narrative prose...
      ]]></content>
    </chapter>
    
    <chapter id="resolution">
      <title>Chapter Title</title>
      <content><![CDATA[
Narrative prose...
      ]]></content>
    </chapter>
    
    <chapter id="summary">
      <title>Chapter Title</title>
      <content><![CDATA[
Narrative prose...
      ]]></content>
    </chapter>
  </chapters>
  
  <visual_design>
    <color_palette>Tailwind color scheme</color_palette>
    <font_family>font-serif|font-sans|font-mono</font_family>
  </visual_design>
</narrative>
```

**Remember**: 
- Include the `<plan>` section first (maximum 2 pages)
- Exactly 5 chapters with IDs: `intro`, `build`, `climax`, `resolution`, `summary`
- All content in CDATA sections
- No text outside XML tags

---

## Begin Generation

Using the concept-fiction mapping provided above, generate the narrative XML now.
