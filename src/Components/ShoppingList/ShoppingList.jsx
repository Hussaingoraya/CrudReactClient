import React, { useState } from "react";
import ShoppingForm from "../ShoppingForm/ShoppingForm";

function ShoppingItem({ id, item, quantity, deleteItem, updateItem }) {
  const [isEdit, setEdit] = useState(false); // state storing mode
  function handleDelete(event) {
    event.preventDefault();
    deleteItem(id);
  }
  // sets edit mode to true
  function handleEdit(event) {
    event.preventDefault();
    setEdit((oldEditBoolean) => !oldEditBoolean);
  }

  function handleUpdate(item, quantity) {
    updateItem(id, item, quantity);
    setEdit(false);
  }
  // we will conditionally render these nodes based on isEdit
  // create a read only and a read-write version of the node
  const ReadOnlyJsx = (
    <span>
                    {item} ( {quantity} )         
    </span>
  );
  const EditJsx = (
    <ShoppingForm
      submitItem={handleUpdate}
      submitButtonText="Update"
      defaultItemName={item}
      defaultQuantity={quantity}
    />
  );
  return (
    <li>
                    {isEdit ? EditJsx : ReadOnlyJsx} 
      <div className="action">
        <button className="deletebtn" onClick={handleDelete} disabled={isEdit}>
          Delete
        </button>
                     
        <button className="Editbtn" onClick={handleEdit}>
           {isEdit ? "Cancel" : "Edit"}             
        </button>
      </div>
                           
    </li>
  );
}
export default function ShoppingList({ items, deleteItem, updateItem }) {
  const ItemsJsx = items.map((listItem) => (
    <ShoppingItem
      key={listItem.id}
      id={listItem.id}
      item={listItem.item}
      quantity={listItem.quantity}
      deleteItem={deleteItem}
      updateItem={updateItem}
    />
  ));

  return (
    <div className="card">
      {" "}
      <ul>{ItemsJsx}</ul>
    </div>
  );
}
