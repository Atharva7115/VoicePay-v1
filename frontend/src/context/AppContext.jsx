import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [userId] = useState("696b0c0a8a60a2445f35d05a"); // temp
  const [balance, setBalance] = useState(0);

  const [intentData, setIntentData] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);

  return (
    <AppContext.Provider
      value={{
        userId,
        balance,
        setBalance,
        intentData,
        setIntentData,
        transactionId,
        setTransactionId,
        error,
        setError
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
