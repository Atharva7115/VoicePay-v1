import api from "./api";

export const confirmTransaction = (transactionId) =>
  api.post("/transaction/confirm", {
    transactionId,
    confirm: true
  });

export const executeTransaction = (transactionId, pin) =>
  api.post("/transaction/execute", {
    transactionId,
    pin
  });

export const setPin = (userId, pin) =>
  api.post("/transaction/set-pin", {
    userId,
    pin
  });
