import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

const Placeholder = ({ title }) => {
  return (
    <main style={{ padding: "120px 24px 40px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "12px" }}>{title}</h1>
      <p>Page content coming soon.</p>
    </main>
  );
};

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Placeholder title="Home" />} />
        <Route path="/services" element={<Placeholder title="Services" />} />
        <Route path="/gallery" element={<Placeholder title="Gallery" />} />
        <Route path="/booking" element={<Placeholder title="Booking" />} />
        <Route path="/policy" element={<Placeholder title="Policy" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
      </Route>
    </Routes>
  );
};

export default App;
