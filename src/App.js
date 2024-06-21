import NavComp from "./Component/NavComp";
import About from "./Component/About";
import ContactUs from "./Component/ContactUS";
import Project from "./Component/Project";
import Home from "./Component/Home";
import Footer from "./Component/Footer";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavComp />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/project" element={<Project />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
