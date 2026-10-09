import { lazy, useEffect } from "react";
import NavComp from "./Component/NavComp";
import Home from "./Component/Home";
import ScrollToTop from "./Component/ScrollToTop";
import { Routes, Route } from "react-router-dom";

// Only Home is in the initial bundle; the other pages load on demand.
// React.lazy always suspends on a component's first render, even when its code
// is already downloaded, which flashes the fallback for a frame. Once preload()
// has fetched a page, this renders it directly instead.
const lazyPage = (load) => {
  let Loaded = null;
  const preload = () => load().then((module) => { Loaded = module.default; });
  const Lazy = lazy(() => load().then((module) => { Loaded = module.default; return module; }));
  const Page = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Page.preload = preload;
  return Page;
};

const About = lazyPage(() => import("./Component/About"));
const ContactUs = lazyPage(() => import("./Component/ContactUS"));
const Project = lazyPage(() => import("./Component/Project"));
const ProjectDetail = lazyPage(() => import("./Component/ProjectDetail"));

const App = () => {
  // Fetch the page bundles once the browser is idle after the first load, so
  // clicking a menu link never waits on a download (or flashes the fallback)
  useEffect(() => {
    const prefetch = () => [Project, About, ContactUs].forEach((page) => page.preload());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<NavComp />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="project" element={<Project />} />
          <Route path="project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
