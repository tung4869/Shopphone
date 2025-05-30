import React from "react";
import { formatPrice, getImage } from "./../ultils/index";
import { Link } from "react-router-dom";

const ProductsItem = ({ item }) => {
  return (
    <>
      <div className="product-item card text-center">
        <Link to={`/productDetail/${item._id}`}>
          <img alt="anh" src={getImage(item.image)} />
        </Link>
        <h4>
          <Link to="#">{item.name}</Link>
        </h4>
        <p>
          Giá Bán: <span>{formatPrice(item.price)}</span>
        </p>
      </div>
    </>
  );
};

export default ProductsItem;
