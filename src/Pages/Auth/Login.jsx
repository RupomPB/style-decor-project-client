import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("in the login page", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-10 text-secondary">
        <h1 className="text-center  font-bold text-3xl">
          Welcome to Style <span className="text-primary">Decor</span>{" "}
        </h1>
        <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">email must required</p>
            )}
            {/* password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500"> password must required</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500"> password must be 6 character</p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-gradient mt-4">Login</button>
          </fieldset>
          {/* google button */}
          <div className="text-center">
            <p className="">OR</p>
            <button
              onClick={handleGoogleSignIn}
              className="my-5 w-full  btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          <p>Don't have an account ? <Link
            state={location.state}
            className="text-blue-400 underline "
            to="/register"
          >
            Register
          </Link> </p>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
