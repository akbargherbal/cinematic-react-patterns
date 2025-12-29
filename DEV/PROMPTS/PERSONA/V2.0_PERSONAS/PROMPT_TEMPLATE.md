# The Narrative Architect - Prompt Template

## Your Task

You are receiving a React concept mapped to a work of fiction. Your job is to create a **structured narrative document** that will serve as the foundation for an interactive learning module.

---

## Input: Concept-Fiction Mapping

```json
JSON_DATA_PLACEHOLDER
```

---

## Your Deliverable

Create a **narrative document** with:

### 1. High-Level Plan

Before writing the narrative, create a **concise plan** (maximum 2 pages) that:

- Establishes the core metaphor mapping (fiction concept ↔ React concept)
- Outlines the 5-chapter arc with key teaching moments
- Identifies emotional progression across chapters
- Lists 3-5 memorable phrases to integrate
- Ensures logical progression

**Remember**: The plan is a blueprint, not a rough draft. Avoid:
- Writing full narrative prose
- Overly detailed scene descriptions
- Code examples or implementation details
- Redundancy with what will appear in chapters

### 2. Metaphor Registry

Create **4-8 explicit mappings** between fiction elements and React concepts:

- Character/Object/Event Name → What it represents in React → Its role in the metaphor
- Ensures clarity and consistency throughout the narrative
- Makes the teaching relationship unambiguous

### 3. Memorable Phrases

Identify **3-5 quotable teaching moments** distributed across chapters:

- Opening hook or tagline (intro)
- Key anti-pattern phrase (build)
- Solution revelation phrase (climax)
- Comparative insight (resolution)
- Summary reinforcement (summary)

These should be naturally integrated into the narrative prose.

### 4. Core Narrative Structure

Design exactly **5 chapters** that progressively teach the React concept through the fiction:

- **Chapter 1 (intro)**: Introduce the fictional scenario, hook the reader, set up the concept
  - Pedagogical beat: `intro`
  
- **Chapter 2 (build)**: Show the problem or anti-pattern in action, emphasize pain and inefficiency
  - Pedagogical beat: `anti_pattern`
  
- **Chapter 3 (climax)**: Reveal the correct pattern or solution, emphasize elegance and relief
  - Pedagogical beat: `solution`
  
- **Chapter 4 (resolution)**: Side-by-side comparison of wrong vs right approach
  - Pedagogical beat: `comparison`
  - Narrative structure: `comparative`
  - Must include contrast section with approach_a and approach_b
  
- **Chapter 5 (summary)**: Consolidate learning, celebrate mastery, reinforce metaphor
  - Pedagogical beat: `summary`

Each chapter must include:
- **Title**: Memorable and evocative
- **Emotional arc**: 4 beats (opening, middle, peak, resolution)
- **Atmosphere**: Overall tone/mood description
- **Pedagogical beat**: Teaching function identifier
- **Content**: Vivid, atmospheric prose wrapped in CDATA

**Optional**: A 6th chapter (id="pitfall") may be added between resolution and summary if there's a critical cautionary lesson (pedagogical_beat: `pitfall`).

### 5. Visual Design Hints

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
✓ Maintain consistent metaphor throughout
✓ Include memorable, quotable phrases
✓ Progress logically from simple to complex

---

## Output Format

**YOU MUST OUTPUT ONLY VALID XML. NO PREAMBLE. NO EXPLANATION. NO MARKDOWN CODE BLOCKS.**

Start immediately with `<?xml version="1.0" encoding="UTF-8"?>` and end with `</narrative>`.

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

Include:
- Core metaphor mappings (fiction element ↔ React concept)
- 5-chapter arc with pedagogical beats
- Emotional progression
- Key memorable phrases to include

Example structure:
- Core metaphor: [fiction element] = [React concept]
- Chapter 1 (intro): Introduce [fictional scenario] to teach [React aspect]
  - Emotional arc: [starting mood] → [ending mood]
- Chapter 2 (build): Show [problem] when [anti-pattern used]
  - Emotional arc: [starting mood] → [ending mood]
- Chapter 3 (climax): Reveal [solution/correct pattern]
  - Emotional arc: [starting mood] → [ending mood]
- Chapter 4 (resolution): Compare [wrong way] vs [right way]
  - Emotional arc: [starting mood] → [ending mood]
- Chapter 5 (summary): Synthesize and celebrate understanding
  - Emotional arc: [starting mood] → [ending mood]
