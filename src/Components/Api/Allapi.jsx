import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const loginApi = async (data) => {
  try {
    const response = await axios.post("http://localhost:9111/user/login", data);
    sessionStorage.setItem("token", JSON.stringify(response.data.body));
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    // If not, throw the original error
    throw error;
  }
};

// Allapi.js
export const allUserApi = async (page, pageSize, searchQuery, auth) => {
  try {
    const params = { page, pageSize, search: searchQuery };

    const response = await axios.get(`http://localhost:9111/user/getalluser`, {
      params,
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    });

    return response.data;
  } catch (error) {
    const responseData =
      error.response && error.response.data ? error.response.data : error;
    throw responseData;
  }
};

export const allProductApi = async (page, pageSize, search) => {
  try {
    const params = { page, pageSize, search };

    const response = await axios.get(
      `http://localhost:9111/user/getallproducts`,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    const responseData =
      error.response && error.response.data ? error.response.data : error;
    throw responseData;
  }
};

export const addUser = async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:9111/user/create`,
      data
    );
    return response.data;
  } catch (error) {
    const responseData =
      error.response && error.response.data ? error.response.data : error;
    if (error.response && error.response.data && error.response.data.errors) {
      // Display each error in a toast message
      toast.error(error.response.data.errors[0]);
    } else {
      toast.error(responseData.message || "An error occurred");
    }
  }
};
