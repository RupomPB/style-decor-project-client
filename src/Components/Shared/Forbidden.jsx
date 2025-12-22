import React from 'react';
import { Link } from 'react-router';
import { FaLock, FaHome } from 'react-icons/fa';

const Forbidden = () => {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-5">
            <div className="max-w-md w-full text-center bg-base-100 shadow-2xl rounded-3xl p-10 border border-base-300">
                {/* Visual Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center animate-pulse">
                            <FaLock className="text-error text-5xl" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                            403
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-3xl font-bold text-base-content mb-2">
                    Access Forbidden
                </h2>
                <p className="text-base-content/60 mb-8 leading-relaxed">
                    Sorry, you don't have permission to access this page. This area is restricted to administrators only.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link 
                        to="/" 
                        className="btn btn-primary btn-md text-white flex items-center justify-center gap-2"
                    >
                        <FaHome /> Back to Home
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-ghost btn-sm text-base-content/50"
                    >
                        Go Back to Previous Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forbidden;