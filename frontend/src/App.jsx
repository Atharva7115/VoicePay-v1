import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Processing from "./pages/Processing";
import Balance from "./pages/Balance";
import Confirm from "./pages/Confirm";
import EnterPin from "./pages/EnterPin";
import Success from "./pages/Success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/pin" element={<EnterPin />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

