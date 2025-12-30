import { useState, useEffect, useMemo } from "react";
import { DoorOpen, Cat, Coffee, Scale, Key, Users, Minus, Plus, Check, X } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
  color: string;
  icon: React.ReactNode;
}

interface Guest {
  id: string;
  name: string;
  present: boolean;
}

export default function ConditionalRenderingInWonderland(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [aliceSize, setAliceSize] = useState<'small' | 'normal' | 'giant'>('normal');
  const [isCatVisible, setIsCatVisible] = useState<boolean>(false);
  const [antiPatternMode, setAntiPatternMode] = useState<'broken' | 'fixed'>('broken');
  const [distortionPain, setDistortionPain] = useState<number>(0);
  const [teaPartyGuests, setTeaPartyGuests] = useState<Guest[]>([
    { id: '1', name: 'March Hare', present: true },
    { id: '2', name: 'Dormouse', present: false },
    { id: '3', name: 'Cheshire Cat', present: false },
  ]);
  const [courtConditions, setCourtConditions] = useState({
    isKnave: true,
    tartStolen: true,
    witnessIsHatter: false,
    witnessIsAlice: true,
  });

  // Circuit breaker for anti-pattern demo
  useEffect(() => {
    if (distortionPain > 50) {
      setDistortionPain(0);
      setAntiPatternMode('fixed');
      setAliceSize('normal');
    }
  }, [distortionPain]);

  const chapters: Chapter[] = [
    {
      title: "The Hall of Shifting Doors",
      content: "The fall ended. Alice found herself in a long, low hall, lit by a row of lamps hanging from the ceiling. Behind a low curtain she discovered a small door, no more than fifteen inches high. She found a tiny golden key that fit the lock perfectly. Peering through, she saw the loveliest garden she had ever seen. But she couldn't so much as get her head through the doorway. Then she noticed a small bottle labeled 'DRINK ME'. As she drank, a wide, knowing grin materialized in the air before her—just the grin, hanging unsupported. The Cheshire Cat faded into view, then vanished again, starting with the tail and ending with the grin. One moment, a cat was there. The next, it was not. Alice stared at the empty air, a thought forming in her mind. In Wonderland, what you see depends entirely on what you are.",
      color: "text-sky-500",
      icon: <DoorOpen className="w-5 h-5" />,
    },
    {
      title: "A Most Awkward Predicament",
      content: "The potion worked. Alice felt herself shrinking rapidly. She ran to the tiny door—it opened! But the key was still on the table, now a sheer cliff she couldn't climb. She was the right size for the door, but wrong for the key. After weeping, she found a cake marked 'EAT ME'. She ate it, and soon her head pressed against the ceiling. She could now reach the key, but the door was a mouse-hole. In panicked desperation, she tried to be both sizes at once—taking a sip while keeping her arm long. The result was agonizing. A sharp, tearing sensation ripped through her shoulder. Her proportions became a grotesque nightmare. One part giant, the other tiny, the junction searing with pain. 'You can't be two sizes at once,' she sobbed. 'You'll simply tear yourself apart.'",
      color: "text-rose-500",
      icon: <Key className="w-5 h-5" />,
    },
    {
      title: "The Cat's Logic",
      content: "Alice lay on the floor, defeated by contradictory rules. 'A bit of a muddle, are we?' The Cheshire Cat faded into view. 'It's no use!' Alice cried. 'To get the key, I must be large. To get through the door, I must be small. I tried to be both, and it nearly broke me!' The Cat chuckled. 'That's not how Wonderland works. You can go this way, or that way. But you cannot go both.' As it vanished, leaving only a grin, it delivered the revelation: 'Choose one path, and one path only. The other will simply cease to be.' Everything clicked. With newfound clarity, Alice executed a clean sequence: grow large to get the key, then shrink small to use it. No pain, no conflict—just elegant conditional execution. The garden lay before her.",
      color: "text-emerald-500",
      icon: <Cat className="w-5 h-5" />,
    },
    {
      title: "A Tale of Two Tea Parties",
      content: "Alice arrived at a tea party under a tree. The table was set for dozens, but only three guests were present. Dirty cups and plates piled everywhere. 'No room! No room!' they cried. The Hatter poured tea into an empty cup. 'For the White Rabbit, in case he arrives!' He checked the Dormouse. 'Is he awake? No? Then no tea for him!' But the cup remained, unused. He was preparing for states that weren't active. Later, Alice hosted her own party. A field mouse approached. 'If you are here,' she said, 'then you shall have a cup.' She placed a thimble. The Cheshire Cat's grin shimmered. 'And if you are here, then you shall have one too.' A saucer appeared. The cat vanished, and she removed the saucer. 'The Hatter's table shows everything that could be. My table shows only what is.'",
      color: "text-amber-500",
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      title: "The Queen's Conditional Court",
      content: "A trumpet blast shattered the peace. Playing cards seized Alice, dragging her to court. The Queen of Hearts glared down. The old Alice would have trembled. But this Alice saw a system, governed by rules. The Queen bellowed a complex decree. The White Rabbit read: 'IF the prisoner is the Knave of Hearts, AND the charge is theft of tarts, AND the witness is the Mad Hatter, THEN the verdict is Off with his head! ELSE IF the witness is a girl named Alice, THEN the verdict is Let her speak! ELSE, the verdict is Trial postponed!' A hush fell. Alice calmly parsed the nested conditions. The prisoner was the Knave. The charge was tarts. But the witness was not the Hatter. First condition: false. The witness was a girl named Alice. Second condition: true. Outcome determined. She felt no fear. The Queen's rage was just a set of rules. If you know the conditions, you know the outcome.",
      color: "text-purple-500",
      icon: <Scale className="w-5 h-5" />,
    },
  ];

  // Code examples for each chapter
  const codeExamples = useMemo(() => [
    {
      title: "Conditional Access with && Operator",
      correct: `// ✅ Only render when condition is true
function DoorToGarden() {
  const [aliceSize, setAliceSize] = useState('normal');
  
  return (
    <div>
      {/* Door only accessible when small */}
      {aliceSize === 'small' && (
        <div className="door-open">
          <Key /> Enter the garden
        </div>
      )}
      
      {/* Cat appears only when visible */}
      {isCatVisible && <CheshireCat />}
    </div>
  );
}`,
      incorrect: `// ❌ Complex, non-mutually exclusive conditions
function DoorToGarden() {
  const [aliceSize, setAliceSize] = useState('normal');
  
  return (
    <div>
      {/* Both states rendered simultaneously */}
      <div className={aliceSize === 'small' ? 'visible' : 'hidden'}>
        <Key /> Enter the garden
      </div>
      <div className={aliceSize === 'normal' ? 'visible' : 'invisible'}>
        Can't reach the key
      </div>
    </div>
  );
}`,
    },
    {
      title: "Mutually Exclusive Ternary Operator",
      correct: `// ✅ Clean ternary for exclusive states
function AliceRenderer() {
  const [size, setSize] = useState('normal');
  
  return (
    <div>
      {size === 'small' ? (
        <SmallAlice onDoorClick={openTinyDoor} />
      ) : size === 'giant' ? (
        <GiantAlice onKeyReach={grabKey} />
      ) : (
        <NormalAlice />
      )}
    </div>
  );
}`,
      incorrect: `// ❌ Trying to render multiple states
function AliceRenderer() {
  const [size, setSize] = useState('normal');
  
  return (
    <div>
      {/* All components rendered, visibility toggled */}
      <SmallAlice style={{ opacity: size === 'small' ? 1 : 0.3 }} />
      <GiantAlice style={{ opacity: size === 'giant' ? 1 : 0.3 }} />
      <NormalAlice style={{ opacity: size === 'normal' ? 1 : 0.3 }} />
      {/* All three exist in DOM simultaneously! */}
    </div>
  );
}`,
    },
    {
      title: "Conditional List Rendering",
      correct: `// ✅ Render only present guests
function TeaPartyTable() {
  const [guests, setGuests] = useState([
    { name: 'March Hare', present: true },
    { name: 'Dormouse', present: false },
  ]);
  
  return (
    <table>
      {guests
        .filter(guest => guest.present)
        .map(guest => (
          <TeaCup key={guest.name} guest={guest.name} />
        ))
      }
    </table>
  );
}`,
      incorrect: `// ❌ Render all, hide absent
function TeaPartyTable() {
  const [guests, setGuests] = useState([
    { name: 'March Hare', present: true },
    { name: 'Dormouse', present: false },
  ]);
  
  return (
    <table>
      {guests.map(guest => (
        <TeaCup 
          key={guest.name} 
          guest={guest.name}
          style={{ display: guest.present ? 'block' : 'none' }}
        />
      ))}
      {/* Empty cups still in DOM! */}
    </table>
  );
}`,
    },
    {
      title: "Nested Conditional Logic",
      correct: `// ✅ Clear nested conditions
function CourtVerdict() {
  const { isKnave, tartStolen, witness } = useCourtState();
  
  if (isKnave && tartStolen && witness === 'Hatter') {
    return <Verdict>Off with his head!</Verdict>;
  } else if (witness === 'Alice') {
    return <Verdict>Let her speak!</Verdict>;
  } else {
    return <Verdict>Trial postponed!</Verdict>;
  }
}`,
      incorrect: `// ❌ Overly complex single expression
function CourtVerdict() {
  const { isKnave, tartStolen, witness } = useCourtState();
  
  return (
    <Verdict>
      {isKnave && tartStolen && witness === 'Hatter' 
        ? 'Off with his head!'
        : witness === 'Alice'
        ? 'Let her speak!'
        : 'Trial postponed!'}
    </Verdict>
  );
}`,
    },
  ], []);

  // Chapter-specific demos
  const renderChapterDemo = () => {
    switch (chapter) {
      case 0: // Chapter 1: Door accessibility
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className={`border-2 ${aliceSize === 'small' ? 'border-sky-500' : 'border-slate-700'} rounded-lg p-6 transition-all duration-300`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 flex items-center justify-center ${aliceSize === 'small' ? 'bg-sky-500/20' : 'bg-slate-800'} rounded-lg`}>
                    <DoorOpen className={`w-8 h-8 ${aliceSize === 'small' ? 'text-sky-500' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Tiny Door to Garden</h3>
                    <p className="text-sm text-slate-400">
                      {aliceSize === 'small' 
                        ? "✅ Door is accessible! Alice can enter the garden." 
                        : "❌ Door is too small. Alice cannot fit."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className={`w-24 h-24 flex items-center justify-center rounded-full border-4 ${aliceSize === 'small' ? 'border-sky-500 bg-sky-500/10' : aliceSize === 'giant' ? 'border-rose-500 bg-rose-500/10' : 'border-slate-600 bg-slate-800'}`}>
                  <span className={`text-xl font-bold ${aliceSize === 'small' ? 'text-sky-500' : aliceSize === 'giant' ? 'text-rose-500' : 'text-slate-400'}`}>
                    {aliceSize === 'small' ? 'Small' : aliceSize === 'giant' ? 'Giant' : 'Normal'}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setAliceSize('small')}
                    className={`px-4 py-2 rounded ${aliceSize === 'small' ? 'bg-sky-600' : 'bg-slate-700'} hover:bg-sky-700 transition-colors`}
                  >
                    Drink Potion
                  </button>
                  <button
                    onClick={() => setAliceSize('giant')}
                    className={`px-4 py-2 rounded ${aliceSize === 'giant' ? 'bg-rose-600' : 'bg-slate-700'} hover:bg-rose-700 transition-colors`}
                  >
                    Eat Cake
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Cat className="w-5 h-5" /> Cheshire Cat Visibility
                </h3>
                <button
                  onClick={() => setIsCatVisible(!isCatVisible)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                >
                  {isCatVisible ? 'Make Disappear' : 'Make Appear'}
                </button>
              </div>
              
              <div className="flex justify-center py-8">
                {isCatVisible ? (
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-purple-500/50">
                      <Cat className="w-16 h-16 text-purple-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center">
                    <div className="text-slate-600 text-center">
                      <Cat className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs">Not rendered</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1: // Chapter 2: Anti-pattern
        return (
          <div className="space-y-8">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setAntiPatternMode('broken')}
                className={`px-6 py-3 rounded ${antiPatternMode === 'broken' ? 'bg-rose-600' : 'bg-slate-700'} hover:bg-rose-700 transition-colors`}
              >
                ❌ Show Anti-Pattern
              </button>
              <button
                onClick={() => setAntiPatternMode('fixed')}
                className={`px-6 py-3 rounded ${antiPatternMode === 'fixed' ? 'bg-emerald-600' : 'bg-slate-700'} hover:bg-emerald-700 transition-colors`}
              >
                ✅ Show Solution
              </button>
            </div>

            {antiPatternMode === 'broken' ? (
              <div className="bg-rose-950/30 border border-rose-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-rose-500 flex items-center gap-2">
                    <X className="w-5 h-5" /> Trying to Render Both Sizes
                  </h3>
                  <button
                    onClick={() => {
                      setDistortionPain(p => Math.min(50, p + 10));
                      setAliceSize(p => p === 'small' ? 'giant' : 'small');
                    }}
                    className="px-4 py-2 bg-rose-700 hover:bg-rose-800 rounded transition-colors"
                  >
                    🐛 Trigger Distortion
                  </button>
                </div>

                <div className="relative h-48 bg-slate-900/50 rounded-lg overflow-hidden">
                  {/* Both Alices rendered simultaneously */}
                  <div className={`absolute left-1/4 top-8 transition-all duration-500 ${aliceSize === 'small' ? 'scale-75 opacity-100' : 'scale-50 opacity-30'}`}>
                    <div className="w-20 h-32 bg-sky-500/30 rounded-lg border border-sky-500/50 flex items-center justify-center">
                      <span className="text-sky-400 font-bold">Small Alice</span>
                    </div>
                  </div>
                  
                  <div className={`absolute right-1/4 top-8 transition-all duration-500 ${aliceSize === 'giant' ? 'scale-125 opacity-100' : 'scale-100 opacity-30'}`}>
                    <div className="w-24 h-40 bg-rose-500/30 rounded-lg border border-rose-500/50 flex items-center justify-center">
                      <span className="text-rose-400 font-bold">Giant Alice</span>
                    </div>
                  </div>

                  {/* Distortion pain indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-64 bg-slate-800 rounded-full h-4 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-700 transition-all duration-300"
                        style={{ width: `${distortionPain * 2}%` }}
                      />
                    </div>
                    <p className="text-center text-sm mt-2 text-rose-400">
                      Distortion Pain: {distortionPain}/50
                    </p>
                  </div>
                </div>

                <p className="text-sm text-rose-400 mt-4 text-center">
                  Both components exist in DOM simultaneously, causing layout conflicts and inefficiency.
                </p>
              </div>
            ) : (
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-6">
                <h3 className="font-bold text-emerald-500 flex items-center gap-2 mb-6">
                  <Check className="w-5 h-5" /> Clean Conditional Rendering
                </h3>

                <div className="flex justify-center py-8">
                  {aliceSize === 'small' && (
                    <div className="animate-in fade-in zoom-in">
                      <div className="w-32 h-48 bg-sky-500/20 rounded-lg border-2 border-sky-500 flex items-center justify-center">
                        <span className="text-sky-400 font-bold text-xl">Small Alice</span>
                      </div>
                    </div>
                  )}
                  {aliceSize === 'giant' && (
                    <div className="animate-in fade-in zoom-in">
                      <div className="w-40 h-56 bg-emerald-500/20 rounded-lg border-2 border-emerald-500 flex items-center justify-center">
                        <span className="text-emerald-400 font-bold text-xl">Giant Alice</span>
                      </div>
                    </div>
                  )}
                  {aliceSize === 'normal' && (
                    <div className="w-28 h-40 bg-slate-700/50 rounded-lg border border-slate-600 flex items-center justify-center">
                      <span className="text-slate-400 font-bold">Normal Alice</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center mt-6">
                  <button
                    onClick={() => setAliceSize('small')}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded"
                  >
                    Shrink
                  </button>
                  <button
                    onClick={() => setAliceSize('normal')}
                    className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setAliceSize('giant')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded"
                  >
                    Grow
                  </button>
                </div>
              </div>
            )}

            <CodeBlock
              code={codeExamples[1].incorrect}
              variant="error"
              title="// ❌ Anti-Pattern: Rendering Both States"
              defaultExpanded={antiPatternMode === 'broken'}
            />
            <CodeBlock
              code={codeExamples[1].correct}
              variant="success"
              title="// ✅ Solution: Mutually Exclusive Rendering"
              defaultExpanded={antiPatternMode === 'fixed'}
            />
          </div>
        );

      case 2: // Chapter 3: Solution
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                <h3 className="font-bold text-emerald-500 mb-4">Clean Conditional Logic</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Current Size:</span>
                    <span className={`font-bold ${aliceSize === 'small' ? 'text-sky-500' : aliceSize === 'giant' ? 'text-rose-500' : 'text-slate-300'}`}>
                      {aliceSize.charAt(0).toUpperCase() + aliceSize.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => setAliceSize('small')}
                      className={`w-full py-3 rounded ${aliceSize === 'small' ? 'bg-sky-600 border-2 border-sky-500' : 'bg-slate-800'} transition-all`}
                    >
                      {aliceSize === 'small' ? '✓ Small (Door accessible)' : 'Become Small'}
                    </button>
                    <button
                      onClick={() => setAliceSize('giant')}
                      className={`w-full py-3 rounded ${aliceSize === 'giant' ? 'bg-rose-600 border-2 border-rose-500' : 'bg-slate-800'} transition-all`}
                    >
                      {aliceSize === 'giant' ? '✓ Giant (Key reachable)' : 'Become Giant'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-purple-950/20 border border-purple-500/30 rounded-lg p-6">
                <h3 className="font-bold text-purple-500 mb-4">Conditional Component Mount</h3>
                
                <div className="flex flex-col items-center justify-center py-6">
                  {isCatVisible ? (
                    <div className="animate-in fade-in zoom-in">
                      <div className="relative">
                        <div className="w-40 h-40 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center">
                          <Cat className="w-20 h-20 text-purple-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-white font-bold">✓</span>
                        </div>
                      </div>
                      <p className="text-center mt-4 text-purple-400">Cheshire Cat is mounted</p>
                    </div>
                  ) : (
                    <div className="w-40 h-40 border-2 border-dashed border-slate-700 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <Cat className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p className="text-slate-500 text-sm">Not mounted</p>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setIsCatVisible(!isCatVisible)}
                    className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded transition-colors"
                  >
                    {isCatVisible ? 'Unmount Component' : 'Mount Component'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <CodeBlock
                code={`// Using ternary operator
function AliceView() {
  return aliceSize === 'small' ? (
    <SmallAlice onEnter={enterGarden} />
  ) : (
    <LargeAlice onReach={grabKey} />
  );
}`}
                variant="success"
                title="// ✅ Ternary: Choose One"
                defaultExpanded={true}
              />
              
              <CodeBlock
                code={`// Using && operator for optional
function WonderlandScene() {
  return (
    <div>
      {isCatVisible && <CheshireCat />}
      {hasPotion && <DrinkMeBottle />}
      {!isDoorLocked && <GardenView />}
    </div>
  );
}`}
                variant="success"
                title="// ✅ && for Optional Elements"
                defaultExpanded={true}
              />
            </div>
          </div>
        );

      case 3: // Chapter 4: Tea Party Comparison
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mad Hatter's Table */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-rose-500 flex items-center gap-2">
                    <Users className="w-5 h-5" /> Mad Hatter's Table
                  </h3>
                  <div className="px-3 py-1 bg-rose-900/50 text-rose-400 rounded text-sm">
                    Inefficient
                  </div>
                </div>
                
                <div className="space-y-4">
                  {teaPartyGuests.map(guest => (
                    <div 
                      key={guest.id}
                      className={`flex items-center justify-between p-4 rounded ${guest.present ? 'bg-slate-800' : 'bg-slate-900/50 opacity-50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${guest.present ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-slate-800 border border-slate-700'} flex items-center justify-center`}>
                          <Coffee className={`w-5 h-5 ${guest.present ? 'text-amber-400' : 'text-slate-600'}`} />
                        </div>
                        <div>
                          <p className="font-medium">{guest.name}</p>
                          <p className="text-xs text-slate-500">
                            {guest.present ? 'Present' : 'Absent'} • Rendered anyway
                          </p>
                        </div>
                      </div>
                      <div className={guest.present ? 'text-emerald-500' : 'text-slate-600'}>
                        {guest.present ? 'Visible' : 'Hidden'}
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-rose-400 mt-6 text-center">
                  All guests rendered, visibility toggled with CSS
                </p>
              </div>

              {/* Alice's Table */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-emerald-500 flex items-center gap-2">
                    <Coffee className="w-5 h-5" /> Alice's Conditional Table
                  </h3>
                  <div className="px-3 py-1 bg-emerald-900/50 text-emerald-400 rounded text-sm">
                    Efficient
                  </div>
                </div>
                
                <div className="space-y-4">
                  {teaPartyGuests
                    .filter(guest => guest.present)
                    .map(guest => (
                      <div 
                        key={guest.id}
                        className="flex items-center justify-between p-4 rounded bg-emerald-500/10 border border-emerald-500/30 animate-in fade-in"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                            <Coffee className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-medium text-emerald-300">{guest.name}</p>
                            <p className="text-xs text-emerald-500/70">Present • Conditionally rendered</p>
                          </div>
                        </div>
                        <div className="text-emerald-500">
                          ✓ Mounted
                        </div>
                      </div>
                    ))
                  }
                  
                  {teaPartyGuests.filter(g => g.present).length === 0 && (
                    <div className="text-center py-8 text-slate-500">
                      <Coffee className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No guests present • Nothing to render</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" /> Guest Management
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {teaPartyGuests.map(guest => (
                  <div key={guest.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded">
                    <span className="font-medium">{guest.name}</span>
                    <button
                      onClick={() => {
                        setTeaPartyGuests(prev => 
                          prev.map(g => 
                            g.id === guest.id 
                              ? { ...g, present: !g.present } 
                              : g
                          )
                        );
                      }}
                      className={`px-3 py-1 rounded ${guest.present ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-700 hover:bg-slate-600'} transition-colors`}
                    >
                      {guest.present ? 'Present' : 'Absent'}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setTeaPartyGuests(prev => prev.map(g => ({ ...g, present: true })))}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded"
                >
                  All Present
                </button>
                <button
                  onClick={() => setTeaPartyGuests(prev => prev.map(g => ({ ...g, present: false })))}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded"
                >
                  All Absent
                </button>
              </div>
            </div>

            <CodeBlock
              code={codeExamples[2].incorrect}
              variant="error"
              title="// ❌ Hatter's Way: Render All, Hide Some"
              defaultExpanded={true}
            />
            <CodeBlock
              code={codeExamples[2].correct}
              variant="success"
              title="// ✅ Alice's Way: Render Only Present"
              defaultExpanded={true}
            />
          </div>
        );

      case 4: // Chapter 5: Queen's Court
        return (
          <div className="space-y-8">
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-purple-500 flex items-center gap-2">
                  <Scale className="w-6 h-6" /> Queen's Conditional Court
                </h3>
                <div className="px-3 py-1 bg-purple-900/50 text-purple-400 rounded text-sm">
                  Nested Conditions
                </div>
              </div>

              {/* Conditions Panel */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-300">Court Conditions</h4>
                  {Object.entries(courtConditions).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-900/50 rounded">
                      <div>
                        <p className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {key === 'isKnave' ? 'Prisoner is Knave of Hearts' :
                           key === 'tartStolen' ? 'Tarts were stolen' :
                           key === 'witnessIsHatter' ? 'Witness is Mad Hatter' :
                           'Witness is Alice'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCourtConditions(prev => ({
                            ...prev,
                            [key]: !value,
                          }));
                        }}
                        className={`px-4 py-2 rounded ${value ? 'bg-emerald-600' : 'bg-slate-700'} hover:opacity-90 transition-opacity`}
                      >
                        {value ? 'True' : 'False'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Verdict Display */}
                <div className="bg-slate-900/70 rounded-lg p-6">
                  <h4 className="font-bold text-slate-300 mb-4">Verdict Logic</h4>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter ? 'bg-rose-500' : 'bg-slate-700'}`}>
                        {courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">
                        IF prisoner is Knave AND tarts stolen AND witness is Hatter
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${!courtConditions.witnessIsHatter && courtConditions.witnessIsAlice ? 'bg-sky-500' : 'bg-slate-700'}`}>
                        {!courtConditions.witnessIsHatter && courtConditions.witnessIsAlice ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">
                        ELSE IF witness is Alice
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${!(courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter) && !courtConditions.witnessIsAlice ? 'bg-amber-500' : 'bg-slate-700'}`}>
                        {!(courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter) && !courtConditions.witnessIsAlice ? (
                          <Check className="w-4 h-4 text-white" />
                        ) : (
                          <Minus className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">
                        ELSE
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Verdict */}
                  <div className="mt-8 p-6 bg-slate-950/50 rounded-lg border">
                    <p className="text-sm text-slate-400 mb-2">Current Verdict:</p>
                    {courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter ? (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-rose-500">"Off with his head!"</p>
                        <p className="text-sm text-rose-400/70 mt-2">First condition satisfied</p>
                      </div>
                    ) : courtConditions.witnessIsAlice ? (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-sky-500">"Let her speak!"</p>
                        <p className="text-sm text-sky-400/70 mt-2">Second condition satisfied</p>
                      </div>
                    ) : (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-amber-500">"Trial postponed!"</p>
                        <p className="text-sm text-amber-400/70 mt-2">No conditions satisfied</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CodeBlock
                code={codeExamples[3].correct}
                variant="success"
                title="// ✅ Clean Nested Conditional Logic"
                defaultExpanded={true}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h4 className="font-bold mb-4">Key Takeaways</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Use ternary (<code>? :</code>) for mutually exclusive branches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Use <code>&&</code> operator for optional elements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span>Keep logic readable with early returns for complex conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-rose-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <span>Avoid rendering hidden elements—unmount instead</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6">
                <h4 className="font-bold mb-4">Performance Impact</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Conditional Mounting:</span>
                    <span className="text-emerald-400 font-bold">Efficient</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="w-1/4 h-full bg-emerald-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">CSS Hide/Show:</span>
                    <span className="text-amber-400 font-bold">Moderate</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="w-2/3 h-full bg-amber-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Render All:</span>
                    <span className="text-rose-400 font-bold">Inefficient</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="w-full h-full bg-rose-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <DoorOpen className="text-sky-500 w-7 h-7" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">Alice's Adventures in Wonderland</h1>
                <p className="text-sm text-slate-400">Conditional Rendering</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">Chapter {chapter + 1} of {chapters.length}</p>
                <div className="w-32 bg-slate-800 rounded-full h-1.5 mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Chapter Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${currentChapter.color.replace('text-', 'bg-')}/20`}>
                  {currentChapter.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{currentChapter.title}</h2>
                  <p className={`${currentChapter.color} font-medium`}>
                    {chapter === 0 && "Intro to Conditional Rendering"}
                    {chapter === 1 && "Anti-Pattern: Rendering Conflicts"}
                    {chapter === 2 && "Solution: Clean Conditional Logic"}
                    {chapter === 3 && "Comparison: Efficient vs Inefficient"}
                    {chapter === 4 && "Mastery: Nested Conditions"}
                  </p>
                </div>
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none bg-slate-900/30 rounded-xl p-6 border border-slate-800">
                <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <section className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="p-2 bg-sky-500/20 rounded-lg">
                  <DoorOpen className="w-5 h-5 text-sky-400" />
                </span>
                Interactive Demonstration
              </h3>
              {renderChapterDemo()}
            </section>

            {/* Code Examples */}
            {[0, 1, 2, 3].includes(chapter) && (
              <section className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="p-2 bg-purple-500/20 rounded-lg">
                    <Cat className="w-5 h-5 text-purple-400" />
                  </span>
                  Code Patterns
                </h3>
                <div className="space-y-6">
                  <CodeBlock
                    code={codeExamples[chapter].correct}
                    variant="success"
                    title="// ✅ Recommended Approach"
                    defaultExpanded={true}
                  />
                  {chapter === 0 && (
                    <CodeBlock
                      code={codeExamples[chapter].incorrect}
                      variant="error"
                      title="// ❌ Common Misconception"
                      defaultExpanded={true}
                    />
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Metaphor Registry */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Cat className="w-5 h-5 text-sky-400" />
                  Wonderland Metaphors
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-lg">
                    <p className="font-medium text-sky-400">Alice's Size</p>
                    <p className="text-sm text-slate-400">Component state determining rendered output</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="font-medium text-purple-400">Cheshire Cat</p>
                    <p className="text-sm text-slate-400">Conditionally mounted component (<code>&&</code>)</p>
                  </div>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                    <p className="font-medium text-rose-400">Two Sizes at Once</p>
                    <p className="text-sm text-slate-400">Anti-pattern of rendering conflicting states</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <p className="font-medium text-emerald-400">The Cat's Logic</p>
                    <p className="text-sm text-slate-400">Ternary operator for exclusive choices</p>
                  </div>
                </div>
              </div>

              {/* Chapter Navigation */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">Chapter Navigation</h3>
                <div className="space-y-2">
                  {chapters.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChapter(idx)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${chapter === idx ? 'bg-sky-500/20 border border-sky-500/50' : 'hover:bg-slate-800/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${chapter === idx ? 'bg-sky-500' : 'bg-slate-700'}`}>
                          <span className="text-sm font-bold">{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{chap.title}</p>
                          <p className="text-xs text-slate-500 truncate">
                            {idx === 0 && "Intro to conditional rendering"}
                            {idx === 1 && "The anti-pattern of conflicting renders"}
                            {idx === 2 && "Clean, exclusive conditional logic"}
                            {idx === 3 && "Efficient vs. inefficient rendering"}
                            {idx === 4 && "Complex nested conditions"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Prev/Next Buttons */}
                <div className="flex justify-between mt-6 pt-6 border-t border-slate-800">
                  <button
                    onClick={() => setChapter(Math.max(0, chapter - 1))}
                    disabled={chapter === 0}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                    disabled={chapter === chapters.length - 1}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}