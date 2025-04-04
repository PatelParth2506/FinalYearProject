import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector,useDispatch } from "react-redux";
import { fetchProducts } from "../features/ProductSlice.js";

const ProductGrid = () => {
  const dispatch=useDispatch()
  const { filteredItems } = useSelector((state)=>state.product)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[dispatch])
  return (
    <div className="font-sans grid grid-cols-1 md:grid:-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-24">
      {filteredItems.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};
export default ProductGrid;
