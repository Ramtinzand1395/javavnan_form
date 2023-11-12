import React, { useEffect, useState } from "react";
import {
  createQRcodeService,
  paymentresponseService,
} from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Finall = ({ Authority, Status }) => {
  const [PayStatus, setPayStatus] = useState("");
  const [QrcodeImg, setQrcodeImg] = useState("");
  const [Isvalid, setIsvalid] = useState(false);
  const UserId = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data, status } = await paymentresponseService({
          query: { Authority, Status },
        });
        if (status === 200) {
          setIsvalid(true);
          const getinfo = async () => {
            const { data: QRcode } = await createQRcodeService(UserId);
            setQrcodeImg(QRcode.url);
          };
          getinfo();
          setPayStatus(data);
        }
      } catch (err) {
        console.log(err);
        setIsvalid(false);
        setPayStatus(err.response.data);
      }
    };
    getdata();
  }, [Authority, Status, UserId]);

  const handleback = () => {
    navigate("/");
  };
  return (
    <div>
      <p className="text-white">
        <p className="text-white bg-red-500 p-3">{PayStatus}</p>
        {Isvalid ? (
          <>
            <p>از کد زیر عکس بگیرید بلیط ورود و شام شما این میباشد.</p>
            QrcodeImg ?
            <img src={QrcodeImg} alt="QrcodeImg" />:
            <p>در حال ساخت بلیط منتظر بمانید.</p>
          </>
        ) : (
          <p>
            {" "}
            برای ثبت نام و دسترسی به qrcode عملیات ثبت نام را دوباره انجام دهید.{" "}
          </p>
        )}
        <button className="px-1 py-4 bg-green-500" onClick={() => handleback()}>
          بازگشت به صفحه اصلی
        </button>
      </p>
    </div>
  );
};

export default Finall;
