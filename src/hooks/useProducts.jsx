import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, addNewProduct } from "../api/rest/rest";

export default function useProducts() {
  const queryClient = useQueryClient();

  const getAllProducts = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    { onSuccess: () => queryClient.invalidateQueries(["products"]) }
  );

  return { getAllProducts, addProduct };
}
