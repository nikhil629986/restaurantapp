import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItems } from "../utils/firebaseFunction";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alerts, setAlertsStatus] = useState("Danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(false);
  const uploadImage=(e)=>{
    setIsLoading(true);
    const imageFile=e.target.files[0];
    console.log(imageFile);
    const storageRef=ref(storage,`Images/${Date.now()}-${imageFile.name}`)

    const uploadTask=uploadBytesResumable(storageRef,imageFile);
    uploadTask.on('statechange',(snapshot)=>{
      const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
    },(error)=>{
      console.log(error);
      setFields(true);
      setMsg('Error WHILE Uploading:Try Again');
      setAlertsStatus('danger')
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);


      })
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageAsset(downloadURL);
        setIsLoading(false);
        setFields(true);
        setMsg('Image UPLOADED');
        setAlertsStatus('success');
        setTimeout(()=>{
             setFields(false);
        },4000);

      })
    })

  }
  const deleteImage=()=>{
    setIsLoading(true);
    const deleteRef=ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(false);
      setMsg("Image DELETED Successfully");
      setAlertsStatus("success");
      setTimeout(()=>{
        setFields(false);
   },4000);

    })

  };

  const saveDetails=()=>{
    setIsLoading(true);
    try{

      if((!title||!calories||!imageAsset||!price||!price))
      {
             
      setFields(true);
      setMsg('Required Fields Must be filed');
      setAlertsStatus('danger')
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);


      })
      }

      else{
        const data={
          id:`${Date.now()}`,
          title:title,
          imageUrl:imageAsset,
          categories:category,
          calories:calories,
          qty:1,
          price:price


          
        }

        saveItems(data)
        setImageAsset(null);
      setIsLoading(false);
      setFields(false);
      clearData();
      setMsg("Data Uploaded Successfully");
      setAlertsStatus("success");
      setTimeout(()=>{
        setFields(false);
   },4000);
      }

    }

   
    catch(error){
      console.log(error);
      setFields(true);
      setMsg('Error WHILE Uploading:Try Again');
      setAlertsStatus('danger')
      setTimeout(()=>{
        setFields(false);
        setIsLoading(false);


      },4000);

      
    }

  }

  const clearData=()=>{
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category");
  }
  return (
    <div className="w-full min-h-screen h-full items-center justify-center flex flex-col ">
      <div className="w-[90%] md:wd-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center  text-lg font-semibold ${
              alerts === "Danger" ? "bg-red-400 text-red-600" : "bg-emerald-400"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
          <MdFastfood className="text-xl text-gray-700"></MdFastfood>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give Me a titie.."
            className="w-full h-full text-lg font-semibold bg-transparent outline-none border-none text-textColor"
          />
        </div>
        <div className="w-full ">
          <select onChange={(e) => setCategory(e.target.value)} className="outline-none text-base w-full cursor-pointer p-2 border-b-2 border-gray-200">
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((items) => (
                <option
                  key={items.id}
                  className="text-base border-0 outline-none capitalize text-headingColor"
                  value={items.urlParaName}
                >
                  {items.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center border-2 flex-col w-full h-225  md:h-420 border-dotted cursor-pointer rounded-lg">
          {isLoading?<Loader/>:<>
             
          {!imageAsset?<>
           <label className="w-full h-full flex  flex-col items-center cursor-pointer justify-center">
            <div className="w-full h-full flex  flex-col items-center  justify-center gap-2">
             <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700"/>
             <p className="text-gray-500 text-xl hover:text-gray-700"> Click Here To Upload</p>
            </div>
            <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0"/>
           </label>
          </>:<>
          <div className="relative h-full"><img src={imageAsset} alt="UPloaded Image" className="w-full h-full object-cover"/>
          <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 cursor-pointer hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}><MdDelete className="text-white"/></button>
          </div>
          </>}


          </>}

        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl"></MdFoodBank>
            <input
            type="text"
            required
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Calories"
            className="w-full h-full text-lg font-semibold bg-transparent outline-none border-none text-textColor"
          />

          
            
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl"/>
            <input
            type="text"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full h-full text-lg font-semibold bg-transparent outline-none border-none text-textColor"
          />

          
            
          </div>
        </div>
        <div className="flex items-center w-full">
          <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py2 rounded-lg text-lg text-white font-semibold" onClick={saveDetails}>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
