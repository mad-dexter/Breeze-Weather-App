import { useEffect, useState } from "react";

// TEST DATA
const data = [
  {
    Version: 1,
    Key: "3441438",
    Type: "City",
    Rank: 55,
    LocalizedName: "Maharatu",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia",
    },
    AdministrativeArea: {
      ID: "RI",
      LocalizedName: "Riau",
    },
  },
  {
    Version: 1,
    Key: "187260",
    Type: "City",
    Rank: 65,
    LocalizedName: "Maharajganj",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "BR",
      LocalizedName: "Bihar",
    },
  },
  {
    Version: 1,
    Key: "194261",
    Type: "City",
    Rank: 65,
    LocalizedName: "Maharajpur",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "MP",
      LocalizedName: "Madhya Pradesh",
    },
  },
  {
    Version: 1,
    Key: "3216915",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharajganj",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "BR",
      LocalizedName: "Bihar",
    },
  },
  {
    Version: 1,
    Key: "3218825",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharajganj",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "BR",
      LocalizedName: "Bihar",
    },
  },
  {
    Version: 1,
    Key: "2812767",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharajapuram",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "TN",
      LocalizedName: "Tamil Nadu",
    },
  },
  {
    Version: 1,
    Key: "3292037",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharaj Ganj",
    Country: {
      ID: "IN",
      LocalizedName: "India",
    },
    AdministrativeArea: {
      ID: "UP",
      LocalizedName: "Uttar Pradesh",
    },
  },
  {
    Version: 1,
    Key: "311451",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharagama",
    Country: {
      ID: "LK",
      LocalizedName: "Sri Lanka",
    },
    AdministrativeArea: {
      ID: "1",
      LocalizedName: "Western",
    },
  },
  {
    Version: 1,
    Key: "244029",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharajganj",
    Country: {
      ID: "NP",
      LocalizedName: "Nepal",
    },
    AdministrativeArea: {
      ID: "LU",
      LocalizedName: "Lumbini",
    },
  },
  {
    Version: 1,
    Key: "260097",
    Type: "City",
    Rank: 75,
    LocalizedName: "Maharajke",
    Country: {
      ID: "PK",
      LocalizedName: "Pakistan",
    },
    AdministrativeArea: {
      ID: "PB",
      LocalizedName: "Punjab",
    },
  },
];

export function useCities(query, API_URL) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      function loadCities() {
        setIsLoading(true);

        // TODO: Call webservice to load cities

        setCities(data);

        setIsLoading(false);
      }
      setCities([]);
      if (query.length > 3) {
        loadCities();
      }

      return function () {
        // TODO: Cleanup. Call Abort cotroller to stop previous calls
      };
    },
    [query]
  );

  console.log(query, API_URL);

  return { cities, isLoading };
}
