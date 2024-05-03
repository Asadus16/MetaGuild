import React, { useState, useRef } from "react";
import { IList } from "./KanbanBoard";
import ItemFrom from "./Forms/ItemFrom";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import ListItem from "./ListItem";

const AllGroup = ({ data, setData }) => {
  const [dragging, setDragging] = useState(false);
  const [editItemIdx, setEditItemidx] = useState(null);
  const [editGroupIdx, setEditGroupidx] = useState(null);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handlerDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      let newList = data;
      newList[params.grpIndex].items.splice(
        params.itemIndex,
        0,
        newList[currentItem.grpIndex].items.splice(currentItem.itemIndex, 1)[0]
      );
      dragItem.current = params;
      setData([...newList]);
      localStorage.setItem("data", JSON.stringify(newList));
    }
  };

  const handlerDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handlerDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyle = (params) => {
    const currentItem = dragItem.current;
    if (
      currentItem.grpIndex === params.grpIndex &&
      currentItem.itemIndex === params.itemIndex
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  const lockCardHandler = (grpIndex, itemIndex) => {
    let newData = data;
    if (newData[grpIndex].items[itemIndex].lock === true) {
      newData[grpIndex].items[itemIndex].lock = false;
    } else {
      newData[grpIndex].items[itemIndex].lock = true;
    }
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const deleteCardHandler = (grpIndex, itemIndex) => {
    let newData = data;
    newData[grpIndex].items.splice(itemIndex, 1);
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
  };

  const isUpdateCardItemHandler = (e, grpIdx, itemIdx) => {
    if (e.detail === 2) {
      setEditGroupidx(+grpIdx);
      setEditItemidx(+itemIdx);
    }
  };

  const updateCardItemHandler = (title) => {
    let newData = data;
    if (editGroupIdx !== null && editItemIdx !== null) {
      newData[editGroupIdx].items[editItemIdx].title = title;
    }
    setData([...newData]);
    localStorage.setItem("data", JSON.stringify(newData));
    setEditGroupidx(null);
    setEditItemidx(null);
  };

  const cancelEditItemHandler = () => {
    setEditGroupidx(null);
    setEditItemidx(null);
  };

  return (
    <>
      <div
        className="dnd-group"
        onDragEnter={
          dragging && !data[0].items.length
            ? (e) => handleDragEnter(e, { grpIndex: 0, itemIndex: 0 })
            : undefined
        }
      >
        <ListHeader grp={data[0]} grpIndex={0} data={data} setData={setData} />
        <ul>
          {data[0].items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {editGroupIdx === 0 && editItemIdx === itemIndex ? (
                <ItemFrom
                  type="editItem"
                  updateCardItemHandler={updateCardItemHandler}
                  cancelEditItemHandler={cancelEditItemHandler}
                  item={item}
                />
              ) : (
                <li
                  draggable={true}
                  // draggable={!item.lock}
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIndex: 0, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => handleDragEnter(e, { grpIndex: 0, itemIndex })
                      : undefined
                  }
                  className={
                    dragging ? getStyle({ grpIndex: 0, itemIndex }) : "dnd-item"
                  }
                >
                  <ListItem
                    item={item}
                    itemIndex={itemIndex}
                    grpIndex={0}
                    lockCardHandler={lockCardHandler}
                    deleteCardHandler={deleteCardHandler}
                    isUpdateCardItemHandler={isUpdateCardItemHandler}
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        <ListFooter grpIndex={0} data={data} setData={setData} />
      </div>

      <div
        className="dnd-group"
        onDragEnter={
          dragging && !data[1].items.length
            ? (e) => handleDragEnter(e, { grpIndex: 1, itemIndex: 0 })
            : undefined
        }
      >
        <ListHeader grp={data[1]} grpIndex={1} data={data} setData={setData} />
        <ul>
          {data[1].items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {editGroupIdx === 1 && editItemIdx === itemIndex ? (
                <ItemFrom
                  type="editItem"
                  updateCardItemHandler={updateCardItemHandler}
                  cancelEditItemHandler={cancelEditItemHandler}
                  item={item}
                />
              ) : (
                <li
                  draggable={true}
                  // draggable={!item.lock}
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIndex: 1, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => handleDragEnter(e, { grpIndex: 1, itemIndex })
                      : undefined
                  }
                  className={
                    dragging ? getStyle({ grpIndex: 1, itemIndex }) : "dnd-item"
                  }
                >
                  <ListItem
                    item={item}
                    itemIndex={itemIndex}
                    grpIndex={1}
                    lockCardHandler={lockCardHandler}
                    deleteCardHandler={deleteCardHandler}
                    isUpdateCardItemHandler={isUpdateCardItemHandler}
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        <ListFooter grpIndex={1} data={data} setData={setData} />
      </div>

      <div
        className="dnd-group"
        onDragEnter={
          dragging && !data[2].items.length
            ? (e) => handleDragEnter(e, { grpIndex: 2, itemIndex: 0 })
            : undefined
        }
      >
        <ListHeader grp={data[2]} grpIndex={2} data={data} setData={setData} />
        <ul>
          {data[2].items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {editGroupIdx === 2 && editItemIdx === itemIndex ? (
                <ItemFrom
                  type="editItem"
                  updateCardItemHandler={updateCardItemHandler}
                  cancelEditItemHandler={cancelEditItemHandler}
                  item={item}
                />
              ) : (
                <li
                  draggable={true}
                  // draggable={!item.lock}
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIndex: 2, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => handleDragEnter(e, { grpIndex: 2, itemIndex })
                      : undefined
                  }
                  className={
                    dragging ? getStyle({ grpIndex: 2, itemIndex }) : "dnd-item"
                  }
                >
                  <ListItem
                    item={item}
                    itemIndex={itemIndex}
                    grpIndex={2}
                    lockCardHandler={lockCardHandler}
                    deleteCardHandler={deleteCardHandler}
                    isUpdateCardItemHandler={isUpdateCardItemHandler}
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        <ListFooter grpIndex={0} data={data} setData={setData} />
      </div>

      <div
        className="dnd-group"
        onDragEnter={
          dragging && !data[3].items.length
            ? (e) => handleDragEnter(e, { grpIndex: 3, itemIndex: 0 })
            : undefined
        }
      >
        <ListHeader grp={data[3]} grpIndex={3} data={data} setData={setData} />
        <ul>
          {data[3].items.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              {editGroupIdx === 3 && editItemIdx === itemIndex ? (
                <ItemFrom
                  type="editItem"
                  updateCardItemHandler={updateCardItemHandler}
                  cancelEditItemHandler={cancelEditItemHandler}
                  item={item}
                />
              ) : (
                <li
                  draggable={true}
                  // draggable={!item.lock}
                  onDragStart={(e) =>
                    handleDragStart(e, { grpIndex: 3, itemIndex })
                  }
                  onDragEnter={
                    dragging
                      ? (e) => handleDragEnter(e, { grpIndex: 3, itemIndex })
                      : undefined
                  }
                  className={
                    dragging ? getStyle({ grpIndex: 3, itemIndex }) : "dnd-item"
                  }
                >
                  <ListItem
                    item={item}
                    itemIndex={itemIndex}
                    grpIndex={3}
                    lockCardHandler={lockCardHandler}
                    deleteCardHandler={deleteCardHandler}
                    isUpdateCardItemHandler={isUpdateCardItemHandler}
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>

        <ListFooter grpIndex={3} data={data} setData={setData} />
      </div>
      {/* {data &&
        data.map((grp, grpIndex) => (
          <div
            className="dnd-group"
            key={grpIndex}
            onDragEnter={
              dragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpIndex, itemIndex: 0 })
                : undefined
            }
          >
            <ListHeader
              grp={grp}
              grpIndex={grpIndex}
              data={data}
              setData={setData}
            />
            <ul>
              {grp.items.map((item, itemIndex) => (
                <React.Fragment key={itemIndex}>
                  {editGroupIdx === grpIndex && editItemIdx === itemIndex ? (
                    <ItemFrom
                      type="editItem"
                      updateCardItemHandler={updateCardItemHandler}
                      cancelEditItemHandler={cancelEditItemHandler}
                      item={item}
                    />
                  ) : (
                    <li
                      draggable={true}
                      // draggable={!item.lock}
                      onDragStart={(e) =>
                        handleDragStart(e, { grpIndex, itemIndex })
                      }
                      onDragEnter={
                        dragging
                          ? (e) => handleDragEnter(e, { grpIndex, itemIndex })
                          : undefined
                      }
                      className={
                        dragging
                          ? getStyle({ grpIndex, itemIndex })
                          : "dnd-item"
                      }
                    >
                      <ListItem
                        item={item}
                        itemIndex={itemIndex}
                        grpIndex={grpIndex}
                        lockCardHandler={lockCardHandler}
                        deleteCardHandler={deleteCardHandler}
                        isUpdateCardItemHandler={isUpdateCardItemHandler}
                      />
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>

            <ListFooter grpIndex={grpIndex} data={data} setData={setData} />
          </div>
        ))} */}
    </>
  );
};

export default AllGroup;
