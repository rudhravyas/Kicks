import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Import the Firestore database
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import PriceSlider from "./Slider"; // Assuming this is your PriceSlider component

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../Features/cartSlice";
import { setProducts } from '../../Features/ProductsSlice';

function Mens() {
 
  const dispatch = useDispatch();
  const products = useSelector(state => state.products); 

 
  const handleAddToCart = (product) => {
    const productWithDetails = {
      ...product,
      size : selectedSize,
      quantity: selectedQuantity,
    };
    dispatch(addToCart(productWithDetails));
  };

  const [posts , setPosts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(8);  
  const[selectedQuantity, setSelectedQuantity] = useState(1); 

  const [category, setCategory] = useState(""); // Selected category filter
  const [color, setColor] = useState(""); // Selected color filter
  const [priceRange, setPriceRange] = useState([0, 100000]); // Selected price range
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering

  // Fetch data from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "Men"));
      const postList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setProducts(postList));
      setPosts(postList);
    };

    fetchPosts();
  }, [dispatch]);


  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      // Filter by category
      if (category) {
        filtered = filtered.filter((product) => product.Category === category);
      }

      // Filter by color
      if (color) {
        filtered = filtered.filter((product) => product.Color === color);
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) => Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1]
      );
      console.log("Price range:", priceRange);
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [category, color, priceRange, products]);

  return (
    <div className="flex font-thin ">
       <div className="left w-1/4 h-screen border-2 py-1 px-6 bg-blue-50">
        {/* Filter Sidebar */}
        <div className="Categories mb-2">
          <ul>
            <li className="text-3xl">Categories</li>
            <li
              onClick={() => setCategory("Running")}
              className={`my-3 text-xl cursor-pointer ${
                category === "Running" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Running
            </li>
            <li
              onClick={() => setCategory("Sneakers")}
              className={`my-3 text-xl cursor-pointer ${
                category === "Sneakers" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Sneakers
            </li>
            <li
              onClick={() => setCategory("Sports")}
              className={`my-3 text-xl cursor-pointer ${
                category === "Sports" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Sports
            </li>
          </ul>
        </div>
        <hr className="border-gray-700 border-t-2 my-2" />

        <div className="colors mb-2">
          <ul>
            <li className="text-3xl my-2">Colors</li>
            <li
              onClick={() => setColor("Black")}
              className={`my-3 text-xl cursor-pointer ${
                color === "Black" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Black
            </li>
            <li
              onClick={() => setColor("White")}
              className={`my-3 text-xl cursor-pointer ${
                color === "Blue" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              White
            </li>
            <li
              onClick={() => setColor("Yellow")}
              className={`my-3 text-xl cursor-pointer ${
                color === "Green" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Yellow
            </li>
            <li
              onClick={() => setColor("Red")}
              className={`my-3 text-xl cursor-pointer ${
                color === "Red" ? "text-blue-500" : "text-gray-600"
              }`}
            >
              Red
            </li>
          </ul>
        </div>
        <hr className="border-gray-700 border-t-2 my-2" />
        <div className="price">
          <p className="text-3xl my-4">Price Range</p>
          <div className="px-1">
            <PriceSlider
              min={0}
              max={200000}
              step={50}
              onChange={(range) => setPriceRange(range)}
            />
          </div>
        </div>
      
      </div>
      <div className="right w-3/4 bg">
        <div>
          <div className="flex justify-between border-2 py-2 px-2 bg-gray-50">
            <p className="text-3xl">Mens Shoes</p>
            <div className="p-1">
              <button
              onClick={() => {
                setCategory("");
                setColor("");
                setPriceRange([0, 100000]);
              }}
               className="border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full mx-2 text-center">
                Clear Filters
              </button>
              
            </div>
          </div>
        </div>

        <div>
          <div className="items">
            <div className="flex flex-wrap gap-4 justify-around">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border-2 p-2 m-2">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-72 h-48 object-cover"
                  />
                  <h2 className="text-center p-1 text-xl">{product.name}</h2>
                  <p className="text-center"> ₹ {product.price}</p>

                  <div className="flex m-2 justify-center">
                    <label htmlFor={`size-${product.id}`} className="m-1 p-1">
                      Size:
                    </label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                    >
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>

                    <label htmlFor={`size-${product.id}`} className="m-1 p-1">
                      Qauntity:
                    </label>
                    <select
                      value={selectedQuantity}
                      onChange={(e) =>
                        setSelectedQuantity(parseInt(e.target.value))
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  <button
                  onClick={() => handleAddToCart(product)}className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mx-20 text-center my-2"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mens;
