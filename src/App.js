import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AccountDetails from "./components/Dashboard/AccountDetails";
import MainDashBoard from "./components/Dashboard/MainDashBoard";
import AddAccount from "./components/Forms/AddAccount";
import AddTransaction from "./components/Forms/AddTransaction";
import EditAccount from "./components/Forms/EditAccount";
import EditTransaction from "./components/Forms/EditTransaction";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Home from "./components/HomePage/Home";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <AuthRoute>
            <MainDashBoard />
          </AuthRoute>
        } />
        <Route path="/account" element={<AccountDetails />} />
        <Route path="/account/:id" element={<AccountDetails />} />
        <Route path="/add-transaction/:id" element={<AddTransaction />} />
        <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/edit-account/:id" element={<EditAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
