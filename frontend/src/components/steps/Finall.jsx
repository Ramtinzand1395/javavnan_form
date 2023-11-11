import React, { useEffect, useState } from "react";
import { paymentresponseService } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const Finall = ({ Authority, Status }) => {
  const [PayStatus, setPayStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data, status } = await paymentresponseService({
          query: { Authority, Status },
        });
        if (status === 200) {
          setPayStatus(data);
        }
      } catch (err) {
        console.log(err);
        setPayStatus(err.response.data);
      }
    };
    getdata();
  }, [Authority, Status]);

  const handleback = () => {
    navigate("/");
  };
  return (
    <div>
      <p className="text-white">
        <p className="text-white bg-red-500 p-3">

        {PayStatus}
        </p>
        <button className="px-1 py-4 bg-green-500" onClick={() => handleback()}>
          بازگشت به صفحه اصلی
        </button>
      </p>
    </div>
  );
};

export default Finall;
