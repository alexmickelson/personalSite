import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Blog } from "./components/blog/Blog";
import { Home } from "./components/Home";
import { Navbar } from "./components/navbar/Navbar";
import { ThemeProvider, Theme } from "./components/theme/ThemeContext";
import { ThemeToggle } from "./components/theme/ThemeToggle";

function App() {
  return (
    <BrowserRouter>
      <div className="text-primary transition-all bg-bg-600 ">
        <ThemeProvider initialTheme={Theme.dark}>
          <ThemeToggle />
          <div className="w-full h-full flex">
            <div className="transition-all duration-300 flex-none w-0 md:w-72">
              <Navbar />
            </div>

            <div className="w-full flex-auto p-12 container mx-auto">
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="blog/:blogname" element={<Blog />} />
                  </Route>
                </Routes>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
