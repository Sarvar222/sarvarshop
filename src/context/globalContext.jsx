import { createContext, useEffect, useReducer } from "react";
import { Buy } from "../utils";

// const dataFromLocalStorage = () => {
//   return (
//     JSON.parse(localStorage.getItem("products")) || {
//       color: "",
//       selectedProducts: [],
//     }
//   );
// };

export const GlobalContext = createContext();
const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        selectedProducts: [...state.selectedProducts, payload],
      };
    case "REMOVE_PRODUCT":
      return { ...state, selectedProducts: payload };
    case "CHANGE_AMOUNT":
      return { ...state, selectedProducts: payload };
    case "CALCULATE":
      return { ...state, totalAmount: payload[1], totalPrice: payload[0] };
    case "CHANGE_COLOR":
      return { ...state, color: payload };
  }
};
export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    color: "",
    selectedProducts: [],
    totalPrice: 0,
    totalAmount: 0,
  });

  // calculate product
  const calculate = () => {
    let allPrice = 0;
    let allAmount = 0;
    if (state.selectedProducts.length) {
      state.selectedProducts.forEach((product) => {
        allPrice += product.price * product.amount;
        allAmount += product.amount;
      });
    }
    dispatch({
      type: "CALCULATE",
      payload: [Buy(allPrice), allAmount],
    });
  };
  // add product
  const addProduct = (product) => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
    calculate();
  };
  // remove product
  const removeProduct = (id) => {
    const filteredProducts = state.selectedProducts.filter(
      (product) => product.id !== id
    );
    dispatch({ type: "REMOVE_PRODUCT", payload: filteredProducts });
    // calculate();
  };
  // change amount
  const changeAmount = (id, ty) => {
    if (ty == "increase") {
      const changedProduct = state.selectedProducts.map((prod) => {
        if (prod.id == id) {
          return { ...prod, amount: prod.amount + 1 };
        } else {
          return prod;
        }
      });
      dispatch({ type: "CHANGE_AMOUNT", payload: changedProduct });
    } else {
      const changedProduct = state.selectedProducts.map((prod) => {
        if (prod.id == id) {
          return { ...prod, amount: prod.amount - 1 };
        } else {
          return prod;
        }
      });
      dispatch({ type: "CHANGE_AMOUNT", payload: changedProduct });
    }
  };
  // useEffect(() => {
  //   localStorage.setItem("products", JSON.stringify(state));
  // }, [state]);

  useEffect(() => {
    calculate();
  }, [state.selectedProducts]);
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
        removeProduct,
        addProduct,
        changeAmount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
