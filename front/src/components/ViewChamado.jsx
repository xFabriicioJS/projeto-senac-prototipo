import { Box, Button, Divider, Flex, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Switch, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'

import { Navigate, useLocation } from 'react-router-dom'
import AuthService from '../services/auth.service';
import TicketService from '../services/ticket.service';
import DrawerMenu from './DrawerMenu';





function ViewChamado() {

  const [loading, setLoading] = useState(true);
  let location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState({});
  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(()=>{
    const user = AuthService.getCurrentUser();


    if (user) {
      setCurrentUser(user);
    }
    // setData(TicketService.getChamadoById(location.state.id));
   setTimeout(()=>{TicketService.getChamadoById(location.state.id).then((response) => setData(response.data));
    console.log(data);
    // console.log(data);
    // console.log(data);
    
    setLoading(false)},1000)     
  },[]);

if(currentUser){
  if(loading){
  return (
    <Flex justifyContent="center" align="center" h="100vh">
       <Box>
          <Spinner
        thickness='5px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
       </Box>
    </Flex>  
  )
}else{
  return(
    <>
    <DrawerMenu/>
    <Flex align="center" justify="center" w="full">
    <Box background="gray.200" w="80%" p="8" rounded="3xl">
      <Box>
      <Heading>Detalhes do chamado</Heading>
      </Box>
      <Divider orientation="horizontal"colorScheme="teal"/>
      <Box mt={"10"} display="flex">
        <Box w="50%" backgroundColor="whiteAlpha.600" rounded="3xl" p="4" m="0 auto">
          <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
           Protocolo do chamado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Text >
              676769767867821312
            </Text>
          </Box>
          </Box>
          <Box mt="2">
          <Text color="gray.600" fontWeight="bold">
            Titulo do chamado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Text>
              {data.titulo}
            </Text>
          </Box>

      
          </Box>

          <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
          Email associado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Text >
            {data.usuario?.email}
            </Text>
          </Box>
          </Box>

          <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
          Descrição do chamado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Textarea disabled="true" value={data.descricao}>
              {data.descricao}
            </Textarea>
          </Box>
          </Box>

          <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
          Data de abertura
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Text >
              {data.dataAbertura}
            </Text>
          </Box>
          </Box>

          <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
            Data de fechamento do chamado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
            <Text>
            {data.dataLimite}
            </Text>
          </Box>
          </Box>

          <Box mt="2" display="flex" alignItems="center">
                <Text>Urgência? </Text>
                {data.urgencia ?
                 <Switch isChecked size="md" ml="2"/>

                 : <Switch isReadOnly size="lg" ml="2"/> }
            </Box>

            <Box mt="2">
          <Text color="gray.600" fontWeight="bold" >
          Status do chamado
          </Text>

          <Box rounded="md" p="1"  backgroundColor="whiteAlpha.900">
          <Button colorScheme="red" size="sm" rounded="2xl">
            {data.statusChamado?.replace('_', ' ')}
          </Button>
          </Box>
          </Box>

          <Box display="flex" align="center" justifyContent="center" mt="4">
            <Button colorScheme="pink" onClick={onOpen}>
              Cancelar chamado  
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancelamento de chamado</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Deseja mesmo solicitar o cancelamento desse chamado?
            </Text>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Não
            </Button>
            <Button colorScheme="red">Sim</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </Box>
        </Box>
              
      </Box>
    </Box>
  </Flex>
  </>
  )
}
}else {
  return (
    <>
      Você precisa estar autenticado para acessar essa página!
    </>
  )
}
}

export default ViewChamado