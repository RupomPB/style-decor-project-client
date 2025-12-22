import React from "react";
// Changed MonoLoader to MoonLoader as MonoLoader does not exist in the package
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      {/* Set a color that matches your project theme */}
      <MoonLoader color="#D9A5B3" size={60} />
    </div>
  );
};

export default Loading;