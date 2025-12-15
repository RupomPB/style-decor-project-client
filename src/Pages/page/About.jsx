import React from "react";
import { FiUsers, FiTarget, FiAward, FiClock } from "react-icons/fi";
import { GiBrain } from "react-icons/gi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Jane Smith",
      role: "Creative Director",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Mike Johnson",
      role: "Lead Designer",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Emily Davis",
      role: "Event Manager",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      social: { facebook: "#", twitter: "#", instagram: "#" },
    },
  ];

  const coreValues = [
    { icon: <FiTarget className="text-primary text-3xl mb-2" />, title: "Excellence", desc: "We deliver top-notch services for every client." },
    { icon: <GiBrain className="text-primary text-3xl mb-2" />, title: "Creativity", desc: "Innovative solutions for every project." },
    { icon: <FiAward className="text-primary text-3xl mb-2" />, title: "Integrity", desc: "Honesty and transparency are our foundation." },
    { icon: <FiClock className="text-primary text-3xl mb-2" />, title: "Reliability", desc: "On-time delivery and consistent quality." },
  ];

  return (
    <section className="bg-base-100 text-base-content transition-colors duration-300 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About StyleDecor</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">
            We transform events into unforgettable experiences through creativity, elegance, and attention to detail.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="flex flex-col items-center text-center p-8 bg-base-200 rounded-lg shadow-md">
            <FiTarget className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p>To provide exceptional decoration services that transform spaces into unforgettable experiences.</p>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-base-200 rounded-lg shadow-md">
            <GiBrain className="text-primary text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p>To be the leading decoration service, known for creativity, professionalism, and customer satisfaction worldwide.</p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
                {value.icon}
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-500 dark:text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
                <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full mb-4" />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{member.role}</p>
                <div className="flex space-x-3 mt-2">
                  <a href={member.social.facebook} className="text-blue-600 hover:text-blue-800"><FaFacebookF /></a>
                  <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
                  <a href={member.social.instagram} className="text-pink-500 hover:text-pink-700"><FaInstagram /></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline / History */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
          <div className="flex flex-col space-y-6 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
            <div className="flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
              <FiClock className="text-primary text-4xl mb-2" />
              <h4 className="font-semibold">2018</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">Founded with a small team of passionate decorators.</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
              <FiAward className="text-primary text-4xl mb-2" />
              <h4 className="font-semibold">2020</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">Expanded our services to corporate events and weddings.</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
              <FiUsers className="text-primary text-4xl mb-2" />
              <h4 className="font-semibold">2022</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">Team grew to 20+ creative professionals.</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-base-200 rounded-lg shadow-md hover:shadow-xl transition">
              <GiBrain className="text-primary text-4xl mb-2" />
              <h4 className="font-semibold">2025</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center">Recognized as one of the top decorators in the city.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Want to Make Your Event Unforgettable?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Contact us today and let's bring your dream event to life!
          </p>
          <a href="/contact" className="btn-gradient px-6 py-3 font-semibold rounded-md hover:opacity-90 transition">
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
