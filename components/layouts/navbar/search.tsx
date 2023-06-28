import Link from 'next/link';
import { Products } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

const SearchDialog = ({ open, onOpenChange, products }: { open: boolean, onOpenChange: Dispatch<SetStateAction<boolean>>, products: Products[] }) => {

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type your search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {products.map((product: Products, index: number) => (
            <Link href={`/products/${product.slug}`} prefetch={false} key={index} className="cursor-pointer" onClick={() => onOpenChange(false)}>
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
