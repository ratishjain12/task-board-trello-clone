import { Draggable } from "react-beautiful-dnd";

interface props {
  id: TypedColumn;
  index: number;
  todos: Todo[];
}

function Column({ id, index, todos }: props) {
  return (
    <Draggable>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        ></div>
      )}
    </Draggable>
  );
}
export default Column;
