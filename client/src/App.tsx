import React from "react";
import { Navbar } from "./components/Navbar";
import { ThemeProvider, Theme } from "./components/theme/ThemeContext";
import { ThemeToggle } from "./components/theme/ThemeToggle";

function App() {
  return (
    <div className="text-primary transition-all bg-bg-600 ">
      <ThemeProvider initialTheme={Theme.dark}>
        <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6">
          <ThemeToggle />
        </div>
        <div className="fixed flex w-full h-full">
          <Navbar />

          <div className="w-full mr-4">
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
