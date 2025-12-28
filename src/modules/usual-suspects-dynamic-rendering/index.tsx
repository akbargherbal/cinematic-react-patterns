import { useState, useMemo } from "react";
import { Eye, User, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

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
  <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      <User className="w-5 h-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{role}</p>
  </div>
);

const LocationCard = ({ name, description }: LocationCardProps) => (
  <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      <MapPin className="w-5 h-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{description}</p>
  </div>
);

const EventCard = ({ name, date }: EventCardProps) => (
  <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-4">
    <div className="flex items-center gap-3 mb-2">
      <Calendar className="w-5 h-5 text-amber-500" />
      <h3 className="text-xl font-bold text-amber-100">{name}</h3>
    </div>
    <p className="text-amber-200/70">{date}</p>
  </div>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="bg-slate-900 border border-amber-500/20 rounded-lg p-4 overflow-x-auto">
    <code className="text-amber-300 text-sm font-mono">{children}</code>
  </pre>
);

export default function UsualSuspectsDynamicRendering() {
  const [chapter, setChapter] = useState(0);
  
  // Chapter 0 demo state
  const [propName, setPropName] = useState("Kobayashi");
  const [propRole, setPropRole] = useState("Lawyer");
  
  // Chapter 1 demo state
  const [componentType, setComponentType] = useState<"character" | "location" | "event">("character");
  
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
    { id: "Kobayashi", type: "character", data: { name: "Kobayashi", role: "Lawyer" } },
    { id: "Redfoot", type: "character", data: { name: "Redfoot", role: "Fence" } },
    { id: "San Pedro", type: "location", data: { name: "San Pedro", description: "Harbor district" } },
    { id: "Guatemala", type: "location", data: { name: "Guatemala", description: "Cocaine source" } },
    { id: "The Lineup", type: "event", data: { name: "The Lineup", date: "Six weeks ago" } },
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
          <div className="bg-amber-900/10 border border-amber-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-amber-100 mb-4">The Bulletin Board: Props in Action</h3>
            <p className="text-amber-200/80 mb-6">
              Change the props below and watch the component render dynamically. Like Verbal reading from the bulletin board, the component adapts to what you give it.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-amber-100 mb-2 text-sm font-semibold">Character Name</label>
                  <input
                    type="text"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                    placeholder="Enter a name..."
                  />
                </div>
                <div>
                  <label className="block text-amber-100 mb-2 text-sm font-semibold">Character Role</label>
                  <input
                    type="text"
                    value={propRole}
                    onChange={(e) => setPropRole(e.target.value)}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
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
          location: { name: "San Pedro Harbor", description: "Where the boat was docked" },
          event: { name: "The Lineup", date: "Six weeks ago" },
        };
        
        return (
          <div className="space-y-6">
            <div className="bg-amber-900/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">The Coffee Cup: Dynamic Component Selection</h3>
              <p className="text-amber-200/80 mb-6">
                Select a component type and watch React dynamically choose which component to render. The component map pattern in action.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-amber-100 mb-2 text-sm font-semibold">Component Type</label>
                  <select
                    value={componentType}
                    onChange={(e) => setComponentType(e.target.value as "character" | "location" | "event")}
                    className="w-full bg-slate-900 border border-amber-500/30 rounded px-4 py-2 text-amber-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="character">Character</option>
                    <option value="location">Location</option>
                    <option value="event">Event</option>
                  </select>
                  
                  <div className="mt-4 p-4 bg-slate-900/50 rounded border border-amber-500/20">
                    <p className="text-amber-200/70 text-sm">
                      <span className="font-semibold text-amber-100">Selected:</span> {componentType}
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
          return environmentItems.filter(item => selectedItems.includes(item.id));
        }, [selectedItems]);
        
        return (
          <div className="space-y-6">
            <div className="bg-amber-900/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">The Story Builder: Multiple Context Sources</h3>
              <p className="text-amber-200/80 mb-6">
                Select items from the "environment" and watch the story dynamically assemble from multiple data sources. Context-driven rendering.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-amber-100 mb-2 text-sm font-semibold">Environment Items</label>
                  <div className="space-y-2">
                    {environmentItems.map(item => (
                      <label key={item.id} className="flex items-center gap-3 p-3 bg-slate-900 border border-amber-500/20 rounded cursor-pointer hover:border-amber-500/40 transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems([...selectedItems, item.id]);
                            } else {
                              setSelectedItems(selectedItems.filter(id => id !== item.id));
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-amber-100">{item.id}</span>
                        <span className="text-amber-200/50 text-sm ml-auto">{item.type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-amber-100 text-sm font-semibold mb-3">Rendered Story Elements:</p>
                  {selectedData.length === 0 ? (
                    <p className="text-amber-200/50 italic">Select items to build the story...</p>
                  ) : (
                    selectedData.map(item => {
                      const Component = componentMap[item.type as keyof typeof componentMap];
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
          <div className="bg-amber-900/10 border border-amber-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-amber-100 mb-4">The Keyser Söze Principle: Conditional Rendering</h3>
            <p className="text-amber-200/80 mb-6">
              Toggle the villain's existence. When the condition is false, the component doesn't just hide—it doesn't exist in the component tree at all.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <button
                  onClick={() => setShowVillain(!showVillain)}
                  className="w-full flex items-center justify-center gap-3 bg-amber-900/30 hover:bg-amber-800/40 border border-amber-500/30 hover:border-amber-500 rounded-lg px-6 py-4 text-amber-100 font-semibold transition-all"
                >
                  {showVillain ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5 opacity-30" />}
                  {showVillain ? "Hide Keyser Söze" : "Reveal Keyser Söze"}
                </button>
                
                <div className="p-4 bg-slate-900/50 rounded border border-amber-500/20">
                  <p className="text-amber-200/70 text-sm">
                    <span className="font-semibold text-amber-100">Component exists:</span> {showVillain ? "true" : "false"}
                  </p>
                  <p className="text-amber-200/50 text-xs mt-2">
                    {showVillain 
                      ? "The villain component is mounted in the React tree" 
                      : "The villain component does not exist—not hidden, but unmounted"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-center min-h-[200px]">
                {showVillain ? (
                  <div className="bg-slate-900 border border-red-500/50 rounded-lg p-6 animate-in fade-in duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Eye className="w-6 h-6 text-red-500" />
                      <h3 className="text-2xl font-bold text-red-100">Keyser Söze</h3>
                    </div>
                    <p className="text-red-200/70">The greatest trick the devil ever pulled was convincing the world he didn't exist.</p>
                  </div>
                ) : (
                  <div className="text-center text-amber-200/30 italic">
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
      {needsVillain &amp;&amp; <Villain name="Keyser Söze" />}
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
          <div className="bg-amber-900/10 border border-amber-500/30 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-amber-100 mb-4">The Complete Pattern</h3>
            <p className="text-amber-200/80 mb-6">
              Dynamic rendering combines all these techniques: props-driven output, component selection, context awareness, and conditional existence.
            </p>
            
            <div className="grid gap-4">
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-100 font-semibold mb-2">✓ Props-Driven Rendering</h4>
                <p className="text-amber-200/70 text-sm">Components adapt their output based on the props they receive</p>
              </div>
              
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-100 font-semibold mb-2">✓ Dynamic Component Selection</h4>
                <p className="text-amber-200/70 text-sm">Choose which component to render using maps and variables</p>
              </div>
              
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-100 font-semibold mb-2">✓ Context-Aware Rendering</h4>
                <p className="text-amber-200/70 text-sm">Pull from multiple data sources to build complex UIs</p>
              </div>
              
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-4">
                <h4 className="text-amber-100 font-semibold mb-2">✓ Conditional Existence</h4>
                <p className="text-amber-200/70 text-sm">Components that only exist when conditions are met</p>
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
          
          <div className="bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg p-6">
            <p className="text-amber-100 text-lg italic">
              "The greatest trick the devil ever pulled was convincing the world he didn't exist."
            </p>
            <p className="text-amber-200/70 mt-4">
              The greatest power of dynamic rendering is that components don't need to exist until they're needed. Choose your props wisely. Scan your context carefully. Render dynamically.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-amber-100 font-sans pb-24">
      <header className="border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-start gap-4">
            <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 mb-2">
                The Usual Suspects
              </h1>
              <p className="text-base sm:text-lg text-amber-200/70">Verbal Kint, Interrogation Room, 1995</p>
              <p className="text-sm sm:text-base text-amber-500 mt-1">Dynamic Component Rendering</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-4 sm:mb-6">
            {currentChapter.title}
          </h2>
          
          <div className="prose prose-invert prose-amber max-w-none mb-8 sm:mb-12">
            <div className="text-amber-200/90 leading-relaxed whitespace-pre-line text-base sm:text-lg">
              {currentChapter.content}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          {currentChapter.demo()}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-amber-500/20 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-amber-900/30 hover:bg-amber-800/40 border border-amber-500/30 hover:border-amber-500 rounded-lg text-amber-100 font-semibold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-amber-900/30 disabled:hover:border-amber-500/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="text-center">
              <div className="text-amber-100 font-semibold text-sm sm:text-base">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="flex gap-1 sm:gap-2 mt-2">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 w-8 sm:w-12 rounded-full transition-colors ${
                      idx === chapter ? "bg-amber-500" : "bg-amber-500/20"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-amber-900/30 hover:bg-amber-800/40 border border-amber-500/30 hover:border-amber-500 rounded-lg text-amber-100 font-semibold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-amber-900/30 disabled:hover:border-amber-500/30 transition-all"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}