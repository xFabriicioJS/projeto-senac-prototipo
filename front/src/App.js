import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";

import BoardAdmin from "./components/BoardAdmin";
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, useDisclosure } from "@chakra-ui/react";
import { AuthProvider, useAuth } from "./context/auth.context";
import AddChamado from "./components/AddChamado";
import ViewChamado from "./components/ViewChamado";
const App = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
    const [placement, setPlacement] = useState('right');

  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {
    const user = AuthService.getCurrentUser();


    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    onClose();

    AuthService.logout();
  }

  //  const ProtectedRoute = ({...rest }) => {
  //   let { user } = useAuth();
  
  //   if (!user || !user.token || user.token === "") {
  //     return (
  //       <Login/>
  //     );
  //   }
  
  //   // let user through if they're logged in
  //   return <Route {...rest} />;
  // };

  
  return (
    <div> 
      <div className="container mt-3">
        <AuthProvider userData={currentUser}>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/user" element={<BoardUser/>} />
              <Route path="/admin" element={<BoardAdmin/>} />
              <Route path="/addChamado" element={<AddChamado/>} />
              <Route path="/viewChamado/:id" element={<ViewChamado/>} />
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
};
export default App;