## Cell 1 (code) [no output] [1]

```python
#
```

## Cell 2 (code) [no output] [2]

```python
import pandas as pd
import regex as re
import os
from pathlib import Path
import json
```

## Cell 3 (code) [3]

```python
from extract_persona_b_output import main


def clean_xml_string(s: str) -> str:
    """Clean XML string by removing markdown fences and extracting XML content."""
    s = s.strip()

    # Remove markdown code fences with language identifier
    s = re.sub(r"^```xml\s*\n", "", s, flags=re.MULTILINE)
    s = re.sub(r"^```\s*\n", "", s, flags=re.MULTILINE)
    s = re.sub(r"\n```\s*$", "", s, flags=re.MULTILINE)

    # Remove any remaining ``` markers
    s = s.strip("`").strip()

    # Find the actual XML start if there's junk before it
    xml_start = s.find("<?xml")
    if xml_start > 0:
        s = s[xml_start:]

    # Find the XML end if there's junk after it
    xml_end = s.find("</module>")
    if xml_end > 0:
        s = s[: xml_end + len("</module>")]

    return s.strip()


def fix_xml_encoding_issues(s: str) -> str:
    """Fix common XML encoding issues."""
    # Replace smart quotes with regular quotes
    s = s.replace('"', '"').replace('"', '"')
    s = s.replace(""", "'").replace(""", "'")

    # Fix common unescaped characters IN ATTRIBUTE VALUES AND TEXT
    # This is tricky - we need to avoid breaking CDATA sections

    # Strategy: Only fix ampersands that are NOT already part of entities
    # Match & that's NOT followed by amp; lt; gt; quot; apos; or #
    # s = re.sub(r"&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)", "&amp;", s)

    return s

df = pd.read_pickle('./RESULTS.pkl')
df['RESULT'] = df['RESULT'].apply(lambda x: clean_xml_string(x))
df['RESULT'] = df['RESULT'].apply(lambda x: fix_xml_encoding_issues(x))
df.sample()
```

**Result:**
```text
IDX                                               DATA  \
15   15  {'title': 'Shutter Island is Stale Closures', ...   

                                               PROMPT PROMPT_ID  \
15  # The Implementation Translator\n\n## Your Tas...       016   

                                            NARRATIVE  \
15  xml\n<?xml version="1.0" encoding="UTF-8"?>\n<...   

                                               RESULT     STATUS ERROR  
15  <?xml version="1.0" encoding="UTF-8"?>\n<modul...  succeeded  None
```

## Cell 4 (code) [4]

```python
# Process XML strings from DataFrame column
df['RESULT'].apply(lambda x: main(
    input_file=x, 
    path=False,  # Key parameter!
    output_dir='./EXPORT',
    save_plan=False,
    save_snippets=False
))
```

**Output (stream):**
```text
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: Mean Girls: Context API
Slug: mean-girls-context-api

Files extracted: 1
  - src/modules/mean-girls-context-api/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\mean-girls-context-api\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import MeanGirlsContextAPI from "@modules/mean-girls-context-api";

2. Add route to App.tsx:
   <Route
  path="/mean-girls-context-api"
  element={
    <ModuleWrapper
      bgClass="bg-white"
      textClass="text-slate-700"
      fontClass="font-sans"
    >
      <MeanGirlsContextAPI />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/mean-girls-context-api",
  title: "Mean Girls",
  subtitle: "North Shore High, 2004",
  concept: "Context API & Prop Drilling",
  icon: Sparkles,
  colorClass: "text-pink-500",
  bgClass: "bg-pink-50 border-pink-300 hover:border-pink-500"
}
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: Frankenstein's Covenant
Slug: frankenstein-controlled-components

Files extracted: 1
  - src/modules/frankenstein-controlled-components/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\frankenstein-controlled-components\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import FrankensteinModule from "@modules/frankenstein-controlled-components";

2. Add route to App.tsx:
   <Route
  path="/frankenstein-controlled-components"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-300"
      fontClass="font-serif"
    >
      <FrankensteinModule />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/frankenstein-controlled-components",
  title: "Frankenstein's Covenant",
  subtitle: "Victor Frankenstein, Geneva, 1818",
  concept: "Controlled vs Uncontrolled Components",
  icon: Zap,
  colorClass: "text-emerald-500",
  bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
}
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: Fight Club: Strict Mode
Slug: fight-club-strict-mode

