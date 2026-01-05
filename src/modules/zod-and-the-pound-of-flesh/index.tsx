import { useState, useMemo } from "react";
import { z } from "zod";
import { Scale, ShieldCheck, CheckCircle, ScrollText, VenetianMask } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { SafeParseReturnType } from "zod";

interface Chapter {
  title: string;
  content: string;
  quote: string;
  author: string;
}

const bondSchema = z.object({
  flesh: z.literal(1, { errorMap: () => ({ message: "Must be *exactly* one pound." }) }),
  blood: z.literal(0, { errorMap: () => ({ message: "Not one jot of blood is permitted." }) }),
  location: z.string().includes("heart", { message: "Must be nearest the merchant's heart." }),
});

type Bond = z.infer<typeof bondSchema>;

export default function ZodPoundOfFleshModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [flesh, setFlesh] = useState<string>("1");
  const [blood, setBlood] = useState<string>("0");
  const [location, setLocation] = useState<string>("nearest the merchant's heart");

  const chapters: Chapter[] = [
    {
      title: "The Literal Bond",
      content: "Shylock's bond is raw, unchecked data—a contract with immense power and risk. In React, this is like user input or an API response before validation. It exists, but its shape and consequences are not yet enforced or understood.",
      quote: "I stand for judgment. The contract. A pound of flesh.",
      author: "— Shylock"
    },
    {
      title: "Pleading to the Literal",
      content: "Appeals for mercy are like weak, manual validation (if/else checks). They are easily bypassed by strictly literal data that doesn't fit the expected 'happy path'. This anti-pattern is a fragile defense against malformed data.",
      quote: "Can you, with any hope of success, plead mercy to the literal?",
      author: "— Bassanio (paraphrased)"
    },
    {
      title: "The Precise Condition",
      content: "Portia's conditions are the Zod schema. She doesn't argue with the data's existence; she defines the *only* acceptable shape for its execution. This is how we declare an immutable, precise contract for our data.",
      quote: "This bond doth give thee here no jot of blood.",
      author: "— Portia (as Balthazar)"
    },
    {
      title: "The Validation Moment",
      content: "Shylock's attempt to cut is the runtime validation: `schema.safeParse()`. His immediate failure is a validation error. The data cannot be processed because it violates the schema's strict rules, protecting the system (Antonio).",
      quote: "The condition is the condition. No more, no less.",
      author: "— Portia (as Balthazar)"
    },
    {
      title: "The Guardian Schema",
      content: "The schema acts as a guardian. It doesn't destroy bad data, but it prevents it from causing harm. By validating inputs, Zod ensures application integrity and provides static type safety through type inference (`z.infer`).",
      quote: "The law is not a weapon, but a measure.",
      author: "— Portia (as Balthazar)"
    },
  ];

  const currentChapter = chapters[chapter];

  const validationResult: SafeParseReturnType<{ flesh: number; blood: number; location: string; }, Bond> = useMemo(() => {
    const parsedFlesh = parseFloat(flesh);
    const parsedBlood = parseFloat(blood);
    return bondSchema.safeParse({
      flesh: isNaN(parsedFlesh) ? undefined : parsedFlesh,
      blood: isNaN(parsedBlood) ? undefined : parsedBlood,
      location: location,
    });
  }, [flesh, blood, location]);

  const manualValidation = (data: { flesh: string, blood: string }) => {
    if (data.flesh && data.blood !== undefined) {
      // This check is weak! It allows '1.1', '0.0', etc.
      return { success: true, message: "Bond appears valid. Proceed." };
    }
    return { success: false, message: "Missing terms." };
  };
  
  const manualValidationResult = manualValidation({ flesh, blood });

  const code = {
    manualValidation: `function manualCheck(bond) {
  // This check is brittle and misses edge cases.
  // It allows "1.1" for flesh and passes non-zero blood!
  if (bond.flesh && bond.blood !== undefined) {
    return { valid: true }; // ❌ False positive!
  }
  return { valid: false };
}`,
    zodSchema: `import { z } from "zod";

// Portia's conditions, expressed as a schema.
// It is precise, explicit, and non-negotiable.
export const bondSchema = z.object({
  flesh: z.literal(1),
  blood: z.literal(0),
  location: z.string().includes("heart"),
});`,
    zodValidation: `const result = bondSchema.safeParse(submittedData);

if (result.success) {
  // ✅ Data is valid and type-safe.
  // The system is protected.
  processBond(result.data);
} else {
  // ❌ Validation failed.
  // The error object explains exactly why.
  console.log(result.error.flatten());
}`,
    typeInference: `// Zod infers a TypeScript type from the schema.
type Bond = z.infer<typeof bondSchema>;

// The 'Bond' type is now:
// {
//   flesh: 1;
//   blood: 0;
//   location: string;
// }

// This provides full type safety and autocompletion!`,
  };

  const renderDemo = () => {
    switch (chapter) {
      case 0:
        return (
          <div>
            <p className="mb-4 text-amber-200/80">The bond is presented as raw data. At this stage, the application has no rules to interpret it. Try submitting different values.</p>
            <div className="mt-4 rounded-lg bg-slate-950/50 p-4 border border-slate-700">
              <h4 className="font-bold text-slate-300">Submitted Data</h4>
              <pre className="mt-2 text-sm text-slate-400 whitespace-pre-wrap font-mono">{JSON.stringify({ flesh, blood, location }, null, 2)}</pre>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <p className="mb-4 text-amber-200/80">Manual checks are like pleas for mercy—easily bypassed. Notice how the weak check below approves data that should fail.</p>
            <div className={`mt-4 rounded-lg p-4 border ${manualValidationResult.success ? 'bg-red-950/30 border-red-500/40' : 'bg-green-950/30 border-green-500/40'}`}>
              <h4 className="font-bold text-slate-300">Manual Validation Result</h4>
              <p className={`font-mono text-sm ${manualValidationResult.success ? 'text-red-300' : 'text-green-300'}`}>
                {manualValidationResult.message} {manualValidationResult.success && "(This is a dangerous false positive!)"}
              </p>
            </div>
            <CodeComparison
              badCode={code.manualValidation}
              goodCode={code.zodSchema}
              language="typescript"
              themeColor="amber"
              badLabel="❌ Anti-Pattern: Weak Manual Check"
              goodLabel="✅ Solution: Declarative Schema"
              badExplanation="This imperative code is hard to maintain and misses many edge cases, creating security and data integrity risks."
              goodExplanation="A declarative schema defines the 'shape' of valid data in one place. It's robust, easy to read, and reusable."
            />
          </div>
        );
      case 2:
        return (
          <div>
            <p className="mb-4 text-amber-200/80">Portia defines the precise conditions. This is the Zod schema—an immutable contract for what constitutes valid data.</p>
            <CodeBlock code={code.zodSchema} language="typescript" title="// The Schema is Declared" variant="success" />
          </div>
        );
      case 3:
        return (
          <div>
            <p className="mb-4 text-amber-200/80">Attempt to satisfy the bond's conditions. The schema will parse the input and render its verdict. Try making it fail (e.g., flesh = 1.1, blood = 1).</p>
            <div className={`mt-4 rounded-lg p-4 border transition-all ${validationResult.success ? 'bg-green-950/30 border-green-500/40' : 'bg-red-950/30 border-red-500/40'}`}>
              <h4 className="font-bold text-slate-300">Zod Validation Result</h4>
              <pre className="mt-2 text-sm whitespace-pre-wrap font-mono">{JSON.stringify(validationResult, null, 2)}</pre>
            </div>
             <CodeBlock code={code.zodValidation} language="typescript" title="// The Moment of Validation" defaultExpanded={true} />
          </div>
        );
      case 4:
        return (
          <div>
            <p className="mb-4 text-amber-200/80">A schema not only validates data at runtime but also provides static type safety for your entire application, preventing bugs before they happen.</p>
            <CodeBlock code={code.typeInference} language="typescript" title="// Type Inference: The Guardian's Gift" variant="success" defaultExpanded={true} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Scale}
        title="The Merchant of Venice"
        subtitle="Portia & Shylock, c. 1596"
        concept="React Concept: Zod Schema Validation"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                  <VenetianMask className="h-5 w-5" />
                  The Bond's Terms
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="flesh" className="block text-sm font-medium text-slate-400">Pound(s) of Flesh</label>
                    <input type="text" id="flesh" value={flesh} onChange={(e) => setFlesh(e.target.value)} className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="blood" className="block text-sm font-medium text-slate-400">Jots of Blood</label>
                    <input type="text" id="blood" value={blood} onChange={(e) => setBlood(e.target.value)} className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
                  </div>
                   <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-400">Location</label>
                    <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full rounded-md border-slate-600 bg-slate-800 px-3 py-2 text-slate-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <ShieldCheck className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Shylock's Bond</span>
                    <span className="text-sm font-medium">Untrusted Data</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Portia's Conditions</span>
                    <span className="text-sm font-medium">Zod Schema</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Attempting the Cut</span>
                    <span className="text-sm font-medium">schema.parse()</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">"No jot of blood"</span>
                    <span className="text-sm font-medium">Validation Error</span>
                  </div>
                   <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Court</span>
                    <span className="text-sm font-medium">React Application</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Raw data from users or APIs is a contract full of potential risks until validated."}
                  {chapter === 1 && "Manual `if` checks are brittle and often miss edge cases, like Shylock ignoring pleas for mercy."}
                  {chapter === 2 && "A Zod schema is a precise, non-negotiable contract for your data's shape and type."}
                  {chapter === 3 && "`schema.safeParse()` is the moment of truth. It either confirms data integrity or throws a specific error, preventing harm."}
                  {chapter === 4 && "Zod schemas act as guardians, ensuring only valid data enters your system, making your application robust and predictable."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "{currentChapter.quote}"
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  {currentChapter.author}
                </p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="!text-amber-200">{currentChapter.title}</h2>
            <p>{currentChapter.content}</p>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1.5 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>
            {renderDemo()}
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}