import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../services/userService';

const Users = () => {
    const [Users, setUsers] = useState([]);
    useEffect(() => {
      const geUsers = async () => {
        const { data } = await getAllUsers();
        setUsers(data.user);
      };
      geUsers();
    }, []);
    return <div>
        hi
      {Users.map((user)=>(
        <div className="bg-white mt-2 " key={user._id}>
         status: {user.status}
         name: {user.name}
         lastname: {user.lastname}
         _id: {user._id}
         dinnerstatus: {user.dinnerstatus}
        </div>
      ))}
    </div>;
}

export default Users