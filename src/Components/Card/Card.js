import React, { useCallback, useEffect, useState } from "react";
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
import {
  emailSender,
  getDao,
  getDaoAdmin,
  getDaoUser,
  joinDao,
} from "../../utils/fetchers";

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
  userTasks,
}) {
  const { id, title, labels, date, payment } = card;
  const [showModal, setShowModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const [daoData, setDaoData] = useState({});
  const [daoAdmin, setDaoAdmin] = useState({});
  const [daoUser, setDaoUser] = useState({});
  const [isDaoUser, setIsDaoUser] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("profile"));

  async function fetchDaoUser(authToken, daoId) {
    try {
      const daoUser = await getDaoUser(authToken, daoId);

      setDaoUser(daoUser);

      // if (!daoUser) {
      //   setIsDaoUser(false);
      // } else {
      //   setIsDaoUser(true);
      // }

      if (daoUser?.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log("err");
      console.error(error);
    }
  }

  // async function fetchDaoAdmin(daoId) {
  //   try {
  //     const daoAdmin = await getDaoAdmin(daoId);

  //     setDaoAdmin(daoAdmin);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function fetchDao(id) {
    try {
      const dao = await getDao(id);
      setDaoData(dao);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchDaoAdmin(id) {
    try {
      const daoAdmin = await getDaoAdmin(id);
      setDaoAdmin(daoAdmin);
    } catch (error) {
      console.error(error);
    }
  }

  const handleTaskApply = async () => {
    try {
      if (!daoUser) {
        await joinDao(authToken, params.id);
      }

      const mailBody = `Hi, my email is ${userProfile.email_address}. I want to apply for task: "${card.title}" in DAO "${daoData.name}"`;
      applyForTask(
        daoAdmin.User.email_address,
        "Application for DAO task",
        mailBody
      );
    } catch (err) {
      console.error(err);
    }

    // setOpen(true);
  };

  const handleTaskNotify = async () => {
    try {
      const mailBody = `Hi, my email is ${userProfile.email_address}. I have completed task: "${card.title}" in DAO "${daoData.name}". My Ethereum contract address for rewards: ${userProfile.contract_address}`;
      applyForTask(
        daoAdmin.User.email_address,
        "Notification for Task completion",
        mailBody
      );
    } catch (err) {
      console.error(err);
    }

    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const applyForTask = async (email, subject, mailBody) => {
    try {
      await emailSender(authToken, email, subject, mailBody);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDao(params.id);
    fetchDaoUser(authToken, params.id);
    fetchDaoAdmin(params.id);
  }, []);

  return (
    <>
      {showModal ? (
        <Cardinfo
          updateCard={updateCard}
          boardId={boardId}
          card={card}
          daoUser={daoUser}
          onClose={() => setShowModal(false)}
        />
      ) : (
        ""
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
            <h2>{title}</h2>
            <h5 style={{ marginTop: "5px" }}>Price: ${payment}</h5>
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

        {userTasks && userTasks.includes(id) && (
          <div className="apply_task">
            <button className="apply" onClick={handleTaskNotify}>
              Notify
            </button>
          </div>
        )}

        {boardId === 1 && (
          <div className="apply_task">
            <button className="apply" onClick={handleTaskApply}>
              Apply
            </button>
          </div>
        )}
      </div>
    </>
  );
}
