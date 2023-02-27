import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://localhost:8080",
});

export async function addNewProduct(product, imageUrl) {
  httpClient.post("/products/new", {
    ...product,
    imageUrl,
  });
}

export async function getProducts() {
  const { data } = await axios.get("/products");
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`/products/${id}`);
  return data;
}

export async function getCart(userId) {}

export async function addOrUpdateToCart(userId, product) {}

export async function removeFromCart(userId, productId) {}
