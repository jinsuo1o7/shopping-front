import React from "react";

export default function Input({ type, name, value, placeholder, onChange }) {
  return (
    <>
      <p className="font-bold my-2">{name}</p>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </>
  );
}
