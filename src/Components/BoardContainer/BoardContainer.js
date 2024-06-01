import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import "./BoardContainer.css";
import { createDaoTask, deleteDaoTask } from "../../utils/fetchers";
import { useParams } from "react-router-dom";

export default function Boards({ tasks, isAdmin }) {
  const [boards, setBoards] = useState([
    { id: 1, title: "To Do", name: "todo", cards: [] },
    { id: 2, title: "In Progress", name: "in_progress", cards: [] },
    { id: 3, title: "In Review", name: "in_review", cards: [] },
    { id: 4, title: "Done", name: "complete", cards: [] },
  ]);
  const [target, setTarget] = useState({ cId: "", bId: "" });
  const authToken = localStorage.getItem("authToken");
  const { id } = useParams();

  function filterCardsByStatus(boards, status) {
    const filteredTasks = Object.entries(tasks)
      .filter(([key, value]) => value.status === status)
      .map(([key, value]) => ({ ...value }));

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.name === status ? { ...board, cards: filteredTasks } : board
      )
    );
  }

  async function createNewTask(authToken, daoId, taskData) {
    try {
      const daoTask = await createDaoTask(authToken, daoId, taskData);
      if (daoTask) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(authToken, daoId, taskId) {
    try {
      const daoTask = await deleteDaoTask(authToken, daoId, taskId);
      if (daoTask) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Card Add Function
  const addCard = (title, bId) => {
    createNewTask(authToken, id, { title });

    return;

    const index = boards.findIndex((item) => item.id === bId);
    if (index < 0) return;

    const lastCardId =
      boards[index].cards.length > 0
        ? boards[index].cards[boards[index].cards.length - 1].id
        : 0;
    const newCardId = lastCardId + 1;

    const card = {
      id: newCardId,
      title: title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  // Card Remove Function
  const removeCard = (event, cId, bId) => {
    event.stopPropagation();

    deleteTask(authToken, id, cId);

    return;

    const boardIndex = boards.findIndex((item) => item.id === bId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cId
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  // Card Drag Handler
  const handleDragEnter = (cId, bId) => {
    console.log("Drag Enter:", cId, bId);
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

    const cardIndex = tempBoards[sourceBoardIndex].cards.findIndex(
      (item) => item.id === cId
    );
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

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cId
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoards);
  };

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    filterCardsByStatus(boards, "todo");
    filterCardsByStatus(boards, "in_progress");
    filterCardsByStatus(boards, "in_review");
    filterCardsByStatus(boards, "complete");
  }, [tasks]);

  return (
    <div className="boards">
      {boards.map((item) => (
        <Board
          key={item.id}
          board={item}
          isAdmin={isAdmin}
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
