import "./App.css";
import React, { useState, useEffect } from "react";
import ShoppingForm from "./Components/ShoppingForm/ShoppingForm";
import ShoppingList from "./Components/ShoppingList/ShoppingList";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  function updateItem(id, item, quantity) {
    fetch(`https://cgrf4m-8080.csb.app/api/list/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        item: item,
        quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    })
      .then((x) => x.json())
      .then(loadData);
  }
  const loadData = () => {
    fetch("https://cgrf4m-8080.csb.app/api/list")
      .then((x) => x.json())
      .then((response) => {
        setShoppingList(response);
        console.log(response);
      });
  };
  useEffect(loadData, []);
  const addItem = (item, quantity) => {
    fetch("https://cgrf4m-8080.csb.app/api/list/new", {
      method: "POST",
      body: JSON.stringify({
        item,
        quantity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    })
      .then((x) => x.json())
      .then(loadData);
  };
  const deleteItem = (id) => {
    fetch("https://cgrf4m-8080.csb.app/api/list/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      mode: "cors",
    })
      .then((x) => x.json())
      .then(loadData);
  };
  return (
    <div className="App">
            
      <header className="App-header">
                  <h1>Shopping List</h1>       
      </header>
            
      <main>
                  <ShoppingForm submitItem={addItem} />       
        <ShoppingList
          items={shoppingList}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </main>
           
    </div>
  );
}

export default App;
