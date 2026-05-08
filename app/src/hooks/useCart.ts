import { useCallback, useMemo } from "react";
import { trpc } from "@/providers/trpc";

const SESSION_ID_KEY = "aso_session_id";

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function useCart() {
  const sessionId = useMemo(() => getSessionId(), []);
  const utils = trpc.useUtils();

  const { data: items = [], isLoading } = trpc.cart.get.useQuery({ sessionId });
  const { data: count = 0 } = trpc.cart.getCount.useQuery({ sessionId });

  const addMutation = trpc.cart.add.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.getCount.invalidate({ sessionId });
    },
  });

  const removeMutation = trpc.cart.remove.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.getCount.invalidate({ sessionId });
    },
  });

  const updateMutation = trpc.cart.updateQuantity.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.getCount.invalidate({ sessionId });
    },
  });

  const clearMutation = trpc.cart.clear.useMutation({
    onSuccess: () => {
      utils.cart.get.invalidate({ sessionId });
      utils.cart.getCount.invalidate({ sessionId });
    },
  });

  const addToCart = useCallback(
    (productId: number, quantity = 1, size?: string) => {
      addMutation.mutate({ sessionId, productId, quantity, size });
    },
    [sessionId, addMutation]
  );

  const removeFromCart = useCallback(
    (cartItemId: number) => {
      removeMutation.mutate({ cartItemId });
    },
    [removeMutation]
  );

  const updateQuantity = useCallback(
    (cartItemId: number, quantity: number) => {
      if (quantity < 1) return;
      updateMutation.mutate({ cartItemId, quantity });
    },
    [updateMutation]
  );

  const clearCart = useCallback(() => {
    clearMutation.mutate({ sessionId });
  }, [sessionId, clearMutation]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.product?.price ?? "0");
      return sum + price * item.quantity;
    }, 0);
  }, [items]);

  return {
    items,
    count,
    total,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isAdding: addMutation.isPending,
  };
}
