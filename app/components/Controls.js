"use client";
import React from "react";
import styles from "./styles/Controls.module.scss";
import { useSearchParams } from "next/navigation";

export default function Controls({ filter }) {
  const searchParams = useSearchParams();
  const current = new URLSearchParams(searchParams);

  let input;
  function inputValue(e) {
    input = e.target.value;
  }

  function applyFilter(e) {
    e.preventDefault();
    current.set("city", `?${input}`);
    let query = current.toString();
  }

  return (
    <form onSubmit={applyFilter}>
      <label htmlFor="city">City</label>
      <input
        className={styles.cityInput}
        onChange={inputValue}
        id="city"
        name="city"
        type="text"
      />
      <button>Apply</button>
    </form>
  );
}
