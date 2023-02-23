import React from "react";
import CartItem from "../components/CartItem";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import { useCarts } from "../hooks/useCarts";

export default function Cart() {
  const {
    getCarts: { isLoading, data: products },
  } = useCarts();

  if (isLoading) return <p>Loading</p>;
  const hasProducts = products && products.length > 0;
  const totalPrice =
    hasProducts &&
    products.reduce(
      (prev, current) =>
        prev + parseInt(current.price) * parseInt(current.quantity),
      0
    );
  const SHIPPING = 3000;

  return (
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p> 장바구니에 상품이 없습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className="flex justify-between items-center px-2 md:px-8 lg:px-16 mb-6">
            <PriceCard text="상품 총액" price={totalPrice} />
            <AiFillPlusCircle className="shrink-0" />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총 가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
}
