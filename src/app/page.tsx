import PlanetaryClock from "@/components/PlanetaryClock";

export default function Home() {
  return (
    <>
      <div className="p-8 bg-blue-400">
        <h1 className="text-3xl text-center text-white font-bold">Planetary Hour Clock</h1>
      </div>
      <div className="m-8"><PlanetaryClock /></div>
    </>
  );
}
