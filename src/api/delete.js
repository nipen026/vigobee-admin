import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;


export const DELETE_PRODUCT = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${base_url}products/deleteProductById/${id}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};