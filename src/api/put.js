import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;


export const UPDATE_PRODUCT = (id,data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${base_url}products/updateProductById/${id}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};