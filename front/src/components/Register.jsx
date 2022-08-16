
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
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCPF] = useState("");
  const [successful, setSuccessful] = useState(false);

  
  
  


    const handleRegister = (e) => {
      e.preventDefault();
      setMessage("");
      console.log(email, username);

        console.log("registrando...")
        AuthService.register(username, email, password, sobrenome, nome, cpf).then(
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
    <Box p={20} display="flex" flexDirection="column"  alignItems="center"width= "40%" backgroundColor="teal.100" borderRadius="15">
      <Box textAlign="center">
        <Heading>Registro de novo usuário</Heading>
      </Box>
      <Box my={4} textAlign="left" w="90%">
              <form>
              {message && <ErrorMessage message={message} />}
        <FormControl isRequired>
          <FormLabel>Insira seu email</FormLabel>
          <Input
            type="email"
            placeholder="Email"
            size="lg"
            onChange={event => setEmail(event.currentTarget.value)}
            variant="filled"

          />
        </FormControl>
        <FormControl isRequired mt={6}>
          <FormLabel>Insira um nome de usuário</FormLabel>
          <Input
            type="username"
            placeholder="Nome de usuário"
            size="lg"
            onChange={event => setUsername(event.currentTarget.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired mt={6}>
          <FormLabel>Senha</FormLabel>
          <Input
            type="password"
            placeholder="*******"
            size="lg"
            onChange={event => setPassword(event.currentTarget.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired mt={6}>
          <FormLabel>Insira seu primeiro nome</FormLabel>
          <Input
            type="text"
            placeholder="Seu primeiro nome"
            size="lg"
            onChange={event => setNome(event.currentTarget.value)}
            variant="filled"
          />
        </FormControl>

        <FormControl isRequired mt={6}>
          <FormLabel>Insira seu sobrenome</FormLabel>
          <Input
            type="text"
            placeholder="Seu sobrenome"
            size="lg"
            onChange={event => setSobrenome(event.currentTarget.value)}
            variant="filled"
          />
        </FormControl>
    
        <FormControl isRequired mt={6}>
          <FormLabel>Insira seu CPF (apenas números)</FormLabel>
          <Input
            type="text"
            placeholder="Seu CPF"
            size="lg"
            onChange={event => setCPF(event.currentTarget.value)}
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