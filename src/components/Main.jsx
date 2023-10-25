import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummyData from "../dummyData";
import Card from "./Card";

export const Main = () => {
  const [data, setData] = useState(dummyData);
  const todoNameRef = useRef();
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      //別のカラムにタスクが移動したとき
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks]

      //動かし始めたタスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      //動かした後のカラムにタスクを追加
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;
      setData(data);

    } else {
      //同じカラム内でのタスクの移動
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId)
      const sourceCol = data[sourceColIndex];

      const sourceTask = [...sourceCol.tasks];
      //タスクを削除
      const [removed] = sourceTask.splice(source.index, 1);
      //タスクを追加
      sourceTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      setData(data);
    }
  }

  const handleAddTodo = () => {
    console.log("🚀 ~ file: Main.jsx:64 ~ Main ~ todoNameRef.current.value:", todoNameRef.current.value)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div class="trello">
        {data.map((section) => (
          <>
            {/* {console.log("🚀 ~ file: Main.jsx:56 ~ Main ~ section:", section)} */}
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <div className="trello-section" ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="trello-section-title">{section.title}</div>
                  <input type="text" id={section.title} ref={todoNameRef} />
                  <button onClick={handleAddTodo}>タスクを追加</button>
                  <div class="trello-section-content">
                    {section.tasks.map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? "0.3" : "1",
                            }}
                          >
                            <Card>{task.title}</Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </>
        ))}
      </div>
    </DragDropContext>
  );
};


export default Main;
