import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase.js";

function User() {
  const [userEmail, setUserEmail] = useState(null); // State for user email
  const auth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Update state with user's email
      } else {
        setUserEmail(null); // No user signed in
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Navigate to login on successful logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="flex m-2 p-3 justify-center items-center flex-col">
      <h2 className="text-2xl my-6">Hi, {userEmail || "Guest"}!</h2>

      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-2 rounded-full my-6 text-l text-center w-32 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default User;
