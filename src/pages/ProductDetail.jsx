import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useCarts } from "../hooks/useCarts";

export default function ProductDetail() {
  const {
    state: { id },
  } = useLocation();
  useEffect(() => {
    loadProduct();
  }, []);

  const { addOrUpdateItem } = useCarts();
  const [success, setSuccess] = useState();

  const [product, setProduct] = useState({});
  const [selected, setSelected] = useState();
  const { imageUrl, name, price, description } = product;

  const loadProduct = async () => {
    const { data } = await axios.get(`/products/${id}`);
    setProduct(data);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const defaultOption = "옵션을 선택해주세요.";
  const handleClick = () => {
    if (selected === defaultOption || selected === undefined) return;
    const product = {
      id,
      imageUrl,
      name,
      price,
      sizeType: selected,
      quantity: 1,
    };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("장바구니에 추가되었어요");
        setTimeout(() => setSuccess(null), 3000);
      },
    });
  };

  return (
    <section className="flex flex-col justify-center min-h-screen border">
      <section className="flex flex-col md:flex-row p-4">
        <img
          className="w-full max-w-3xl px-4 basis-7/12"
          src={imageUrl}
          alt={name}
        />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{name}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ₩{price}
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <div className="text-brand font-bold mr-5" htmlFor="select">
              size:
            </div>
            <select
              id="select"
              className="p-2 m-4 flex-1 border-2 border-brand outline-none rounded-lg"
              onChange={handleSelect}
              value={selected}
            >
              <option>{defaultOption}</option>
              {product.sizeAndStocks &&
                product.sizeAndStocks.map((sas, index) => (
                  <option key={index}>
                    {/* size:{sas.sizeType} quantity:{sas.stockQuantity} */}
                    {sas.sizeType}
                  </option>
                ))}
            </select>
          </div>
          <Button text="장바구니에 추가" onClick={handleClick} />
          {success && <p className="my-2">🙏{success}</p>}
        </div>
      </section>
      <div className="flex items-center ml-4">
        <p className="font-bold">Category</p>
        <ul className="flex">
          {product.categories &&
            product.categories.map((category, index) => (
              <li key={index} className="ml-8 text-gray-500">
                {category}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
