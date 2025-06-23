import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiVideoFill, RiNotificationLine } from "react-icons/ri";
import toast from 'react-hot-toast';


const TodaysSpecial = ({mode,setMode}) => {


     const changeTheme = () => {
    setMode(!mode);
  };

    const formattedDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

   const [dateLoading, setDateLoading] = useState(false);
    const [dateData, setDateData] = useState([]);

    const callShowByDate = async () => {
      try {
        setDateLoading(true);
        const dateResult = await fetch("http://localhost:11000/displayByDate");
        const dateResponse = await dateResult.json();
  
        console.log("show By Date response is", dateResponse.data);
        setDateData(dateResponse.data);
      } catch (error) {
        console.log("error in fetching today's post", error);
        toast.error("Unable to fetch today's posts!");
      } finally {
        setDateLoading(false);
      }
    };

     useEffect(() => {
        callShowByDate();
      }, []);

  return (
    <div  className={`${
        mode ? "bg-blue-300 text-gray-700" : "bg-slate-900 text-gray-400"
      } min-h-screen`}>
      
        {/* Top Heading */}
              <div className="w-full h-[10vh] p-3 flex justify-between items-center">
                <div>
                  <div className="flex gap-2 text-xs items-center font-bold">
                    Your Business
                    <div className="bg-yellow-500 w-[17vw] h-[3vh] flex justify-center text-white items-center rounded">
                      Subscribe
                    </div>
                  </div>
                  <div className="font-bold">Business {">"}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div onClick={changeTheme}>
                    {mode ? (
                      <MdDarkMode
                        size={40}
                        className="rounded-full bg-white p-2 text-blue-600 shadow-md hover:bg-blue-100 cursor-pointer transition-all duration-300"
                      />
                    ) : (
                      <MdLightMode
                        size={40}
                        className="rounded-full bg-white p-2 text-blue-600 shadow-md hover:bg-blue-100 cursor-pointer transition-all duration-300"
                      />
                    )}
                  </div>
                  <RiVideoFill
                    size={40}
                    className="rounded-full bg-white p-2 text-blue-600 shadow-md hover:bg-blue-100 cursor-pointer transition-all duration-300"
                  />
                  <RiNotificationLine
                    size={40}
                    className="rounded-full bg-white p-2 text-blue-600 shadow-md hover:bg-blue-100 cursor-pointer transition-all duration-300"
                  />
                </div>
              </div>
        
        {/* todays data */}

        <div className="mt-5 px-4">
        <h2 className="text-xl font-semibold mb-3 flex items-center justify-between">
          {formattedDate}'s Specials 
        </h2>
        {dateLoading ? (
          <div className="spinner">Loading...</div>
        ) : (
          <div className="flex flex-wrap gap-4 pb-4">
            {dateData.map((pic, index) => (
              <div
                key={pic._id || index}
                className="w-[98px] h-[98px] overflow flex-shrink-0 snap-center rounded shadow "
              >
                <img
                  src={pic.path}
                  alt={pic.productImage || "Today's Post"}
                  className="w-full h-full  object-cover rounded"
                />
                {/* <div className="mt-2 text-sm font-medium text-gray-700">{pic.category}</div> */}
              </div>
            ))}
          </div>
        )}
      </div>
        

    </div>


  )
}

export default TodaysSpecial
