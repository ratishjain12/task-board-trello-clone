"use client";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Board() {
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => <div>{/* Render columns */}</div>}
      </Droppable>
    </DragDropContext>
  );
}
export default Board;