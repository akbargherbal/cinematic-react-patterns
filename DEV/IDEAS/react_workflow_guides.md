# Top 5 React Skills for Illustrated Workflow Guides

## Selection Criteria
Each skill was chosen because it:
- ✅ Has a clear sequential process (Phase 1 → 2 → 3)
- ✅ Benefits from visual representation (boxes, arrows, diagrams)
- ✅ Addresses a common pain point
- ✅ Can be practiced through repetition
- ✅ Has verifiable completion criteria

---

## 1. **State Management Patterns**
**Filename:** `react_state_management_guide.html`

### Why This Needs a Guide
- Most confusing aspect for beginners
- Multiple approaches (local → lifted → context → external)
- Visual diagrams show where state lives

### Process Phases
1. **Identify** - Which component needs the data?
2. **Locate** - Find the common parent
3. **Lift** - Move state up the tree
4. **Pass Down** - Props to children
5. **Refactor** - When to use Context/Redux

### Visual Elements
- Component tree diagrams showing state location
- Color-coded arrows: data down (blue), events up (red)
- Before/after comparisons of state architecture
- Decision flowchart: Local vs Lifted vs Context

### Practice Projects
- Counter shared between siblings
- Filter shared by list + search
- Theme toggle affecting entire app
- Shopping cart accessible everywhere
- User auth status across routes

---

## 2. **useEffect Dependencies & Side Effects**
**Filename:** `react_useeffect_workflow_guide.html`

### Why This Needs a Guide
- #1 source of bugs in React apps
- Dependency array is counterintuitive
- Timing of execution is confusing

### Process Phases
1. **Identify** - What side effect do you need?
2. **Trigger** - What should cause it to run?
3. **Dependencies** - List what you use inside
4. **Cleanup** - Does it need cleanup?
5. **Debug** - Fix infinite loops

### Visual Elements
- Timeline showing when effects run (mount, update, unmount)
- Dependency array decision tree
- Common pitfalls highlighted in red
- Comparison: useEffect vs useLayoutEffect vs custom hooks

### Practice Projects
- Fetch data on mount
- Sync with localStorage
- Set up WebSocket connection
- Debounced search input
- Interval timer with cleanup

---

## 3. **Custom Hooks Extraction**
**Filename:** `react_custom_hooks_guide.html`

### Why This Needs a Guide
- Transforms copy-paste code into reusable logic
- Clear pattern once you see it
- "When to extract" is the hard part

### Process Phases
1. **Spot** - Find repeated useState/useEffect patterns
2. **Extract** - Move to separate function (use prefix)
3. **Parameters** - What varies between uses?
4. **Return** - What does the component need back?
5. **Test** - Use in 2+ places

### Visual Elements
- Before: Duplicated logic highlighted in yellow
- After: Clean components using custom hook
- Anatomy of a custom hook (diagram)
- Common hook patterns library

### Practice Projects
- `useLocalStorage` hook
- `useFetch` with loading states
- `useForm` with validation
- `useDebounce` for inputs
- `useMediaQuery` for responsive

---

## 4. **Props vs Context vs State Libraries**
**Filename:** `react_data_flow_decision_guide.html`

### Why This Needs a Guide
- Decision paralysis for beginners
- Each approach has clear use cases
- Visual comparison makes it obvious

### Process Phases
1. **Map** - Draw component tree
2. **Measure** - How many levels deep?
3. **Assess** - How often does it change?
4. **Choose** - Props | Context | Zustand/Redux
5. **Implement** - Follow pattern for your choice

### Visual Elements
- Side-by-side component trees for each approach
- "Levels of separation" ruler (1-2: props, 3-5: context, 6+: library)
- Decision matrix with examples
- Migration path from one to another

### Practice Projects
- Theme (props → context)
- User data (context → Zustand)
- Shopping cart (Zustand)
- Notification system (Context)
- Multi-step form (local state)

---

## 5. **Form Handling Patterns**
**Filename:** `react_forms_workflow_guide.html`

### Why This Needs a Guide
- Every app needs forms
- Many approaches (controlled, uncontrolled, libraries)
- Validation is always messy

### Process Phases
1. **Design** - Sketch form structure
2. **State** - Controlled vs uncontrolled decision
3. **Handlers** - onChange, onSubmit, validation
4. **Errors** - When to show, where to store
5. **Submit** - Handle success/failure states

### Visual Elements
- Controlled vs uncontrolled comparison
- State shape for complex forms
- Validation timing flowchart (onChange vs onBlur vs onSubmit)
- Error display patterns

### Practice Projects
- Login form (basic)
- Multi-step wizard
- Dynamic form (add/remove fields)
- Form with file upload
- Form with real-time validation

---

## Priority Order for Creation

| # | Guide | Impact | Difficulty | Time to Create |
|---|-------|--------|------------|----------------|
| 1 | **State Management** | 🔥🔥🔥 | Medium | 8-10 hours |
| 2 | **useEffect** | 🔥🔥🔥 | High | 10-12 hours |
| 3 | **Custom Hooks** | 🔥🔥 | Medium | 6-8 hours |
| 4 | **Data Flow Decision** | 🔥🔥 | Low | 6-8 hours |
| 5 | **Form Handling** | 🔥 | Medium | 8-10 hours |

**Recommendation:** Create #1 (State Management) first - it's the foundation for everything else.

---

## The Complete Series

Once all 5 guides exist:

```
react_skill_mastery/
├── react_composition_guide.html          [✅ Complete]
├── react_state_management_guide.html     
├── react_useeffect_workflow_guide.html
├── react_custom_hooks_guide.html
├── react_data_flow_decision_guide.html
└── react_forms_workflow_guide.html
```

**Total learning path:** ~60 hours of deliberate practice
**Result:** Production-ready React developer