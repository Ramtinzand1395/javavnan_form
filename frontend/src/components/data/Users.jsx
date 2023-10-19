import  { useEffect, useState } from "react";
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
  const admin = localStorage.getItem("admin");
  console.log(admin)
  if (admin === null)
  return (
    <div className="text-white">شما مجوز ورود به این صفحه را ندارید.</div>
  );
  return (
    <div>
      {Users.map((user) => (
        <div className="bg-white mt-2 " key={user._id}>
          <p>_id: {user._id}</p>
          <p>name: {user.name}</p>
          <p>lastname: {user.lastname}</p>
          <p>status: {user.status}</p>
          <p>dinnerstatus: {user.dinnerstatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
