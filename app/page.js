"use client";
import { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./bata";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", number: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await createUser(newUser);
    setNewUser({ name: "", email: "", number: "" });
    fetchUsers();
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      setIsModalOpen(false);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="max-w-[1320px] mx-auto p-3 2xl:px-0">
      <h1 className="text-3xl font-bold mb-8 text-center">User List: ({users.length})</h1>
      <div className="mb-8 max-w-[600px] mx-auto">
        <form onSubmit={handleCreateUser} className="flex flex-col gap-3 border p-6 rounded-lg">
          <input type="text" placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          <input type="number" placeholder="Number" value={newUser.number} onChange={(e) => setNewUser({ ...newUser, number: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
          <button type="submit" className="bg-blue-500 text-white rounded-lg px-3 py-2">Submit</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((user) => (
          <div key={user.id} className="border rounded-xl p-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500 text-lg font-medium">{user.email}</p>
              <span className="text-gray-500 text-lg font-medium">{user.number}</span>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => handleEditUser(user)} className="border border-green-500 rounded-md py-2 px-3">Update</button>
              <button onClick={() => handleDeleteUser(user.id)} className="border border-red-500 rounded-md py-2 px-3">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleUpdateUser} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
              <input type="email" placeholder="Email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
              <input type="number" placeholder="Number" value={editingUser.number} onChange={(e) => setEditingUser({ ...editingUser, number: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="border border-gray-500 rounded-md px-3 py-2">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white rounded-md px-3 py-2">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}