import React, { useEffect, useState } from "react";
import AllGroup from "./AllGroup";
import ListForm from "./Forms/ListFrom";
import "./Kanban.scss";

const KanbanBoard = () => {
  const [data, setData] = useState([]);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [hideAddGrp, setHideAddGrp] = useState(true);

  useEffect(() => {
    const temp = localStorage.getItem("data");
    let alldata = temp
      ? JSON.parse(temp)
      : [
          {
            title: "Todo",
            items: [
              { title: "tedf", lock: false },
              { title: "helo\n", lock: true },
              { title: "kj", lock: false },
              { title: "kill", lock: false },
            ],
          },
          { title: "In progress", items: [{ title: "afd", lock: false }] },
          {
            title: "In Review",
            items: [
              { title: "frfr", lock: false },
              { title: "nmbn", lock: false },
            ],
          },
          { title: "Complete", items: [{ title: "mki", lock: false }] },
        ];
    if (alldata) {
      setData([...alldata]);
    }
  }, []);

  const addTitleHandler = (title) => {
    let newData = [...data, { title: title, items: [] }];
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  return (
    <div className="kanban-board">
      {data.length <= 0 && !isAddGroup ? (
        <div className="add-list" onClick={() => setIsAddGroup(true)}>
          + Add a list
        </div>
      ) : (
        <>
          <AllGroup data={data} setData={setData} />
          {/* {(isAddGroup || hideAddGrp) && (
            <div className="dnd-group">
              <ListForm
                inputType="addList"
                addTitleHandler={addTitleHandler}
                setHideAddGrp={setHideAddGrp}
                setIsAddGroup={setIsAddGroup}
              />
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default KanbanBoard;
