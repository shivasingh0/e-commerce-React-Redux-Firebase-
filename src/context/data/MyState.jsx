import React, { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
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
  const [products, setProducts] = useState({
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
      products.title == null ||
      products.price == null ||
      products.imageurl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("All fields are required");
    }

    const productRef = collection(fireDB, "products"); // it's just a referance where we are going to store
    setLoading(true);
    try {
      await addDoc(productRef, products); // This added the data into the firestore database
      toast.success("Product added successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      setLoading(false);
      getAllproducts();

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ********************** Get Product Section  **********************
  const [getProducts, setGetProducts] = useState([]);

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
        setGetProducts(productArray);
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

  // ********************** Update Product Section  **********************
  const editProduct = (item) => {
    setProducts(item);
  };

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getAllproducts();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setGetProducts("");
  };

  // ********************** Delete Product Section  **********************
  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getAllproducts();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ********************** Get order Section  **********************
  const [order, setOrder] = useState([])

  const getOrderData = async () => {
    setLoading(true)

    try {
      const result = await getDocs(collection(fireDB, 'orders'))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      })
      setOrder(ordersArray)
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }

  useEffect(() => {
    getOrderData()
  }, [])

  // ********************** Get users Section  **********************

  const [user, setUser] = useState();

  const getUserData = async () => {
    setLoading(true)

    try {
      
      const result = await getDocs(collection(fireDB, "users"));
      const userDataArray = []
      result.forEach((docs)=>{
        userDataArray.push(docs.data());
        setLoading(false)
      })
      setUser(userDataArray)
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }

  useEffect(() => {
    getUserData()
  }, [])

   // ********************** Filter Logics  **********************

   const [searchKey, setSearchKey] = useState('')
   const [filterType, setFilterType] = useState('')
   const [filterPrice, setFilterPrice] = useState('')


  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        getProducts,
        editProduct,
        updateProduct,
        deleteProduct,
        order,
        user,
        searchKey,
        setSearchKey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
