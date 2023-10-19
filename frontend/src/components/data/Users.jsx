import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

const Users = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const geUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data.user);
    };
    geUsers();
  }, []);
  return (
    <div>
      hi
      {Users.map((user) => (
        <div className="bg-white mt-2 " key={user._id}>
          <p>_id: {user._id}</p>
          <p>status: {user.status}</p>
          <p>name: {user.name}</p>
          <p>lastname: {user.lastname}</p>
          <p>dinnerstatus: {user.dinnerstatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
