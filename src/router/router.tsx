import Login from "@/pages/login/login";
import Pessoa from "@/pages/pessoa/pessoa";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pessoa />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
