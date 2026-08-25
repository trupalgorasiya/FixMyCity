import axios from "axios";
const token = localStorage.getItem("token");

export const response = await axios.get(
    "http://localhost:8085/api/engineer/complaints",
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

