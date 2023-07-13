import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

export default function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const [parent2, setParent2] = useState(null);

  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
  const draggableMarkup2 = <Draggable id="draggable2">Drag me 2</Draggable>;

  const Tmp = ({ id }) => {
    if (parent === id && parent2 === id) {
      return (
        <>
          {draggableMarkup}
          {draggableMarkup2}
        </>
      );
    } else if (parent === id) {
      return draggableMarkup;
    } else if (parent2 === id) {
      return draggableMarkup2;
    } else {
      return `Droppable: ${id}`;
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}
      {parent2 === null ? draggableMarkup2 : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          <Tmp id={id} />
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log(event);
    const { over, active } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    if (active.id === "draggable") {
      setParent(over ? over.id : null);
    } else {
      setParent2(over ? over.id : null);
    }
  }
}
