import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/userService';

const Users = () => {
    const [Users, setUsers] = useState([]);
    console.log(Users,"asd")
    useEffect(() => {
      const geUsers = async () => {
        const { data } = await getAllUsers();
        setUsers(data);
      };
      geUsers();
    }, []);
    console.log("first")
    console.log(Users);
    return <div>
        hi
      {Users.map((user)=>(
        <div className="" key={user._id}>
          {user.name}
        </div>
      ))}
    </div>;
}

export default Users