import { Pencil, Trash } from "lucide-react";
import { User } from "../types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserCard = ({ user, onEdit, onDelete, isLoading }: { user: User; onEdit: (user: User) => void; onDelete: (id: number) => void; isLoading: boolean }) => {
  return (
    <div className="bg-bg-300 p-5 rounded-xl shadow-md border border-accent-200 hover:shadow-lg transition-all duration-300 w-64 text-center">
      <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto shadow-md border-4 border-primary-100" />
      <h2 className="text-lg font-semibold mt-3 text-text-100">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-text-200 text-sm">{user.email}</p>
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-accent-100 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-accent-200 transition" onClick={() => onEdit(user)}>
          <Pencil size={16} /> Edit
        </button>
        <button
          className="bg-primary-300 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-text-200 transition relative"
          onClick={() => onDelete(user.id)}
          disabled={isLoading}
        >
          {isLoading ? <AiOutlineLoading3Quarters size={16} className="animate-spin" /> : <Trash size={16} />}
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