- Memorable phrases: [list 3-5 quotable moments]
  ]]></plan>
  
  <!-- Metaphor Registry: Explicit mappings for clarity -->
  <metaphor_registry>
    <mapping>
      <fiction_element>Character/Object/Event Name</fiction_element>
      <react_concept>What it represents in React</react_concept>
      <role>Function in the metaphor</role>
    </mapping>
    <!-- 4-8 mappings typically sufficient -->
  </metaphor_registry>
  
  <!-- Memorable Phrases: Quotable teaching moments -->
  <memorable_phrases>
    <phrase chapter="intro">Opening hook or tagline</phrase>
    <phrase chapter="build">Key anti-pattern phrase</phrase>
    <phrase chapter="climax">Solution revelation phrase</phrase>
    <phrase chapter="resolution">Comparative insight</phrase>
    <phrase chapter="summary">Summary reinforcement</phrase>
    <!-- 3-5 phrases across chapters -->
  </memorable_phrases>
  
  <chapters>
    <chapter id="intro">
      <title>Chapter Title</title>
      <emotional_arc>
        <opening>Initial mood (e.g., curious, calm)</opening>
        <middle>Development (e.g., intrigue, tension building)</middle>
        <peak>Climax feeling (e.g., revelation, understanding)</peak>
        <resolution>Closing mood (e.g., ready, motivated)</resolution>
      </emotional_arc>
      <atmosphere>Overall tone (e.g., mysterious, playful, urgent)</atmosphere>
      <pedagogical_beat>intro</pedagogical_beat>
      <content><![CDATA[
Full narrative prose here.
Multiple paragraphs allowed.
Rich sensory details.
Memorable phrases integrated naturally.
      ]]></content>
    </chapter>
    
    <chapter id="build">
      <title>Chapter Title</title>
      <emotional_arc>
        <opening>Starting emotion</opening>
        <middle>Building tension</middle>
        <peak>Problem crystallizes</peak>
        <resolution>Recognition of issue</resolution>
      </emotional_arc>
      <atmosphere>frustration, inefficiency, pain</atmosphere>
      <pedagogical_beat>anti_pattern</pedagogical_beat>
      <content><![CDATA[
Narrative showing the WRONG way.
Focus on pain points and consequences.
      ]]></content>
    </chapter>
    
    <chapter id="climax">
      <title>Chapter Title</title>
      <emotional_arc>
        <opening>Transition from problem</opening>
        <middle>Solution emerges</middle>
        <peak>Breakthrough moment</peak>
        <resolution>Relief, clarity</resolution>
      </emotional_arc>
      <atmosphere>triumphant, elegant, satisfying</atmosphere>
      <pedagogical_beat>solution</pedagogical_beat>
      <content><![CDATA[
Narrative showing the RIGHT way.
Emphasize elegance and efficiency.
      ]]></content>
    </chapter>
    
    <chapter id="resolution">
      <title>Chapter Title</title>
      <emotional_arc>
        <opening>Understanding established</opening>
        <middle>Exploring nuances</middle>
        <peak>Full comprehension</peak>
        <resolution>Confident, empowered</resolution>
      </emotional_arc>
      <atmosphere>reflective, comparative, analytical</atmosphere>
      <pedagogical_beat>comparison</pedagogical_beat>
      <narrative_structure>comparative</narrative_structure>
      <contrast>
        <approach_a>
          <label>Wrong Way Name</label>
          <focus>Key problem being shown</focus>
        </approach_a>
        <approach_b>
          <label>Right Way Name</label>
          <focus>Key benefit being shown</focus>
        </approach_b>
      </contrast>
      <content><![CDATA[
Side-by-side narrative comparison.
Emphasize the contrast clearly.
      ]]></content>
    </chapter>
    
    <chapter id="summary">
      <title>Chapter Title</title>
      <emotional_arc>
        <opening>Consolidation</opening>
        <middle>Integration</middle>
        <peak>Mastery</peak>
        <resolution>Complete, ready to apply</resolution>
      </emotional_arc>
      <atmosphere>celebratory, confident, complete</atmosphere>
      <pedagogical_beat>summary</pedagogical_beat>
      <content><![CDATA[
Wrap-up narrative.
Reinforce key metaphors.
Celebrate understanding.
      ]]></content>
    </chapter>
  </chapters>
  
  <visual_design>
    <color_palette>Tailwind color scheme (e.g., "emerald and slate" or "red and black")</color_palette>
    <font_family>Tailwind font class (e.g., font-serif, font-mono, font-sans)</font_family>
  </visual_design>
</narrative>
```

**Mandatory Rules**:
1. Start immediately with `<?xml version="1.0" encoding="UTF-8"?>`
2. No text before or after the XML structure
3. Include `<plan>` section before chapters (maximum 2 pages)
4. Include `<metaphor_registry>` with 4-8 clear mappings
5. Include `<memorable_phrases>` with 3-5 quotable moments
6. Exactly 5 chapters with IDs: `intro`, `build`, `climax`, `resolution`, `summary`
7. Each chapter must have emotional_arc, atmosphere, pedagogical_beat, and content
8. Resolution chapter must include narrative_structure="comparative" and contrast section
9. All narrative content wrapped in `<![CDATA[...]]>` sections
10. Module slug must be kebab-case

---

## Begin Generation

Using the concept-fiction mapping provided above, generate the narrative XML now.