Files extracted: 1
  - src/modules/fight-club-strict-mode/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\fight-club-strict-mode\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import FightClubStrictMode from "@modules/fight-club-strict-mode";

2. Add route to App.tsx:
   <Route
  path="/fight-club-strict-mode"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-200"
      fontClass="font-sans"
    >
      <FightClubStrictMode />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/fight-club-strict-mode",
  title: "Fight Club",
  subtitle: "Tyler Durden, 1999",
  concept: "Strict Mode & Effect Cleanup",
  icon: Flame,
  colorClass: "text-red-500",
  bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
}
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: The Matrix: useEffect Dependencies
Slug: matrix-useeffect-dependencies

Files extracted: 1
  - src/modules/matrix-useeffect-dependencies/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\matrix-useeffect-dependencies\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import MatrixUseEffectDependencies from "@modules/matrix-useeffect-dependencies";

2. Add route to App.tsx:
   <Route
  path="/matrix-useeffect-dependencies"
  element={
    <ModuleWrapper
      bgClass="bg-black"
      textClass="text-green-500"
      fontClass="font-mono"
    >
      <MatrixUseEffectDependencies />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/matrix-useeffect-dependencies",
  title: "The Matrix",
  subtitle: "Neo, The Construct, 1999",
  concept: "useEffect Dependencies",
  icon: Zap,
  colorClass: "text-green-500",
  bgClass: "bg-green-950/20 border-green-500/30 hover:border-green-500"
}
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: Inception: Component Composition
Slug: inception-component-composition

Files extracted: 1
  - src/modules/inception-component-composition/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\inception-component-composition\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import InceptionComposition from "@modules/inception-component-composition";

2. Add route to App.tsx:
   <Route
  path="/inception-component-composition"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-300"
      fontClass="font-sans"
    >
      <InceptionComposition />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/inception-component-composition",
  title: "Inception",
  subtitle: "Cobb's Team, 2010",
  concept: "Component Composition & Children Props",
  icon: Layers,
  colorClass: "text-blue-400",
  bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
}
📖 Processing XML string

============================================================
📦 EXTRACTION SUMMARY
============================================================
Module Name: Memento: State Management
Slug: memento-state-management

Files extracted: 1
  - src/modules/memento-state-management/index.tsx

Integration snippets: 3
  - route
  - import
  - home_card
============================================================

✅ Written: EXPORT\modules\memento-state-management\index.tsx

✨ Extraction complete!

📋 Next steps:
1. Add import to App.tsx:
   import MementoStateManagement from "@modules/memento-state-management";

2. Add route to App.tsx:
   <Route
  path="/memento-state-management"
  element={
    <ModuleWrapper
      bgClass="bg-slate-950"
      textClass="text-slate-300"
      fontClass="font-mono"
    >
      <MementoStateManagement />
    </ModuleWrapper>
  }
/>

