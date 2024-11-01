"use client";
import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount((c) => c + 1)}>count {count}</div>;
};
