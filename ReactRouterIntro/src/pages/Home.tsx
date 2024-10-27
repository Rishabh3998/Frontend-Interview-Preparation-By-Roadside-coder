/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, Outlet } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/cartSlice";
import { useEffect } from "react";

const Home = () => {
  // For calling all the actions
  const dispatch: any = useDispatch();
  // For accessing the state
  const { products, cart } = useSelector((state: any) => state.cart);
  const { sort, byStock, byRating, searchQuery } = useSelector(
    (state: any) => state.filter
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log({ products, cart, sort, byStock, byRating, searchQuery });

  return (
    <div>
      <div className="header">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/sign-up">Sign up</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
