import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { herodata } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-screen"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-start bg-orange-200 px-2 py-2 drop-shadow-xl rounded-full ">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>

          <div className=" w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img
              src={Delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            ></img>
          </div>
        </div>
        <p className="text-[3rem] font-bold tracking-wide text-headingColor lg:text-[4.5rem]">
          The Fatest Delivery in
          <span className="text-orange-600 text-[3.3rem] lg:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          nostrum doloremque earum eaque vero eius provident quo explicabo non,
          dolorum sint tenetur, dolore doloribus possimus natus, repellat nobis
          facere reprehenderit.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500  w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto font-semibold tracking-wide text-textColor"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className=" ml-auto h-370px w-full lg:w-auto lg:h-650"
          alt=""
        />
        <div className="h-full w-full absolute top-0 left-0 flex items-center justify-center gap-4 flex-wrap px-32 py-4 ">
          {herodata &&
            herodata.map((n) => (
              <div
                key={n.id}
                className=" lg:w-190 min-w-[210px]  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col drop-shadow-lg"
              >
                <img src={n.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="" />
                <p className="text-base lg:text-xl text-textColor font-semibold mt:2 lg:mt-4">{n.name}</p>

                <p className=" text-[12px] lg:text-sm text-lighttextGray font-semibold my:1 lg:my-3">
                  {n.dcep}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-500">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
