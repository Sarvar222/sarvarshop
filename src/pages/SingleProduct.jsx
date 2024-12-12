import { useLoaderData } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

export const loader = async ({ params }) => {
  try {
    const req = await axiosInstance.get(`/products/` + params.id);
    const product = req.data;

    // Преобразуем данные в числа
    const price = parseFloat(product.price);
    const discountPercentage = parseFloat(product.discountPercentage);
    const rating = parseFloat(product.rating);

    if (isNaN(price) || isNaN(discountPercentage) || isNaN(rating)) {
      console.error("Invalid data received:", product);
      throw new Error("Invalid numeric data");
    }

    return { product };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to load product data");
  }
};

function SingleProduct() {
  const { product } = useLoaderData();

  if (!product) {
    return <p>Product not found</p>;
  }

  // Преобразование данных в числа перед использованием
  const price = parseFloat(product.price);
  const discountPercentage = parseFloat(product.discountPercentage);
  const rating = parseFloat(product.rating);

  if (isNaN(price) || isNaN(discountPercentage) || isNaN(rating)) {
    return <p>There was an error with the product data.</p>;
  }

  return (
    <div className="bg-base-100 shadow-xl p-4">
      <figure className="flex justify-center mb-4">
        <img src={product.thumbnail} alt={product.title} className="max-w-xs" />
      </figure>
      <div className="card-body text-center">
        <h2 className="card-title text-2xl font-semibold mb-2">{product.title}</h2>
        <p className="mb-2">Description: {product.description}</p>
        <span className="text-lg font-bold block mb-2">Price: ${price}</span>
        <span className="text-lg font-bold block mb-2">
          Discount: {discountPercentage}%
        </span>
        <span className="text-lg font-bold block mb-4">Rating: {rating}</span>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
