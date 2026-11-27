import AudioProvider from "@/components/AudioProvider";
import CinematicLoader from "@/components/CinematicLoader";
import ColorGrade from "@/components/ColorGrade";
import Cursor from "@/components/Cursor";
import FilmGrain from "@/components/FilmGrain";
import MusicPlayer from "@/components/MusicPlayer";
import SceneTransition from "@/components/SceneTransition";
import ScrollProgress from "@/components/ScrollProgress";
import ArrivalScene from "@/sections/ArrivalScene";
import BlessingScene from "@/sections/BlessingScene";
import CoupleScene from "@/sections/CoupleScene";
import ClosingScene from "@/sections/ClosingScene";
import EmotionalScene from "@/sections/EmotionalScene";
import MemoriesScene from "@/sections/MemoriesScene";
import OpeningScene from "@/sections/OpeningScene";
import WeddingReveal from "@/sections/WeddingReveal";

export default function Page() {
  return (
    <AudioProvider>
      <CinematicLoader />
      <ScrollProgress />
      <ColorGrade />
      <FilmGrain />
      <Cursor />
      <main>
        <OpeningScene />
        <ArrivalScene />
        <BlessingScene />
        <CoupleScene />
        <MemoriesScene />
        <SceneTransition from="#F1E9D9" to="#263B4B" />
        <EmotionalScene />
        <WeddingReveal />
        <SceneTransition from="#F1E9D9" to="#263B4B" height="24svh" />
        <ClosingScene />
      </main>
      <MusicPlayer />
    </AudioProvider>
  );
}
