import { BrowserRouter, Route, Routes } from "react-router-dom";
import WeatherPage from "./pages/weatherPage";
import CitiesPage from "./pages/CitiesPage";
import PageNotFound from "./pages/PageNotFound";
import { CityContextProvider } from "./context/CityContext";
import { ApplicationContextProvider } from "./context/ApplicationContext";

function App() {
  return (
    <ApplicationContextProvider>
      <CityContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<WeatherPage />} />
            <Route path="/:id" element={<WeatherPage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/cities/:id" element={<CitiesPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityContextProvider>
    </ApplicationContextProvider>
  );
}

export default App;
