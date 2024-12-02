import CitiesList from "../components/CitiesList";
import Map from "../components/Map";
import PageWrapper from "../components/PageWrapper";
import SearchHeader from "../components/SearchHeader";
import Spinner from "../components/Spinner";
import { useCityContext } from "../context/CityContext";

import styles from "./CitiesPage.module.css";

function CitiesPage() {
  const { isLoading } = useCityContext();

  if (isLoading) return <Spinner />;

  return (
    <PageWrapper>
      <div>
        <SearchHeader />
        <main className={styles.main}>
          <Map />
          <CitiesList />
        </main>
      </div>
    </PageWrapper>
  );
}

export default CitiesPage;
