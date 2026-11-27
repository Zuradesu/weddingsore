import { Reveal } from "@/components/SceneTransition";
import { wedding } from "@/data/wedding";

function Person({ role, name, relation, parents, className = "" }: { role: string; name: string; relation: string; parents: string; className?: string }) {
  return (
    <Reveal className={className}>
      <p className="scene-label">{role}</p>
      <h2 className="title-serif mt-4 text-6xl md:text-8xl">{name}</h2>
      <p className="mt-6 font-sans text-sm opacity-70">{relation}</p>
      <p className="title-serif mt-1 text-xl md:text-2xl">{parents}</p>
    </Reveal>
  );
}

export default function CoupleScene() {
  return (
    <section id="couple" className="bg-gradient-to-b from-sun-ivory to-[#ecd9c3] px-6 py-28 text-sky-deep md:py-44">
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2 md:gap-24">
        <Person role="The groom" name={wedding.groom} relation="Son of" parents={wedding.parents.groom} />
        <Person role="The bride" name={wedding.bride} relation="Daughter of" parents={wedding.parents.bride} className="md:mt-44 md:text-right" />
      </div>
      <Reveal className="mx-auto mt-24 max-w-md text-center md:mt-36">
        <p className="title-serif text-xl italic md:text-2xl">{wedding.content.blessing.closing}</p>
      </Reveal>
    </section>
  );
}
