import React from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "./ProductCard";

export default function Products() {
  const {
    getAllProducts: { isLoading, error, data },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Error ...</p>}

      <ul className="grid grid-cols-1 md:grid-cols-3 lg:cols-4 gap-4 p-4">
        {data &&
          data.content &&
          data.content.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>

      <div className="border">{data && data.totalPages}</div>
    </>
  );
}
