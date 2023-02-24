// React Component ;

import React from "react";

const TodoLists = ({ todo, id, onSelect, onChange, Edit }) => {
  const checking = () => {
    // if (todo.complete){
    // }else{
    //   onChange(id);
    // }
    onChange(id);
  };

  return (
    <>
      <div className="list_style">
        <li>
          <label htmlFor="ckbox" className={todo.complete ? "active " : ""}>
            <input
              type="checkbox"
              id="Cbox"
              checked={todo.complete}
              onClick={() => checking()}
            />

            {todo.title}
          </label>
        </li>
        <div className="icons">
          {/* For enable / disable edit icon   */}
          {!todo.complete ? (
            <i
              className="fa-solid fa-pen-to-square edit"
              title="Edit"
              style={{ cursor: "pointer" }}
              onClick={() => Edit(id)}
            />
          ) : (
            <i
              className="fa-solid fa-pen-to-square edit"
              style={{ color: "lightgray" }}
            />
          )}

          {!todo.complete ? (
            <i
              className="fa-solid fa-trash-can delete"
              title="Delete"
              onClick={() => onSelect(id)}
            />
          ) : (
            <i
              className="fa-solid fa-trash-can delete"
              title="Delete"
              style={{ color: "red" }}
              onClick={() => onSelect(id)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TodoLists;
