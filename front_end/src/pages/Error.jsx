import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import authHook from "../hooks/authHook";

export default function Error() {
  const { token } = authHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/main/");
    }
  }, []);
  
  return <h1>This page doesn't exist</h1>;
}
