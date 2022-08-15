
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


function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  }

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }

    const handleRegister = () => {
      setMessage("");

        console.log("registrando...")
        AuthService.register(username, email, password).then(
          (response) => {
            setMessage(response.data.message);         
          },
          (error) => {
            console.log(error);
          
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          // setSuccessful(false);
        } 
        )
      
    }

  return (
    <Flex width="full" align="center" justifyContent="center">
    <Box p={20} display="flex" flexDirection="column"  alignItems="center"width= "30%" backgroundColor="teal.100" borderRadius="15">
      <Box textAlign="center">
        <Heading>Registrar</Heading>
      </Box>
      <Box my={4} textAlign="left">
              <form>
              {message && <ErrorMessage message={message} />}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            size="lg"
            onChange={event => setUsername(event.currentTarget.value)}
            variant="filled"

          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Nome de usuário</FormLabel>
          <Input
            type="username"
            placeholder="Nome de usuário"
            size="lg"
            onChange={event => setPassword(event.currentTarget.value)}
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
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </form>
      </Box>
    </Box>
  </Flex>
  )
}

export default Register