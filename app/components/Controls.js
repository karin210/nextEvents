"use client";
import React from "react";
import styles from "./styles/Controls.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default async function Controls() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const current = new URLSearchParams(pathName);
  const router = useRouter();
  // const res = await fetch("http://localhost:3000/api/cities");
  // const data = await res.json();
  // console.log(data);

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
      <select onChange={inputValue} name="city" id="city">
        <option>nn</option>
      </select>
      <button>Apply</button>
    </form>
  );
}
