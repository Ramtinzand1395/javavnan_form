import { ShowData } from "./components";
import {HashRouter as Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import DeleteMe from "./components/data/DeleteMe";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login/:userId" element={<ShowData />} />
      <Route path="/dash" element={<DeleteMe />} />
    </Routes>
  );
};

export default App;
