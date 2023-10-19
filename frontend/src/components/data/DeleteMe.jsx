import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";

const DeleteMe = () => {
  const [Users, setUsers] = useState([]);
  console.log(Users,"asd")
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    getUsers();
  }, []);
  return <div>
      hi
    {Users.map((user)=>(
      <div className="" key={user._id}>
        {user.name}
      </div>
    ))}
  </div>;
};

export default DeleteMe;
