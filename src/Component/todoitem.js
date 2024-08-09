import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_todo, toggle_todo, update_todo } from "../Redux/action";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgGoogleTasks } from "react-icons/cg";

function Todoitem() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.search.toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter =
        (filter === "Completed" && todo.completed) ||
        (filter === "InCompleted" && !todo.completed) ||
        filter === "All";

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  const dispatch = useDispatch();

  const handleEditClick = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const handleUpdateClick = (index,text) => {
    dispatch(
      update_todo({
        id: editingIndex,
        value: editText==="" ? text : editText,
      })
    );
    setEditingIndex(null);
    setEditText("");
  };

  return (
    <div>
      <p className="italic">All Your Notes Here...</p>
      <div className="mt-3">
        {filteredTodos.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex  gap-2">
              <span>{index + 1}-</span>
              {editingIndex === index ? (
                <input
                  className="w-96"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <p className={`${item.completed && "line-through"} w-96`}>
                  {item.text}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              {editingIndex === index ? (
                <button
                  className="bg-black text-white rounded-full p-2"
                  onClick={() => handleUpdateClick(index, item.text)}
                >
                  Udapte
                </button>
              ) : (
                <CgGoogleTasks
                  className="cursor-pointer"
                  size={30}
                  onClick={() => handleEditClick(index, item.text)}
                />
              )}
              <IoCheckmarkDoneCircle
                size={30}
                className="cursor-pointer"
                onClick={() => dispatch(toggle_todo(index))}
              />
              <MdDelete
                size={30}
                className="cursor-pointer"
                onClick={() => dispatch(delete_todo(index))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todoitem;
