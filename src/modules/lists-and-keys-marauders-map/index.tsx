import { useState, useEffect, useCallback, useMemo } from "react";
import { Map, Wand2, Users, AlertTriangle, CheckCircle, RefreshCw, Shuffle, UserPlus, UserMinus } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface HogwartsPerson {
  id: string; // Unique, stable identifier
  name: string;
  house: "Gryffindor" | "Slytherin" | "Ravenclaw" | "Hufflepuff" | "Staff" | "Other";
  location: string;
}

type KeyMode = "position" | "identity";

// Initial data - the inhabitants of Hogwarts
const INITIAL_PEOPLE: HogwartsPerson[] = [
  { id: "snape", name: "Severus Snape", house: "Staff", location: "Dungeons" },
  { id: "norris", name: "Mrs. Norris", house: "Other", location: "Dungeons" },
  { id: "peeves", name: "Peeves", house: "Other", location: "Dungeons" },
  { id: "dumbledore", name: "Albus Dumbledore", house: "Staff", location: "Headmaster's Tower" },
  { id: "mcgonagall", name: "Minerva McGonagall", house: "Staff", location: "Transfiguration Classroom" },
  { id: "hagrid", name: "Rubeus Hagrid", house: "Staff", location: "Grounds" },
  { id: "potter", name: "Harry Potter", house: "Gryffindor", location: "Gryffindor Tower" },
  { id: "granger", name: "Hermione Granger", house: "Gryffindor", location: "Library" },
  { id: "weasley-r", name: "Ron Weasley", house: "Gryffindor", location: "Gryffindor Tower" },
  { id: "malfoy", name: "Draco Malfoy", house: "Slytherin", location: "Slytherin Dungeon" },
];

// House colors for UI
const HOUSE_COLORS: Record<HogwartsPerson["house"], string> = {
  Gryffindor: "bg-gradient-to-r from-red-700 to-amber-600",
  Slytherin: "bg-gradient-to-r from-emerald-700 to-slate-800",
  Ravenclaw: "bg-gradient-to-r from-blue-700 to-bronze-500",
  Hufflepuff: "bg-gradient-to-r from-yellow-600 to-black",
  Staff: "bg-gradient-to-r from-purple-700 to-gray-600",
  Other: "bg-gradient-to-r from-gray-600 to-gray-800",
};

