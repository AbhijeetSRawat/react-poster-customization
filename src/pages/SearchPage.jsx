import React, { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { RiVideoFill, RiNotificationLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SearchPage = ({searchValue,  setSearchValue, tagvalue, setTagvalue, mode, setMode}) => {

    const navigate = useNavigate();

     const changeTheme = () => {
     setMode(!mode);
   };

   const [searchPics,setSearchPics] = useState([]);
   const [searchLoading,setSearchLoading] = useState(false);
   
   const callAllData = async () => {
    try {
      setSearchLoading(true);
      const allDataResult = await fetch(
        "http://localhost:11000/api/get/product"
      );
      const allDataResponse = await allDataResult.json();

      console.log("show search post response is", allDataResponse.allProduct);
      setSearchPics(allDataResponse.allProduct);
    } catch (error) {
      console.log("error in fetching search post", error);
    } finally {
      setSearchLoading(false);
    }
  };

  

     const searchClick= (e)=>{
    e.preventDefault();
    setTagvalue(searchValue);
    navigate("/searchpage");
  }

  useEffect(()=>{
    callAllData();
  },[])

  return (
    <div className={`${
        mode ? "bg-blue-300 text-gray-700" : "bg-slate-900 text-gray-400"
      } min-h-screen`} >

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

       <div className="mt-3 flex justify-center">
              
              <input
                type="text"
                
                placeholder="Search Category or Media"
                onChange={(e)=>(setSearchValue(e.target.value))}
                className={`w-[75vw] h-[7vh] rounded-l-md px-3 ${
                  mode ? "bg-blue-400" : "bg-slate-900"
                }`}
              />
              <button
              onClick={searchClick}
                className={`w-[15vw] h-[7vh] flex justify-center items-center rounded-r-md ${
                  mode ? "bg-blue-400" : "bg-slate-900"
                }`}
              >
                <FaSearch size={20} />
              </button>
            </div>

                       <div className="mt-5 px-4">

        {searchLoading ? (
          <div className="spinner">Loading...</div>
        ) : (
          (tagvalue === '')?(<div>Please provide some value to search...</div>):
          (
            <>
                    <h2 className="text-xl font-semibold mb-3 flex items-center justify-between">{`Related pictures for ${tagvalue} are :-`}</h2>
            <div className="flex flex-wrap gap-4 pb-4">
            {searchPics
              .filter(product =>
                 product.tags?.some(tag => tag.toLowerCase().includes(tagvalue)))
              .map((pic, index) => (
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
          </>
          )
        )}
      </div>
    </div>
  )
}

export default SearchPage
