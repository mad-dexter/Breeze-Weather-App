import { createContext, useContext, useState } from "react";

const ApplicationContext = createContext();

function ApplicationContextProvider({ children }) {
  const [dayMode, setDayMode] = useState(false);
  const [unit, setUnit] = useState("F");

  function toggleDayMode() {
    setDayMode((val) => !val);
  }

  function toggleUnit(unit) {
    setUnit(unit);
  }

  function convertTemperature(tempValue) {
    if (unit === "F") {
      return `${tempValue}° ${unit}`;
    }
    // If celcius is the current selected unit
    const celciusVal = Math.round(((tempValue - 32) * 5) / 9);
    return `${celciusVal}° ${unit}`;
  }

  return (
    <ApplicationContext.Provider
      value={{ dayMode, unit, toggleDayMode, toggleUnit, convertTemperature }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

function useApplicationContext() {
  const context = useContext(ApplicationContext);

  if (!context)
    throw new Error("Application context used outside context scope");
  return context;
}

export { ApplicationContextProvider, useApplicationContext };
