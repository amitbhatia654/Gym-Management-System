import { useState } from "react";

export default function Setting() {
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--box-color"
  );
  const [color, setColor] = useState(localStorage.getItem("color") || bgColor);

  const changeColor = (e) => {
    setColor(e.target.value);
    document.documentElement.style.setProperty("--box-color", e.target.value);
    localStorage.setItem("color", e.target.value); // Change the CSS variable's value
  };

  const setDefaultColor = () => {
    document.documentElement.style.setProperty("--box-color", "#E7E7EE");
    localStorage.setItem("color", "#E7E7EE");
    setColor("#E7E7EE");
  };

  return (
    <div>
      <h2 className="text-center " style={{ textDecoration: "" }}>
        {" "}
        Change Background Color{" "}
      </h2>
      <div
        className="d-flex justify-content-center mt-4 p-4 "
        style={{ boxShadow: "2px 1px 5px grey" }}
      >
        <div>
          <span className="fs-6 fw-bold ">Select Color </span>
          <input
            type="color"
            value={color}
            onChange={changeColor}
            style={{
              height: "20px",
              width: "40px",
              cursor: "pointer",
              // border: "5px solid red",
              boxShadow: "2px 1px 10px grey",
              padding: "0px",
              marginLeft: "5px",
              marginRight: "15px",
            }}
          />
        </div>
        <div>
          <span className="fs-6 fw-bold  "> Set Default Color</span>
          <input
            type="checkbox"
            onClick={(e) => setDefaultColor(e.target.checked)}
            checked={color == "#E7E7EE"}
            style={{ marginLeft: "15px", transform: "scale(1.5)" }}
          />
        </div>
      </div>
    </div>
  );
}
