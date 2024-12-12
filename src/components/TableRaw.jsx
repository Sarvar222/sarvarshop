import { useGlobalContext } from "../hooks/useGlobalContext";
import { Buy } from "../utils";

function TableRaw({
  id,
  price = 0,
  amount = 0,
  title = "Unknown",
  brand = "Unknown",
  thumbnail = "/placeholder.jpg",
}) {
  const { changeAmount, removeProduct } = useGlobalContext();

  const handleDecrease = () =>
    amount === 1 ? removeProduct(id) : changeAmount(id, "decrease");

  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            aria-label={`Select product ${title}`}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={thumbnail} alt={title} />
            </div>
          </div>
          <div>
            <div className="font-bold">{title}</div>
            <div className="text-sm opacity-50">Brand: {brand}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-ghost badge-sm">{Buy(price)}</span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeAmount(id, "increase")}
            className="btn btn-sm btn-outline"
            aria-label="Increase amount"
          >
            +
          </button>
          <span className="text-xl">{amount}</span>
          <button
            onClick={handleDecrease}
            className="btn btn-sm btn-outline"
            aria-label="Decrease amount"
          >
            -
          </button>
        </div>
      </td>
      <th>
        <button
          onClick={() => removeProduct(id)}
          className="btn btn-outline btn-error btn-sm"
          aria-label={`Delete product ${title}`}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}

export default TableRaw;
