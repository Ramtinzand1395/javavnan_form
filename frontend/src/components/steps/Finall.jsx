import React, { useEffect, useState } from "react";
import { paymentresponseService } from "../../services/userService";

const Finall = ({ Authority, Status }) => {
  const [PayStatus, setPayStatus] = useState("");
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data , status } = await paymentresponseService({
          query: { Authority, Status },
        });
        if(status === 200){
          setPayStatus("ok")
        }
      } catch (err) {
        console.log(err);
        setPayStatus("Nok");
      }
    };
    getdata();
  }, [Authority, Status]);

  return (
    <div>
      <p className="text-white">
        {PayStatus}
      </p>
    </div>
  );
};

export default Finall;
