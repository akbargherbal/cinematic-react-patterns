import {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Zap,
  Users,
  Cpu,
  Home,
  Shield,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// ========== CONTEXT DEFINITIONS ==========
interface ForceValue {
  user: string;
  theme: "light" | "dark";
  targetingData: string;
  spoonAvailable: boolean;
  updateTargetingData: (data: string) => void;
  toggleTheme: () => void;
  useSpoon: () => void;
}

const ForceContext = createContext<ForceValue | undefined>(undefined);

// Prop drilling version - no context
const PropDrillingContext = createContext<{ mode: "drilling" | "context" }>({
  mode: "drilling",
});

// ========== CHAPTER DATA ==========
interface Chapter {
  title: string;
  content: string;
  icon: ReactNode;
  demo: ReactNode;
}

// ========== COMPONENTS FOR DEMOS ==========
interface JediComponentProps {
  name: string;
  level: number;
  dataCrystal?: string;
  onPassCrystal?: (data: string) => void;
  children?: ReactNode;
}

function JediComponent({
  name,
  level,
  dataCrystal,
  onPassCrystal,
  children,
}: JediComponentProps) {
  const [animationParent] = useAutoAnimate();

  return (
    <div
      ref={animationParent}
      className={`rounded-lg border p-4 ${level === 0 ? "border-blue-500/50 bg-blue-950/40" : "border-slate-700/50 bg-slate-900/40"}`}
    >
      <div className="mb-2 flex items-center gap-3">
        <div
          className={`rounded p-2 ${level === 0 ? "bg-blue-900/50" : "bg-slate-800/50"}`}
        >
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs text-slate-400">Level {level} component</div>
        </div>
      </div>

      {dataCrystal && (
        <div className="mt-3 animate-pulse rounded border border-amber-500/50 bg-amber-950/30 p-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-400" />
            <span className="font-mono text-sm">
              Data Crystal: "{dataCrystal}"
            </span>
          </div>
          {onPassCrystal && (
            <button
              onClick={() => onPassCrystal(dataCrystal)}
              className="mt-2 rounded bg-amber-600 px-3 py-1 text-sm text-white transition-colors hover:bg-amber-700"
            >
              Pass Down
            </button>
          )}
        </div>
      )}

      {children && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );
}

function JediWithForce({
  name,
  level,
  accessType,
}: {
  name: string;
  level: number;
  accessType: "force" | "local";
}) {
  const force = useContext(ForceContext);
  const [localSpoon, setLocalSpoon] = useState(true);

  return (
    <div
      className={`rounded-lg border p-4 ${accessType === "force" ? "border-emerald-500/50 bg-emerald-950/40" : "border-purple-500/50 bg-purple-950/40"}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`rounded p-2 ${accessType === "force" ? "bg-emerald-900/50" : "bg-purple-900/50"}`}
          >
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="text-xs text-slate-400">Level {level}</div>
          </div>
        </div>

        <div className="rounded bg-slate-800/50 px-2 py-1 text-xs">
          {accessType === "force" ? "useContext()" : "useState()"}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {accessType === "force" && force ? (
          <>
            <div className="text-sm">
              Theme: <span className="font-mono">{force.theme}</span>
            </div>
            <div className="text-sm">
              Targeting:{" "}
              <span className="font-mono">{force.targetingData}</span>
            </div>
            <div className="text-sm">
              Spoon:{" "}
              <span
                className={`font-mono ${force.spoonAvailable ? "text-emerald-400" : "text-red-400"}`}
              >
                {force.spoonAvailable ? "Available" : "Used"}
              </span>
            </div>
            <button
              onClick={force.useSpoon}
              className="mt-2 rounded bg-emerald-600 px-3 py-1 text-sm text-white transition-colors hover:bg-emerald-700 disabled:opacity-30"
              disabled={!force.spoonAvailable}
            >
              Use Spoon (Force)
            </button>
          </>
        ) : (
          <>
            <div className="text-sm">
              Local Spoon:{" "}
              <span
                className={`font-mono ${localSpoon ? "text-purple-400" : "text-red-400"}`}
              >
                {localSpoon ? "Available" : "Used"}
              </span>
            </div>
            <button
              onClick={() => setLocalSpoon(false)}
              className="mt-2 rounded bg-purple-600 px-3 py-1 text-sm text-white transition-colors hover:bg-purple-700 disabled:opacity-30"
              disabled={!localSpoon}
            >
              Use Spoon (Local)
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ========== MAIN MODULE COMPONENT ==========
export default function TheForceIsTheContext() {
  const [chapter, setChapter] = useState<number>(0);
  const [forceUser, setForceUser] = useState<string>("Jedi Council");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [targetingData, setTargetingData] =
    useState<string>("Alpha-3 Protocol");
  const [spoonAvailable, setSpoonAvailable] = useState<boolean>(true);

  // Prop drilling simulation state
  const [dataCrystal, setDataCrystal] = useState<string>("");
  const [drillingPath, setDrillingPath] = useState<string[]>([
    "Archives",
    "Master Zenn",
    "Knight Jorli",
    "Droid Bay",
  ]);
  const [currentHandoff, setCurrentHandoff] = useState<number>(0);
  const [handoffCount, setHandoffCount] = useState<number>(0);
  const [fumbledHandoffs, setFumbledHandoffs] = useState<number>(0);

  // Demo mode
  const [demoMode, setDemoMode] = useState<"drilling" | "context">("drilling");
  const [renderCount, setRenderCount] = useState<number>(0);

  // Circuit breaker
  useEffect(() => {
    if (handoffCount > 50) {
      setHandoffCount(0);
      setFumbledHandoffs(0);
      setCurrentHandoff(0);
      setDataCrystal("");
    }
  }, [handoffCount]);

  const forceValue: ForceValue = useMemo(
    () => ({
      user: forceUser,
      theme,
      targetingData,
      spoonAvailable,
      updateTargetingData: (data: string) => setTargetingData(data),
      toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      useSpoon: () => setSpoonAvailable(false),
    }),
    [forceUser, theme, targetingData, spoonAvailable],
  );

  const startPropDrill = () => {
    setDataCrystal("Gamma-7 Targeting Update");
    setCurrentHandoff(0);
    setHandoffCount((h) => h + 1);
  };

  const passCrystal = () => {
    if (currentHandoff < drillingPath.length - 1) {
      // 20% chance to fumble
      if (Math.random() < 0.2) {
        setFumbledHandoffs((f) => f + 1);
        return;
      }
      setCurrentHandoff((c) => c + 1);
      setHandoffCount((h) => h + 1);
    } else {
      // Reached destination
      setTimeout(() => {
        setDataCrystal("");
        setCurrentHandoff(0);
      }, 2000);
    }
  };

  const resetDemos = () => {
    setDataCrystal("");
    setCurrentHandoff(0);
    setHandoffCount(0);
    setFumbledHandoffs(0);
    setTargetingData("Alpha-3 Protocol");
    setSpoonAvailable(true);
    setRenderCount(0);
  };

  // Render count effect
  useEffect(() => {
    setRenderCount((r) => r + 1);
  }, [theme, targetingData, spoonAvailable]);

  const chapters: Chapter[] = [
    {
      title: "The Pervasive Field",
      content:
        'The air in the training grounds of the Coruscant Jedi Temple hummed with a low, resonant energy. Padawan Anya stood near the polished stone archway, watching her Master, Kai. He wasn\'t sparring or practicing acrobatic forms. He stood perfectly still, eyes closed, in the center of a circle of a dozen jagged training stones. Slowly, in perfect unison, they began to rise. They hovered, rotating gently, suspended by an invisible power. Anya knew he wasn\'t lifting each one individually; he was tapped into the field that connected them all, issuing a single intention that they all obeyed.\n\nLater, walking with him through the Temple\'s Grand Hall, the scale of her world pressed in on her. The hall was a massive space that contained smaller components: archways leading to libraries, lifts descending to archives, doorways opening into meditation chambers. Each space was nested within another, a tree of immense complexity.\n\nThey stopped before a window overlooking the sprawling city-planet. "You saw the stones, Anya," Kai said. "I did not need a separate thread for each one. I simply provided my intent to the space they all shared." He gestured to the galaxy beyond. "The Force is like that. It is an energy field that surrounds us, penetrates us; it binds the galaxy together. It is the context of our existence."',
      icon: <Brain className="h-6 w-6 text-blue-400" />,
      demo: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">The Temple</h3>
              </div>
              <p className="text-sm text-slate-300">
                Component tree with 12+ levels
              </p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">The Force</h3>
              </div>
              <p className="text-sm text-slate-300">
                Context Provider wrapping everything
              </p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold">Jedi</h3>
              </div>
              <p className="text-sm text-slate-300">
                Components that can useContext()
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// The Force - Context Definition
import { createContext } from 'react';

interface ForceValue {
  user: string;
  theme: 'light' | 'dark';
  targetingData: string;
  spoonAvailable: boolean;
  updateTargetingData: (data: string) => void;
  toggleTheme: () => void;
  useSpoon: () => void;
}

const ForceContext = createContext<ForceValue | undefined>(undefined);

// Provide at the Temple's root
function JediTemple() {
  const [theme, setTheme] = useState('dark');
  const [targetingData, setTargetingData] = useState('Alpha-3');
  
  const forceValue = {
    theme,
    targetingData,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    updateTargetingData: setTargetingData,
    // ... other values
  };
  
  return (
    <ForceContext.Provider value={forceValue}>
      {/* Entire Temple component tree */}
    </ForceContext.Provider>
  );
}`}
            title="// The Jedi Council Archives - Creating Context"
            defaultExpanded={true}
            language="jsx"
          />
        </div>
      ),
    },
    {
      title: "The Path of the Messenger",
      content:
        '"A new targeting sequence is required for the training droids in Sector Gamma-7," the Archive Master said, handing Anya a warm, glowing data crystal. "It must be delivered immediately. Follow the protocol."\n\nAnya nodded, gripping the crystal. The "protocol" was the Path of the Messenger, a rigid chain of custody. Her first stop was the central spire, a full kilometer away. She ran, her boots echoing on the polished floors. She found Master Zenn mediating a trade dispute. He held up a hand, forcing her to wait. He didn\'t need the targeting data, but protocol dictated he was the first link in the chain. He finally took the crystal, barely glancing at it, and passed it back to her with a nod toward the lower levels. "Knight Jorli is next. Hangar Bay." A bottleneck. A pointless delay.\n\nHer frustration grew as she descended. She found Jorli in the middle of a frantic sparring session. "The sequence!" Anya yelled over the din. Jorli, distracted, spun around and reached for the crystal. Her gloved hand fumbled the catch. The crystal flew into the air, and Anya lunged, catching it just before it shattered. The light within flickered ominously. The data was fragile, the handoff precarious.\n\nBy the time she reached the humid, noisy droid bay in Gamma-7, she was sweating and out of breath. The droid operator took the crystal and scowled. "We needed this ten minutes ago. The simulation is already out of sync." Anya leaned against the wall, the inefficiency of the journey weighing on her. There had to be a better way.',
      icon: <Users className="h-6 w-6 text-amber-400" />,
      demo: (
        <div className="space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <button
              onClick={startPropDrill}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              <Zap className="h-5 w-5" />
              Start Prop Drilling Mission
            </button>

            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">
                  {handoffCount}
                </div>
                <div className="text-xs text-slate-400">Total Handoffs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {fumbledHandoffs}
                </div>
                <div className="text-xs text-slate-400">Fumbled</div>
              </div>
            </div>
          </div>

          {dataCrystal && (
            <div className="rounded-lg border border-amber-500/50 bg-amber-950/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="animate-pulse">
                    <Zap className="h-5 w-5 text-amber-400" />
                  </div>
                  <span className="font-semibold">Active Data Crystal</span>
                </div>
                <span className="font-mono text-sm">{dataCrystal}</span>
              </div>

              <div className="relative pt-4">
                <div className="absolute top-6 right-0 left-0 h-0.5 bg-slate-700"></div>
                <div className="flex justify-between">
                  {drillingPath.map((stop, index) => (
                    <div key={stop} className="flex flex-col items-center">
                      <div
                        className={`h-4 w-4 rounded-full ${index <= currentHandoff ? "bg-amber-400" : "bg-slate-700"} mb-2`}
                      ></div>
                      <div
                        className={`text-xs ${index === currentHandoff ? "font-bold text-amber-300" : "text-slate-400"}`}
                      >
                        {stop}
                      </div>
                      {index === currentHandoff && dataCrystal && (
                        <button
                          onClick={passCrystal}
                          className="mt-2 rounded bg-amber-600 px-3 py-1 text-xs text-white transition-colors hover:bg-amber-700"
                        >
                          Pass to Next
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <CodeBlock
            code={`// ❌ The Path of the Messenger - Prop Drilling

function Archives() {
  const [crystal, setCrystal] = useState("Gamma-7 Targeting");
  
  return <MasterZenn crystal={crystal} onPass={setCrystal} />;
}

function MasterZenn({ crystal, onPass }) {
  // Doesn't need the crystal, but must accept it
  return <KnightJorli crystal={crystal} onPass={onPass} />;
}

function KnightJorli({ crystal, onPass }) {
  // Might drop it! (mutate or lose props)
  return <DroidBay crystal={crystal} onPass={onPass} />;
}

function DroidBay({ crystal }) {
  // Finally uses it, but it's late and possibly corrupted
  return <div>Received: {crystal}</div>;
}

// Problems:
// 1. Each component must accept and pass props
// 2. Data can be mutated or lost along the way
// 3. Adding/removing components breaks the chain
// 4. Components are tightly coupled`}
            title="// ❌ Prop Drilling Anti-Pattern"
            variant="error"
            defaultExpanded={true}
            language="jsx"
          />

          <div className="rounded-lg bg-slate-900/50 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold">Component Tree Simulation</h3>
            </div>
            <JediComponent
              name="Jedi Council Archives"
              level={0}
              dataCrystal={dataCrystal}
              onPassCrystal={passCrystal}
            >
              <JediComponent
                name="Master Zenn"
                level={1}
                dataCrystal={currentHandoff >= 1 ? dataCrystal : undefined}
                onPassCrystal={passCrystal}
              >
                <JediComponent
                  name="Knight Jorli"
                  level={2}
                  dataCrystal={currentHandoff >= 2 ? dataCrystal : undefined}
                  onPassCrystal={passCrystal}
                >
                  <JediComponent
                    name="Droid Bay Gamma-7"
                    level={3}
                    dataCrystal={currentHandoff >= 3 ? dataCrystal : undefined}
                  >
                    <div className="mt-2 text-sm text-slate-400">
                      {currentHandoff === 3
                        ? "✓ Update applied (late)"
                        : "Waiting for data crystal..."}
                    </div>
                  </JediComponent>
                </JediComponent>
              </JediComponent>
            </JediComponent>
          </div>
        </div>
      ),
    },
    {
      title: "Reaching Out",
      content:
        'Anya found Kai in the Room of a Thousand Fountains, the gentle sound of water a stark contrast to the chaos of her morning. She recounted the entire frustrating journey. "The data was from the Archives, a place connected to the whole Temple by the Force," she finished. "Why must I carry the message when the Force can deliver it?"\n\nKai smiled. He led her to a small, silent meditation chamber. "Another update is ready in the Archives," he said. "The same destination. But this time, there is no crystal."\n\n"How...?"\n\n"You just answered your own question," Kai said softly. "You will not carry it. You will not pass it. You will simply... access it." He guided her through a calming meditation. "Clear your mind of the path, of the handoffs, of the crystal. Just feel the Temple around you. Feel the Archives at its heart, and the training droid at its edge. They share the same context. Reach out."\n\nAnya closed her eyes. She felt the hum of the Temple. She focused on the intent: the targeting sequence. For a moment, nothing happened. Then, Kai\'s voice cut through her doubt. "Don\'t pass the knowledge. Access it." She let go of the idea of a journey and focused on the connection. A flicker of light behind her eyelids. A feeling of data flowing, not through her hands, but through her consciousness. Her datapad chimed. She opened her eyes. The targeting sequence was there, downloaded and verified. It was instantaneous. It was elegant. It was the Force.',
      icon: <Zap className="h-6 w-6 text-emerald-400" />,
      demo: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Shield className="h-5 w-5 text-emerald-400" />
                Direct Access with useContext
              </h3>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-medium">
                    Targeting Data in Context
                  </div>
                  <div className="font-mono text-emerald-300">
                    {targetingData}
                  </div>
                </div>

                <button
                  onClick={() =>
                    forceValue.updateTargetingData(
                      `Delta-${Math.floor(Math.random() * 9) + 1}`,
                    )
                  }
                  className="w-full rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                >
                  Update Targeting Data (Force)
                </button>
              </div>

              <div className="space-y-3">
                <JediWithForce
                  name="Deep Meditation Chamber"
                  level={3}
                  accessType="force"
                />
                <JediWithForce
                  name="Training Room Beta-12"
                  level={4}
                  accessType="force"
                />
                <JediWithForce
                  name="Archive Study Carrel"
                  level={2}
                  accessType="force"
                />
              </div>
            </div>

            <div>
              <CodeBlock
                code={`// ✅ Reaching Out with useContext

// 1. Create context (already done at top level)
const ForceContext = createContext();

// 2. ANY component in the tree can access it
function DeepMeditationChamber() {
  // Direct access - no props needed!
  const force = useContext(ForceContext);
  
  if (!force) return null; // Handle undefined
  
  return (
    <div>
      <h3>Deep Meditation Chamber</h3>
      <p>Targeting: {force.targetingData}</p>
      <p>Theme: {force.theme}</p>
      <button onClick={force.toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
}

// Also works for TrainingRoomBeta12, ArchiveStudyCarrel, etc.
// All access the SAME data instantly

// Compare to prop drilling:
// ❌ Archives -> MasterZenn -> KnightJorli -> DroidBay
// ✅ useContext() -> Direct access`}
                title="// ✅ useContext() Solution"
                variant="success"
                defaultExpanded={true}
                language="jsx"
              />

              <div className="mt-6 rounded-lg bg-slate-900/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-emerald-400" />
                    <span className="font-semibold">Live Force Access</span>
                  </div>
                  <button
                    onClick={forceValue.toggleTheme}
                    className="rounded bg-emerald-600 px-3 py-1 text-sm text-white transition-colors hover:bg-emerald-700"
                  >
                    Toggle Theme (Force)
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Theme:</span>
                    <span
                      className={`font-mono ${theme === "dark" ? "text-blue-300" : "text-amber-300"}`}
                    >
                      {theme}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Targeting Data:</span>
                    <span className="font-mono text-emerald-300">
                      {targetingData}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Spoon Status:</span>
                    <span
                      className={`font-mono ${spoonAvailable ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {spoonAvailable ? "Available" : "Used via Force"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Chain and The Connection",
      content:
        'In the Jedi Archives, Kai activated a holographic recorder, projecting two life-sized scenes into the center of the room.\n\nOn the left, Anya saw herself, a frantic figure running through the Temple. The sound was amplified—her labored breathing, the slap of her boots on the floor, the sharp clatter as Knight Jorli fumbled the data crystal. She watched the entire journey unfold: the wait for Master Zenn, the near-disaster with Jorli, the final, late arrival at the droid bay. The entire sequence was a cascade of dependencies, each handoff a potential point of failure, each Jedi an unwilling participant in a process that didn\'t concern them. It was a physical chain, and it was heavy.\n\nKai gestured to the right, and a new scene played out. It was far less dramatic. Anya saw herself sitting peacefully in the meditation chamber. The scene was almost silent, save for the low hum of the Temple. She closed her eyes. A moment passed. Her datapad chimed. The scene ended. It was calm, efficient, and direct. There were no intermediaries, no dependencies, no chances for a dropped crystal.\n\nThe two holograms froze, side-by-side. The contrast was stark: one a flurry of chaotic motion, the other a model of serene focus. "You see, Anya," Kai said, his voice echoing slightly in the quiet archive. "One path is a chain, fragile at every link. It burdens those who do not need the information and risks the integrity of the message itself. The other is a connection. It is direct, resilient, and available to any who know how to listen, no matter where they are in the Temple." Anya stared at the two versions of herself, and for the first time, she understood the architecture of the Force.',
      icon: <Cpu className="h-6 w-6 text-blue-400" />,
      demo: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Users className="h-5 w-5 text-amber-400" />
                  Prop Drilling
                </h3>
                <button
                  onClick={() => setDemoMode("drilling")}
                  className={`rounded px-3 py-1 text-sm ${demoMode === "drilling" ? "bg-amber-600" : "bg-slate-700"}`}
                >
                  {demoMode === "drilling" ? "Active" : "Switch"}
                </button>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Handoffs Required:</span>
                    <span className="font-mono">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Delay:</span>
                    <span className="font-mono text-amber-300">
                      10+ seconds
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failure Points:</span>
                    <span className="font-mono text-red-400">3 components</span>
                  </div>
                </div>

                <button
                  onClick={startPropDrill}
                  className="w-full rounded bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                >
                  Simulate Prop Drilling
                </button>
              </div>

              <CodeBlock
                code={`// ARCHIVES (root)
<MasterZenn data={data} />

// MASTER ZENN (doesn't use data)
function MasterZenn({ data }) {
  return <KnightJorli data={data} />;
}

// KNIGHT JORLI (doesn't use data)
function KnightJorli({ data }) {
  return <DroidBay data={data} />;
}

// DROID BAY (finally uses it)
function DroidBay({ data }) {
  console.log("Got data:", data);
}

// Problems:
// - MasterZenn & KnightJorli re-render when data changes
// - Adding/removing components breaks chain
// - Data can be mutated or lost`}
                title="// Chain Architecture"
                variant="error"
                collapsible={true}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  useContext()
                </h3>
                <button
                  onClick={() => setDemoMode("context")}
                  className={`rounded px-3 py-1 text-sm ${demoMode === "context" ? "bg-emerald-600" : "bg-slate-700"}`}
                >
                  {demoMode === "context" ? "Active" : "Switch"}
                </button>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-4">
                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Handoffs Required:</span>
                    <span className="font-mono">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time Delay:</span>
                    <span className="font-mono text-emerald-300">Instant</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failure Points:</span>
                    <span className="font-mono text-emerald-400">
                      Only provider
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    forceValue.updateTargetingData(
                      `Update-${Date.now().toString().slice(-3)}`,
                    )
                  }
                  className="w-full rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                >
                  Update via Context (Instant)
                </button>
              </div>

              <CodeBlock
                code={`// ARCHIVES (root)
<ForceContext.Provider value={data}>
  {/* All components have access */}
</ForceContext.Provider>

// DEEP MEDITATION CHAMBER (any level)
function DeepMeditationChamber() {
  const data = useContext(ForceContext);
  return <div>Data: {data.targeting}</div>;
}

// TRAINING ROOM (any level)
function TrainingRoom() {
  const data = useContext(ForceContext);
  return <div>Data: {data.targeting}</div>;
}

// Benefits:
// - Direct access from anywhere
// - No intermediate components affected
// - Single source of truth
// - Easy to refactor`}
                title="// Connection Architecture"
                variant="success"
                collapsible={true}
              />
            </div>
          </div>

          <div className="rounded-lg bg-slate-900/50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Performance Comparison</h3>
              <button
                onClick={resetDemos}
                className="rounded bg-slate-700 px-4 py-2 text-sm text-white transition-colors hover:bg-slate-600"
              >
                Reset All Demos
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded bg-slate-800/30 p-4 text-center">
                <div className="text-3xl font-bold text-slate-300">
                  {handoffCount}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Prop Drilling Attempts
                </div>
              </div>
              <div className="rounded bg-slate-800/30 p-4 text-center">
                <div className="text-3xl font-bold text-emerald-300">
                  {renderCount}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Context Updates
                </div>
              </div>
              <div className="rounded bg-slate-800/30 p-4 text-center">
                <div className="text-3xl font-bold text-red-300">
                  {fumbledHandoffs}
                </div>
                <div className="mt-1 text-sm text-slate-400">
                  Prop Drilling Failures
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-400">
              <div className="mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="font-medium">Key Insight:</span>
              </div>
              <p>
                Prop drilling creates a{" "}
                <span className="text-amber-300">chain of dependencies</span>{" "}
                where each link must be maintained. useContext() creates a{" "}
                <span className="text-emerald-300">direct connection</span>{" "}
                that's resilient to changes in the component tree.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Dark Side of Dependence",
      content:
        'Anya felt a new sense of power. The Force wasn\'t just for lifting rocks or deflecting blaster bolts; it was an information superhighway. At the midday meal in the refectory, she decided to test its limits. Her tray was missing a serving spoon. Across the bustling hall, she saw a basket full of them. Instead of walking, she closed her eyes, reached out with the Force, and focused her intent on a single spoon.\n\nThe spoon rattled, lifted shakily, and shot across the room, clattering onto her tray and splashing soup onto the table. Several nearby Jedi looked over, annoyed. It was clumsy, unnecessary, and drew far more attention than simply getting up.\n\nA gentle hand came to rest on her shoulder. It was Kai. He wasn\'t angry, but his expression was serious. "The power to connect to the Archives is for knowledge that is truly universal to our mission," he said quietly. "A shared context. Your need for a spoon is your own. It is local to you and your tray."\n\nHe leaned in closer, his voice dropping to a near-whisper. "Be wary of this path, young one. The desire to solve every problem with your greatest power is a temptation. The Dark Side is not just anger; it is dependence. It is putting everything in the Force. When you do that, you make every part of your life coupled to it. You forget the simple, local arts, like walking and carrying. You become less resilient, not more."\n\nAnya looked at the soup-splattered spoon, then at her own two feet. She understood. The Force was a tool of incredible power for sharing what needs to be shared. But for everything else, there is local state. She nodded to Kai, a newfound wisdom dawning in her eyes. She picked up the spoon, and began to eat.',
      icon: <Shield className="h-6 w-6 text-purple-400" />,
      demo: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded bg-purple-900/50 p-2">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Overusing Context</h3>
                  <p className="text-sm text-slate-400">
                    Everything in global state
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <JediWithForce
                  name="Anya's Tray"
                  level={1}
                  accessType="force"
                />
                <JediWithForce
                  name="Refectory Counter"
                  level={2}
                  accessType="force"
                />
                <JediWithForce
                  name="Kitchen Storage"
                  level={3}
                  accessType="force"
                />
              </div>

              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-400" />
                  <h4 className="font-semibold">The Problem</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-400">•</span>
                    <span>
                      All components re-render when spoon status changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-400">•</span>
                    <span>Tight coupling - can't reuse components easily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-400">•</span>
                    <span>Performance overhead for simple state</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="rounded bg-emerald-900/50 p-2">
                  <Home className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Local State Solution
                  </h3>
                  <p className="text-sm text-slate-400">
                    Keep simple things local
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <JediWithForce
                  name="Anya's Tray"
                  level={1}
                  accessType="local"
                />
                <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4">
                  <div className="mb-2 text-sm text-slate-400">
                    Other components don't care about spoons:
                  </div>
                  <div className="space-y-2">
                    <div className="rounded bg-slate-800/30 p-2 text-sm">
                      Refectory Counter (independent)
                    </div>
                    <div className="rounded bg-slate-800/30 p-2 text-sm">
                      Kitchen Storage (independent)
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <h4 className="font-semibold">The Solution</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">•</span>
                    <span>
                      Only tray component re-renders for spoon changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">•</span>
                    <span>Components are reusable and independent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-400">•</span>
                    <span>Better performance and separation of concerns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CodeBlock
              code={`// ⚠️ The Dark Side - Overusing Context

// ❌ Putting everything in context (spoon, user, theme, etc.)
const ForceContext = createContext();

function App() {
  const [spoon, setSpoon] = useState(true); // ❌ This is local!
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState('Anya');
  
  // Problem: Every component using useContext re-renders
  // when ANY of these values change
  return (
    <ForceContext.Provider value={{ spoon, setSpoon, theme, setTheme, user, setUser }}>
      <Tray />
      <Kitchen />
      <Library /> {/* Doesn't care about spoons! */}
    </ForceContext.Provider>
  );
}

// ✅ Keep local state local
function Tray() {
  const [spoon, setSpoon] = useState(true); // ✅ Local state
  const force = useContext(ForceContext); // ✅ Only global state
  
  return (
    <div>
      <button onClick={() => setSpoon(false)}>
        Use Spoon (Local)
      </button>
      <div>Theme: {force.theme}</div>
    </div>
  );
}

// Rule of thumb:
// - Context: Theme, auth, user preferences (global)
// - Local: Form inputs, UI toggles, component-specific data`}
              title="// ⚠️ Context Overuse Warning"
              variant="default"
              defaultExpanded={true}
              language="jsx"
            />

            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold">Wisdom Checkpoint</h4>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  You've learned the power of useContext() to avoid prop
                  drilling, but also its dangers when overused.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded bg-emerald-950/20 p-3">
                    <div className="mb-1 font-medium text-emerald-300">
                      Use Context For:
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• Theme/UI preferences</li>
                      <li>• Authentication state</li>
                      <li>• User profile data</li>
                      <li>• Global feature flags</li>
                    </ul>
                  </div>
                  <div className="rounded bg-amber-950/20 p-3">
                    <div className="mb-1 font-medium text-amber-300">
                      Keep Local For:
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li>• Form inputs</li>
                      <li>• Component-specific toggles</li>
                      <li>• Temporary UI state</li>
                      <li>• Isolated component data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <ForceContext.Provider value={forceValue}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950 p-4 text-slate-300 md:p-8">
        <header className="top-0 z-10 mb-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
            {/* First line: Title left, metadata right */}
            <div className="mb-2 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-amber-500" />
                <h1 className="text-2xl font-bold md:text-3xl">
                  The Force is the Context
                </h1>
              </div>
              <p className="text-sm text-slate-400 md:text-base">
                Star Wars • Anya • 1977
              </p>
            </div>

            {/* Second line: Subtitle/concept */}
            <p className="text-base font-medium text-amber-500 md:text-lg">
              useContext Hook and Context API
            </p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Main content */}
            <div className="lg:col-span-7">
              <div className="prose prose-invert prose-lg mb-8 max-w-none">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-slate-800/50 p-2">
                    {currentChapter.icon}
                  </div>
                  <h2 className="m-0 text-2xl font-bold md:text-3xl">
                    {currentChapter.title}
                  </h2>
                </div>
                <div className="leading-relaxed whitespace-pre-line text-slate-300">
                  {currentChapter.content}
                </div>
              </div>
            </div>

            {/* Interactive demo sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="mb-6 rounded-xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Zap className="h-5 w-5 text-amber-400" />
                    Interactive Temple
                  </h3>
                  {currentChapter.demo}
                </div>

                {/* Chapter navigation */}
                <div className="rounded-xl border border-slate-700/30 bg-slate-900/40 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      onClick={() => setChapter(Math.max(0, chapter - 1))}
                      disabled={chapter === 0}
                      className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    <div className="text-center">
                      <div className="text-sm text-slate-400">Chapter</div>
                      <div className="font-mono font-bold">
                        {chapter + 1} / {chapters.length}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setChapter(Math.min(chapters.length - 1, chapter + 1))
                      }
                      disabled={chapter === chapters.length - 1}
                      className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-amber-500 transition-all duration-300"
                      style={{
                        width: `${((chapter + 1) / chapters.length) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {chapters.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setChapter(idx)}
                        className={`h-2 rounded-full transition-colors ${idx === chapter ? "bg-amber-500" : "bg-slate-700"}`}
                        aria-label={`Go to chapter ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset button */}
          <div className="mt-12 border-t border-slate-800 pt-8">
            <div className="flex justify-center">
              <button
                onClick={resetDemos}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700"
              >
                <Zap className="h-5 w-5" />
                Reset All Temple Demonstrations
              </button>
            </div>
          </div>
        </main>
      </div>
    </ForceContext.Provider>
  );
}
