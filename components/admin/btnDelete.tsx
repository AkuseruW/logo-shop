"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getError } from "@/utils/error";
import Modal from "../modal";

export default function BtnDelete({
  items,
  session,
}: {
  items: any;
  session: any;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = session.user.accessToken;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`/api/products?id=${items.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      router.back();
      setModalIsOpen(false);
    } catch (error) {
      getError(error);
    }
  };
  return (
    <>
      <Modal
        item={items.name}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onDelete={handleDelete}
      />
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Supprimer
      </button>
    </>
  );
}
