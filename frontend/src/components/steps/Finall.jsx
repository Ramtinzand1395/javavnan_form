import React, { useEffect } from "react";
import { paymentresponseService } from "../../services/userService";

const Finall = ({ Authority, Status }) => {
  useEffect(() => {
    const getdata = async () => {
      const { data } = await paymentresponseService({ query: { Authority, Status } });
      console.log(data);
    };
    getdata();
  }, [Authority, Status ]);

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
