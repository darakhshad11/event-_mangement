import * as React from "react";
import Navbar from "./Navebar";
import fetchProduct from "../api/fetchProducts";

export default function MediaCard() {
  const [products, setProducts] = React.useState([]);
  const getData = React.useRef(() => {});

  getData.current = async () => {
    const savedData = await fetchProduct();
    setProducts(savedData);
  };

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || { role: "" };
    if (user.role) {
      if (user.role === "vendor") {
        window.location.href = "/vendor-page";
      } else {
        getData.current();
      }
    } else {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <Navbar name="USER DASHBOARD" />

      <div
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {products.length > 0 &&
          products.map((product) => {
            return (
              <>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{product.name}</div>
                    <p class="text-gray-700 text-base">{product.description}</p>
                    <p class="text-gray-600 text-sm mt-2">
                      Updated Date: {product.date}
                    </p>
                    <p class="text-gray-800 text-lg mt-2">${product.price}</p>
                    <p class="text-gray-700 text-sm mt-2">
                      Only {product.quantity} items left
                    </p>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Order Now
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}
