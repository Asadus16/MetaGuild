import React, { useEffect, useState } from "react";
import { CheckSquare, Clock, X } from "react-feather";
import Labels from "../Labels/Labels";
import "./Card.css";
import Cardinfo from "./Cardinfo/Cardinfo";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useParams } from "react-router-dom";
import { getDao, getDaoAdmin, getDaoUser } from "../../utils/fetchers";

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
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const [daoData, setDaoData] = useState({});
  const [daoAdmin, setDaoAdmin] = useState({});
  const authToken = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);

  async function fetchDaoUser(authToken, daoId) {
    try {
      const daoUser = await getDaoUser(authToken, daoId);
      if (daoUser.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDaoAdmin(daoId) {
    try {
      const daoAdmin = await getDaoAdmin(daoId);

      setDaoAdmin(daoAdmin);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDao(id) {
    try {
      const dao = await getDao(id);
      setDaoData(dao);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyForTask = async (email, subject, mailBody) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sendmail`,
        {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ recipient: email, subject, body: mailBody }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        console.error("Failed to create DAO");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchDao(params.id);
    fetchDaoUser(authToken, id);
    fetchDaoAdmin(params.id);
  }, []);

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
              <X onClick={(e) => removeCard(e, id, boardId)} />
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

        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              const mailBody = `Hi, my email is ${email}. I want to apply for task: "${card.title}" in DAO "${daoData.name}"`;
              applyForTask(email, "Application for DAO task", mailBody);
              handleClose();
            },
          }}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To apply for this task, please enter your email address here. You
              will be added to it by Admin.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Apply</Button>
          </DialogActions>
        </Dialog>

        {boardId === 1 && (
          <div className="apply_task">
            <button className="apply" onClick={handleClickOpen}>
              Apply
            </button>
          </div>
        )}
      </div>
    </>
  );
}
