import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Products } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

const SearchDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: Dispatch<SetStateAction<boolean>> }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products`, { next: { revalidate: 60 } });
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type your search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {products.map((product: Products, index: number) => (
            <Link href={`product/${product.slug}`} key={index} className="cursor-pointer" onClick={() => onOpenChange(false)}>
              <CommandItem className="cursor-pointer">
                {product.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export default SearchDialog;
