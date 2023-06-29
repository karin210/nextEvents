"use client";
// css
import styles from "./styles/Controls.module.scss";
// system tools
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Controls() {
  const [showCities, setShowCities] = useState(false);
  const [showMonths, setShowMonths] = useState(false);
  const [cityOption, setCityOption] = useState("City");
  const [monthOption, setMonthOption] = useState("Month");
  const [cities, setCities] = useState([]);
  const [months, setMonths] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const current = new URLSearchParams(pathName);
  const router = useRouter();

  useEffect(() => {
    async function getCities() {
      const res = await fetch(
        "https://next-events-pi-sandy.vercel.app/api/cities"
      );
      const cities = await res.json();
      setCities(cities);

      const res1 = await fetch(
        "https://next-events-pi-sandy.vercel.app/api/months"
      );
      const months = await res1.json();
      setMonths(months);
    }
    getCities();
  }, []);

  function stateToggler(setter, value) {
    setter(!value);
  }

  function setTappedValue(setter, e = event) {
    setter(event.target.innerText);
    setter === setCityOption
      ? stateToggler(setShowCities, showCities)
      : stateToggler(setShowMonths, showMonths);
  }

  function applyFilter(e) {
    e.preventDefault();

    if (
      (cityOption === "All" || cityOption === "City") &&
      (monthOption === "All" || monthOption === "Month")
    ) {
      router.push("/events");
      return;
    }
    current.set("city", cityOption);
    current.set("month", monthOption);
    let query = current.toString();
    let url;
    if (pathName.includes("events")) {
      url = pathName + "?" + query;
    } else {
      url = pathName + "events?" + query;
    }
    router.push(url);
  }

  return (
    <section className={styles.controlsContainer}>
      <form className={styles.form}>
        <p className={styles.filterText}>Select:</p>
        <div className={styles.filterBtnsBox}>
          <button
            // the button must be setted as type button, otherwise in React buttons within form tags are submit type and the page refresh on click on them
            type="button"
            onClick={() => stateToggler(setShowCities, showCities)}
            className={styles.filterBtn}
          >
            {cityOption}
          </button>

          <span className={styles.btnsDivision}>|</span>

          <button
            type="button"
            onClick={() => stateToggler(setShowMonths, showMonths)}
            className={styles.filterBtn}
          >
            {monthOption}
          </button>
        </div>
        <button onClick={applyFilter} className={styles.applyBtn}>
          Apply
        </button>
      </form>
      <div className={styles.lists}>
        <ul className={showCities ? styles.showCities : styles.hideCities}>
          <li
            onClick={() => setTappedValue(setCityOption)}
            className={styles.option}
          >
            All
          </li>
          {cities.map((city) => (
            <li
              onClick={() => setTappedValue(setCityOption)}
              className={styles.option}
              key={city}
            >
              {city}
            </li>
          ))}
        </ul>
        <ul className={showMonths ? styles.showMonths : styles.hideMonths}>
          <li
            onClick={() => setTappedValue(setMonthOption)}
            className={styles.option}
          >
            All
          </li>
          {months.map((month) => (
            <li
              onClick={() => setTappedValue(setMonthOption)}
              className={styles.option}
              key={month}
            >
              {month}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
