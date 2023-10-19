import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserService } from "../../services/userService";

const AdminLogin = () => {
  const { userId } = useParams();
  const [User, setUser] = useState({});
  useEffect(() => {
    const getinfo = async () => {
      const { data } = await getUserService(userId);
      setUser(data);
    };
    getinfo();
  }, [userId]);
  if(User.isAdmin === true){
    localStorage.setItem("admin" , User.isAdmin)
  }else{
    localStorage.removeItem("admin")

  }
  if (User.isAdmin === false)
    return (
      <div className="text-white">شما مجوز ورود به این صفحه را ندارید.</div>
    );
  return <div>AdminLogin</div>;
};

export default AdminLogin;