export default function ListsAndKeysMaraudersMap(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [people, setPeople] = useState<HogwartsPerson[]>(INITIAL_PEOPLE);
  const [keyMode, setKeyMode] = useState<KeyMode>("position");
  const [glitchCount, setGlitchCount] = useState<number>(0);
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const [listParent] = useAutoAnimate();

  // Circuit breaker: reset if glitches get too high
  useEffect(() => {
    if (glitchCount >= 50) {
      resetDemo();
      alert("⚡ Circuit Breaker: Too many glitches detected! The map has been reset.");
    }
  }, [glitchCount]);

  // Chapter definitions
  const chapters = [
    {
      title: "Mischief Managed, One Dot at a Time",
      content: "Fred and George unveil the Marauder's Map for the first time. In the quiet dungeons, three dots appear perfectly labeled: Severus Snape, Mrs. Norris, and Peeves. The magic seems flawless—each person rendered as a stable dot on the parchment. This establishes the baseline: rendering a list from data.",
    },
    {
      title: "The Chaos of the Corridors",
      content: "Testing during the chaotic class change reveals the flaw. The map uses a 'Positional Charm'—tracking dots by their order, not their identity. When students move or leave a queue, names flicker and swap. 'It's tracking the spot on the floor, not the wizard on the spot!' The index-based key strategy creates cascading errors.",
    },
    {
      title: "The Identity Charm",
      content: "George discovers the solution in the library: 'Charms of True Identity' vs. 'Charms of Ordinality.' They recast the spell: 'Hominem Revelio Nominatim!' Now each dot is bound to a person's unique magical signature. When a student leaves, their dot vanishes cleanly—others remain correctly labeled. The magic knows who it's watching.",
    },
    {
      title: "Position Versus Person",
      content: "A direct comparison proves the point. With the Positional Charm, the Great Hall dinner rush is pandemonium—names flicker as people move. With the Identity Charm, the same scene is a ballet of perfect data. Dumbledore's dot remains 'Albus Dumbledore' no matter who passes. One tracks position; the other tracks the person.",
    },
    {
      title: "The Secret of the Magic",
      content: "Months later, the perfected map flawlessly tracks hundreds. They see 'Peter Pettigrew' beside Ron—a detail they'd have dismissed as a glitch before. As they pass the map to Harry, they share the core wisdom: 'The magic must know who it's watching, not just where. A name is forever. A position is for a moment.'",
    },
  ];

  // List manipulation functions
  const addPerson = useCallback(() => {
    if (people.length >= 20) {
      alert("The map cannot track more than 20 people at once!");
      return;
    }
    const newId = `new-${Date.now()}`;
    const houses: HogwartsPerson["house"][] = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];
    const locations = ["Great Hall", "Moving Staircase", "Library", "Quidditch Pitch", "Corridor"];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    
    setPeople(prev => [
      ...prev,
      { id: newId, name: `Student ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`, house: randomHouse, location: randomLocation }
    ]);
  }, [people.length]);

  const removePerson = useCallback((index: number) => {
    setPeople(prev => {
      const newList = [...prev];
      newList.splice(index, 1);
      
      // If using position keys and removing, increment glitch counter
      if (keyMode === "position" && prev.length > 0) {
        setGlitchCount(c => c + 1);
        setIsFlickering(true);
        setTimeout(() => setIsFlickering(false), 500);
      }
      
      return newList;
    });
  }, [keyMode]);

  const shuffleList = useCallback(() => {
    setPeople(prev => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      
      // If using position keys and shuffling, increment glitch counter
      if (keyMode === "position") {
        setGlitchCount(c => c + 5); // Shuffling causes multiple glitches
        setIsFlickering(true);
        setTimeout(() => setIsFlickering(false), 800);
      }
      
      return shuffled;
    });
  }, [keyMode]);

  const resetDemo = useCallback(() => {
    setPeople(INITIAL_PEOPLE);
    setGlitchCount(0);
    setIsFlickering(false);
  }, []);

  // Code examples for display
  const indexKeyCode = `// ❌ The Positional Charm (Anti-Pattern)
{people.map((person, index) => (
  <PersonDot key={index} person={person} />
))}`;

  const stableKeyCode = `// ✅ The Identity Charm (Solution)
{people.map((person) => (
  <PersonDot key={person.id} person={person} />
))}`;

  const currentChapter = chapters[chapter];

  // Demo content per chapter
  const renderChapterDemo = () => {
    switch (chapter) {
      case 0: // Chapter 1: Static list
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold">Dungeon Inhabitants (Static)</h3>
              </div>
              <span className="text-sm text-slate-400">Both charms appear to work</span>
            </div>
            
            <div className="space-y-4">
              <CodeBlock
                code={indexKeyCode}
                variant="default"
                title="// Rendering with Array Index"
                defaultExpanded={true}
              />
              <CodeBlock
                code={stableKeyCode}
                variant="default"
                title="// Rendering with Stable ID"
                defaultExpanded={true}
              />
            </div>
            
            <div className="bg-amber-950/30 border border-amber-600/30 rounded-lg p-4">
              <p className="text-sm text-amber-200 mb-3">
                In a static, unchanging list, even index keys <em>appear</em> to work correctly.
                The danger is hidden until the list changes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3" ref={listParent}>
                {people.slice(0, 3).map((person, index) => (
                  <div
                    key={keyMode === "position" ? index : person.id}
                    className="flex items-center gap-3 p-3 bg-slate-900/50 rounded border border-slate-700"
                  >
                    <div className={`w-3 h-3 rounded-full ${HOUSE_COLORS[person.house]}`} />
                    <div>
                      <div className="font-medium">{person.name}</div>
                      <div className="text-xs text-slate-400">{person.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 1: // Chapter 2: Anti-pattern demonstration
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold">The Positional Charm Fails</h3>
              </div>
              <button
                onClick={() => setKeyMode("position")}
                className={`px-3 py-1 rounded text-sm font-medium ${keyMode === "position" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
              >
                ❌ Position Mode
              </button>
            </div>
            
            <CodeBlock
              code={indexKeyCode}
              variant="error"
              title="// ❌ Using Index as Key (Bug Source)"
              defaultExpanded={true}
            />
            
            <div className={`border-2 rounded-lg p-4 transition-all duration-300 ${isFlickering ? "border-red-500/60 bg-red-950/20" : "border-red-500/30 bg-amber-950/20"}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm">
                  <span className="text-red-400">Glitch Counter:</span>{" "}
                  <span className="font-mono font-bold text-red-300">{glitchCount}</span>
                  <span className="text-slate-400 text-xs ml-2">(Resets at 50)</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => removePerson(0)}
                    className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded text-sm flex items-center gap-1"
                  >
                    <UserMinus className="w-4 h-4" />
                    Remove First
                  </button>
                  <button
                    onClick={shuffleList}
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded text-sm flex items-center gap-1"
                  >
                    <Shuffle className="w-4 h-4" />
                    Shuffle
                  </button>
                </div>
              </div>
              
              <div className="space-y-2" ref={listParent}>
                {people.map((person, index) => (
                  <div
                    key={keyMode === "position" ? index : person.id}
                    className={`flex items-center gap-3 p-3 rounded border transition-all ${isFlickering && index < 3 ? "border-red-400/50 bg-red-950/30" : "border-slate-700 bg-slate-900/50"}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${HOUSE_COLORS[person.house]}`} />
                    <div className="flex-1">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-xs text-slate-400">{person.location}</div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {keyMode === "position" ? `index:${index}` : `id:${person.id.slice(0, 4)}`}
                    </div>
                    <button
                      onClick={() => removePerson(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-red-950/40 border border-red-700/30 rounded">
                <p className="text-sm text-red-200">
                  <strong>Bug Manifestation:</strong> When you remove the first person, React reuses the DOM node. The label updates but state attached to that position may persist incorrectly. The map "glitches."
                </p>
              </div>
            </div>
          </div>
        );
      
      case 2: // Chapter 3: Solution demonstration
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="text-lg font-semibold">The Identity Charm Works</h3>
              </div>
              <button
                onClick={() => setKeyMode("identity")}
                className={`px-3 py-1 rounded text-sm font-medium ${keyMode === "identity" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
              >
                ✅ Identity Mode
              </button>
            </div>
            
            <CodeBlock
              code={stableKeyCode}
              variant="success"
              title="// ✅ Using Stable ID as Key (Solution)"
              defaultExpanded={true}
            />
            
            <div className="border-2 border-emerald-500/30 bg-emerald-950/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm">
                  <span className="text-emerald-400">Stability:</span>{" "}
                  <span className="font-mono font-bold text-emerald-300">Perfect</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addPerson}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-sm flex items-center gap-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Student
                  </button>
                  <button
                    onClick={() => removePerson(Math.floor(Math.random() * people.length))}
                    className="px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white rounded text-sm"
                  >
                    Remove Random
                  </button>
                </div>
              </div>
              
              <div className="space-y-2" ref={listParent}>
                {people.map((person, index) => (
                  <div
                    key={keyMode === "position" ? index : person.id}
                    className="flex items-center gap-3 p-3 border border-slate-700 bg-slate-900/50 rounded"
                  >
                    <div className={`w-3 h-3 rounded-full ${HOUSE_COLORS[person.house]}`} />
                    <div className="flex-1">
                      <div className="font-medium">{person.name}</div>
                      <div className="text-xs text-slate-400">{person.location}</div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {keyMode === "position" ? `index:${index}` : `id:${person.id.slice(0, 4)}`}
                    </div>
                    <button
                      onClick={() => removePerson(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-700/30 rounded">
                <p className="text-sm text-emerald-200">
                  <strong>How it works:</strong> Each person has a stable <code>id</code>. React tracks the element by this ID, not its position. When list changes, React correctly adds/removes/moves the right DOM nodes. No glitches.
                </p>
              </div>
            </div>
          </div>
        );
      
      case 3: // Chapter 4: Side-by-side comparison
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold">Direct Comparison</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setKeyMode("position")}
                  className={`px-3 py-1 rounded text-sm font-medium ${keyMode === "position" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
                >
                  ❌ Position
                </button>
                <button
                  onClick={() => setKeyMode("identity")}
                  className={`px-3 py-1 rounded text-sm font-medium ${keyMode === "identity" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300"}`}
                >
                  ✅ Identity
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <CodeBlock
                  code={indexKeyCode}
                  variant="error"
                  title="// Positional Charm (Index Key)"
                  defaultExpanded={true}
                />
                <div className="border-2 border-red-500/30 bg-red-950/20 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-900/50 rounded-full">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Chaotic & Unreliable</span>
                    </div>
                  </div>
                  <p className="text-sm text-red-200 mb-3">
                    Tracks positions, not people. Causes state corruption, performance issues, and UI glitches when list changes.
                  </p>
                  <div className="text-xs text-slate-400">
                    Try adding/removing items while in Position mode to see the glitches.
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <CodeBlock
                  code={stableKeyCode}
                  variant="success"
                  title="// Identity Charm (Stable Key)"
                  defaultExpanded={true}
                />
                <div className="border-2 border-emerald-500/30 bg-emerald-950/20 rounded-lg p-4">
                  <div className="text-center mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/50 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Stable & Accurate</span>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-200 mb-3">
                    Tracks people by unique identity. Enables correct list mutations, optimal performance, and predictable UI updates.
                  </p>
                  <div className="text-xs text-slate-400">
                    Same operations, but no glitches. Each element is properly tracked.
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="text-amber-400">Current Key Strategy:</span>{" "}
                  <span className={`font-bold ${keyMode === "position" ? "text-red-400" : "text-emerald-400"}`}>
                    {keyMode === "position" ? "Positional Charm (Index)" : "Identity Charm (Stable ID)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addPerson}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Student
                  </button>
                  <button
                    onClick={shuffleList}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded flex items-center gap-2"
                  >
                    <Shuffle className="w-4 h-4" />
                    Shuffle All
                  </button>
                  <button
                    onClick={resetDemo}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 4: // Chapter 5: Summary
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold">The Perfected Map</h3>
              </div>
              <div className="text-sm text-emerald-400 font-medium">
                ✅ Identity Charm Active
              </div>
            </div>
            
            <CodeBlock
              code={`// ✅ Production-Ready List Rendering
interface Student {
  id: string; // Stable, unique, persistent
  name: string;
  house: string;
}

function HogwartsRoster({ students }: { students: Student[] }) {
  return (
    <div>
      {students.map((student) => (
        <StudentCard 
          key={student.id} // ✅ Unique and stable
          student={student}
        />
      ))}
    </div>
  );
}`}
              variant="success"
              title="// The Final Lesson: Always Use Stable Keys"
              defaultExpanded={true}
            />
            
            <div className="border-2 border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-slate-900/30 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" ref={listParent}>
                {people.map((person) => (
                  <div
                    key={person.id}
                    className="group p-4 bg-slate-900/60 border border-slate-700 rounded-lg hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={`w-8 h-8 rounded-full ${HOUSE_COLORS[person.house]} flex items-center justify-center`}>
                        <span className="text-xs font-bold text-white">
                          {person.house.charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-amber-400/70 bg-amber-950/30 px-2 py-1 rounded">
                        ID: {person.id.slice(0, 6)}
                      </div>
                    </div>
                    <div className="font-bold text-lg mb-1">{person.name}</div>
                    <div className="text-sm text-slate-300">{person.house}</div>
                    <div className="text-xs text-slate-400 mt-2">{person.location}</div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-amber-700/30 pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-amber-300 font-bold text-lg mb-1">A name is forever. A position is for a moment.</div>
                    <p className="text-sm text-amber-200/80">
                      The map now flawlessly tracks {people.length} inhabitants. Each is uniquely identified,
                      allowing perfect updates no matter how the castle changes.
                    </p>
                  </div>
                  <button
                    onClick={resetDemo}
                    className="px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset & Practice Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-amber-950/20 text-slate-300 font-serif">
      <header className="border-b border-amber-900/50 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <Map className="text-amber-500 w-8 h-8 flex-shrink-0" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">The Marauder's Map</h1>
                <p className="text-base md:text-lg text-amber-400 font-medium">
                  React Lists & Keys
                </p>
              </div>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Harry Potter • Fred & George • 2004
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Explanations */}
          <div className="lg:col-span-7 mb-12 lg:mb-0">
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <div className="bg-gradient-to-r from-amber-950/30 to-transparent p-6 rounded-xl border border-amber-700/30 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-100 mb-4">
                  {currentChapter.title}
                </h2>
                <p className="leading-relaxed text-amber-50/90">{currentChapter.content}</p>
              </div>
              
              {/* Chapter-specific insights */}
              {chapter === 1 && (
                <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-bold text-red-200">The Bug Explained</h3>
                  </div>
                  <p className="text-red-100/90">
                    When React uses array indices as keys and you remove the first item, it thinks the <em>second</em> item is now the <em>first</em>. It updates the DOM node in place instead of removing it. Any state (like form inputs, animations) attached to that DOM node persists incorrectly.
                  </p>
                </div>
              )}
              
              {chapter === 2 && (
                <div className="bg-emerald-950/20 border border-emerald-700/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-emerald-200">The Solution Explained</h3>
                  </div>
                  <p className="text-emerald-100/90">
                    A stable key (like a database ID) tells React "this element represents this specific data item." When the list changes, React can correctly match old elements to new data, preserving DOM nodes and their state only when appropriate.
                  </p>
                </div>
              )}
              
              {chapter === 4 && (
                <div className="bg-amber-950/20 border border-amber-700/30 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Wand2 className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-bold text-amber-200">Key Rules to Remember</h3>
                  </div>
                  <ul className="space-y-2 text-amber-100/90">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span><strong>Keys must be unique</strong> among siblings (don't use random numbers in render)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span><strong>Keys must be stable</strong> across re-renders (don't use array indices if list changes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span><strong>Keys help React identify items</strong> for efficient updates, not just for React's sake</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">✓</span>
                      <span>When you don't have a natural ID, generate one <em>outside</em> of render (e.g., when fetching data)</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            
            {/* Chapter Navigation */}
            <nav className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <span>← Previous</span>
              </button>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  {Array.from({ length: chapters.length }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === chapter ? "bg-amber-500" : "bg-slate-700"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-400 font-mono">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
              </div>
              
              <button
                onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                disabled={chapter === chapters.length - 1}
                className="px-5 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
              >
                <span>Next →</span>
              </button>
            </nav>
          </div>
          
          {/* Right Column: Interactive Demo (Sticky on desktop) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl shadow-amber-900/10 overflow-hidden">
                <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-900/30 rounded-lg">
                        <Wand2 className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">Interactive Map</h3>
                        <p className="text-sm text-slate-400">Test the charms yourself</p>
                      </div>
                    </div>
                    <div className="text-xs px-3 py-1 bg-slate-800 rounded-full">
                      {people.length} inhabitants
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {renderChapterDemo()}
                </div>
                
                <div className="border-t border-slate-800 bg-slate-950/50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-500">
                      Glitches: <span className={`font-mono ${glitchCount > 0 ? "text-red-400" : "text-emerald-400"}`}>{glitchCount}</span>
                    </div>
                    <button
                      onClick={resetDemo}
                      className="text-sm px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}