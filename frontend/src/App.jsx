import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import GlobalContext from "./contexts/GlobalContext";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import DonneurForm from "./pages/DonneurForm";
import DonneurList from "./pages/DonneurList";
import Volantaire from "./pages/Volantaire";
import Stock from "./pages/Stock";
import TypeStock from "./pages/TypeStock";
import PostForm from "./pages/PostForm";
import PostList from "./pages/PostList";
import EventForm from "./pages/EventForm";
import EventList from "./pages/EventList";
import HoraireList from "./pages/HoraireList";
import HoraireForm from "./pages/HoraireForm";
import DonsForm from "./pages/DonsForm";
import DonsList from "./pages/DonsList";
import Category from "./pages/Category";
import MonCompte from "./pages/MonCompte";

function App() {
  const { role, setRole } = useContext(GlobalContext);
  return (
    <Routes>
      {/* Cummon routes */}
      <Route path="/" exact element={<Landing />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/forgot/password" exact element={<ForgotPassword />} />
      <Route path="/reset/:token" exact element={<ResetPassword />} />

      {/* Restricted routes */}
      <Route path="/dashboard" element={<MainLayout />}>
        {/* Nested Dashboard routes */}
        <Route path="category" element={<Category />} />
        <Route path="giver/form" element={<DonneurForm />} />
        <Route path="giver/list" element={<DonneurList />} />
        <Route path="deliberate/list" element={<Volantaire />} />
        <Route path="supply" element={<Stock />} />
        <Route path="supply/type" element={<TypeStock />} />
        <Route path="post/form" element={<PostForm />} />
        <Route path="params" element={<MonCompte />} />
        <Route path="post/list" element={<PostList />} />
        <Route path="event/form" element={<EventForm />} />
        <Route path="event/list" element={<EventList />} />
        <Route path="hourly/list" element={<HoraireList />} />
        <Route path="hourly/form" element={<HoraireForm />} />
        <Route path="donation/form" element={<DonsForm />} />
        <Route path="donation/list" element={<DonsList />} />
      </Route>
    </Routes>
  );
}

export default App;
