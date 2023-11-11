import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Finall, ShowData } from "./components";
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
      <Route path="/finall/:Authority/:Status" element={<Finall />} />
    </Routes>
  );
};

export default App;
