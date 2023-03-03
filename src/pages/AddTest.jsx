import axios from "axios";
import React, { useState } from "react";
import Button from "../components/ui/Button";

export default function AddTest() {
  const [product, setProduct] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/products/test", product);
    console.log(data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ [name]: value });
    console.log(product);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} />
        <button type="submit"> submit</button>
      </form>
    </div>
  );
}
