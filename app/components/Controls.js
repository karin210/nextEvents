"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/Controls.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Controls() {
  const [cityOption, setCityOption] = useState("");
  const [cities, setCities] = useState([]);
  const [months, setMonths] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const current = new URLSearchParams(pathName);
  const router = useRouter();

  useEffect(() => {
    async function getCities() {
      const res = await fetch(
        "https://next-events-karin210.vercel.app/api/cities"
      );
      const cities = await res.json();
      setCities(cities);

      // const res1 = await fetch(
      //   "https://next-events-karin210.vercel.app/api/months"
      // );
      // const months = await res1.json();
      // setMonths(months);
    }
    getCities();
  }, []);

  function handleChange(e) {
    setCityOption(e.target.value);
  }
  function applyFilter(e) {
    e.preventDefault();
    if (cityOption === "All") {
      router.push("/events");
    }
    current.set("city", cityOption);
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
    <form onSubmit={applyFilter} className={styles.form}>
      <label htmlFor="city">City</label>
      <select onChange={handleChange} name="city" id="city">
        <option value="all" key="All">
          All
        </option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <label htmlFor="month">Month</label>
      {/* <select onChange={handleChange} name="month" id="month">
        <option value="all" key="All">
          All
        </option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select> */}
      <button>Apply</button>
    </form>
  );
}
