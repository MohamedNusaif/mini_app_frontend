import axios from "axios";

const API1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ❌ NO INTERCEPTOR (IMPORTANT)

export default API1;