import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useCarts } from "../hooks/useCarts";

export default function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const { addOrUpdateItem } = useCarts();
  const [selected, setSelected] = useState(options && options[0]);
  const [success, setSuccess] = useState();
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, price, options: selected, quantity: 1 };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었어요");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  return (
    <section>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              option:
            </label>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
          {success && <p className="my-2">🙏{success}</p>}
        </div>
      </section>
    </section>
  );
}
