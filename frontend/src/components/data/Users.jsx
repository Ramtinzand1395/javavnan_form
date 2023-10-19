import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/userService';

const Users = () => {
    const [Users, setUsers] = useState([]);
    console.log(Users,"asd")
    useEffect(() => {
      const geUsers = async () => {
        const { data } = await getAllUsers();
        console.log(data)
        setUsers(data.user);
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
          {user.lastname}
          {user._id}
          {user.status}
          {user.dinnerstatus}
        </div>
      ))}
    </div>;
}

export default Users