import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { CART_COOKIE_KEY } from "@/utils/const";
import { ProductCart } from "@/type";

const CartContext = createContext({});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState({ cartItems: [] as ProductCart[] });

  useEffect(() => {
    const cartItems = JSON.parse(Cookies.get(CART_COOKIE_KEY) || "[]");
    setCart({ cartItems });
  }, []);

  const addItemToCart = (item: ProductCart) => {
    const isItemInCart = cart.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    let newCartItems;

    if (isItemInCart) {
      newCartItems = cart.cartItems.map((cartItem: ProductCart) =>
        cartItem.id === isItemInCart.id
          ? {
              ...cartItem,
              quantity: item.quantity,
            }
          : cartItem
      );
    } else {
      newCartItems = [...cart.cartItems, item];
    }

    Cookies.set(CART_COOKIE_KEY, JSON.stringify(newCartItems));
    setCart({ cartItems: newCartItems });
  };

  const updateItemQty = (item: string, newQty: number) => {
    const newCartItems = cart.cartItems.map((cartItem) =>
      cartItem.id === item ? { ...cartItem, quantity: newQty } : cartItem
    );
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(newCartItems));
    setCart({ cartItems: newCartItems });
  };

  const removeItemFromCart = (item: string) => {
    const newCartItems = cart.cartItems.filter(
      (cartItem) => cartItem.id !== item
    );
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(newCartItems));
    setCart({ cartItems: newCartItems });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, updateItemQty, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
