import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

export function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const getCarts = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", uid]);
    },
  });

  return {
    getCarts,
    addOrUpdateItem,
    removeItem,
  };
}
