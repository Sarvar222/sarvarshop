import { TableRaw } from "../components";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

function Cart() {
  const { selectedProducts, totalPrice, totalAmount } = useGlobalContext();

  // Если корзина пуста, выводим сообщение
  if (!selectedProducts || selectedProducts.length === 0) {
    return <p className="text-xl text">:(</p>;
  }

  // Расчёт общей суммы и количества товаров
  const totalPriceCalculated = selectedProducts.reduce((total, product) => {
    const price = parseFloat(product.price); // Преобразуем цену в число
    const amount = parseInt(product.amount, 10); // Преобразуем количество в число
    if (!isNaN(price) && !isNaN(amount)) {
      return total + price * amount; // Если данные корректны, добавляем к общей сумме
    }
    return total; // Если данные некорректны, возвращаем текущую сумму
  }, 0);

  const totalAmountCalculated = selectedProducts.reduce((total, product) => {
    const amount = parseInt(product.amount, 10); // Преобразуем количество в число
    if (!isNaN(amount)) {
      return total + amount; // Если данные корректны, добавляем количество
    }
    return total; // Если данные некорректны, возвращаем текущее количество
  }, 0);

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-5 text-center">Your Cart</h1>
      <table className="table w-full">
        {/* Заголовки таблицы */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Отображаем товары в корзине */}
          {selectedProducts.map((product) => (
            <TableRaw
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              amount={product.amount}
              thumbnail={product.thumbnail}
              brand={product.brand}
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-10">
        {/* Общая информация о корзине */}
        <h3 className="font-semibold text-lg">
          Total Items: {totalAmountCalculated}
        </h3>
        <h3 className="font-semibold text-lg">
          Total Price: ${totalPriceCalculated.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default Cart;
