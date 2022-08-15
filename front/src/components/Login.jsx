import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import ErrorMessage from "./ErrorMessage";


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };


const Login = () => {
    let navigate =  useNavigate();
    const form = useRef();

    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    //Funções de evento no input
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };

      const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        
          if(password.length > 0 && username.length > 0)
                {
                AuthService.login(username, password).then(
                    ()=>{
                        navigate("/profile");
                        window.location.reload();
                    },
                    (error) => {
                        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                        setLoading(false);
                        setMessage(resMessage);
                        setUsername('');
                        setPassword('');
                    }
                );
            } else {
                setLoading(false);
            }
      }

      return(
        
<>
<Box>
  <nav>
    Pagina Inicia
  </nav>
</Box>
        <Flex width="full" align="center" justifyContent="center">
      <Box p={20} display="flex" flexDirection="column"  alignItems="center"width= "30%" backgroundColor="teal.100" borderRadius="15">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
                <form onSubmit={handleLogin}>
                {message && <ErrorMessage message={message} />}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="username"
              placeholder="Nome de usuário"
              size="lg"
              onChange={event => setUsername(event.currentTarget.value)}
              variant="filled"

            />
          </FormControl>
          <FormControl isRequired mt={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="*******"
              size="lg"
              onChange={event => setPassword(event.currentTarget.value)}
              variant="filled"
            />
          </FormControl>
          <Button
            variantColor="green"
            variant="solid"
            type="submit"
            width="full"
            mt={4}
          >
            Entrar
          </Button>
        </form>
        </Box>
      </Box>
    </Flex>
</>
    );
};

export default Login;