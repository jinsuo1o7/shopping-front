import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";

export default function ProductNew() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addProduct } = useProducts();

  const handleSubmit = (e) => {
    const url = "sample";
    e.preventDefault();
    setIsUploading(true);
    product.categories = product.categories.split(",");
    product.sizeType = product.sizeType.split(",");
    addProduct.mutate({ product, url });
    // uploadImage(file)
    //   .then((url) => {
    //     addProduct.mutate(
    //       {
    //         product: { ...product, categories: product.categories.split(",") },
    //         url,
    //       },
    //       {
    //         onSuccess: () => {
    //           setSuccess("성공적으로 제품이 추가 되었어요");
    //           setTimeout(() => setSuccess(null), 4000);
    //         },
    //       }
    //     );
    //   })
    //   .finally(() => setIsUploading(false));
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✌🏻{success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          value={product.type ?? ""}
          placeholder="제품 분류"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          value={product.name ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="stockQauntity"
          value={product.stockQauntity ?? ""}
          placeholder="수량"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="categories"
          value={product.categories ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="sizeType"
          value={product.sizeType ?? ""}
          placeholder="사이즈 옵션"
          required
          onChange={handleChange}
        />

        <Button
          text={isUploading ? "Uploading ..." : "Add Product"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
