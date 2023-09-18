"use client";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";
function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {};
  return (
    <div className=" w-[100%] flex  justify-center items-center ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className=" flex-wrap sm:flex sm:flex-col sm:justify-center md:flex-row  md:justify-stretch gap-5 space-y-2 sm:space-y-0 p-6 md:ml-24 lg:ml-0"
            >
              {Array.from(board.columns.entries()).map(
                ([id, column], index) => {
                  return (
                    <Column
                      key={id}
                      id={id}
                      todos={column.todos}
                      index={index}
                    />
                  );
                }
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default Board;
