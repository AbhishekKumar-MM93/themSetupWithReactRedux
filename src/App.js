import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Components/Pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Components/Pages/Dashboard";
import Layout from "./Components/Layout/Layout";
import User from "./Components/Pages/User/User";
import Page404 from "./Components/Pages/Page404";
import ProductTable from "./Components/Pages/Products/ProductTable";
import { useEffect, useState } from "react";
import Chat from "./Components/Pages/Chat/Chat";

function App() {
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Info = JSON.parse(sessionStorage.getItem("token"));
    if (!Info && !adminInfo) {
      navigate("/");
    } else {
      setAdminInfo(Info);
    }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        {adminInfo && (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<User />} />
            <Route path="/products" element={<ProductTable />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
