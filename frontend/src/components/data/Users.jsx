import  { useEffect, useState } from "react";
import { createQRcodeService, deleteUser, getAllUsers } from "../../services/userService";

const Users = () => {
  
  const [Users, setUsers] = useState([]);
  const [deleted, setdeleted] = useState(false);
  const [QrcodeImg, setQrcodeImg] = useState("");

  useEffect(() => {
    const geUsers = async () => {
      const { data } = await getAllUsers();
      setUsers(data.user);
    };
    geUsers();
  }, [deleted , QrcodeImg]);
  const admin = localStorage.getItem("admin");

  if (admin === null)
    return (
      <div className="text-white">شما مجوز ورود به این صفحه را ندارید.</div>
    );
console.log(Users)
  const handleDelete = async (userId) => {
    try {
      const { data } = await deleteUser(userId);
      setdeleted(data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleQRCode = async(userId) => {
      const { data: QRcode } = await createQRcodeService(userId);
      setQrcodeImg(QRcode.url);
  };
  return (
    <div>
      {Users.map((user) => (
        <div className="bg-white mt-2 " key={user._id}>
          <p>_id: {user._id}</p>
          <p>name: {user.name}</p>
          <p>lastname: {user.lastname}</p>
          <p>status: {user.status}</p>
          <p>dinnerstatus: {user.dinnerstatus}</p>
          <button
            onClick={() => handleDelete(user._id)}
            className="bg-red-500 rounded-lg px-4 py-1"
          >
            حذف کاربر
          </button>
          <button
            onClick={() => handleQRCode(user._id)}
            className="bg-red-500 rounded-lg px-4 py-1"
          >
            ساخت QR Code
          </button>
          <img src={user.QRCode} alt="QrcodeImg" />
        </div>
      ))}
    </div>
  );
};

export default Users;
