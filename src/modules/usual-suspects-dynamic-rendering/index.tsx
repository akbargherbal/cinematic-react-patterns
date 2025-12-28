import { useState, useMemo } from "react";
import {
  Eye,
  User,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Chapter {
  title: string;
  content: string;
  demo: () => JSX.Element;
}

interface CharacterCardProps {
  name: string;
  role: string;
}

interface LocationCardProps {
  name: string;
  description: string;
}

interface EventCardProps {
  name: string;
  date: string;
}

const CharacterCard = ({ name, role }: CharacterCardProps) => (
  <div className="rounded-lg border border-amber-500/30 bg-slate-900 p-4">
    <div className="mb-2 flex items-center gap-3">
      <User className="h-5 w-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{role}</p>
  </div>
);

const LocationCard = ({ name, description }: LocationCardProps) => (
  <div className="rounded-lg border border-amber-500/30 bg-slate-900 p-4">
    <div className="mb-2 flex items-center gap-3">
      <MapPin className="h-5 w-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{description}</p>
  </div>
);

const EventCard = ({ name, date }: EventCardProps) => (
  <div className="rounded-lg border border-amber-500/30 bg-slate-900 p-4">
    <div className="mb-2 flex items-center gap-3">
      <Calendar className="h-5 w-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{date}</p>
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="overflow-x-auto rounded-lg border border-amber-500/20 bg-slate-900 p-4">
    <code className="font-mono text-sm text-amber-300">{children}</code>
  </pre>
);

export default function UsualSuspectsDynamicRendering() {
  const [chapter, setChapter] = useState(0);

  // Chapter 0 demo state
  const [propName, setPropName] = useState("Kobayashi");
  const [propRole, setPropRole] = useState("Lawyer");

  // Chapter 1 demo state
  const [componentType, setComponentType] = useState<
    "character" | "location" | "event"
  >("character");

  // Chapter 2 demo state
  const [selectedItems, setSelectedItems] = useState<string[]>(["Kobayashi"]);

  // Chapter 3 demo state
  const [showVillain, setShowVillain] = useState(false);

  const componentMap = {
    character: CharacterCard,
    location: LocationCard,
    event: EventCard,
  };

  const environmentItems = [
    {
      id: "Kobayashi",
      type: "character",
      data: { name: "Kobayashi", role: "Lawyer" },
    },
    {
      id: "Redfoot",
      type: "character",
      data: { name: "Redfoot", role: "Fence" },
    },
    {
      id: "San Pedro",
      type: "location",
      data: { name: "San Pedro", description: "Harbor district" },
    },
    {
      id: "Guatemala",
      type: "location",
      data: { name: "Guatemala", description: "Cocaine source" },
    },
    {
      id: "The Lineup",
      type: "event",
      data: { name: "The Lineup", date: "Six weeks ago" },
    },
  ];

  const chapters: Chapter[] = [
    {
      title: "The Interrogation Begins",
      content: `The fluorescent lights hum overhead, casting harsh shadows across the interrogation room. Verbal Kint sits hunched in his chair, his twisted hand resting on the metal table. Across from him, Detective Dave Kujan leans forward, eyes sharp, voice steady.

"Start at the beginning," Kujan says. "Tell me about the lineup."

Verbal's eyes flicker—just for a moment—to the bulletin board behind Kujan. Names. Faces. Details pinned haphazardly across cork. Then back to the detective.

"There were five of us," Verbal begins, his voice soft, almost apologetic. "McManus, Fenster, Hockney, Keaton... and me."

What Kujan doesn't realize—what he can't realize yet—is that Verbal isn't recalling a story. He's constructing one. In real-time. Based on what he sees, what he's asked, what the environment provides.`,
      demo: () => (
        <div className="space-y-6">
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-6">
            <h3 className="mb-4 text-2xl font-bold text-amber-100">
              The Bulletin Board: Props in Action
            </h3>
            <p className="mb-6 text-amber-200/80">
              Change the props below and watch the component render dynamically.
              Like Verbal reading from the bulletin board, the component adapts
              to what you give it.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-amber-100">
                    Character Name
                  </label>
                  <input
                    type="text"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                    className="w-full rounded border border-amber-500/30 bg-slate-900 px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter a name..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-amber-100">
                    Character Role
                  </label>
                  <input
                    type="text"
                    value={propRole}
                    onChange={(e) => setPropRole(e.target.value)}
                    className="w-full rounded border border-amber-500/30 bg-slate-900 px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter a role..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <CharacterCard name={propName} role={propRole} />
              </div>
            </div>
          </div>

          <CodeBlock>{`function Character({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// Different props = different output
<Character name="${propName}" role="${propRole}" />`}</CodeBlock>
        </div>
      ),
    },
    {
      title: "Building the Narrative",
      content: `Kujan presses forward, his questions coming faster now. "Who was running the operation? Who was pulling the strings?"

Verbal's gaze drifts—casually, almost imperceptibly—to the bulletin board. A photograph. A name beneath it: KOBAYASHI.

"His name was Kobayashi," Verbal says, his voice gaining confidence. "He was Keyser Söze's lawyer. He came to us with the job."

Kujan scribbles notes. He doesn't see what Verbal sees: the coffee mug on the desk, the brand name printed in bold letters. KOBAYASHI PORCELAIN.

Verbal doesn't hardcode. He adapts. Taking the props (Kujan's questions) and the context (the room's contents) and generating output that fits both.`,
      demo: () => {
        const DynamicComponent = componentMap[componentType];
        const sampleData = {
          character: { name: "Kobayashi", role: "Keyser Söze's Lawyer" },
          location: {
            name: "San Pedro Harbor",
            description: "Where the boat was docked",
          },
          event: { name: "The Lineup", date: "Six weeks ago" },
        };

        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-6">
              <h3 className="mb-4 text-2xl font-bold text-amber-100">
                The Coffee Cup: Dynamic Component Selection
              </h3>
              <p className="mb-6 text-amber-200/80">
                Select a component type and watch React dynamically choose which
                component to render. The component map pattern in action.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="mb-2 block text-sm font-semibold text-amber-100">
                    Component Type
                  </label>
                  <select
                    value={componentType}
                    onChange={(e) =>
                      setComponentType(
                        e.target.value as "character" | "location" | "event",
                      )
                    }
                    className="w-full rounded border border-amber-500/30 bg-slate-900 px-4 py-2 text-amber-100 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="character">Character</option>
                    <option value="location">Location</option>
                    <option value="event">Event</option>
                  </select>

                  <div className="mt-4 rounded border border-amber-500/20 bg-slate-900/50 p-4">
                    <p className="text-sm text-amber-200/70">
                      <span className="font-semibold text-amber-100">
                        Selected:
                      </span>{" "}
                      {componentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <DynamicComponent {...sampleData[componentType]} />
                </div>
              </div>
            </div>

            <CodeBlock>{`const componentMap = {
  character: CharacterCard,
  location: LocationCard,
  event: EventCard
};

function DynamicRenderer({ type, data }) {
  const Component = componentMap[type];
  return <Component {...data} />;
}

// Current: <${componentType === "character" ? "CharacterCard" : componentType === "location" ? "LocationCard" : "EventCard"} />`}</CodeBlock>
          </div>
        );
      },
    },
    {
      title: "The Complexity Deepens",
      content: `Kujan slams his hand on the table. "I don't believe you, Verbal. Keaton's dead. They're all dead. And you're sitting here spinning fairy tales."

Verbal flinches, but his eyes never stop moving. Scanning. Processing. Adapting.

"Tell me about the boat," Kujan demands. "The one in the harbor."

Verbal's eyes scan the room. A poster on the wall—a shipping company advertisement. SAN PEDRO HARBOR.

"It was docked in San Pedro," Verbal says smoothly. "That's where we met Kobayashi."

He's pulling from multiple context sources now—not just one bulletin board or one coffee mug, but the entire environment. Each question triggers a scan of available data, a selection of the most relevant detail, a rendering of an answer that fits.`,
      demo: () => {
        const selectedData = useMemo(() => {
          return environmentItems.filter((item) =>
            selectedItems.includes(item.id),
          );
        }, [selectedItems]);

        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-6">
              <h3 className="mb-4 text-2xl font-bold text-amber-100">
                The Story Builder: Multiple Context Sources
              </h3>
              <p className="mb-6 text-amber-200/80">
                Select items from the "environment" and watch the story
                dynamically assemble from multiple data sources. Context-driven
                rendering.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <label className="mb-2 block text-sm font-semibold text-amber-100">
                    Environment Items
                  </label>
                  <div className="space-y-2">
                    {environmentItems.map((item) => (
                      <label
                        key={item.id}
                        className="flex cursor-pointer items-center gap-3 rounded border border-amber-500/20 bg-slate-900 p-3 transition-colors hover:border-amber-500/40"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id]);
                            } else {
                              setSelectedItems(
                                selectedItems.filter((id) => id !== item.id),
                              );
                            }
                          }}
                          className="h-4 w-4"
                        />
                        <span className="text-amber-100">{item.id}</span>
                        <span className="ml-auto text-sm text-amber-200/50">
                          {item.type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="mb-3 text-sm font-semibold text-amber-100">
                    Rendered Story Elements:
                  </p>
                  {selectedData.length === 0 ? (
                    <p className="italic text-amber-200/50">
                      Select items to build the story...
                    </p>
                  ) : (
                    selectedData.map((item) => {
                      const Component =
                        componentMap[item.type as keyof typeof componentMap];
                      return <Component key={item.id} {...item.data} />;
                    })
                  )}
                </div>
              </div>
            </div>

            <CodeBlock>{`function DynamicStory({ environment }) {
  const relevantData = environment.scan();
  
  return (
    <div>
      {relevantData.map(item => {
        const Component = selectComponent(item.type);
        return <Component key={item.id} {...item.data} />;
      })}
    </div>
  );
}`}</CodeBlock>
          </div>
        );
      },
    },
    {
      title: "The Revelation",
      content: `Verbal stands, his limp pronounced as he shuffles toward the door. "Am I free to go?"

Kujan waves him off, distracted, still poring over his notes. "Yeah. Get out of here."

The door closes. Verbal limps down the hallway, past the bulletin board, past the coffee station, past the evidence room.

And then—

Kujan's eyes land on the bulletin board behind where he was sitting. Really sees it for the first time.

KOBAYASHI PORCELAIN. The coffee mug.
REDFOOT. A name on a file folder.
GUATEMALA. A shipping manifest.
SAN PEDRO. A poster on the wall.

His blood runs cold.

"Oh my God."

Keyser Söze—the villain, the mastermind, the boogeyman—was a conditionally rendered component. He only existed when the props demanded a villain. When the story needed a face, Verbal pulled from the sketch on the poster.`,
      demo: () => (
        <div className="space-y-6">
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-6">
            <h3 className="mb-4 text-2xl font-bold text-amber-100">
              The Keyser Söze Principle: Conditional Rendering
            </h3>
            <p className="mb-6 text-amber-200/80">
              Toggle the villain's existence. When the condition is false, the
              component doesn't just hide—it doesn't exist in the component tree
              at all.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <button
                  onClick={() => setShowVillain(!showVillain)}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-amber-500/30 bg-amber-900/30 px-6 py-4 font-semibold text-amber-100 transition-all hover:border-amber-500 hover:bg-amber-800/40"
                >
                  {showVillain ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5 opacity-30" />
                  )}
                  {showVillain ? "Hide Keyser Söze" : "Reveal Keyser Söze"}
                </button>

                <div className="rounded border border-amber-500/20 bg-slate-900/50 p-4">
                  <p className="text-sm text-amber-200/70">
                    <span className="font-semibold text-amber-100">
                      Component exists:
                    </span>{" "}
                    {showVillain ? "true" : "false"}
                  </p>
                  <p className="mt-2 text-xs text-amber-200/50">
                    {showVillain
                      ? "The villain component is mounted in the React tree"
                      : "The villain component does not exist—not hidden, but unmounted"}
                  </p>
                </div>
              </div>

              <div className="flex min-h-[200px] items-center justify-center">
                {showVillain ? (
                  <div className="animate-in fade-in rounded-lg border border-red-500/50 bg-slate-900 p-6 duration-300">
                    <div className="mb-3 flex items-center gap-3">
                      <Eye className="h-6 w-6 text-red-500" />
                      <h3 className="text-2xl font-bold text-red-100">
                        Keyser Söze
                      </h3>
                    </div>
                    <p className="text-red-200/70">
                      The greatest trick the devil ever pulled was convincing
                      the world he didn't exist.
                    </p>
                  </div>
                ) : (
                  <div className="text-center italic text-amber-200/30">
                    Component not rendered
                  </div>
                )}
              </div>
            </div>
          </div>

          <CodeBlock>{`function Story({ needsVillain }) {
  return (
    <div>
      {/* Other story elements */}
      {needsVillain && <Villain name="Keyser Söze" />}
    </div>
  );
}

// Current: needsVillain = ${showVillain}
// Villain component ${showVillain ? "EXISTS" : "DOES NOT EXIST"} in tree`}</CodeBlock>
        </div>
      ),
    },
    {
      title: "The Greatest Trick",
      content: `The interrogation room is empty now. The bulletin board still hangs on the wall, its pins and papers undisturbed. The coffee mug sits on the desk, the name KOBAYASHI still visible.

The props are still there. The context hasn't changed.

But the story is gone.

Because the story was never a fixed thing. It was a render—a dynamic generation of output based on inputs. And when the inputs stopped (when Kujan stopped asking questions), when the rendering function unmounted (when Verbal left), the output disappeared.

This is the essence of dynamic component rendering in React.

The greatest trick the devil ever pulled was convincing the world he didn't exist.

The greatest power of dynamic rendering is convincing the user that the component was always there—when in reality, you just rendered it, right now, from the data at hand.`,
      demo: () => (
        <div className="space-y-6">
          <div className="rounded-lg border border-amber-500/30 bg-amber-900/10 p-6">
            <h3 className="mb-4 text-2xl font-bold text-amber-100">
              The Complete Pattern
            </h3>
            <p className="mb-6 text-amber-200/80">
              Dynamic rendering combines all these techniques: props-driven
              output, component selection, context awareness, and conditional
              existence.
            </p>

            <div className="grid gap-4">
              <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 p-4">
                <h4 className="mb-2 font-semibold text-amber-100">
                  ✓ Props-Driven Rendering
                </h4>
                <p className="text-sm text-amber-200/70">
                  Components adapt their output based on the props they receive
                </p>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 p-4">
                <h4 className="mb-2 font-semibold text-amber-100">
                  ✓ Dynamic Component Selection
                </h4>
                <p className="text-sm text-amber-200/70">
                  Choose which component to render using maps and variables
                </p>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 p-4">
                <h4 className="mb-2 font-semibold text-amber-100">
                  ✓ Context-Aware Rendering
                </h4>
                <p className="text-sm text-amber-200/70">
                  Pull from multiple data sources to build complex UIs
                </p>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 p-4">
                <h4 className="mb-2 font-semibold text-amber-100">
                  ✓ Conditional Existence
                </h4>
                <p className="text-sm text-amber-200/70">
                  Components that only exist when conditions are met
                </p>
              </div>
            </div>
          </div>

          <CodeBlock>{`// The complete dynamic rendering pattern
function VerbalStory({ questions, environment }) {
  return (
    <div>
      {questions.map(question => {
        // Scan environment for relevant data
        const data = environment.scan(question);
        
        // Dynamically select component type
        const Component = selectComponent(question.type);
        
        // Conditionally render if data exists
        return data ? (
          <Component key={question.id} {...data} />
        ) : null;
      })}
    </div>
  );
}

// The story adapts. It survives. It thrives.`}</CodeBlock>

          <div className="rounded-r-lg border-l-4 border-amber-500 bg-amber-900/20 p-6">
            <p className="text-lg italic text-amber-100">
              "The greatest trick the devil ever pulled was convincing the world
              he didn't exist."
            </p>
            <p className="mt-4 text-amber-200/70">
              The greatest power of dynamic rendering is that components don't
              need to exist until they're needed. Choose your props wisely. Scan
              your context carefully. Render dynamically.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 font-sans text-amber-100">
      <header className="sticky top-0 z-10 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex items-start gap-4">
            <Eye className="mt-1 h-8 w-8 flex-shrink-0 text-amber-500 sm:h-10 sm:w-10" />
            <div>
              <h1 className="mb-2 text-3xl font-bold text-amber-100 sm:text-4xl lg:text-5xl">
                The Usual Suspects
              </h1>
              <p className="text-base text-amber-200/70 sm:text-lg">
                Verbal Kint, Interrogation Room, 1995
              </p>
              <p className="mt-1 text-sm text-amber-500 sm:text-base">
                Dynamic Component Rendering
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-amber-100 sm:mb-6 sm:text-3xl">
            {currentChapter.title}
          </h2>

          <div className="prose prose-invert prose-amber mb-8 max-w-none sm:mb-12">
            <div className="whitespace-pre-line text-base leading-relaxed text-amber-200/90 sm:text-lg">
              {currentChapter.content}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12">{currentChapter.demo()}</div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-amber-500/20 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-900/30 px-4 py-2 font-semibold text-amber-100 transition-all hover:border-amber-500 hover:bg-amber-800/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-amber-500/30 disabled:hover:bg-amber-900/30 sm:px-6"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="text-center">
              <div className="text-sm font-semibold text-amber-100 sm:text-base">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="mt-2 flex gap-1 sm:gap-2">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-8 rounded-full transition-colors sm:w-12 ${
                      idx === chapter ? "bg-amber-500" : "bg-amber-500/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-900/30 px-4 py-2 font-semibold text-amber-100 transition-all hover:border-amber-500 hover:bg-amber-800/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-amber-500/30 disabled:hover:bg-amber-900/30 sm:px-6"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
