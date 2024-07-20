import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/product/productSlice";
import Loader from "../../../components/loader/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useSelector(selectProduct);

  if (!product) {
    return <Loader />;
  }

  const handleEditClick = () => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div>
      <h3>Product Detail</h3>
      <p>Name: {product.name}</p>
      <p>Category: {product.category}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <button onClick={handleEditClick}>Edit Product</button>
    </div>
  );
};

export default ProductDetail;
