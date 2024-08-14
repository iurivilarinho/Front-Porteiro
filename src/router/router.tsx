import Login from "@/pages/login/login";
import { ListaPessoa } from "@/pages/pessoa/components/pessoaLista";
import Pessoa from "@/pages/pessoa/pessoa";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pessoa />} />
        <Route path="/login" element={<Login />} />
        <Route path="/table" element={<ListaPessoa />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
