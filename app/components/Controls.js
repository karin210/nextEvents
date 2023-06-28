"use client";
// css
import styles from "./styles/Controls.module.scss";
// system tools
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Controls() {
  const [showCities, setShowCities] = useState(false);
  const [showMonths, setShowMonths] = useState(false);
  const [cityOption, setCityOption] = useState("");
  const [monthOption, setMonthOption] = useState("");
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

  function handleCity(e) {
    setCityOption(e.target.value);
  }

  function handleMonth(e) {
    setMonthOption(e.target.value);
  }

  function applyFilter(e) {
    e.preventDefault();
    if (cityOption === "All" && (monthOption === "All" || "undefined")) {
      router.push("/events");
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
      <form className={styles.form} onSubmit={applyFilter}>
        <div>
          <p className={styles.filterText}>Select:</p>
        </div>
        <div className={styles.filterBtns}>
          <div>
            <button
              onClick={() => stateToggler(setShowCities, showCities)}
              className={styles.filterBtn}
            >
              City
            </button>
            <ul
              onClick={handleCity}
              className={showCities ? styles.showCities : styles.hideCities}
            >
              <li className={styles.option}>All</li>
              {cities.map((city) => (
                <li className={styles.option} key={city}>
                  {city}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <button
              onClick={() => stateToggler(setShowMonths, showMonths)}
              className={styles.filterBtn}
            >
              Month
            </button>
            <ul
              onClick={handleMonth}
              className={showMonths ? styles.showMonths : styles.hideMonths}
            >
              <li className={styles.option}>All</li>
              {months.map((month) => (
                <li className={styles.option} key={month}>
                  {month}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className={styles.applyBtn}>Apply</button>
      </form>
    </section>
  );
}
