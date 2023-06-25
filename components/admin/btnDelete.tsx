"use client";
import Modal from "../modal";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/controller/actions/admin/_delete";

export default function BtnDelete({
  items,
  session,
}: {
  items: any;
  session: any;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = session;
  const router = useRouter();
  const { toast } = useToast()
  console.log(items)

  const handleDelete = async () => {
    const productID = items.id
    const data = { productID, session }
    const productDelete = await deleteProduct(data)
    if (productDelete?.message) {
      setModalIsOpen(false)
      toast({
        title: "Your product has been deleted.",
        description: `${productDelete.message}`,
      })
      router.push('/dashboard/products')
      router.refresh()
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
