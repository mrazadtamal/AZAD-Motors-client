import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  googleSignIn,
  loginWithEmailPassword,
} from "../../Firebase/firebaseFunctions";
import { AuthContext } from "./../../Context/AuthProvider";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const onSubmit = (data) => {
    console.log(data);
    loginWithEmailPassword(data.email, data.password, setCurrentUser);
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (currentUser) {
      history.replace(from);
    }
  }, [history, currentUser, from]);

  const handleGoogleLogin = () => {
    googleSignIn({ setCurrentUser, history, from });
  };

  return (
    <div className="mt-10 w-2/5 m-auto text-center ">
      <h1 className=" text-2xl my-10">Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-md mb-2">Email</label>
        <input
          placeholder="email"
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          {...register("email", { required: true })}
        />
        <br />
        <label className="block text-md mt-3 mb-2">Password</label>
        <input
          type="password"
          placeholder="password"
          className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          {...register("password", { required: true })}
        />
        <br />

        <input
          className="relative ring-2 px-4 mt-5 border rounded-md py-2 text-lg text-white bg-green-600 hover:bg-green-200"
          type="submit"
        />
      </form>
      <h1 className="mt-3">Or</h1>

      <button
        onClick={handleGoogleLogin}
        className="relative ring-2 px-4 mt-4 border rounded-md py-2 text-lg text-white bg-green-500 hover:bg-green-200"
      >
        Login with Google
      </button>
      <br />
      <Link to="/signUp">
        <button className="mt-6">Don't have an account? SignUp Now!</button>
      </Link>
    </div>
  );
};

export default Login;
