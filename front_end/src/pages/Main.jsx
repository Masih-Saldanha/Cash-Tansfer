import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import styled from "styled-components";

import authHook from "../hooks/authHook";
import mainHook from "../hooks/mainHook";
import mainService from "../services/mainService";
import authService from "../services/authService";

export default function Main() {
  const { signOut, token } = authHook();
  const tokenData = authService.returnDecodedToken(token);

  const { balance, setBalance, history, setHistory } = mainHook();
  const navigate = useNavigate();

  const [transferData, setTransferData] = useState({
    username: "",
    amount: 0,
  });
  const [showHistory, setShowHistory] = useState(false);
  const [onlyCredited, setOnlyCredited] = useState("");
  const [onlyDebited, setOonlyDebited] = useState("");
  const [dateOrdered, setDateOrdered] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    updateBalance();
    updateHistory();
  }, []);

  // useEffect(() => {
  //   updateBalance();
  // }, [balance]);

  useEffect(() => {
    updateHistory();
  }, [onlyCredited, onlyDebited, dateOrdered]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function updateBalance() {
    mainService
      .getBalance(config)
      .then((response) => {
        console.log(response.data.balance);
        setBalance(response.data.balance);
      })
      .catch((e) => {
        alert("Could not found you're Balance");
        alert(e);
      });
  }

  function updateHistory() {
    mainService
      .getHistory(config, onlyCredited, onlyDebited, dateOrdered)
      .then((response) => {
        console.log(response.data);
        setHistory(response.data);
      })
      .catch((e) => {
        console.log(e);
        alert("Could not found you're History");
      });
  }

  function handleInputs(e, property) {
    setTransferData({ ...transferData, [property]: e.target.value });
  }

  function handleCheckMarks(state, setState) {
    if (state === "") {
      setState("true");
      return;
    }
    setState("");
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

    console.log(dataToSend, config)

    mainService
      .transferCash(dataToSend, config)
      .then((response) => {
        alert("transfer completed!");
        setLoading(false);
        updateBalance();
        updateHistory();
      })
      .catch((e) => {
        console.log(e);
        alert("Could not transfer your cash");
        setLoading(false);
      });
  }

  function handleSignout() {
    signOut();
    navigate("/");
  }

  return (
    <>
      <TopBar>
        <BalanceText>Balance: R$ {(balance / 100).toFixed(2)}</BalanceText>
        <WelcomeText>
          Welcome {tokenData.username}
          <LogoutButton onClick={handleSignout}>Logout</LogoutButton>
        </WelcomeText>
        <HistoryDiv>
          <button
            onClick={() => {
              updateHistory();
              if (!showHistory) {
                setShowHistory(true);
              } else {
                setShowHistory(false);
              }
            }}
          >
            Show History
          </button>
          <label>
            Only sent transfers:{" "}
            <input
              type={"checkbox"}
              checked={onlyCredited}
              onChange={() => {
                handleCheckMarks(onlyCredited, setOnlyCredited);
                setOonlyDebited("");
              }}
            />
          </label>
          <label>
            Only received transfers:{" "}
            <input
              type={"checkbox"}
              checked={onlyDebited}
              onChange={() => {
                handleCheckMarks(onlyDebited, setOonlyDebited);
                setOnlyCredited("");
              }}
            />
          </label>
          <label>
            Order by date:{" "}
            <input
              type={"checkbox"}
              checked={dateOrdered}
              onChange={() => handleCheckMarks(dateOrdered, setDateOrdered)}
            />
          </label>
        </HistoryDiv>
      </TopBar>
      {!showHistory ? (
        <></>
      ) : (
        <HistoryTable>
          {history.length === 0 ? (
            <h1>Não há transações</h1>
          ) : (
            history.map((transaction) => {
              const dateInNumbers = Date.parse(transaction.createdAt);
              const dateFormated = dayjs(dateInNumbers)
                .locale("pt-br")
                .format("DD/MM/YYYY");
              const hourFormated = dayjs(dateInNumbers)
                .locale("pt-br")
                .format("HH:mm:ss");
              return (
                <>
                  <h1 key={transaction.id}>
                    {transaction.creditedAccounts.users.username ===
                    tokenData.username
                      ? "You"
                      : transaction.creditedAccounts.users.username}{" "}
                    sent R$ {(transaction.value / 100).toFixed(2)} to{" "}
                    {transaction.debitedAccounts.users.username ===
                    tokenData.username
                      ? "You"
                      : transaction.debitedAccounts.users.username}{" "}
                    on {dateFormated} at {hourFormated}h
                  </h1>
                </>
              );
            })
          )}
        </HistoryTable>
      )}
      <FormArea>
        <h1>Transfer Cash Área</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username to send the cash:{" "}
            <input
              type="text"
              placeholder="At least 3 characters"
              value={transferData.username}
              onChange={(e) => handleInputs(e, "username")}
              required
              disabled={loading}
            ></input>
          </label>
          <label>
            Amount to be sent:{" "}
            <input
              type="number"
              placeholder="At least 1"
              value={transferData.amount}
              onChange={(e) => handleInputs(e, "amount")}
              required
              disabled={loading}
            ></input>
          </label>
          <button disabled={loading}>Send</button>
        </form>
      </FormArea>
    </>
  );
}

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BalanceText = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 10px;
  left: 5px;
  top: 5px;
`;

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 10px;
  right: 5px;
  top: 5px;
  button {
    font-size: 14px;
    color: white;
    background: linear-gradient(
      to right,
      #1c6ea4 0%,
      #2388cb 50%,
      #144e75 100%
    );
    text-shadow: 2px 2px 2px darkblue;
    border-radius: 5px;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 10px;
  right: 5px;
  top: 5px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  button {
    font-size: 14px;
    color: white;
    background: linear-gradient(
      to right,
      #1c6ea4 0%,
      #2388cb 50%,
      #144e75 100%
    );
    text-shadow: 2px 2px 2px darkblue;
    border-radius: 5px;
  }
  h1 {
    margin-bottom: 10px;
  }
  input {
    margin-bottom: 5px;
  }
`;

const WelcomeText = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 10px;
`;

const LogoutButton = styled.button`
  margin-top: 10px;
  font-size: 14px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 5px;
`;

const HistoryTable = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 10px;
  font-size: 20px;
  color: white;
  background: linear-gradient(to right, #1c6ea4 0%, #2388cb 50%, #144e75 100%);
  background-position: 50% 50%;
  text-shadow: 2px 2px 2px darkblue;
  border-radius: 10px;

  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  top: 0;
  bottom: 0;

  z-index: 1;

  h1 {
    margin: 5px 0 5px 0;
  }
`;
