"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function Events() {
  const searchParams = useSearchParams();
  let city = searchParams.get("city");
  console.log(city);
  return <div>page</div>;
}
