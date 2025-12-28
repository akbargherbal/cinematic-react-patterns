import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// Import modules
import Home from "@modules/home";
import DrFrank from "@modules/dr-frank";
import FightClub from "@modules/fight-club";
import MeanGirls from "@modules/mean-girls";
import ClockworkOrangeModule from "@modules/clockwork-orange-forced-rerenders";
import MatrixDependencies from "@modules/matrix-dependencies";
import LooperCallbackTiming from "@modules/looper-callback-timing";

import MeanGirlsContextAPI from "@modules/mean-girls-context-api";
import FrankensteinModule from "@modules/frankenstein-controlled-components";
import FightClubStrictMode from "@modules/fight-club-strict-mode";
import MatrixUseEffectDependencies from "@modules/matrix-useeffect-dependencies";
import InceptionComposition from "@modules/inception-component-composition";
import MementoStateManagement from "@modules/memento-state-management";
import GroundhogDayRerendering from "@modules/groundhog-day-rerendering";
import StateMutation1984 from "@modules/1984-state-mutation";
import BackToFuturePropChanges from "@modules/back-to-future-prop-changes";
import TrumanShowLifecycle from "@modules/truman-show-component-lifecycle";
import LOTRPropDrilling from "@modules/lotr-prop-drilling-hell";
import OceansElevenModule from "@modules/oceans-eleven-coordinated-state";
import JurassicParkSideEffects from "@modules/jurassic-park-side-effects";
import EternalSunshine from "@modules/eternal-sunshine-state-reset";
import PrestigeReactMemo from "@modules/prestige-react-memo";
import ShutterIslandModule from "@modules/shutter-island-stale-closures";
import SixthSenseModule from "@modules/sixth-sense-conditional-rendering";
import InterstellarAsyncState from "@modules/interstellar-async-state";
import SocialNetworkStateSync from "@modules/social-network-state-sync";
import ParasiteComponentInjection from "@modules/parasite-component-injection";
import ArrivalUseMemo from "@modules/arrival-usememo-expensive-calculations";
import UsualSuspectsDynamicRendering from "@modules/usual-suspects-dynamic-rendering";
import PrimerStateTimeTravel from "@modules/primer-state-time-travel";
import GetOutComponentHijacking from "@modules/get-out-component-hijacking";
import HerCustomHooks from "@modules/her-is-custom-hooks";
import DonnieDarkoEffectDependencies from "@modules/donnie-darko-effect-dependencies";
import BandersnatchStateBranching from "@modules/bandersnatch-state-branching";
import TenetReverseDataFlow from "@modules/tenet-reverse-data-flow";
import RashomonModule from "@modules/rashomon-component-perspectives";
import WestworldModule from "@modules/westworld-component-vs-instance";
import BladeRunnerComponentIdentity from "@modules/blade-runner-component-identity";
import TheThingComponentReplacement from "@modules/the-thing-component-replacement";
import StrangerThingsPortalRendering from "@modules/stranger-things-portal-rendering";
import ExMachinaComponentTesting from "@modules/ex-machina-component-testing";
import ButterflyEffectModule from "@modules/butterfly-effect-state-mutation";
import SourceCodeRemountingLoop from "@modules/source-code-remounting-loop";
import MultiplicityModule from "@modules/multiplicity-component-cloning";
import EdgeOfTomorrow from "@modules/edge-of-tomorrow-component-reset";
import PrestigeModule from "@modules/prestige-usememo-cost-analysis";
import MoonSingletonPattern from "@modules/moon-singleton-pattern";
import MatrixReloadedSystemExit from "@modules/matrix-reloaded-system-exit";
import VillageModule from "@modules/village-scoped-context";
import TwelveMonkeysModule from "@modules/twelve-monkeys-circular-dependencies";
import MinorityReportOptimisticRendering from "@modules/minority-report-optimistic-rendering";
import CoherenceStateSync from "@modules/coherence-state-sync";
import RussianDollLifecycleDebugging from "@modules/russian-doll-lifecycle-debugging";
/**
 * Module Wrapper Component
 * Handles environment isolation for each module:
 * - Sets body background class
 * - Provides universal exit button
 * - Cleans up on unmount
 */
