import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Finall, ShowData } from "./components";
import RegisterForm from "./components/RegisterForm";
import AdminLogin from "./components/admin/AdminLogin";
import Users from "./components/data/Users";

const App = () => {
  const [Authority, setAuthority] = useState("");
  const [Status, setStatus] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Accessing the current URL
    const url = new URL(window.location.href);

    // Extracting parameters from the URL
    const authority = url.searchParams.get("Authority");
    const status = url.searchParams.get("Status");

    // Now, you can use `authority` and `status` as needed
    setAuthority(authority);
    setStatus(status);
    // Redirect to "/Authority" if Params exist
    if (authority !== null) {
      navigate("/finall");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login/:userId" element={<ShowData />} />
      <Route path="/admin-login/:userId" element={<AdminLogin />} />
      <Route path="/admin/get-users" element={<Users />} />
      <Route
        path="/finall"
        element={<Finall Authority={Authority} Status={Status} />}
      />
    </Routes>
  );
};

export default App;
