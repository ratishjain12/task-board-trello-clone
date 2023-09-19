"use client";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { useBoardStore } from "@/store/BoardStore";
import Column from "./Column";
function Board() {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);
  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    //handling column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedCol = new Map(entries);
      setBoardState({
        ...board,
        columns: rearrangedCol,
      });
    } else {
      //handle card
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const endColIndex = columns[Number(destination.droppableId)];

      const startCol: Column = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };
      const endCol: Column = {
        id: endColIndex[0],
        todos: endColIndex[1].todos,
      };

      if (!startCol || !endCol) return;

      if (source.index === destination.index && startCol === endCol) return;

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 0);
      if (startCol.id === endCol.id) {
        // same col drag
        newTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({ ...board, columns: newColumns });
      } else {
        //drag to another column
        const finishTodos = Array.from(endCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);
        newColumns.set(endCol.id, {
          id: endCol.id,
          todos: finishTodos,
        });

        setBoardState({ ...board, columns: newColumns });
      }
    }
  };
  return (
    <div className=" w-[100%] flex  justify-center items-center ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" type="column" direction="horizontal">
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
