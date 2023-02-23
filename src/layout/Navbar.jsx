import React from "react";
import { Link } from "react-router-dom";
import { AiFillAccountBook, AiOutlinePlusSquare } from "react-icons/ai";
import User from "../components/User";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "../components/CartStatus";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between p-3 border-b border-gray-300">
      <Link to={"/"} className="flex items-center text-3xl text-brand">
        <AiFillAccountBook />
        <h1>My Shop</h1>
      </Link>
      <nav className="flex gap-6 items-center">
        <Link to={"/products"}>Products</Link>
        {user && (
          <Link to={"/carts"}>
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to={"/products/new"}>
            <AiOutlinePlusSquare className="text-2xl" />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
