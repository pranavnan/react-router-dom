import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  params.productId;
  return (
    <div>
      Product Details
      <h1>{params.productId}</h1>
      <p>
        <Link to=".." relative="path">
          {/* default will be route so it will go to the parent route not one step back */}
          Back
        </Link>
      </p>
    </div>
  );
};

export default ProductDetails;
