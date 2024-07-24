"use server"
import { Counter } from "./counter";

export default async function Home() {
  return (
    <main className="">
      <Counter />
    </main>
  );
}
