import React, { useState, useEffect } from "react";
import TodoLists from "./TodoLists";
import "../App.css";

const Addtodo = () => {
  // For D/M/Y
  const d = new Date();
  const date = d.getDate();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = weekday[d.getDay()];
  const yearMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = yearMonth[d.getMonth()];

  const fy = day + " " + date + " " + month + " " + d.getFullYear();

  // Using Hooks => State (useState) to store a new value(i/p) from the user;
  const [inputList, setInputList] = useState("");

  const [toggleIcon, settoggleIcon] = useState(true);
  const [EditList, setEditList] = useState(null);

  // To get i/p txt value from the user & set new value;
  const itemEvent = (event) => {
    setInputList(event.target.value);
  };

  // To  Get Data from the Local-Storage
  const getLocalItems = () => {
    let List = localStorage.getItem("ToDoList");

    if (List) {
      return JSON.parse(localStorage.getItem("ToDoList"));
    } else {
      return []; // simply return empty arr[]...<= const [Items, setItems] = useState([empty]);
    }
  };

  const [Items, setItems] = useState(getLocalItems());

  // Taking i/p value from the User, & creating an object to store in an new Arry[];

  // const handleSubmit = (e) =>{

  //   e.preventDefault(); // <= Avoiding page Load while Addtodo(onSubmit)

  //   // New todo with property => Example : {title : " Buy some Books " , done:false  id:123 , key:524, password:1111, email, etc...}

  //   const  newTodo =  { id: new Date().getTime().toString(), title : inputList , done:false};

  //   setItems([...Items , newTodo]);

  //    setInputList(""); // <= After submit the Value :  Text-field should be Empty;

  //  }  // new code below ( +=> EditItem);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputList && !toggleIcon) {
      setItems(
        Items.map((todo) => {
          if (todo.id === EditList) {
            return { ...todo, title: inputList };
          }
          return todo;
        })
      );
      settoggleIcon(true);
      setInputList("");
      setEditList(null);
    } else {
      const newTodo = {
        id: new Date().getTime().toString(),
        title: inputList,
        complete: false,
      };
      setItems([...Items, newTodo]);
      setInputList("");
    }

    console.log(JSON.parse(localStorage.getItem("ToDoList")));
  };

  // Delete the list item;
  const deleteItem = (id) => {
    setItems((Items) => {
      return Items.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  // All delete
  const allDelete = () => {
    setItems([]);
  };

  // Check for complete task
  const Checkbox = (id) => {
    const newItems = [...Items];
    newItems.map((todo) => {
      if (todo.id === id) {
        return (todo.complete = !todo.complete);
      } else {
        return todo;
      }
    });
    setItems(newItems);
  };

  // Editing Item text;
  const editItem = (id) => {
    const newEditItem = Items.find((todo) => {
      return todo.id === id;
    });
    settoggleIcon(false);
    setInputList(newEditItem.title);
    setEditList(id);
  };

  //  Add Data to Local-Storage ; Using UseEffect (SetItems/GetItems)

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(Items));
  }, [Items]);

  //  counting task
  const countTask = () => {
    let count = Items.filter((todo) => !todo.complete).length;
    let word = count === 1 ? "Task" : "Tasks";

    if (count === 0) {
      return null;
    } else {
      return `You have Remaining ${count} ${word}`;
    }
  };

  // JSX below

  return (
    <>
      <div className="container">
        <div className="box">
          <div className="title">
            <h1> To-Do List</h1>
            <div className="date">
              <p> {fy}</p>
            </div>
          </div>
          <br />

          <form onSubmit={handleSubmit}>
            <div className="target">
              <input
                type="text"
                placeholder="Add new task"
                value={inputList}
                onChange={itemEvent}
                required
              />

              {toggleIcon ? (
                <button type="submit" title="Add">
                  <i className="fa-solid fa-circle-plus plus" />
                </button>
              ) : (
                <button
                  type="submit"
                  title="Update"
                  style={{ backgroundColor: "#fff", color: "#32cd32" }}
                >
                  <i className="fa-solid fa-pen-to-square " />
                </button>
              )}
            </div>
            <div className="task">
              <p style={{ fontSize: 17 }}>{countTask()} </p>
            </div>
          </form>

          <div className="list">
            <ol>
              {Items.length > 0 ? (
                Items.map((todo) => {
                  return (
                    <TodoLists
                      todo={todo}
                      id={todo.id}
                      key={todo.id}
                      Edit={editItem}
                      onSelect={deleteItem}
                      onChange={Checkbox}
                    />
                  );
                })
              ) : (
                <>
                  <h2 style={{ textAlign: "center", color: "#1e90ff" }}>
                    Create New Task
                  </h2>
                  <h3>
                    <span className="quote">"</span> IF A TASK IS ONCE BEGUN,
                    NEVER LEAVE IT UNTIL IT'S DONE{" "}
                    <span className="quote">"</span>
                  </h3>
                </>
              )}
            </ol>
          </div>
          <div className="allDelete" onClick={allDelete}>
            {/* {if Arr[] list > 1 then display delete-all btn else display null } */}
            {Items.length > 1 ? <button> Delete All </button> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtodo;
