

import AirPollution from "./components/AirPollution/AirPollution";
import DailyFocus from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import TopCities from "./components/TopCities/TopCities";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";
import { useGlobalContext } from "./context/globalContext";
// import { useGlobalContext, useGlobalContextUpdate } from "./context/globalContext";
// import defaultStates from "./utils/defaultCountries";

export default function Home() {
  return (
    <>
      <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[3rem] 2xl:mx-[16rem] m-auto">
        <Navbar />

        <div className="pb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
            <Temperature />
            <FiveDayForecast />
          </div>

          <div className="flex flex-col w-full">
            <div className="instruments grid  gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
              <AirPollution />
              <Sunset />
              <Wind />
              <DailyFocus />
              <UvIndex />
              <Population />
              <FeelsLike />
              <Humidity />
              <Visibility />
              <Pressure />
            </div>
            <div className="mapbox-container mt-4 flex gap-4">
              <Mapbox />
              <TopCities />
            </div>
          </div>
        </div>

        <footer className="flex justify-center py-5 pb-6">
          <p className="footer-text text-sm flex items-center gap-1">
            Made by <strong className="text-blue-300">Neeraj</strong>
          </p>
        </footer>
      </main>

      {/* <div className="test">testing title</div> */}
    </>
  );
}




// export async function generateMetadata({params}) {
//   return {
//     title: 'test title',
//   }
// }

