import React from "react";
import { MonoLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MonoLoader></MonoLoader>
    </div>
  );
};

export default Loading;
