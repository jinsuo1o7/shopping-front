import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product: { id, imageUrl, name, price },
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { id } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={imageUrl} alt={name} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{name}</h3>
        <p>₩{price}</p>
      </div>
      {/* <p className="mb-2 px-2 text-gray-600">{categories[0]}</p> */}
    </li>
  );
}
