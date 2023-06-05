"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Controls.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Controls() {
  const [showControls, setShowControls] = useState(false);
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
      // https://next-events-karin210.vercel.app/api/cities
      const res = await fetch("http://localhost:3000/api/cities");
      const cities = await res.json();
      setCities(cities);

      // https://next-events-karin210.vercel.app/api/months
      const res1 = await fetch("http://localhost:3000/api/months");
      const months = await res1.json();
      setMonths(months);
    }
    getCities();
  }, []);

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

  function showFilters() {
    setShowControls(!showControls);
  }

  return (
    <section className={styles.controlsContainer}>
      <button onClick={showFilters} className={styles.filterBtn}>
        Filters
      </button>
      <form
        className={
          showControls
            ? `${styles.form} ${styles.showControls}`
            : `${styles.form} ${styles.hiddeControls}`
        }
        onSubmit={applyFilter}
      >
        <div>
          <p className={styles.filterText}>Filter by:</p>
        </div>
        <div className={styles.selectOptions}>
          <div>
            <label htmlFor="city">City:</label>
            <select
              className={styles.cities}
              onChange={handleCity}
              name="city"
              id="city"
            >
              <option value="all" key="All">
                All
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="month">Month:</label>
            <select
              className={styles.months}
              onChange={handleMonth}
              name="month"
              id="month"
            >
              <option value="all" key="All">
                All
              </option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button>Apply</button>
      </form>
    </section>
  );
}
