import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../context/StepperContext";
import { createQRcodeService } from "../../services/userService";
import { Link } from "react-router-dom";

const Finall = () => {
  const { UserId } = useContext(StepperContext);

  const [QrcodeImg, setQrcodeImg] = useState("");
  useEffect(() => {
    const getinfo = async () => {
      const { data: QRcode } = await createQRcodeService(UserId);
      setQrcodeImg(QRcode.url);
    };
    getinfo();
  }, [UserId]);
  return <div>
          <Link to={`/login/${UserId}`}>ورود</Link>

    <img src={QrcodeImg} alt="QrcodeImg" />
  </div>;
};

export default Finall;
