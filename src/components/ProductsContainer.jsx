import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";
import { toast } from "react-toastify";

function ProductsContainer() {
  const { dispatch, selectedProducts, addProduct } = useContext(GlobalContext);
  const { products } = useLoaderData();

  const buyProduct = (e, prod) => {
    e.preventDefault();
    const product = selectedProducts.find((product) => prod.id === product.id);
    if (product) {
      toast.warn("NOOOO");
      return;
    }
    dispatch({ type: "ADD_PRODUCT", payload: prod });
    addProduct({ ...prod, amount: 1 });
  };

  return (
    <div className="grid md:grid-cols-3 gap-5">
      {products.map((prod) => (
        <div key={prod.id} className="card bg-base-100 w-full shadow-xl">
          <Link to={`/singleproduct/${prod.id}`}>
            <figure>
              <img src={prod.thumbnail} alt={prod.title} />
            </figure>
          </Link>
          <div className="card-body">
            <h2 className="card-title text-sm md:text-2xl">{prod.title}</h2>
            <div className="card-actions justify-end">
              <button
                onClick={(e) => buyProduct(e, prod)}
                className="btn btn-primary btn-sm md:btn-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsContainer;
