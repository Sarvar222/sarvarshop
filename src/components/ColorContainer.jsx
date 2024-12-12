import { useGlobalContext } from "../hooks/useGlobalContext";

const colors = ["#ECEBDE", "#D3F1DF", "#EBEAFF", "#FEF3E2"];

function ColorContainer() {
  const { dispatch } = useGlobalContext();

  return (
    <div className="align-elements mb-10 flex justify-end">
      <ul className="flex gap-3">
        {colors.map((color, index) => (
          <li
            key={index}
            onClick={() =>
              dispatch({
                type: "CHANGE_COLOR",
                payload: color,
              })
            }
            className="w-7 h-7 border rounded-full hover:border-red-400 cursor-pointer"
            style={{ backgroundColor: color }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default ColorContainer;
