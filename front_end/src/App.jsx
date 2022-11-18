import { BrowserRouter, Route, Routes } from "react-router-dom";

import Test from "./pages/Test";
import Error from "./pages/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Test />}></Route>
        <Route exact path="/*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
