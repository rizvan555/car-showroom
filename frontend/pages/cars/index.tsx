import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import FilteredCars from './FilteredCars';
import { motion } from 'framer-motion';

interface Cars {
  _id: string;
  img: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  name: string;
  model: string;
  fuel: string;
  transmission: string;
  displacement: number;
  owner: number;
  price: number;
  km: number;
  year: number;
  ps: number;
}

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const images = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

function Cars() {
  const [cars, setCars] = useState<Cars[]>([]);
  const [visibility, setVisibility] = useState<number>(6);
  const [filteredCars, setFilteredCars] = useState<Cars[]>([]);
  const [isFilteredCarsOpen, setIsFilteredCarsOpen] = useState<boolean>(false);
  const [close, setClose] = useState<boolean>(true);

  useEffect(() => {
    const getCars = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cars');
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCars();
  }, []);

  const handleMoreCars = () => {
    setVisibility((prevVisibleCars) => prevVisibleCars + 6);
  };

  const handleCarItem = (carId: string) => {
    const filteredCar = cars.find((car) => car._id === carId);
    console.log(filteredCar);
    if (filteredCar) {
      setFilteredCars([filteredCar]);
      setIsFilteredCarsOpen(true);
    }
  };

  const handleCloseFilteredCars = () => {
    setIsFilteredCarsOpen(false);
    setClose(false);
  };

  return (
    <div className="flex flex-col mx-auto pt-10 py-8 relative bg-[#f5f5f5]">
      <div
        className={`flex items-center gap-8 mb-20 ${
          isFilteredCarsOpen ? 'blur-background' : ''
        }`}
      >
        <h1 className="md:text-6xl text-4xl mx-auto md:m-0 font-bold px-5">
          OUR CARS
        </h1>
        <hr className="md:hr-line" />
      </div>
      <div className="md:flex flex-wrap grid grid-cols-1 gap-10 justify-center mt-2 mb-6 ">
        {cars.slice(0, visibility).map((car, index) => {
          return (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="show"
              key={index}
              className={`md:flex flex-col justify-center items-center py-2 px-10 md:w-[30vw] w-[85vw] md:m-0 mx-auto bg-white hover:scale-105 transition-all item ${
                isFilteredCarsOpen ? 'blur-background' : ''
              }`}
            >
              <motion.button
                variants={images}
                onClick={() => handleCarItem(car._id)}
              >
                <div className="hover:scale-105 transition-all h-[30vh]">
                  <Image src={car.img} alt={car.img} width={300} height={100} />
                </div>
                <div className="flex items-center justify-between text-[18px] h-[10vh]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{car.name}</h3>
                    <h4>{car.model}</h4>
                  </div>
                  <div className="">
                    <p className="font-bold">
                      <span className="text-primary">€</span> {car.price}
                    </p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          );
        })}
        <button
          onClick={handleMoreCars}
          className={`border px-6 py-2 bg-primary text-white myButton md:w-[15vw] w-[40vw] mx-auto md:m-0 ${
            isFilteredCarsOpen ? 'blur-background' : ''
          }`}
        >
          SEE MORE
        </button>
      </div>

      <FilteredCars
        filteredCars={isFilteredCarsOpen ? filteredCars : []}
        isFilteredCarsOpen={isFilteredCarsOpen}
        handleCloseFilteredCars={handleCloseFilteredCars}
      />
    </div>
  );
}

export default Cars;