import { ShowData } from "./components";
import { HashRouter as Router, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import DeleteMe from "./components/data/DeleteMe";

const App = () => {
  return (
    <Router>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login/:userId" element={<ShowData />} />
      <Route path="/dash" element={<DeleteMe />} />
    </Router>
  );
};

export default App;
