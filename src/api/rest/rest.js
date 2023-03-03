import axios from "axios";

export async function addNewProduct(product, imageUrl) {
  product = { ...product, imageUrl };
  const { data } = await axios.post("/products/new", product);
  return data;
}

export async function getProducts() {
  const { data } = await axios.get("/products?page=0");
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`/products/${id}`);
  return data;
}

export async function getCategories() {
  const { data } = await axios.get("/categories");
  return data;
}

export async function getSizes() {
  const { data } = await axios.get("/sizes");
  return data;
}
