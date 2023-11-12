import  { useEffect, useState } from "react";
import { createQRcodeService, deleteUser, getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";

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
      <div className="text-white w-auto">شما مجوز ورود به این صفحه را ندارید.</div>
    );

    const handleDelete = async (userId) => {
    try {
      const { data } = await deleteUser(userId);
      setdeleted(data.user);
      toast.success(data.message)
    } catch (err) {
      console.log(err);
    }
  };

  const handleQRCode = async(userId) => {
      const { data: QRcode } = await createQRcodeService(userId);
      setQrcodeImg(QRcode.url);
      toast.success(QRcode.message)
  };
  return (
    <div>
      {Users.map((user) => (
        <div className="bg-white mt-2 font-vazir " key={user._id}>
          <p>_id: {user._id}</p>
          <p>نام: {user.name}</p>
          <p>شماره موبایل: {user.mobile}</p>
          <p>نام خانوادگی: {user.lastname}</p>
          <p>استاتوس ورود: {user.status}</p>
          <p>استاتوس تحویل غذا: {user.dinnerstatus}</p>
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
