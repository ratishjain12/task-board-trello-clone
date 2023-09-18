import { Draggable, Droppable } from "react-beautiful-dnd";

interface props {
  id: TypedColumn;
  index: number;
  todos: Todo[];
}

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, index, todos }: props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable
            droppableId={index.toString()}
            type="card"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`pb-2 p-2 rounded-2xl shadow-sm w-[320px] ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="text-xl flex justify-between items-center">
                  {idToColumnText[id]}
                  <span className=" text-gray-500 bg-gray-200 rounded-full px-2 text-sm font-normal">
                    {todos.length}
                  </span>
                </h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
export default Column;
