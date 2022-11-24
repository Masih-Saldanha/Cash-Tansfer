import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Error from "./pages/Error";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signin />}></Route>
          <Route exact path="/signup/" element={<Signup />}></Route>
          <Route exact path="/main/" element={<Main />}></Route>
          <Route exact path="/*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
