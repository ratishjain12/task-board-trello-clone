import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

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
                <div className="mt-4">
                  {todos.map((todo) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TodoCard title={todo.title} status={todo.status} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <div className="flex justify-end items-end p-2">
                  <button className="text-green-500 hover:text-green-600">
                    <PlusCircleIcon className="h-10 w-6 " />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
export default Column;
