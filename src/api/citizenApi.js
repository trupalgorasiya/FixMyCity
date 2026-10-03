import axios from "axios";
import { API_BASE_URL } from "./axios";

const API_URL = `${API_BASE_URL}/citizen`;

export const getCitizenComplaints = (
    page = 0,
    size = 5,
    search = "",
    sortBy = "createdAt",
    direction = "desc"
) => {

    const token = localStorage.getItem("token");

    return axios.get(API_URL, {
        params: {
            page,
            size,
            search: search || undefined,
            sortBy,
            direction
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};



export const getComplaintByNumber = (complaintNumber) => {
    return axios.get(
        `${API_URL}/${complaintNumber}`
    );
};

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const createComplaint = (formData) => {
    return axios.post(
        `${API_URL}/complaints`,
        formData,
        {
            headers: {
                ...getAuthHeaders(),
                "Content-Type": "multipart/form-data",
            },
        }
    );
};