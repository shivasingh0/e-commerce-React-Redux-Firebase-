import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/data/MyContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from "firebase/firestore";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true)
    if (name === "" || email === "" || password === "") {
        toast.error("All fields required")
    }

    try {
        const users = await createUserWithEmailAndPassword(auth, email, password)
        
        // extract details from users
        const user = {
          name : name,
          uid : users.user.uid,
          email : users.user.email,
          time : Timestamp.now()
        }

        // store details to the collection in dataBase
        const useRef = collection(fireDB, 'users')
        await addDoc(useRef, user)
        toast.success("Signup Successfull!")
        setName("")
        setEmail("")
        setPassword("")
        setLoading(false)
    } catch (error) {
       setLoading(false)
        console.log(error);
    }

  }

  return (
    <div className=" flex justify-center items-center h-screen">
    {loading && <Loader/>}
      <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">
            Signup
          </h1>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
            placeholder="Password"
          />
        </div>
        <div className=" flex justify-center mb-3">
          <button onClick={signup} className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg">
            Signup
          </button>
        </div>
        <div>
          <h2 className="text-white">
            Have an account{" "}
            <Link className=" text-red-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
