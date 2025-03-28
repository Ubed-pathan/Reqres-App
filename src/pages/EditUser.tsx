import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { User } from "../types";
import { updateUser } from "../api";



function EditUser({ user, onClose, onUpdate }: { user: User; onClose: () => void; onUpdate: (user: User) => void }) {
  const [editData, setEditData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateUser(user.id.toString(), editData);
      if (response.status === 200) {
        toast.success("✅ User updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
        onUpdate({ ...user, ...editData });
        onClose();
      } else {
        toast.error("❌ Update failed!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("❌ Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-bg-300 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>

        <div className="flex justify-center mb-4">
          <img
            src={user.avatar}
            alt="User"
            className="w-20 h-20 rounded-full border border-gray-300"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-100 flex justify-start">First Name</label>
            <input
              type="text"
              name="first_name"
              value={editData.first_name}
              onChange={handleChange}
              className="w-full border border-black p-2 rounded bg-bg-300 focus:outline-none"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-100 flex justify-start">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={editData.last_name}
              onChange={handleChange}
              className="w-full border border-black p-2 rounded bg-bg-300 focus:outline-none"
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-text-100 flex justify-start">Email</label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="w-full border border-black p-2 rounded bg-bg-300 focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500  duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-accent-200 duration-300"
            >
              {loading ? (
                <AiOutlineLoading3Quarters size={20} className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
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
}

export default EditUser;
