# Illustrated Workflow Guide

## Definition

An **Illustrated Workflow Guide** is a self-contained, single-file HTML document that visually documents a sequential process or methodology for mastering a specific skill or completing a complex task.

---

## Core Characteristics

### Technical Requirements
- ✅ **Single HTML file** - Everything in one `.html` file
- ✅ **Zero build process** - Open directly in any browser
- ✅ **No installation** - No npm, no bundler, no server required
- ✅ **CDN dependencies only** - External resources via CDN (Tailwind, AlpineJS, etc.)
- ✅ **Portable** - Email it, drop it in Dropbox, works everywhere

### Content Structure
- ✅ **Sequential phases** - Clear step-by-step progression (Phase 1 → 2 → 3)
- ✅ **Visual metaphors** - Boxes, arrows, colors to show relationships
- ✅ **Embedded examples** - Actual working examples inline
- ✅ **Time estimates** - Realistic duration for each phase
- ✅ **Self-assessment tools** - Checklists, verification criteria

### Design Philosophy
- ✅ **Styling-first** - Rich visual hierarchy via CSS/Tailwind
- ✅ **Print-friendly** - Can be printed and annotated
- ✅ **Scannable** - Quick to find relevant section
- ✅ **Pedagogical** - Teaches through visual demonstration

### Optional Interactivity
- ✅ **High-impact, low-effort only** - Checkboxes, toggles, tabs
- ✅ **Enhancement, not requirement** - Works fine without JavaScript
- ✅ **Lightweight libraries** - AlpineJS, simple vanilla JS
- ⚠️ **Avoid complex state** - No local storage, no heavy frameworks

---

## What It IS

| Category | Description |
|----------|-------------|
| **Learning tool** | Designed to be referenced during practice |
| **Process documentation** | Shows HOW to do something step-by-step |
| **Visual reference** | Uses color, layout, typography to teach |
| **Standalone artifact** | Complete in itself, no external dependencies* |
| **Reusable template** | Can be adapted for different workflows |

*Except CDN resources for styling/minimal interactivity

---

## What It IS NOT

| ❌ What it's NOT | Why Not | What to Use Instead |
|------------------|---------|---------------------|
| **Web application** | No server logic, no persistence, no user accounts | Build a proper React/Vue app |
| **Interactive tutorial** | Not step-by-step with validation/progress tracking | Use a learning platform |
| **API documentation** | Not exhaustive reference for functions/methods | Use JSDoc, Swagger, etc. |
| **Blog post** | More structured, more visual, process-oriented | Write an article |
| **Infographic** | More detailed, shows process not just data | Create a poster design |
| **Cheat sheet** | Longer, teaches workflow not just quick lookup | Make a PDF quick-reference |
| **Video transcript** | Static, non-linear, can be scanned quickly | Record a screencast |
| **SPA or dashboard** | No routing, no complex state management | Use a framework with build tools |

---

## Appropriate Use Cases

### ✅ Good Fit
- Teaching a repeatable process (like React composition)
- Documenting team workflows
- Onboarding guides for complex tools
- Visual style guides
- Decision trees or flowcharts with context
- "How to think about X" guides
- Pattern libraries with explanations

### ❌ Poor Fit
- Real-time data dashboards
- User authentication systems
- Content management systems
- Anything requiring a database
- Multi-page documentation sites
- Collaborative editing tools
- Production web applications

---

## Key Constraints

| Constraint | Implication |
|------------|-------------|
| **Single file** | Embed CSS in `<style>`, JS in `<script>` tags |
| **No build step** | No JSX, no preprocessors, no bundling |
| **Browser-only** | No Node.js APIs, no file system access |
| **Static content** | Content is fixed at creation time |
| **CDN dependencies** | Must work with public CDN URLs |

---

## Quality Checklist

An Illustrated Workflow Guide is **complete** when it:

- [ ] Opens in any browser without errors
- [ ] Displays correctly without internet (except CDN assets)
- [ ] Can be printed and remain useful
- [ ] Shows clear visual progression (Phase 1 → 2 → 3)
- [ ] Includes concrete examples
- [ ] Has no hardcoded personal/company data
- [ ] Works with JavaScript disabled (degrades gracefully)
- [ ] File size < 1MB (reasonable for sharing)
- [ ] Uses semantic HTML for accessibility

---

## Example Statement

> "I created an **Illustrated Workflow Guide** that shows designers how to structure Figma files. It's a single HTML file they can download and reference while working. Each phase is color-coded, and there are checkboxes to track progress. It uses Tailwind CSS from CDN for styling and some AlpineJS for collapsible sections, but works fine without JavaScript too."

This clearly communicates: **what it is, how it's used, and its technical boundaries.**