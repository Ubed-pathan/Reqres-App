import { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import { User } from "../types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EditUser from "./EditUser";
import { deleteUser } from "../api";
import { toast, ToastContainer, Bounce } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingForDelete, setLoadingForDelete] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API}/users?page=${currentPage}`
        );
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  async function handleDelete(userId: string) {
    setLoadingForDelete((prev) => ({ ...prev, [userId]: true })); 

    try {
      const response = await deleteUser(userId);
      if (response.status === 204) {
        toast.success("✅ User deleted successfully!", {
          position: "top-center",
          autoClose: 1000,
          theme: "dark",
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== Number(userId)));
      } else {
        toast.error("❌ Deletion failed!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("❌ Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }

    setLoadingForDelete((prev) => ({ ...prev, [userId]: false }));
  }

  return (
    <div className="bg-bg-100 min-h-screen p-10 text-center">
      <h1 className="text-2xl font-bold text-text-100 mb-6">All Users</h1>

      {loading ? (
        <div className="flex justify-center">
          <AiOutlineLoading3Quarters
            size={25}
            className="text-accent-100 animate-spin"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-6 justify-center">
            {users.length === 0 && (
              <p className="text-text-200">No users found.</p>
            )}

            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={() => setSelectedUser(user)}
                onDelete={() => handleDelete(user.id.toString())}
                isLoading={loadingForDelete[user.id] || false}
              />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevPage}
              className="bg-accent-200 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              className="bg-accent-200 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedUser && (
        <EditUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={(updatedUser) => {
            setUsers(
              users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            setSelectedUser(null);
          }}
        />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        aria-label={undefined}
      />
    </div>
  );
};

export default UserList;
