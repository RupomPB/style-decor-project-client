import axios from "axios";

const axiosSecure =axios.create({
  baseURL:"http://localhost:3000"
})

const UseAxiosSecure = ()=>{
  return axiosSecure
}

export default UseAxiosSecure