import {
  ShowData,
} from "./components";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<ShowData />} />
    </Routes>
  );
};

export default App;
