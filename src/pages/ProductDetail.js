import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h1>ProductDetail</h1>
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetail;
