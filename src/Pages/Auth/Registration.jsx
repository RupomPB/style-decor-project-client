import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

const Registration = () => {
  const { createUser, updataUserProfile, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = UseAxiosSecure();
  // console.log("in the register ", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    // console.log("after register", data);
    const profileImg = data.photo[0];

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;

        // 1 store the img in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2 send the photo to store
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL =  res.data.data.url;

          // create user in the database
          const userInfo ={
            email: data.email,
            displayName: data.name,
            photoURL: photoURL
          }
          axiosSecure.post('/users', userInfo)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user created in the database')
            }
          })
          // updata user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          console.log(data.name);

          updataUserProfile( userProfile)
            .then(() => {
              console.log("user profile updated");
              navigate(location.state || "/");
            })
            .catch((error) => {
              console.log(error.message);
            });
          setUser({ ...user,displayName: data.name, photoURl: photoURL, ...userProfile });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl my-10">
      <h1 className="text-center font-bold text-3xl">
        Welcome to Style <span className="text-primary"> Decor</span>
      </h1>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          <input
            {...register("name", {
              required: true,
            })}
            type="text"
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* photo field */}
          <label className="label">Photo</label>
          <input
            {...register("photo", {
              required: true,
            })}
            type="file"
            className="file-input"
            placeholder="Your Photo"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* email field */}
          <label className="label">Email</label>
          <input
            {...register("email", {
              required: true,
            })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}
          {/* Password */}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*]).{6,}$/,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />

          {/* Error Messages */}
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters
            </p>
          )}

          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Password must include at least:
              <br />• One uppercase letter
              <br />• One lowercase letter
              <br />• One number or special character
            </p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-gradient mt-4">Register</button>
          <p>
            Already have an account?{" "}
            <Link state={location.state} to="/login" className="text-blue-400">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Registration;
