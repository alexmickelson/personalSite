import React from "react";
import { Navbar } from "./components/navbar/Navbar";
import { ThemeProvider, Theme } from "./components/theme/ThemeContext";
import { ThemeToggle } from "./components/theme/ThemeToggle";

function App() {
  return (
    <div className="text-primary transition-all bg-bg-600 ">
      <ThemeProvider initialTheme={Theme.dark}>
        <ThemeToggle />
        <div className=" fixed flex w-full h-full">
          <div className=" transition-all duration-300 w-0 sm:w-72">
            <Navbar />
          </div>

          <div className="w-full m-4">
            <div className="container mx-auto rounded-xl shadow border p-8 m-10 ">
              <p className="text-3xl font-bold mb-5">Welcome!</p>
              <p className="text-lg">React and Tailwind CSS in action</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
