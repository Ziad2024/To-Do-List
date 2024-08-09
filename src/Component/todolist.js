import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Todoitem from "./todoitem";
import { useDispatch } from "react-redux";
import { add_todo, filter, mark_all, search_todo } from "../Redux/action.js";

function Todolist() {
  const [text, settext] = useState("");
  const [search, setsearch] = useState("");
  const inputRef=useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const handclick= (event)=>{
      if(event.key === "Enter")
        {
          dispatch(add_todo(text))
          settext("");
        }
    }
     inputRef.current.addEventListener("keypress",handclick)
   
     return(()=>{
      inputRef.current.removeEventListener("keypress",handclick)
  })
   
  }, [text]);


  
  return (
    <div>
      <div className=" w-[70%] mx-auto min-h-[200px] bg-gray-200 p-8 ">
        <h1 className="  w-32 mx-auto text-2xl"> To Do List</h1>
        <div className=" flex items-center gap-5 w-full  mt-3 ">
          <input
            ref={inputRef}
            value={text}
            type="text"
            className=" grow outline-none p-2 rounded focus:border-blue-900 border-b transition duration-200"
            onChange={(e)=>{settext(e.target.value)}}
          />
          <button className=" bg-sky-600 text-white p-1 rounded">
            <IoMdAdd size={30} 
            onClick={()=> {dispatch(add_todo(text))}}/>
          </button>
        </div>
        <div className="flex w-full justify-between items-center mt-3">
          <div className="flex items-center gap-3">
            <select className=" p-1 rounded" onChange={(e)=>{dispatch(filter(e.target.value))}}>
              <option
                value="All"
                className=" !hover:bg-black !hover:text-white"
              >
                Defualt
              </option>
              <option value="Completed">Completed</option>
              <option value="InCompleted">InCompleted</option>
            </select>
            <p className=" bg-black rounded cursor-pointer p-1 text-white " onClick={()=>dispatch(mark_all())} >
              Mark all Completed
            </p>
          </div>
          <div className="flex items-center gap-5">
            <input
              type="text"
              placeholder="Search"
              onChange={(e)=> dispatch(search_todo(e.target.value))}
              className=" w-32 rounded outline-none p-2 focus:border-blue-900 border-b transition duration-200"
            />
            <button onClick={()=> dispatch(search_todo(search))} className=" bg-sky-600 text-white p-1 rounded">
              <IoIosSearch size={30} />
            </button>
          </div>
        </div>
        <div className=" mt-3  ">
        <Todoitem/>
        </div>
      </div>
    </div>
  );
}

export default Todolist;
