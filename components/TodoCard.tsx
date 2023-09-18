import { XCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  title: String;
  status: String;
};

function TodoCard({ title, status }: Props) {
  return (
    <div className="bg-white rounded-lg p-2 drop-shadow-md flex items-center justify-between">
      {title.toUpperCase()}
      <button className="text-red-500 hover:text-red-600">
        <XCircleIcon className="h-10 w-6" />
      </button>
    </div>
  );
}
export default TodoCard;
