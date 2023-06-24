'use client'
import { useState } from "react";
import CartModal from "./modal";
import CartIcon from "../icons/cart";

export default function CartButton() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <>
      <CartModal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} />

      <button
        aria-label="Open cart"
        onClick={() => {
          setCartIsOpen(true);
        }}
        className="relative right-0 top-0"
      >
        <CartIcon />
      </button>
    </>
  );
}
