import axios from "axios";
import { API_BASE_URL } from "./axios";
const token = localStorage.getItem("token");

export const response = await axios.get(
    `${API_BASE_URL}/engineer/complaints`,
    {
        params: {
            page: 0,
            size: 5,
            search: search || null,
            sortBy: "createdAt",
            direction: "desc"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

