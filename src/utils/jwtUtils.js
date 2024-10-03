// src/utils/jwtUtils.js
import { jwtDecode } from "jwt-decode"; 

// Hàm để decode JWT token
export const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);  // Sử dụng jwtDecode
    return decoded;
  } catch (e) {
    console.error("JWT Decode Error:", e);
    return null;
  }
};
