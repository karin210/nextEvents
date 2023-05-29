"use client";
import React from "react";
import styles from "./styles/Controls.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default async function Controls() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const current = new URLSearchParams(pathName);
  const router = useRouter();
  // const res = await fetch(
  //   "https://next-events-md9uta47a-karin210.vercel.app/api/cities"
  // );
  // const cities = await res.json();

  let input;
  function inputValue(e) {
    input = e.target.value;
  }

  function applyFilter(e) {
    e.preventDefault();
    current.set("city", input);
    let query = current.toString();
    const url = pathName + "events?" + query;
    router.push(url);
  }

  return (
    <form onSubmit={applyFilter}>
      <label htmlFor="city">City</label>
      {/* <select onChange={inputValue} name="city" id="city">
        {cities.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select> */}
      <button>Apply</button>
    </form>
  );
}
