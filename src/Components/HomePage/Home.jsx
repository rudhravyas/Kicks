import React from "react";
import { Link } from "react-router-dom";
import sneakers from "../../Assets/4pMK.gif";
import shoe1 from "../../Assets/shoe1.webp";
import shoe2 from "../../Assets/shoe2.jpg";
import shoe3 from "../../Assets/shoe3.webp";
import shoes4 from "../../Assets/shoes4.jpg";
import shoes5 from "../../Assets/shoes5.jpg";

function HomePage() {
  return (
    <div className=" h-full font-thin">
      <div className=" flex items-center  bg-blue-50 justify-around h-screen flex-wrap grow border-4" >
        <div className="max-w-md">
          <h3 className="text-2xl my-2">BRING POWER TO YOUR STEPS</h3>
          <h1 className="text-3xl my-2">The Shoe Store</h1>
          <h1 className="text-4xl my-2">
            <b>Get Your Kicks.</b>
          </h1>
          <Link to='/men'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full my-2 text-xl text-center"> 
            Shop Now
          </button></Link>
        </div>
        <div className=" ">
       <img src={sneakers} alt="" />
        </div>
      </div>

      <div className=" my-24">
        <div className=" text-center my-2">
          <h2 className="text-3xl font-bold my-3 text-gray-700">
            Our Latest Products
          </h2>
          <p className="my-3 text-gray-900 text-bold text-xl">
            To reach the goals you have set you need the right gear to assist
            you in that journey.<br></br>
            Get the best there is in our collection.
          </p>
        </div>
        <div className="cards flex flex-wrap justify-around my-20">
          <div className="card border-4 mx-1">
            <img src={shoe1} alt="" className="h-48 w-64 " />
            <p className="text-center my-1">Nike Jordan1 Blue</p>
            <p className="text-center my-1">24,000 INR</p>
          </div>
          <div className="card border-4 mx-1">
            <img src={shoe2} alt="" className="h-48 w-64 " />
            <p className="text-center my-1">New Balance Foam1080</p>
            <p className="text-center my-1">14,000 INR</p>
          </div>
          <div className="card border-4 mx-1">
            <img src={shoe3} alt="" className="h-48 w-64 " />
            <p className="text-center my-1">On Cloud X3</p>
            <p className="text-center my-1">18,500 INR</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 flex flex-wrap justify-center  items-center border-4">
        <div className="my-16 mx-8 text-center ">
          <h3 className="font-bold text-3xl">
            The best shoes for the<br></br> best people.
          </h3>
          <p className="my-2">
            A shoe is an item of footwear intended to protect and <br></br>
            comfort the human foot. Shoes are also used as an<br></br> item of
            decoration and fashion. The design of shoes<br></br>
            has varied enormously through time and from culture to culture,
            <br></br> with form originally being tied to function.
          </p>
        </div>
        <div className="my-16">
          <img src={shoes4} alt="" className="h-80 w-auto" />
        </div>
      </div>

      <div className=" flex flex-wrap justify-center  items-center">
        <div className="my-16">
          <img src={shoes5} alt="" className="h-80 w-auto" />
        </div>
        <div className="my-16 mx-8 text-center ">
          <h3 className="font-bold text-3xl">
          Football unites the world.
          </h3>
          <p className="my-2">
          People who played would wear their heavy and hard<br></br>
           work boots to play. These were the first ever boots<br></br> 
           with the steel toe cap at the front, long laces and high <br></br>
           topped. These boots also had metal studs or tacks<br></br>
            put on the bottom so the players would have more<br></br>
             grip and stability.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 py-20 border-4 ">
        <div className=" text-center"> 
            <p className="text-4xl my-4">Explore the collection now.</p>
            <p className="text-xl my-4">Get ready to put them on and <br></br>embark on the most amazing <br></br>journey ever.</p>
            <Link to="/men"><button className="border-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full my-2 text-xl text-center">Explore Now</button></Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
