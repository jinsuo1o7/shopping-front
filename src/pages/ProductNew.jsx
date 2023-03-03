import React, { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import useProducts from "../hooks/useProducts";
import classNames from "classnames";

const CLOTHES = "CLOTHES";
const defaultProduct = { type: CLOTHES, categories: [] };

export default function ProductNew() {
  const {
    addProduct,
    getAllCategories: { data: categories },
    getAllSizes: { data: sizes },
  } = useProducts();
  const [product, setProduct] = useState(defaultProduct);
  const [sizeAndStock, setSizeAndStock] = useState();
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [selected, setSelected] = useState(CLOTHES);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isApply) {
      window.confirm("사이즈와 수량을 적용해주세요.");
      return;
    }
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        addProduct.mutate(
          {
            product,
            url,
          },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가 되었어요");
              setTimeout(() => setSuccess(null), 4000);
              setProduct(defaultProduct);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFile(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const [toggledIndexes, setToggledIndexes] = useState([]);

  const toggleClassName = (e, index) => {
    if (toggledIndexes.includes(index)) {
      deletCategory(e);
      setToggledIndexes(toggledIndexes.filter((i) => i !== index));
    } else {
      addCategory(e);
      setToggledIndexes([...toggledIndexes, index]);
    }
  };

  const deletCategory = (e) => {
    setProduct((prev) => ({
      ...prev,
      categories: [
        ...prev.categories.filter(
          (category) => category !== e.target.textContent
        ),
      ],
    }));
  };

  const addCategory = (e) => {
    setProduct((prev) => ({
      ...prev,
      categories: [...prev.categories, e.target.textContent],
    }));
  };

  const [isApply, setApply] = useState(false);
  const addSizeAndStock = (e) => {
    e.preventDefault();
    if (sizeAndStock === null || sizeAndStock === undefined) return;
    const sizeAndStocks = [];
    for (const [name, value] of Object.entries(sizeAndStock)) {
      sizeAndStocks.push({
        sizeType: name,
        stockQuantity: value,
      });
    }
    setProduct((prev) => ({ ...prev, sizeAndStocks: sizeAndStocks }));
    setApply(true);
  };

  const handleSizeStock = (e) => {
    const { name, value } = e.target;
    setSizeAndStock((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center mt-20 pb-20">
      <section className="w-6/12">
        <h2 className="text-2xl font-bold my-4 text-center">제품 등록</h2>
        <div className="flex items-center px-12 mt-10 mb-2">
          <p className="flex-1 font-bold text-center">Type</p>
          <select
            id="select"
            className="border-2 flex-1 p-2 text-center border-brand outline-none rounded-lg"
            onChange={handleChange}
            value={selected}
          >
            <option>{CLOTHES}</option>
          </select>
        </div>
        {file && (
          <img className="w-96 mx-auto mb-2" src={file} alt="local file" />
        )}
        <form className="flex flex-col px-12" onSubmit={handleSubmit}>
          <p className="font-bold my-2">Name</p>
          <input
            type="text"
            name="name"
            value={product.name ?? ""}
            placeholder="제품명"
            required
            onChange={handleChange}
          />
          <p className="font-bold my-2">Price</p>
          <input
            type="number"
            name="price"
            value={product.price ?? ""}
            placeholder="가격 ( 숫자 )"
            required
            onChange={handleChange}
          />
          <p className="font-bold my-2">Description</p>
          <input
            type="text"
            name="description"
            value={product.description ?? ""}
            placeholder="제품 설명"
            required
            onChange={handleChange}
          />
          <p className="font-bold my-2">Category</p>
          <ul className="grid grid-cols-3 md:grid-cols-4 gap-3 text-center font-semibold text-gray-600">
            {categories &&
              categories.map((category, index) => (
                <li
                  key={index}
                  onClick={(e) => toggleClassName(e, index)}
                  className={classNames(
                    "grid",
                    "place-items-center",
                    "border",
                    "rounded-lg",
                    "hover:bg-slate-400",
                    "hover:text-white",
                    "cursor-pointer",
                    "py-2",
                    {
                      "bg-slate-400": toggledIndexes.includes(index),
                      "text-white": toggledIndexes.includes(index),
                    }
                  )}
                >
                  {category.name}
                </li>
              ))}
          </ul>

          <p className="font-bold my-2">Size</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 border text-center rounded-lg py-2 pl-4">
            {sizes &&
              sizes.map((size, index) => (
                <div key={index}>
                  <p className="font-bold">{size.sizeType}</p>
                  <div>
                    <input
                      className="p-1 pl-2 text-center"
                      type="text"
                      name={size.sizeType}
                      onChange={handleSizeStock}
                      placeholder="수량"
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-end py-4">
            <Button
              onClick={addSizeAndStock}
              text={"Apply"}
              disabled={isUploading}
            />
          </div>
          <p className="font-bold my-2">Image</p>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleImageFile}
          />
          <div className="mb-8"></div>
          <Button
            text={isUploading ? "Uploading ..." : "Add Product"}
            disabled={isUploading}
          />
        </form>
      </section>
      {success && <p className="my-2">✌🏻{success}</p>}
    </div>
  );
}
