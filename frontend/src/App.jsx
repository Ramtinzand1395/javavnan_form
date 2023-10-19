import {
  ShowData,
} from "./components";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import DeleteMe from "./components/data/DeleteMe";
import AdminLogin from "./components/admin/AdminLogin";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/admin/get-users" element={<DeleteMe />} />
      <Route path="/login/:userId" element={<ShowData />} />
      <Route path="/dash" element={<DeleteMe />} />
      <Route path="/admin-login" element={<AdminLogin />} />

    </Routes>
  );
};

export default App;
