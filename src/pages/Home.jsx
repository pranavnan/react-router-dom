import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <div>Home</div>
      Go to <Link to="products">Goto products</Link>
      <button onClick={navigateHandler}>navigate</button>
    </>
  );
};

export default Home;
