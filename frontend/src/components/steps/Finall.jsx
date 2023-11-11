import React, { useEffect } from "react";
import { paymentresponseService } from "../../services/userService";

const Finall = ({ Authority, Status }) => {
  useEffect(() => {
    const res = async () => {
      const { data } = await paymentresponseService({ Authority, Status });
      console.log(data);
    };
    res();
  }, [Authority, Status ]);
  console.log(Authority)
  return (
    <div>
      <p className="text-white">
        {Authority}
        {Status}
      </p>
    </div>
  );
};

export default Finall;
