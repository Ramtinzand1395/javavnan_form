import React, { useEffect } from "react";

const DeleteMe = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data);
    };
    getAllUsers();
  }, []);
  return <div>
    {Users.map((user)=>(
      <div className="" key={user._id}>
        {user.name}
      </div>
    ))}
  </div>;
};

export default DeleteMe;
