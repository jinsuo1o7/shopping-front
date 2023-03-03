import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  addNewProduct,
  getCategories,
  getSizes,
} from "../api/rest/rest";

export default function useProducts() {
  const queryClient = useQueryClient();

  const getAllProducts = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60,
  });

  const getAllCategories = useQuery(["category"], getCategories, {
    staleTime: 1000 * 60,
  });

  const getAllSizes = useQuery(["sizes"], getSizes, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(["products"]) }
  );

  return { getAllProducts, getAllCategories, getAllSizes, addProduct };
}
