import React from 'react';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-16 px-4 bg-base-100 text-base-content transition-colors duration-300">
      <div className="max-w-4xl w-full shadow-lg rounded-lg p-8 md:p-12 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-3">
              <FiMapPin className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Address</h3>
                <p>Rupnagar Residential Area, Mirpur-2, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FiMail className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p>rupombadhan111@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <FiPhone className="text-primary text-2xl" />
              <div>
                <h3 className="text-xl font-semibold">Phone</h3>
                <p>+880 1568 115886</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Follow Us</h3>
              <div className="flex space-x-4 mt-2 text-xl">
                <a href="#" className="hover:text-blue-600"><BsFacebook /></a>
                <a href="#" className="hover:text-blue-400"><BsTwitter /></a>
                <a href="#" className="hover:text-pink-500"><BsInstagram /></a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-base-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none bg-base-100 text-base-content transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border border-base-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none bg-base-100 text-base-content transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  placeholder="Your Message"
                  className="w-full border border-base-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:outline-none h-32 resize-none bg-base-100 text-base-content transition-colors duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gradient font-semibold py-2 rounded-md hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