3. Add card to src/modules/home/index.tsx:
   {
  path: "/memento-state-management",
  title: "Memento",
  subtitle: "Leonard Shelby, 2000",
  concept: "useState vs useRef",
  icon: Camera,
  colorClass: "text-amber-500",
  bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
}
📖 Processing XML string
❌ XML parsing error: not well-formed (invalid token): line 3, column 44
```

**Error:**
```ansi
[1;31m---------------------------------------------------------------------------[0m
[1;31mParseError[0m                                Traceback (most recent call last)
File [1;32m\\wsl.localhost\Ubuntu-22.04\home\akbar\Jupyter_Notebooks\cinematic-react-patterns\DEV\SCRIPTS\integration\extract_persona_b_output.py:27[0m, in [0;36mparse_xml[1;34m(xml_content)[0m
[0;32m     26[0m [38;5;28;01mtry[39;00m:
[1;32m---> 27[0m     root [38;5;241m=[39m [43mET[49m[38;5;241;43m.[39;49m[43mfromstring[49m[43m([49m[43mxml_content[49m[43m)[49m
[0;32m     28[0m     [38;5;28;01mreturn[39;00m root

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\xml\etree\ElementTree.py:1330[0m, in [0;36mXML[1;34m(text, parser)[0m
[0;32m   1329[0m     parser [38;5;241m=[39m XMLParser(target[38;5;241m=[39mTreeBuilder())
[1;32m-> 1330[0m [43mparser[49m[38;5;241;43m.[39;49m[43mfeed[49m[43m([49m[43mtext[49m[43m)[49m
[0;32m   1331[0m [38;5;28;01mreturn[39;00m parser[38;5;241m.[39mclose()

[1;31mParseError[0m: not well-formed (invalid token): line 3, column 44

During handling of the above exception, another exception occurred:

[1;31mSystemExit[0m                                Traceback (most recent call last)
    [1;31m[... skipping hidden 1 frame][0m

Cell [1;32mIn[4], line 2[0m
[0;32m      1[0m [38;5;66;03m# Process XML strings from DataFrame column[39;00m
[1;32m----> 2[0m [43mdf[49m[43m[[49m[38;5;124;43m'[39;49m[38;5;124;43mRESULT[39;49m[38;5;124;43m'[39;49m[43m][49m[38;5;241;43m.[39;49m[43mapply[49m[43m([49m[38;5;28;43;01mlambda[39;49;00m[43m [49m[43mx[49m[43m:[49m[43m [49m[43mmain[49m[43m([49m
[0;32m      3[0m [43m    [49m[43minput_file[49m[38;5;241;43m=[39;49m[43mx[49m[43m,[49m[43m [49m
[0;32m      4[0m [43m    [49m[43mpath[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m[43m,[49m[43m  [49m[38;5;66;43;03m# Key parameter![39;49;00m
[0;32m      5[0m [43m    [49m[43moutput_dir[49m[38;5;241;43m=[39;49m[38;5;124;43m'[39;49m[38;5;124;43m./EXPORT[39;49m[38;5;124;43m'[39;49m[43m,[49m
[0;32m      6[0m [43m    [49m[43msave_plan[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m[43m,[49m
[0;32m      7[0m [43m    [49m[43msave_snippets[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m
[0;32m      8[0m [43m)[49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\series.py:4924[0m, in [0;36mSeries.apply[1;34m(self, func, convert_dtype, args, by_row, **kwargs)[0m
[0;32m   4798[0m [38;5;250m[39m[38;5;124;03m"""[39;00m
[0;32m   4799[0m [38;5;124;03mInvoke function on values of Series.[39;00m
[0;32m   4800[0m 
[1;32m   (...)[0m
[0;32m   4915[0m [38;5;124;03mdtype: float64[39;00m
[0;32m   4916[0m [38;5;124;03m"""[39;00m
[0;32m   4917[0m [38;5;28;01mreturn[39;00m [43mSeriesApply[49m[43m([49m
[0;32m   4918[0m [43m    [49m[38;5;28;43mself[39;49m[43m,[49m
[0;32m   4919[0m [43m    [49m[43mfunc[49m[43m,[49m
[0;32m   4920[0m [43m    [49m[43mconvert_dtype[49m[38;5;241;43m=[39;49m[43mconvert_dtype[49m[43m,[49m
[0;32m   4921[0m [43m    [49m[43mby_row[49m[38;5;241;43m=[39;49m[43mby_row[49m[43m,[49m
[0;32m   4922[0m [43m    [49m[43margs[49m[38;5;241;43m=[39;49m[43margs[49m[43m,[49m
[0;32m   4923[0m [43m    [49m[43mkwargs[49m[38;5;241;43m=[39;49m[43mkwargs[49m[43m,[49m
[1;32m-> 4924[0m [43m[49m[43m)[49m[38;5;241;43m.[39;49m[43mapply[49m[43m([49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\apply.py:1427[0m, in [0;36mSeriesApply.apply[1;34m(self)[0m
[0;32m   1426[0m [38;5;66;03m# self.func is Callable[39;00m
[1;32m-> 1427[0m [38;5;28;01mreturn[39;00m [38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mapply_standard[49m[43m([49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\apply.py:1507[0m, in [0;36mSeriesApply.apply_standard[1;34m(self)[0m
[0;32m   1506[0m action [38;5;241m=[39m [38;5;124m"[39m[38;5;124mignore[39m[38;5;124m"[39m [38;5;28;01mif[39;00m [38;5;28misinstance[39m(obj[38;5;241m.[39mdtype, CategoricalDtype) [38;5;28;01melse[39;00m [38;5;28;01mNone[39;00m
[1;32m-> 1507[0m mapped [38;5;241m=[39m [43mobj[49m[38;5;241;43m.[39;49m[43m_map_values[49m[43m([49m
[0;32m   1508[0m [43m    [49m[43mmapper[49m[38;5;241;43m=[39;49m[43mcurried[49m[43m,[49m[43m [49m[43mna_action[49m[38;5;241;43m=[39;49m[43maction[49m[43m,[49m[43m [49m[43mconvert[49m[38;5;241;43m=[39;49m[38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mconvert_dtype[49m
[0;32m   1509[0m [43m[49m[43m)[49m
[0;32m   1511[0m [38;5;28;01mif[39;00m [38;5;28mlen[39m(mapped) [38;5;129;01mand[39;00m [38;5;28misinstance[39m(mapped[[38;5;241m0[39m], ABCSeries):
[0;32m   1512[0m     [38;5;66;03m# GH#43986 Need to do list(mapped) in order to get treated as nested[39;00m
[0;32m   1513[0m     [38;5;66;03m#  See also GH#25959 regarding EA support[39;00m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\base.py:921[0m, in [0;36mIndexOpsMixin._map_values[1;34m(self, mapper, na_action, convert)[0m
[0;32m    919[0m     [38;5;28;01mreturn[39;00m arr[38;5;241m.[39mmap(mapper, na_action[38;5;241m=[39mna_action)
[1;32m--> 921[0m [38;5;28;01mreturn[39;00m [43malgorithms[49m[38;5;241;43m.[39;49m[43mmap_array[49m[43m([49m[43marr[49m[43m,[49m[43m [49m[43mmapper[49m[43m,[49m[43m [49m[43mna_action[49m[38;5;241;43m=[39;49m[43mna_action[49m[43m,[49m[43m [49m[43mconvert[49m[38;5;241;43m=[39;49m[43mconvert[49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\pandas\core\algorithms.py:1743[0m, in [0;36mmap_array[1;34m(arr, mapper, na_action, convert)[0m
[0;32m   1742[0m [38;5;28;01mif[39;00m na_action [38;5;129;01mis[39;00m [38;5;28;01mNone[39;00m:
[1;32m-> 1743[0m     [38;5;28;01mreturn[39;00m [43mlib[49m[38;5;241;43m.[39;49m[43mmap_infer[49m[43m([49m[43mvalues[49m[43m,[49m[43m [49m[43mmapper[49m[43m,[49m[43m [49m[43mconvert[49m[38;5;241;43m=[39;49m[43mconvert[49m[43m)[49m
[0;32m   1744[0m [38;5;28;01melse[39;00m:

File [1;32mlib.pyx:2972[0m, in [0;36mpandas._libs.lib.map_infer[1;34m()[0m

Cell [1;32mIn[4], line 2[0m, in [0;36m<lambda>[1;34m(x)[0m
[0;32m      1[0m [38;5;66;03m# Process XML strings from DataFrame column[39;00m
[1;32m----> 2[0m df[[38;5;124m'[39m[38;5;124mRESULT[39m[38;5;124m'[39m][38;5;241m.[39mapply([38;5;28;01mlambda[39;00m x: [43mmain[49m[43m([49m
[0;32m      3[0m [43m    [49m[43minput_file[49m[38;5;241;43m=[39;49m[43mx[49m[43m,[49m[43m [49m
[0;32m      4[0m [43m    [49m[43mpath[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m[43m,[49m[43m  [49m[38;5;66;43;03m# Key parameter![39;49;00m
[0;32m      5[0m [43m    [49m[43moutput_dir[49m[38;5;241;43m=[39;49m[38;5;124;43m'[39;49m[38;5;124;43m./EXPORT[39;49m[38;5;124;43m'[39;49m[43m,[49m
[0;32m      6[0m [43m    [49m[43msave_plan[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m[43m,[49m
[0;32m      7[0m [43m    [49m[43msave_snippets[49m[38;5;241;43m=[39;49m[38;5;28;43;01mFalse[39;49;00m
[0;32m      8[0m [43m)[49m)

File [1;32m\\wsl.localhost\Ubuntu-22.04\home\akbar\Jupyter_Notebooks\cinematic-react-patterns\DEV\SCRIPTS\integration\extract_persona_b_output.py:269[0m, in [0;36mmain[1;34m(input_file, output_dir, path, dry_run, save_snippets, save_plan, **kwargs)[0m
[0;32m    268[0m [38;5;66;03m# Parse XML[39;00m
[1;32m--> 269[0m root [38;5;241m=[39m [43mparse_xml[49m[43m([49m[43mxml_content[49m[43m)[49m
[0;32m    271[0m [38;5;66;03m# Extract components[39;00m

File [1;32m\\wsl.localhost\Ubuntu-22.04\home\akbar\Jupyter_Notebooks\cinematic-react-patterns\DEV\SCRIPTS\integration\extract_persona_b_output.py:31[0m, in [0;36mparse_xml[1;34m(xml_content)[0m
[0;32m     30[0m [38;5;28mprint[39m([38;5;124mf[39m[38;5;124m"[39m[38;5;124m❌ XML parsing error: [39m[38;5;132;01m{[39;00me[38;5;132;01m}[39;00m[38;5;124m"[39m)
[1;32m---> 31[0m [43msys[49m[38;5;241;43m.[39;49m[43mexit[49m[43m([49m[38;5;241;43m1[39;49m[43m)[49m

[1;31mSystemExit[0m: 1

During handling of the above exception, another exception occurred:

[1;31mAttributeError[0m                            Traceback (most recent call last)
    [1;31m[... skipping hidden 1 frame][0m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\interactiveshell.py:2095[0m, in [0;36mInteractiveShell.showtraceback[1;34m(self, exc_tuple, filename, tb_offset, exception_only, running_compiled_code)[0m
[0;32m   2092[0m [38;5;28;01mif[39;00m exception_only:
[0;32m   2093[0m     stb [38;5;241m=[39m [[38;5;124m'[39m[38;5;124mAn exception has occurred, use [39m[38;5;124m%[39m[38;5;124mtb to see [39m[38;5;124m'[39m
[0;32m   2094[0m            [38;5;124m'[39m[38;5;124mthe full traceback.[39m[38;5;130;01m\n[39;00m[38;5;124m'[39m]
[1;32m-> 2095[0m     stb[38;5;241m.[39mextend([38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mInteractiveTB[49m[38;5;241;43m.[39;49m[43mget_exception_only[49m[43m([49m[43metype[49m[43m,[49m
[0;32m   2096[0m [43m                                                     [49m[43mvalue[49m[43m)[49m)
[0;32m   2097[0m [38;5;28;01melse[39;00m:
[0;32m   2098[0m     [38;5;28;01mtry[39;00m:
[0;32m   2099[0m         [38;5;66;03m# Exception classes can customise their traceback - we[39;00m
[0;32m   2100[0m         [38;5;66;03m# use this in IPython.parallel for exceptions occurring[39;00m
[0;32m   2101[0m         [38;5;66;03m# in the engines. This should return a list of strings.[39;00m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:696[0m, in [0;36mListTB.get_exception_only[1;34m(self, etype, value)[0m
[0;32m    688[0m [38;5;28;01mdef[39;00m[38;5;250m [39m[38;5;21mget_exception_only[39m([38;5;28mself[39m, etype, value):
[0;32m    689[0m [38;5;250m    [39m[38;5;124;03m"""Only print the exception type and message, without a traceback.[39;00m
[0;32m    690[0m 
[0;32m    691[0m [38;5;124;03m    Parameters[39;00m
[1;32m   (...)[0m
[0;32m    694[0m [38;5;124;03m    value : exception value[39;00m
[0;32m    695[0m [38;5;124;03m    """[39;00m
[1;32m--> 696[0m     [38;5;28;01mreturn[39;00m [43mListTB[49m[38;5;241;43m.[39;49m[43mstructured_traceback[49m[43m([49m[38;5;28;43mself[39;49m[43m,[49m[43m [49m[43metype[49m[43m,[49m[43m [49m[43mvalue[49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:559[0m, in [0;36mListTB.structured_traceback[1;34m(self, etype, evalue, etb, tb_offset, context)[0m
[0;32m    556[0m     chained_exc_ids[38;5;241m.[39madd([38;5;28mid[39m(exception[[38;5;241m1[39m]))
[0;32m    557[0m     chained_exceptions_tb_offset [38;5;241m=[39m [38;5;241m0[39m
[0;32m    558[0m     out_list [38;5;241m=[39m (
[1;32m--> 559[0m         [38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mstructured_traceback[49m[43m([49m
[0;32m    560[0m [43m            [49m[43metype[49m[43m,[49m
[0;32m    561[0m [43m            [49m[43mevalue[49m[43m,[49m
[0;32m    562[0m [43m            [49m[43m([49m[43metb[49m[43m,[49m[43m [49m[43mchained_exc_ids[49m[43m)[49m[43m,[49m[43m  [49m[38;5;66;43;03m# type: ignore[39;49;00m
[0;32m    563[0m [43m            [49m[43mchained_exceptions_tb_offset[49m[43m,[49m
[0;32m    564[0m [43m            [49m[43mcontext[49m[43m,[49m
[0;32m    565[0m [43m        [49m[43m)[49m
[0;32m    566[0m         [38;5;241m+[39m chained_exception_message
[0;32m    567[0m         [38;5;241m+[39m out_list)
[0;32m    569[0m [38;5;28;01mreturn[39;00m out_list

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:1396[0m, in [0;36mAutoFormattedTB.structured_traceback[1;34m(self, etype, evalue, etb, tb_offset, number_of_lines_of_context)[0m
[0;32m   1394[0m [38;5;28;01melse[39;00m:
[0;32m   1395[0m     [38;5;28mself[39m[38;5;241m.[39mtb [38;5;241m=[39m etb
[1;32m-> 1396[0m [38;5;28;01mreturn[39;00m [43mFormattedTB[49m[38;5;241;43m.[39;49m[43mstructured_traceback[49m[43m([49m
[0;32m   1397[0m [43m    [49m[38;5;28;43mself[39;49m[43m,[49m[43m [49m[43metype[49m[43m,[49m[43m [49m[43mevalue[49m[43m,[49m[43m [49m[43metb[49m[43m,[49m[43m [49m[43mtb_offset[49m[43m,[49m[43m [49m[43mnumber_of_lines_of_context[49m
[0;32m   1398[0m [43m[49m[43m)[49m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:1287[0m, in [0;36mFormattedTB.structured_traceback[1;34m(self, etype, value, tb, tb_offset, number_of_lines_of_context)[0m
[0;32m   1284[0m mode [38;5;241m=[39m [38;5;28mself[39m[38;5;241m.[39mmode
[0;32m   1285[0m [38;5;28;01mif[39;00m mode [38;5;129;01min[39;00m [38;5;28mself[39m[38;5;241m.[39mverbose_modes:
[0;32m   1286[0m     [38;5;66;03m# Verbose modes need a full traceback[39;00m
[1;32m-> 1287[0m     [38;5;28;01mreturn[39;00m [43mVerboseTB[49m[38;5;241;43m.[39;49m[43mstructured_traceback[49m[43m([49m
[0;32m   1288[0m [43m        [49m[38;5;28;43mself[39;49m[43m,[49m[43m [49m[43metype[49m[43m,[49m[43m [49m[43mvalue[49m[43m,[49m[43m [49m[43mtb[49m[43m,[49m[43m [49m[43mtb_offset[49m[43m,[49m[43m [49m[43mnumber_of_lines_of_context[49m
[0;32m   1289[0m [43m    [49m[43m)[49m
[0;32m   1290[0m [38;5;28;01melif[39;00m mode [38;5;241m==[39m [38;5;124m'[39m[38;5;124mMinimal[39m[38;5;124m'[39m:
[0;32m   1291[0m     [38;5;28;01mreturn[39;00m ListTB[38;5;241m.[39mget_exception_only([38;5;28mself[39m, etype, value)

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:1140[0m, in [0;36mVerboseTB.structured_traceback[1;34m(self, etype, evalue, etb, tb_offset, number_of_lines_of_context)[0m
[0;32m   1131[0m [38;5;28;01mdef[39;00m[38;5;250m [39m[38;5;21mstructured_traceback[39m(
[0;32m   1132[0m     [38;5;28mself[39m,
[0;32m   1133[0m     etype: [38;5;28mtype[39m,
[1;32m   (...)[0m
[0;32m   1137[0m     number_of_lines_of_context: [38;5;28mint[39m [38;5;241m=[39m [38;5;241m5[39m,
[0;32m   1138[0m ):
[0;32m   1139[0m [38;5;250m    [39m[38;5;124;03m"""Return a nice text document describing the traceback."""[39;00m
[1;32m-> 1140[0m     formatted_exception [38;5;241m=[39m [38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mformat_exception_as_a_whole[49m[43m([49m[43metype[49m[43m,[49m[43m [49m[43mevalue[49m[43m,[49m[43m [49m[43metb[49m[43m,[49m[43m [49m[43mnumber_of_lines_of_context[49m[43m,[49m
[0;32m   1141[0m [43m                                                           [49m[43mtb_offset[49m[43m)[49m
[0;32m   1143[0m     colors [38;5;241m=[39m [38;5;28mself[39m[38;5;241m.[39mColors  [38;5;66;03m# just a shorthand + quicker name lookup[39;00m
[0;32m   1144[0m     colorsnormal [38;5;241m=[39m colors[38;5;241m.[39mNormal  [38;5;66;03m# used a lot[39;00m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:1030[0m, in [0;36mVerboseTB.format_exception_as_a_whole[1;34m(self, etype, evalue, etb, number_of_lines_of_context, tb_offset)[0m
[0;32m   1027[0m [38;5;28;01massert[39;00m [38;5;28misinstance[39m(tb_offset, [38;5;28mint[39m)
[0;32m   1028[0m head [38;5;241m=[39m [38;5;28mself[39m[38;5;241m.[39mprepare_header([38;5;28mstr[39m(etype), [38;5;28mself[39m[38;5;241m.[39mlong_header)
[0;32m   1029[0m records [38;5;241m=[39m (
[1;32m-> 1030[0m     [38;5;28;43mself[39;49m[38;5;241;43m.[39;49m[43mget_records[49m[43m([49m[43metb[49m[43m,[49m[43m [49m[43mnumber_of_lines_of_context[49m[43m,[49m[43m [49m[43mtb_offset[49m[43m)[49m [38;5;28;01mif[39;00m etb [38;5;28;01melse[39;00m []
[0;32m   1031[0m )
[0;32m   1033[0m frames [38;5;241m=[39m []
[0;32m   1034[0m skipped [38;5;241m=[39m [38;5;241m0[39m

File [1;32mc:\Users\DELL\AppData\Local\Programs\Python\Python312\Lib\site-packages\IPython\core\ultratb.py:1098[0m, in [0;36mVerboseTB.get_records[1;34m(self, etb, number_of_lines_of_context, tb_offset)[0m
[0;32m   1096[0m [38;5;28;01mwhile[39;00m cf [38;5;129;01mis[39;00m [38;5;129;01mnot[39;00m [38;5;28;01mNone[39;00m:
[0;32m   1097[0m     [38;5;28;01mtry[39;00m:
[1;32m-> 1098[0m         mod [38;5;241m=[39m inspect[38;5;241m.[39mgetmodule([43mcf[49m[38;5;241;43m.[39;49m[43mtb_frame[49m)
[0;32m   1099[0m         [38;5;28;01mif[39;00m mod [38;5;129;01mis[39;00m [38;5;129;01mnot[39;00m [38;5;28;01mNone[39;00m:
[0;32m   1100[0m             mod_name [38;5;241m=[39m mod[38;5;241m.[39m[38;5;18m__name__[39m

[1;31mAttributeError[0m: 'tuple' object has no attribute 'tb_frame'
```

## Cell 5 (code) [no output] [ ]

```python

```

