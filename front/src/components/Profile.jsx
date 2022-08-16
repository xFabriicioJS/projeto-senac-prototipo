import { Avatar, Box, Button, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import DrawerMenu from "./DrawerMenu";



const Profile = () => {

const [currentUser,setCurrentUser] = useState(undefined);

useEffect(()=>{

  
  const user = AuthService.getCurrentUser();


  if (user) {
    setCurrentUser(user);
  }

  // requisicao para obter dados do usuário

},[])

if(currentUser){
  return (
    <>
    <DrawerMenu/>
    <Flex align="center" justify="center" w="full">
      <Box background="gray.200" w="70%" p="10" rounded="3xl">
        <Box>
        <Heading>Meu perfil</Heading>
        </Box>
        <Divider orientation="horizontal"/>
        <Box mt={"10"} display="flex">
          <Image
          borderRadius='full'
          boxSize='300px'
          src='https://bit.ly/dan-abramov'
          alt='Dan Abramov'
          />
          <Box w="50%" backgroundColor="whiteAlpha.600" rounded="3xl" p="4" ml="24">
            <Box mt="2">
            <Text color="gray.600" fontWeight="bold" >
              Meu primeiro nome
            </Text>

            <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
              <Text >
                Nome do usuario...
              </Text>
            </Box>
            </Box>
            <Box mt="2">
            <Text color="gray.600" fontWeight="bold">
              Sobrenome
            </Text>

            <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
              <Text>
                Sobrenome do usuario...
              </Text>
            </Box>

        
            </Box>

            <Box mt="2">
            <Text color="gray.600" fontWeight="bold" >
            Meu email
            </Text>

            <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
              <Text >
                fabriciocostamonteiro@hotmail.com
              </Text>
            </Box>
            </Box>
            <Box display="flex" align="center" justifyContent="center" mt="4">
              <Button colorScheme="pink">
                Editar foto  
              </Button>
            </Box>
          </Box>
                
        </Box>
      </Box>
    </Flex>
  </>     

  );
} else {
  return(
    <>
      Você precisa estar autenticado para acessar essa página!
    </>

  )
}
};
export default Profile;



{/* <div className="container">
    //   <header className="jumbotron">
    //     <h3>
    //       <strong>{currentUser.username}</strong> Profile
    //     </h3>
    //   </header>
    //   <p>
    //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
    //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
    //   </p>
    //   <p>
    //     <strong>Id:</strong> {currentUser.id}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {currentUser.email}
    //   </p>
    //   <strong>Authorities:</strong>
    //   <ul>
    //     {currentUser.roles &&
    //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    //   </ul>
    // </div> */}