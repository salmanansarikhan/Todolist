import React, { useState, useEffect } from "react";
import "./todo.css";


// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggleButton, setToggleButton] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill in the data");
    } else if (inputdata && toggleButton) {
      
      setInputData("");
     
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
        checked: false,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // toggle the checkbox check state
  const toggleCheck = (id) => {
    setItems(
      items.map((curElem) => {
        if (curElem.id === id) {
          return { ...curElem, checked: !curElem.checked };
        }
        return curElem;
      })
    );
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  // useEffect(() => {
  //   localStorage.setItem("mytodolist", JSON.stringify(items));
  // }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
          
            <figcaption>ToDos</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder=" Add Todo List..."
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            <img src="/Plus-icons.png" onClick={addItem} alt="plus" className="tododadditem"/>
          </div>
          {/* show our items  */}
          <div className="showItems">
            {items
              .filter((curElem) => {
                if (showCompleted) {
                  return curElem.checked;
                } else {
                  return !curElem.checked;
                }
              })
              .map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                   <div className="eachitemfirstrow">
                    <div className="checkboxflex"><input type="checkbox" checked={curElem.checked} onChange={() => toggleCheck(curElem.id)} className="checkbox" /> </div>
                  <div className="showname">  <h3>{curElem.name}</h3></div>
</div>

                    <div className="todo-btn">
                      <img src="/dusbin.png" alt="Delete" onClick={() => deleteItem(curElem.id)} className="eachitemremove"/>
                     
                    </div>
                  </div>
                );
              })}
          </div>
          {/* rmeove all button  */}
          <div className="hr-line"></div>
          <div className="showItems-flex">
            <p className="btn effect04" onClick={() => setShowCompleted(!showCompleted)}>
              {showCompleted ? "Show Incomplete" : "Show Completed"}
            </p>
            <p  className="btn effect04"onClick={removeAll}>Remove All</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
