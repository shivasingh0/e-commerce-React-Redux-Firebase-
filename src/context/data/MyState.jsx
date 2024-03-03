import React, { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

function MyState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode == "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [loading, setLoading] = useState(false);

  // ********************** Add Product Section  **********************
  const [addProducts, setAddProducts] = useState({
    title: null,
    price: null,
    imageurl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      addProducts.title == null ||
      addProducts.price == null ||
      addProducts.imageurl == null ||
      addProducts.category == null ||
      addProducts.description == null
    ) {
      return toast.error("All fields are required");
    }

    const productRef = collection(fireDB, "products"); // it's just a referance where we are going to s
    setLoading(true);
    try {
      await addDoc(productRef, addProducts); // This added the data into the firestore database
      toast.success("Product added successfully");
      setLoading(false);
      getAllproducts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ********************** Get Product Section  **********************
  const [getAllProducts, setGetAllProducts] = useState([]);

  const getAllproducts = async () => {
    setLoading(true);

    try {
      const q = query(
        // query is used for getting data from database
        collection(fireDB, "products"),
        orderBy("time") // it is used to display data in time basis
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProducts(productArray);
        setLoading(false);
      }); // onSnapshot is used for realtime changes
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        addProducts,
        setAddProducts,
        addProduct,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
