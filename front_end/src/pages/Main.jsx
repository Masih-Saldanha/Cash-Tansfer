import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import authHook from "../hooks/authHook";
import mainHook from "../hooks/mainHook";
import mainService from "../services/mainService";

export default function Main() {
  const { token } = authHook();
  const { balance, setBalance, history, setHistory } = mainHook();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    updateBalance();
    updateHistory();
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [transferData, setTransferData] = useState({
    username: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);

  function updateBalance() {
    mainService
      .getBalance(config)
      .then((response) => {
        console.log(response.data.balance);
        setBalance(response.data.balance);
      })
      .catch((e) => {
        alert(e.response.data);
      });
  }

  function updateHistory() {
    const onlyCredited = "";
    const onlyDebited = "";
    const dateOrdered = "";
    mainService
      .getHistory(config, onlyCredited, onlyDebited, dateOrdered)
      .then((response) => {
        console.log(response.data);
        setHistory(response.data);
      })
      .catch((e) => {
        alert(e.response.data);
      });
  }

  function handleInputs(e, property) {
    setTransferData({ ...transferData, [property]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (transferData.username.length < 3) {
      alert("Short username, it needs to have at least 3 characters!");
      return;
    }
    if (transferData.amount < 1) {
      alert("You are triyng to transfer an invalid value, try a valid amount!");
      return;
    }
    if (transferData.amount > balance) {
      alert("insufficient funds, try a valid amount!");
      return;
    }

    setLoading(true);

    const dataToSend = { ...transferData };

    mainService
      .transferCash(transferData, config)
      .then((response) => {
        alert("transfer completed!");
        setLoading(false);
        updateBalance();
        updateHistory();
      })
      .catch((e) => {
        alert(e.response.data);
        setLoading(false);
      });
  }

  return <h1>Main Page</h1>;
}