interface ModuleWrapperProps {
  children: React.ReactNode;
  bgClass: string;
  textClass?: string;
  fontClass?: string;
}

const ModuleWrapper = ({
  children,
  bgClass,
  textClass = "text-white",
  fontClass = "font-sans",
}: ModuleWrapperProps) => {
  useEffect(() => {
    const originalClass = document.body.className;
    document.body.className = `${bgClass} ${textClass} ${fontClass}`;

    return () => {
      document.body.className = originalClass;
    };
  }, [bgClass, textClass, fontClass]);

  return (
    <div
      className={`relative min-h-screen ${bgClass} ${textClass} ${fontClass}`}
    >
      {/* Universal Exit Button */}
      <Link
        to="/"
        className="fixed top-4 left-3 z-[100] opacity-30 hover:opacity-100 transition-opacity p-2 bg-black/70 hover:bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest shadow-lg"
        title="Return to Home"
      >
        ← EXIT
      </Link>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 lg:py-6">
        {children}
      </div>
    </div>
  );
};

/**
 * Scroll to Top on Route Change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main App Router
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <ModuleWrapper bgClass="bg-zinc-950">
              <Home />
            </ModuleWrapper>
          }
        />

        {/* Module 1: Frankenstein's Forms */}
        <Route
          path="/dr-frank"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <DrFrank />
            </ModuleWrapper>
          }
        />

        {/* Module 2: Project Mayhem (Fight Club) */}
        <Route
          path="/fight-club"
          element={
            <ModuleWrapper
              bgClass="bg-black"
              textClass="text-white"
              fontClass="font-sans"
            >
              <FightClub />
            </ModuleWrapper>
          }
        />

        {/* Module 3: The Burn Book (Mean Girls) */}
        <Route
          path="/mean-girls"
          element={
            <ModuleWrapper
              bgClass="bg-pink-50"
              textClass="text-gray-900"
              fontClass="font-sans"
            >
              <MeanGirls />
            </ModuleWrapper>
          }
        />

        <Route
          path="/clockwork-orange-forced-rerenders"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-200"
              fontClass="font-sans"
            >
              <ClockworkOrangeModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/matrix-dependencies"
          element={
            <ModuleWrapper
              bgClass="bg-emerald-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <MatrixDependencies />
            </ModuleWrapper>
          }
        />

        <Route
          path="/looper-callback-timing"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-200"
              fontClass="font-sans"
            >
              <LooperCallbackTiming />
            </ModuleWrapper>
          }
        />

        
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

        <Route
          path="/groundhog-day-rerendering"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <GroundhogDayRerendering />
            </ModuleWrapper>
          }
        />

        <Route
          path="/1984-state-mutation"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <StateMutation1984 />
            </ModuleWrapper>
          }
        />

        <Route
          path="/back-to-future-prop-changes"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-200"
              fontClass="font-sans"
            >
              <BackToFuturePropChanges />
            </ModuleWrapper>
          }
        />

        <Route
          path="/truman-show-component-lifecycle"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <TrumanShowLifecycle />
            </ModuleWrapper>
          }
        />

        <Route
          path="/lotr-prop-drilling-hell"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <LOTRPropDrilling />
            </ModuleWrapper>
          }
        />

        <Route
          path="/oceans-eleven-coordinated-state"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <OceansElevenModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/jurassic-park-side-effects"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <JurassicParkSideEffects />
            </ModuleWrapper>
          }
        />

        <Route
          path="/eternal-sunshine-state-reset"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <EternalSunshine />
            </ModuleWrapper>
          }
        />

        <Route
          path="/prestige-react-memo"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <PrestigeReactMemo />
            </ModuleWrapper>
          }
        />

        <Route
          path="/shutter-island-stale-closures"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <ShutterIslandModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/sixth-sense-conditional-rendering"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <SixthSenseModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/interstellar-async-state"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-100"
              fontClass="font-sans"
            >
              <InterstellarAsyncState />
            </ModuleWrapper>
          }
        />

        <Route
          path="/social-network-state-sync"
          element={
            <ModuleWrapper
              bgClass="bg-slate-800"
              textClass="text-white"
              fontClass="font-sans"
            >
              <SocialNetworkStateSync />
            </ModuleWrapper>
          }
        />

        <Route
          path="/parasite-component-injection"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <ParasiteComponentInjection />
            </ModuleWrapper>
          }
        />

        <Route
          path="/arrival-usememo-expensive-calculations"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <ArrivalUseMemo />
            </ModuleWrapper>
          }
        />

        <Route
          path="/usual-suspects-dynamic-rendering"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-amber-100"
              fontClass="font-sans"
            >
              <UsualSuspectsDynamicRendering />
            </ModuleWrapper>
          }
        />

        <Route
          path="/primer-state-time-travel"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <PrimerStateTimeTravel />
            </ModuleWrapper>
          }
        />

        <Route
          path="/get-out-component-hijacking"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <GetOutComponentHijacking />
            </ModuleWrapper>
          }
        />

        <Route
          path="/her-is-custom-hooks"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-200"
              fontClass="font-sans"
            >
              <HerCustomHooks />
            </ModuleWrapper>
          }
        />

        <Route
          path="/donnie-darko-effect-dependencies"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <DonnieDarkoEffectDependencies />
            </ModuleWrapper>
          }
        />

        <Route
          path="/bandersnatch-state-branching"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <BandersnatchStateBranching />
            </ModuleWrapper>
          }
        />

        <Route
          path="/tenet-reverse-data-flow"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <TenetReverseDataFlow />
            </ModuleWrapper>
          }
        />

        <Route
          path="/rashomon-component-perspectives"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <RashomonModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/westworld-component-vs-instance"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <WestworldModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/blade-runner-component-identity"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <BladeRunnerComponentIdentity />
            </ModuleWrapper>
          }
        />

        <Route
          path="/the-thing-component-replacement"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <TheThingComponentReplacement />
            </ModuleWrapper>
          }
        />

        <Route
          path="/stranger-things-portal-rendering"
          element={
            <ModuleWrapper
              bgClass="bg-red-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <StrangerThingsPortalRendering />
            </ModuleWrapper>
          }
        />

        <Route
          path="/ex-machina-component-testing"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <ExMachinaComponentTesting />
            </ModuleWrapper>
          }
        />

        <Route
          path="/butterfly-effect-state-mutation"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <ButterflyEffectModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/source-code-remounting-loop"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <SourceCodeRemountingLoop />
            </ModuleWrapper>
          }
        />

        <Route
          path="/multiplicity-component-cloning"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <MultiplicityModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/edge-of-tomorrow-component-reset"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <EdgeOfTomorrow />
            </ModuleWrapper>
          }
        />

        <Route
          path="/prestige-usememo-cost-analysis"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <PrestigeModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/moon-singleton-pattern"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <MoonSingletonPattern />
            </ModuleWrapper>
          }
        />

        <Route
          path="/matrix-reloaded-system-exit"
          element={
            <ModuleWrapper
              bgClass="bg-black"
              textClass="text-green-400"
              fontClass="font-mono"
            >
              <MatrixReloadedSystemExit />
            </ModuleWrapper>
          }
        />

        <Route
          path="/village-scoped-context"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <VillageModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/twelve-monkeys-circular-dependencies"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-mono"
            >
              <TwelveMonkeysModule />
            </ModuleWrapper>
          }
        />

        <Route
          path="/minority-report-optimistic-rendering"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <MinorityReportOptimisticRendering />
            </ModuleWrapper>
          }
        />

        <Route
          path="/coherence-state-sync"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <CoherenceStateSync />
            </ModuleWrapper>
          }
        />

        <Route
          path="/russian-doll-lifecycle-debugging"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-sans"
            >
              <RussianDollLifecycleDebugging />
            </ModuleWrapper>
          }
        />

{/* 404 Fallback */}
        <Route
          path="*"
          element={
            <ModuleWrapper bgClass="bg-zinc-950">
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-black text-zinc-800 mb-4">
                    404
                  </h1>
                  <p className="text-zinc-500 mb-8">This route doesn't exist</p>
                  <Link
                    to="/"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            </ModuleWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
