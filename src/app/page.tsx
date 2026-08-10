import PlanetaryClock from "@/components/PlanetaryClock";

export default function Home() {
  return (
    <>
      <div className="p-16 bg-amethyst shadow-lg">
        <h1 className="font-forum text-5xl text-center text-moonlight uppercase font-bold">Planetary Hour Clock</h1>
      </div>
      <div className="m-8"><PlanetaryClock /></div>
    </>
  );
}
