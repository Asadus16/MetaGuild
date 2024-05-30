import React, { useEffect, useState } from "react";
import { CheckSquare, Clock, X } from "react-feather";
import Labels from "../Labels/Labels";
import "./Card.css";
import Cardinfo from "./Cardinfo/Cardinfo";

export default function Card({
  card,
  removeCard,
  dragEnded,
  dragEntered,
  dragOver,
  boardId,
  updateCard,
  isDropTarget,
  onDropCard,
}) {
  const { id, title, labels, date } = card;
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      {showModal && (
        <Cardinfo
          updateCard={updateCard}
          boardId={boardId}
          card={card}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="apply_flex">
        <div
          className={`card ${isDropTarget ? "drop-above" : "drop-below"}`}
          draggable
          onDragEnd={() => dragEnded(id, boardId)}
          onDragEnter={() => dragEntered(id, boardId)}
          onDragOver={dragOver}
          onClick={() => setShowModal(true)}
        >
          <div className="card_top">
            <div className="card_labels">
              {labels?.map((item, index) => (
                <Labels key={index} text={item.text} color={item.color} />
              ))}
            </div>

            <div className="card_delete">
              <X onClick={(e) => removeCard(id, boardId)} />
            </div>
          </div>

          <div className="card_title">
            <h3>{title}</h3>
          </div>

          <div className="card_footer">
            {date && (
              <p>
                <Clock /> {date}
              </p>
            )}
            {card?.tasks?.length > 0 && (
              <p>
                <CheckSquare />
                {card?.tasks?.filter((item) => item.completed).length}/
                {card?.tasks?.length}
              </p>
            )}
          </div>
        </div>

        <div className="apply_task">
          <button className="apply">Apply</button>
        </div>
      </div>
    </>
  );
}
