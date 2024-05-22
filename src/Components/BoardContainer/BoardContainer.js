import React, { useEffect, useState } from 'react';
import Board from '../Board/Board';
import './BoardContainer.css';

export default function Boards() {
  const [boards, setBoards] = useState([
    { id: 1, title: 'To Do', cards: [] },
    { id: 2, title: 'In Progress', cards: [] },
    { id: 3, title: 'In Review', cards: [] },
    { id: 4, title: 'Done', cards: [] },
  ]);

  const [target, setTarget] = useState({ cId: '', bId: '' });

  // Card Add Function
  const addCard = (title, bId) => {
    const index = boards.findIndex((item) => item.id === bId);
    if (index < 0) return;

    const lastCardId = boards[index].cards.length > 0 ? boards[index].cards[boards[index].cards.length - 1].id : 0;
    const newCardId = lastCardId + 1;

    const card = {
      id: newCardId,
      title: title,
      labels: [],
      tasks: [],
      date: '',
      desc: '',
    };

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  // Card Remove Function
  const removeCard = (cId, bId) => {
    const boardIndex = boards.findIndex((item) => item.id === bId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cId);
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  // Card Drag Handler
  const handleDragEnter = (cId, bId) => {
    console.log('Drag Enter:', cId, bId);
    setTarget((prevTarget) => ({
      ...prevTarget,
      bId: bId,
    }));
  };
  const handleDragEnd = (cId, bId) => {
    const sourceBoardIndex = boards.findIndex((item) => item.id === bId);

    const targetBoardIndex = boards.findIndex((item) => {
      return item.id === target.bId;
    });
    console.log(sourceBoardIndex, targetBoardIndex);

    if (sourceBoardIndex < 0 || targetBoardIndex < 0) return;

    const tempBoards = [...boards];

    const cardIndex = tempBoards[sourceBoardIndex].cards.findIndex((item) => item.id === cId);
    console.log(cardIndex);

    if (cardIndex < 0) return;

    const tempCard = tempBoards[sourceBoardIndex].cards[cardIndex];

    tempBoards[sourceBoardIndex].cards.splice(cardIndex, 1);
    tempBoards[targetBoardIndex].cards.unshift(tempCard);

    setBoards(tempBoards);
  };

  // Card Update function
  const updateCard = (cId, bId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === bId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex((item) => item.id === cId);
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoards);
  };

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="boards">
      {boards.map((item) => (
        <Board
          key={item.id}
          board={item}
          addCard={addCard}
          removeCard={removeCard}
          dragEntered={handleDragEnter}
          dragEnded={handleDragEnd}
          updateCard={updateCard}
        />
      ))}
    </div>
  );
}
