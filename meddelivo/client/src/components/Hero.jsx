import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner.jpg";


const Hero = () => {
    const banners = [banner1, banner2, banner3];
  const categories = [
    { name: "Prescription Medicines", image: "/images/prescription.png" },
    { name: "Over-the-Counter (OTC)", image: "/images/otc.png" },
    { name: "Ayurvedic & Herbal", image: "/images/ayurvedic.png" },
    { name: "Vitamins & Supplements", image: "/images/vitamins.png" },
    { name: "Diabetes Care", image: "/images/diabetes.png" },
    { name: "Baby & Mother Care", image: "/images/baby-mother.png" },
    { name: "Skin & Personal Care", image: "/images/skin-care.png" },
    { name: "Medical Devices", image: "/images/medical-devices.png" },
    { name: "Pain Relief & Muscle Care", image: "/images/pain-relief.png" },
    { name: "COVID-19 Essentials", image: "/images/covid-essentials.png" },
    { name: "Sexual Wellness", image: "/images/sexual-wellness.png" },
    { name: "Elderly Care", image: "/images/elderly-care.png" },
    { name: "Eye & Ear Care", image: "/images/eye-ear-care.png" },
    { name: "Homeopathy", image: "/images/homeopathy.png" },
    { name: "Pet Care", image: "/images/pet-care.png" },
  ];
  

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* Banner Section */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="w-full h-[250px] md:h-[350px] lg:h-[400px]"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Categories Section */}
      <h2 className="text-xl font-semibold mt-6 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition">
            <img src={category.image} alt={category.name} className="w-16 h-16 object-contain" />
            <p className="text-sm font-medium text-center mt-2">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
