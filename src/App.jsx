import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      {/* Top-level routes live here to keep navigation scalable. */}
      <Route path="/" element={<div>App Initialized</div>} />
      {/* Add future nested or layout routes above as the app grows. */}
    </Routes>
  );
};

export default App;
