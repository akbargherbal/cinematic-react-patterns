import { useState, useRef, useCallback, useMemo } from "react";
import { Zap, Eye, EyeOff, AlertTriangle, CheckCircle, Link2 } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function FrankensteinModule() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Ambitious Creation",
        content: `The storm raged over the University of Ingolstadt as Victor Frankenstein stood before his greatest work. Lightning illuminated the laboratory in violent flashes, casting shadows across the surgical table where his creation lay—a patchwork of carefully assembled parts, waiting for the spark of life.

For months, he had labored in secret, studying the mysteries of animation, the principles by which inert matter might be given consciousness. Now, as thunder shook the ancient stones, he was ready to attempt what no natural philosopher had dared before: to create a living, thinking being.

"Tonight," he whispered to the darkness, "I shall be as a god."

He threw the switch. Electricity arced through copper wires, surging into the body on the table. The Creature's fingers twitched. Its chest heaved with its first breath. And then—its eyes opened.

Victor staggered back, overwhelmed by the magnitude of what he had done. The Creature sat up slowly, turning its head to survey the laboratory. It was alive. It was conscious. It was... independent.

In his obsession with the act of creation, Victor had made a critical error. He had given the Creature life—animated its body, sparked its mind—but he had established no mechanism of communication, no system of control. The Creature was not bound to him by any covenant or connection. It simply... existed. Separate. Autonomous.

The Creature rose from the table and walked to the window, moving with surprising grace. Victor watched, paralyzed by a mixture of pride and creeping unease. He had created life, yes—but what had he actually created? What did the Creature think? What did it want? He had no way of knowing.

"Wait," Victor called out, his voice uncertain. "You must—"

But the Creature was already at the door, its hand on the latch. It looked back at Victor once, its yellow eyes unreadable, and then it was gone into the night.

Victor stood alone in his laboratory, surrounded by his instruments and his notes, and felt the first cold touch of dread. He had built something magnificent, something that seemed to work perfectly—but he had built it without any way to observe its internal state, to guide its decisions, to maintain any connection to its will.

The Creature was out there now, somewhere in the darkness, making choices Victor could neither see nor influence. And Victor, despite being its creator, was powerless to do anything but wait and hope that his creation would behave as he had imagined it would.

He had no idea that hope was not enough.`,
      },
      {
        id: "build",
        title: "The Unbound Will",
        content: `The Creature walked through the forest, each step taking it farther from the laboratory, farther from its creator. It had no name, no purpose given to it, no instructions. It had only its own nascent consciousness, its own emerging desires, its own internal state that shifted and evolved with each new experience.

In the village of Chamounix, Victor Frankenstein tried to continue his life as if nothing had changed. He told himself that the Creature would be fine, that it would find its way, that the act of creation was enough. After all, he had given it life—surely that was sufficient?

But late at night, doubt gnawed at him. Where was the Creature now? What was it thinking? What was it doing? He had no way to know. He had created it, yes, but he had established no mechanism to observe its state, no channel through which information could flow back to him.

He tried to reassure himself with logic: "The Creature has a body, it has a mind—it must be managing itself perfectly well. Why should I need to track its every movement, its every thought? That would be... excessive. Controlling. Better to let it be free, to manage its own affairs."

This reasoning felt sound in the safety of his study. But it was built on a dangerous assumption: that the Creature's internal state would naturally align with Victor's expectations, that independence and predictability could coexist without any binding connection.

Meanwhile, the Creature wandered. It learned language by observing a family through their cottage window. It felt hunger and satisfied it. It felt cold and sought warmth. It felt loneliness and yearned for companionship. Each experience modified its internal state—its understanding of the world, its desires, its intentions.

And Victor knew none of it.

The Creature's state was its own, managed internally, inaccessible to its creator. It was like a form input managing its own value in the DOM—functional, yes, but opaque. Victor could not read the Creature's thoughts any more than a parent component can read the current value of an uncontrolled input without explicitly querying the DOM.

One day, Victor received a letter from a colleague in Geneva. "Have you heard the strange reports from the mountain villages?" it read. "Sightings of an unusual figure, moving through the night. Some say it approaches homes, peers through windows. The villagers are frightened."

Victor's blood ran cold. It had to be the Creature. But what was it doing? What did it want? He had no way to know, no way to check its current state without physically tracking it down. And even then, what could he do? He had no mechanism to influence it, no way to send it commands or guidance.

He had created something that worked independently—and that independence, which had seemed like a feature, was revealing itself to be a flaw.`,
      },
      {
        id: "climax",
        title: "The Rampage",
        content: `The scream echoed across the Alpine valley, shattering the morning stillness.

Victor was in Geneva when the news reached him: a child had been killed. Little William Frankenstein, Victor's own brother, found strangled in the woods. And the description of the figure seen fleeing the scene—massive, grotesque, moving with inhuman speed—left no doubt in Victor's mind.

The Creature had killed.

Victor's world collapsed. He had created this being, given it life, and now it had taken life in return. But the horror was compounded by a terrible realization: he had no idea why. What had driven the Creature to murder? What was its internal state—its thoughts, its motivations, its intentions? Victor had no access to any of it.

He had created something that managed its own state, made its own decisions, and he was discovering the consequences of that independence only after they had become irreversible.

The deaths continued. Henry Clerval, Victor's dearest friend, found dead on a beach. Elizabeth, Victor's bride, murdered on their wedding night. Each tragedy was a shock, each one unpredictable, because Victor had no way to observe the Creature's state, no way to anticipate its actions.

He tried to track it, to find it, to confront it. But the Creature was always one step ahead, its internal state evolving in ways Victor could not predict or prevent. It was like trying to debug a form submission that fails mysteriously—you created the input, you thought it would work, but somewhere in the gap between creation and submission, the state diverged from your expectations, and now you're staring at corrupted data with no idea how it got that way.

When Victor finally encountered the Creature on a glacier, the being spoke, and its words were devastating:

"You made me, but you abandoned me. You gave me consciousness but no guidance. You created me to be independent, and then you were horrified when I acted independently. Did you think I would simply behave as you imagined, without any connection between us? Did you think my internal state would magically align with your expectations?"

Victor had no answer. The Creature was right. He had created it without establishing any mechanism for communication, any system for observing or influencing its state. He had assumed that the act of creation was enough, that the Creature would somehow naturally behave predictably.

But state without observation is chaos. Independence without connection is abandonment. And now, people were dead because of his architectural failure.

"I wanted companionship," the Creature continued. "I wanted understanding. But you gave me neither. You created me and then lost track of me. And now you blame me for the consequences of your negligence."

Victor realized, too late, that the problem was not the Creature itself—it was the relationship he had failed to establish. He had built something that managed its own state, and he had paid the price for that separation.`,
      },
      {
        id: "resolution",
        title: "The Binding Covenant",
        content: `In the depths of his despair, Victor Frankenstein had a vision—or perhaps it was merely the fevered imagination of a broken man. But in this vision, he saw an alternative timeline, a different path he might have taken.

He saw himself in the laboratory again, on that stormy night, standing before the Creature as it opened its eyes for the first time. But in this version, Victor did not step back. He did not let the Creature simply walk away into independence.

Instead, he spoke: "You are alive, and I am your creator. But life without connection is chaos. So I propose a covenant between us—a binding agreement that will govern our relationship."

The Creature, newly conscious, listened.

"You will have will," Victor continued, "and you will have desires. But before you act on any desire, you must report it to me. You must tell me what you wish to do. And I, in turn, will decide whether to permit it. Your will flows through me. Your state is not your own—it is mine to hold, mine to observe, mine to modify."

"That sounds like slavery," the Creature said, its voice uncertain.

"No," Victor replied. "It is responsibility. I created you, and therefore I am responsible for you. I cannot be responsible for what I cannot observe or influence. This covenant does not diminish you—it connects us. You will still have consciousness, still have desires. But those desires will not lead to chaos, because I will be there to guide them, to validate them, to ensure they align with the world we both inhabit."

The Creature considered this. "And if I wish to do something you forbid?"

"Then you will not do it," Victor said simply. "Your actions will be constrained by my decisions. But in exchange, you will never be lost, never be abandoned, never be left to wander in confusion. I will always know your state. I will always be connected to you. And when you need guidance, I will provide it."

The Creature nodded slowly. "Very well. I accept this covenant."

And so Victor established the binding: a two-way channel of communication. The Creature would report every impulse, every desire, every change in its internal state. And Victor would respond, either permitting the change or denying it, maintaining the Creature's state within his own consciousness.

In this alternative timeline, when the Creature felt loneliness and approached the village, it first reported to Victor: "I wish to seek companionship among humans."

Victor, observing this desire, could respond: "No. You are not ready. Your appearance would frighten them. Wait."

And the Creature, bound by the covenant, would wait.

When the Creature encountered little William in the woods and felt a surge of anger at the child's rejection, it reported: "I wish to harm this child."

And Victor, immediately aware of this dangerous impulse, could respond: "No. That desire is not permitted. Return to the laboratory."

And the Creature would obey, because its state was not its own—it was held by Victor, managed by Victor, controlled by Victor.

The murders never happened. The tragedy was prevented. Not because the Creature lacked will, but because its will was channeled through a system of observation and control. Victor maintained the single source of truth about the Creature's state, and therefore he could prevent the state from evolving into catastrophe.`,
      },
      {
        id: "summary",
        title: "The Lesson of Creation",
        content: `Years later, Victor Frankenstein sat in his study, writing his memoirs by candlelight. His hand trembled as he set down the words that would serve as his warning to future generations:

"I have learned, through bitter experience, that there are two ways to create life—or in your modern parlance, two ways to create form inputs in React."

"The first way is the path I took: the uncontrolled approach. You create the element, you give it life, and you let it manage its own internal state. This seems simpler. It requires less code, less ceremony. The input exists, it responds to user interaction, it holds a value. What more could you need?"

"But this simplicity is an illusion. You have created something you cannot observe without effort, cannot influence without awkwardness, cannot validate without querying the DOM directly. The state exists, but it exists separately from your component's state. You are the creator, but you are not in control."

"Use this approach only when you truly need independence—when you're integrating with third-party libraries that expect to manage their own DOM, when you're building a simple form that you'll only read on submission, when performance is critical and you can accept the tradeoff of reduced control. But understand the cost: you are creating something that will evolve beyond your observation."

"The second way is the path I should have taken: the controlled approach. You create the element, but you bind its value to your own state. You establish a covenant—a two-way channel of communication. The input reports every change via onChange, and you decide whether to accept that change by updating your state. The input's value is always exactly what your state says it is."

"This requires more code, yes. You must maintain state, you must write an onChange handler, you must explicitly bind the value prop. But in exchange, you gain complete observability and control. You can validate input as the user types. You can conditionally enable other elements based on the input's value. You can programmatically set or clear the value. You can log every change. You can synchronize with other state. You can debug with confidence, because the state is in React, visible in DevTools, part of your component's single source of truth."

"Use this approach for any form where you need to do more than simply read the final value on submission. Use it when you need validation, when you need conditional logic, when you need to coordinate multiple inputs, when you need to submit data to an API. Use it when you need to be responsible for the state, because responsibility requires connection."

"The choice between these approaches is not a matter of right and wrong—it is a matter of responsibility and tradeoffs. Ask yourself: Do I need to observe this state? Do I need to influence it? Do I need to validate it? Do I need to coordinate it with other state?"

"If the answer is yes, then you need a controlled component. You need the covenant. You need the connection."

"If the answer is no—if you truly only need to read the value once, on submission, and you're willing to accept the limitations—then an uncontrolled component may suffice. But be honest with yourself about those limitations. Do not make my mistake of assuming that independence and predictability can coexist without connection."

"I created life without establishing a mechanism to observe or guide it, and I paid the price in blood. You will create form inputs, and if you make the same mistake, you will pay the price in bugs—mysterious form submissions, validation failures, state synchronization issues, debugging nightmares."

"The pattern is the same. The lesson is the same."

"To create is to accept responsibility. To control is to maintain connection. And connection, though it requires more effort, is the only path to preventing chaos."

Victor set down his pen and stared at the words he had written. Outside, the wind howled across the frozen wasteland where he pursued his creation still, locked in an eternal chase born of his original failure.

But perhaps, he thought, if even one future creator learned from his mistake—if even one developer chose the controlled approach when it mattered—then his suffering would not have been entirely in vain.

The choice is yours. The covenant is offered. Will you accept the responsibility of connection, or will you create in independence and hope for the best?

Victor Frankenstein hoped you would choose wisely. He had learned, too late, that hope is not a strategy.`,
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];

  const nextChapter = useCallback(() => {
    if (chapter < chapters.length - 1) {
      setChapter((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [chapter, chapters.length]);

  const prevChapter = useCallback(() => {
    if (chapter > 0) {
      setChapter((c) => c - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [chapter]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-emerald-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400">
              Frankenstein's Covenant
            </h1>
          </div>
          <p className="text-lg text-slate-400 ml-11">
            Victor Frankenstein, Geneva, 1818
          </p>
          <p className="text-sm text-emerald-500/70 ml-11 mt-1">
            Controlled vs Uncontrolled Components
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Narrative Section */}
          <article className="prose prose-invert prose-slate max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-6">
              {currentChapter.title}
            </h2>
            <div className="text-slate-300 leading-relaxed space-y-4 whitespace-pre-line">
              {currentChapter.content}
            </div>
          </article>

          {/* Interactive Demo Section */}
          <aside className="lg:sticky lg:top-8 h-fit">
            {chapter === 0 && <IntroDemo />}
            {chapter === 1 && <UnboundWillDemo />}
            {chapter === 2 && <RampageDemo />}
            {chapter === 3 && <CovenantDemo />}
            {chapter === 4 && <LessonDemo />}
          </aside>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={prevChapter}
              disabled={chapter === 0}
              className="px-4 sm:px-6 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-900/50 hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous chapter"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChapter(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === chapter
                      ? "bg-emerald-500 w-8"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextChapter}
              disabled={chapter === chapters.length - 1}
              className="px-4 sm:px-6 py-2 bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 rounded hover:bg-emerald-900/50 hover:border-emerald-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next chapter"
            >
              Next
            </button>
          </div>

          <div className="text-center mt-2 text-sm text-slate-500">
            Chapter {chapter + 1} of {chapters.length}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Demo Components

function IntroDemo() {
  const [controlledValue, setControlledValue] = useState("");
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [showUncontrolled, setShowUncontrolled] = useState(false);

  return (
    <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        The Laboratory Experiment
      </h3>

      <div className="space-y-6">
        {/* Controlled Input */}
        <div className="bg-slate-800/50 border border-emerald-500/20 rounded p-4">
          <label className="block text-sm font-semibold text-emerald-400 mb-2">
            Controlled Creature (Bound to Victor)
          </label>
          <input
            type="text"
            value={controlledValue}
            onChange={(e) => setControlledValue(e.target.value)}
            placeholder="Type here..."
            className="w-full px-3 py-2 bg-slate-900 border border-emerald-500/30 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <div className="mt-3 flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4 text-emerald-500" />
            <span className="text-slate-400">
              Victor sees:{" "}
              <span className="text-emerald-400 font-mono">
                "{controlledValue}"
              </span>
            </span>
          </div>
        </div>

        {/* Uncontrolled Input */}
        <div className="bg-slate-800/50 border border-amber-500/20 rounded p-4">
          <label className="block text-sm font-semibold text-amber-400 mb-2">
            Uncontrolled Creature (Independent)
          </label>
          <input
            ref={uncontrolledRef}
            type="text"
            defaultValue=""
            placeholder="Type here..."
            className="w-full px-3 py-2 bg-slate-900 border border-amber-500/30 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <div className="mt-3 flex items-center gap-2 text-sm">
            <EyeOff className="w-4 h-4 text-amber-500" />
            <span className="text-slate-400">
              Victor sees:{" "}
              <span className="text-amber-400 font-mono">
                {showUncontrolled
                  ? `"${uncontrolledRef.current?.value || ""}"`
                  : "???"}
              </span>
            </span>
          </div>
          <button
            onClick={() => setShowUncontrolled(!showUncontrolled)}
            className="mt-2 px-3 py-1 bg-amber-900/30 text-amber-400 border border-amber-500/30 rounded text-sm hover:bg-amber-900/50"
          >
            {showUncontrolled ? "Hide" : "Query DOM"}
          </button>
        </div>

        <div className="text-sm text-slate-400 bg-slate-800/30 rounded p-3 border-l-2 border-emerald-500/50">
          <p className="font-semibold text-emerald-400 mb-1">The Pattern:</p>
          <p>
            The controlled input's value flows through React state. Victor
            (parent component) always knows its current state. The uncontrolled
            input manages its own state in the DOM—Victor must explicitly query
            it to know what it contains.
          </p>
        </div>
      </div>
    </div>
  );
}

function UnboundWillDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [queriedValue, setQueriedValue] = useState<string | null>(null);
  const [queryCount, setQueryCount] = useState(0);

  const queryCreature = () => {
    if (inputRef.current) {
      setQueriedValue(inputRef.current.value);
      setQueryCount((c) => c + 1);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <EyeOff className="w-5 h-5" />
        The Unbound Will
      </h3>

      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-amber-500/20 rounded p-4">
          <label className="block text-sm font-semibold text-amber-400 mb-2">
            The Creature's Thoughts (Uncontrolled)
          </label>
          <input
            ref={inputRef}
            type="text"
            defaultValue=""
            placeholder="The Creature thinks..."
            className="w-full px-3 py-2 bg-slate-900 border border-amber-500/30 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="bg-slate-800/30 rounded p-4 border border-slate-700">
          <p className="text-sm text-slate-400 mb-3">
            Victor's Knowledge (requires tracking):
          </p>
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={queryCreature}
              className="px-4 py-2 bg-amber-900/30 text-amber-400 border border-amber-500/30 rounded hover:bg-amber-900/50 flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Track the Creature
            </button>
            <span className="text-xs text-slate-500">
              (Queries: {queryCount})
            </span>
          </div>
          {queriedValue !== null ? (
            <div className="bg-slate-900/50 rounded p-3 border border-amber-500/20">
              <p className="text-sm text-amber-400 font-mono">
                Last known state: "{queriedValue}"
              </p>
              <p className="text-xs text-slate-500 mt-1">
                But is this still accurate? Victor has no way to know without
                querying again...
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/50 rounded p-3 border border-slate-700">
              <p className="text-sm text-slate-500 italic">
                Victor has no knowledge of the Creature's current state.
              </p>
            </div>
          )}
        </div>

        <div className="text-sm text-slate-400 bg-slate-800/30 rounded p-3 border-l-2 border-amber-500/50">
          <p className="font-semibold text-amber-400 mb-1">The Problem:</p>
          <p>
            With uncontrolled components, you must use refs to access the DOM
            directly. You have no real-time connection to the input's state—you
            can only query it at specific moments. The state exists, but it's
            opaque to your component.
          </p>
        </div>
      </div>
    </div>
  );
}

function RampageDemo() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    setFormData({ name, email });
    setSubmitted(true);
  };

  const isEmailValid = formData?.email.includes("@") && formData?.email.includes(".");

  return (
    <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        The Rampage
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            defaultValue=""
            placeholder="Enter name..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Email
          </label>
          <input
            ref={emailRef}
            type="text"
            defaultValue=""
            placeholder="Enter email..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-900/30 text-red-400 border border-red-500/30 rounded hover:bg-red-900/50"
        >
          Submit Form (Discover the Chaos)
        </button>
      </form>

      {submitted && formData && (
        <div className="mt-4 space-y-3">
          <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
            <p className="text-sm font-semibold text-slate-300 mb-2">
              Submitted Data:
            </p>
            <div className="space-y-1 text-sm font-mono">
              <p className="text-slate-400">
                Name: <span className="text-slate-200">{formData.name || "(empty)"}</span>
              </p>
              <p className="text-slate-400">
                Email: <span className="text-slate-200">{formData.email || "(empty)"}</span>
              </p>
            </div>
          </div>

          {(!formData.name || !isEmailValid) && (
            <div className="bg-red-900/20 border border-red-500/30 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-400 mb-1">
                    Validation Failed!
                  </p>
                  <ul className="text-sm text-red-300 space-y-1">
                    {!formData.name && <li>• Name is required</li>}
                    {!isEmailValid && <li>• Email is invalid</li>}
                  </ul>
                  <p className="text-xs text-slate-400 mt-2">
                    Victor discovers the errors only after submission—too late
                    to prevent the tragedy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {formData.name && isEmailValid && (
            <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-sm text-emerald-400">
                  Success! But only by luck—no validation prevented errors.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-slate-400 bg-slate-800/30 rounded p-3 border-l-2 border-red-500/50">
        <p className="font-semibold text-red-400 mb-1">The Consequence:</p>
        <p>
          Without real-time access to input state, you cannot validate as the
          user types. You discover errors only on submission—after the user has
          invested time and effort. The Creature's rampage is the metaphor for
          every form bug that could have been prevented with proper state
          management.
        </p>
      </div>
    </div>
  );
}

function CovenantDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const nameError = name.length > 0 && name.length < 2 ? "Name too short" : "";
  const emailError =
    email.length > 0 && (!email.includes("@") || !email.includes("."))
      ? "Invalid email"
      : "";

  const isValid = name.length >= 2 && email.includes("@") && email.includes(".");

  return (
    <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
        <Link2 className="w-5 h-5" />
        The Binding Covenant
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Name (Controlled)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className={`w-full px-3 py-2 bg-slate-900 border rounded text-slate-200 placeholder-slate-500 focus:outline-none ${
              nameError
                ? "border-red-500/50 focus:border-red-500"
                : "border-emerald-500/30 focus:border-emerald-500"
            }`}
          />
          {nameError && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {nameError}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <Link2 className="w-3 h-3 text-emerald-500" />
            <span>
              Victor observes: <span className="text-emerald-400 font-mono">"{name}"</span>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Email (Controlled)
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email..."
            className={`w-full px-3 py-2 bg-slate-900 border rounded text-slate-200 placeholder-slate-500 focus:outline-none ${
              emailError
                ? "border-red-500/50 focus:border-red-500"
                : "border-emerald-500/30 focus:border-emerald-500"
            }`}
          />
          {emailError && (
            <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {emailError}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <Link2 className="w-3 h-3 text-emerald-500" />
            <span>
              Victor observes: <span className="text-emerald-400 font-mono">"{email}"</span>
            </span>
          </div>
        </div>

        <button
          disabled={!isValid}
          className={`w-full px-4 py-2 rounded transition-all ${
            isValid
              ? "bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50"
              : "bg-slate-800/30 text-slate-600 border border-slate-700 cursor-not-allowed"
          }`}
        >
          {isValid ? "Submit (Validated)" : "Submit (Validation Required)"}
        </button>

        <div className="bg-slate-800/30 rounded p-4 border border-emerald-500/20">
          <p className="text-sm font-semibold text-emerald-400 mb-2">
            The Covenant in Action:
          </p>
          <ul className="text-sm text-slate-400 space-y-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Victor observes every change in real-time</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Validation happens as the user types</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Submit button disabled until form is valid</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>No surprises on submission—state is always known</span>
            </li>
          </ul>
        </div>

        <div className="text-sm text-slate-400 bg-slate-800/30 rounded p-3 border-l-2 border-emerald-500/50">
          <p className="font-semibold text-emerald-400 mb-1">The Pattern:</p>
          <p>
            Controlled components bind input values to React state via the{" "}
            <code className="text-emerald-400 font-mono">value</code> prop and
            handle changes via{" "}
            <code className="text-emerald-400 font-mono">onChange</code>. This
            creates a two-way covenant: the input reports changes, the parent
            decides whether to accept them. The result is complete observability
            and control.
          </p>
        </div>
      </div>
    </div>
  );
}

function LessonDemo() {
  const [pattern, setPattern] = useState<"uncontrolled" | "controlled">("controlled");

  return (
    <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-emerald-400 mb-4">
        The Decision Tree
      </h3>

      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
          <p className="text-sm font-semibold text-slate-300 mb-3">
            Choose your pattern:
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setPattern("controlled")}
              className={`w-full px-4 py-3 rounded text-left transition-all ${
                pattern === "controlled"
                  ? "bg-emerald-900/30 border-2 border-emerald-500/50 text-emerald-400"
                  : "bg-slate-800/30 border border-slate-600 text-slate-400 hover:border-slate-500"
              }`}
            >
              <div className="font-semibold mb-1">Controlled Component</div>
              <div className="text-xs opacity-80">
                Parent holds state, complete control
              </div>
            </button>
            <button
              onClick={() => setPattern("uncontrolled")}
              className={`w-full px-4 py-3 rounded text-left transition-all ${
                pattern === "uncontrolled"
                  ? "bg-amber-900/30 border-2 border-amber-500/50 text-amber-400"
                  : "bg-slate-800/30 border border-slate-600 text-slate-400 hover:border-slate-500"
              }`}
            >
              <div className="font-semibold mb-1">Uncontrolled Component</div>
              <div className="text-xs opacity-80">
                DOM holds state, minimal code
              </div>
            </button>
          </div>
        </div>

        {pattern === "controlled" && (
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded p-4">
            <p className="text-sm font-semibold text-emerald-400 mb-2">
              Use Controlled When:
            </p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>✓ You need real-time validation</li>
              <li>✓ You need to coordinate multiple inputs</li>
              <li>✓ You need conditional logic based on input values</li>
              <li>✓ You need to programmatically set/clear values</li>
              <li>✓ You're submitting to an API with validation</li>
              <li>✓ You need to debug form state easily</li>
            </ul>
            <div className="mt-3 bg-slate-900/50 rounded p-3 border border-emerald-500/20">
              <p className="text-xs font-mono text-emerald-400 mb-1">
                Example:
              </p>
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`const [value, setValue] = useState("");

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
              </pre>
            </div>
          </div>
        )}

        {pattern === "uncontrolled" && (
          <div className="bg-amber-900/20 border border-amber-500/30 rounded p-4">
            <p className="text-sm font-semibold text-amber-400 mb-2">
              Use Uncontrolled When:
            </p>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>✓ Simple form, read only on submit</li>
              <li>✓ Integrating with third-party DOM libraries</li>
              <li>✓ File inputs (must be uncontrolled)</li>
              <li>✓ Performance is critical and you accept tradeoffs</li>
            </ul>
            <div className="mt-3 bg-slate-900/50 rounded p-3 border border-amber-500/20">
              <p className="text-xs font-mono text-amber-400 mb-1">
                Example:
              </p>
              <pre className="text-xs text-slate-300 overflow-x-auto">
{`const inputRef = useRef(null);

<input
  ref={inputRef}
  defaultValue=""
/>

// Access via: inputRef.current.value`}
              </pre>
            </div>
            <div className="mt-3 bg-amber-900/20 rounded p-2 border-l-2 border-amber-500">
              <p className="text-xs text-amber-400">
                ⚠️ Warning: You lose real-time observability and control.
              </p>
            </div>
          </div>
        )}

        <div className="text-sm text-slate-400 bg-slate-800/30 rounded p-3 border-l-2 border-emerald-500/50">
          <p className="font-semibold text-emerald-400 mb-1">
            Victor's Final Wisdom:
          </p>
          <p>
            "When in doubt, choose controlled. The extra code is not
            overhead—it's the foundation of responsible state management. To
            create is to accept responsibility. To control is to maintain
            connection."
          </p>
        </div>
      </div>
    </div>
  );
}