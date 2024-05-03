import React, { useRef, useState } from "react";
import { X } from "react-feather";

const ItemFrom = ({
  type,
  item,
  updateCardItemHandler,
  cancelEditItemHandler,
  addGroupItemHandler,
  setShowAddCard,
}) => {
  const [title, setTitle] = useState(item ? item.title : "");
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (title.length > 0 && title.length <= 40) {
      if (type === "editItem") {
        updateCardItemHandler(title);
      } else {
        addGroupItemHandler(title);
        setTitle("");
      }
    }
  };

  const cancelHandler = () => {
    if (type === "editItem") {
      cancelEditItemHandler();
    } else {
      setShowAddCard(true);
    }
  };

  return (
    <form className="form" onSubmit={formHandler}>
      <input
        ref={inputRef}
        placeholder="Enter a title for the card.."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="btns">
        <button type="submit">
          {type === "editItem" ? "Edit Item" : "Add Item"}
        </button>
        <div className="cancel" onClick={cancelHandler}>
          <X style={{ verticalAlign: "middle" }} />
        </div>
      </div>
    </form>
  );
};

export default ItemFrom;
