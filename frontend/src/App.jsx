import {
  ShowData,
} from "./components";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import AdminLogin from "./components/admin/AdminLogin";
import Users from "./components/data/Users";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login/:userId" element={<ShowData />} />
      <Route path="/admin-login/:userId" element={<AdminLogin />} />
      <Route path="/admin/get-users" element={<Users />} />

    </Routes>
  );
};

export default App;
