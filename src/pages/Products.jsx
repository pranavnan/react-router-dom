import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "Apple" },
  { id: "abc123", title: "Oranges" },
  { id: "1d23d", title: "Grapes" },
];

const Products = () => {
  return (
    <div>
      <h1>Products</h1>

      <ul>
        {PRODUCTS.map(product => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
