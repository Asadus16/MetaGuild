import React from "react";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import "./Board.css";

export default function Board({
  board,
  removeBoard,
  isAdmin,
  addCard,
  removeCard,
  dragEntered,
  dragOver,
  dragEnded,
  updateCard,
  isDropTarget,
  onDropCard,
}) {
  const { id, title, background, cards } = board;

  return (
    <div className="board">
      <div className="board_top" style={{ background: background }}>
        <p className="board_top_title">
          {title}
          <span>( {`${cards?.length}`} )</span>
        </p>
      </div>
      <div className="board_cards">
        {cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={removeCard}
            boardId={id}
            dragEntered={dragEntered}
            dragOver={dragOver}
            dragEnded={dragEnded}
            updateCard={updateCard}
            isDropTarget={isDropTarget}
            onDropCard={onDropCard}
          />
        ))}

        {id === 1 && isAdmin && (
          <Editable
            displayClass="boards_cards_add"
            defaultValue="New Task"
            text="Add Task"
            placeholder="Enter Card title"
            onSubmit={(value) => addCard(value, id)}
          />
        )}
      </div>
    </div>
  );
}
