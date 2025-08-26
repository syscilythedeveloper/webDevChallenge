import React from "react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
      <h2>{product.name}</h2>
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
      />
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductCard;
