import React from "react";
import CryptoJS from "crypto-js";
const KEY = "p@T7QwLc$FCL9Lzp2o";
const encrypt = (number) => {
  const ciphertext = CryptoJS.AES.encrypt(number.toString(), KEY).toString();
  return ciphertext;
};
export { encrypt };
const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
  const decryptedNumber = parseInt(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedNumber;
};
export { decrypt };

const encryptToken = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(text, KEY).toString();
  return ciphertext;
};

export { encryptToken };

const decryptToken = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

export { decryptToken };
