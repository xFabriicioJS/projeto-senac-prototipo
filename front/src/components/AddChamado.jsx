import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Textarea, Switch, Radio, RadioGroup, Stack, useDisclosure, ModalOverlay, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import DatePicker from "react-datepicker";
import { AiFillCheckCircle } from "react-icons/ai"
import AuthService from '../services/auth.service'

import "react-datepicker/dist/react-datepicker.css";
import DrawerMenu from "./DrawerMenu";
import moment from "moment";
import TicketService from "../services/ticket.service";
import { useNavigate } from "react-router-dom";

function AddChamado() {


  useEffect(()=>{

    const user = AuthService.getCurrentUser();


    if (user) {
      setCurrentUser(user);
    }

  },[]);

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [message, setMessage] = useState('');
    const [urgencia, setUrgencia] = useState(false);
    const [tipoChamado, setTipoChamado] = useState('software');
    const [startDate, setStartDate] = useState(new Date());
    const [currentUser, setCurrentUser] = useState(undefined);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    let navigate = useNavigate();


  
    const handleSwitch = () => {
      setUrgencia(!urgencia);
    }

 
    const handleSubmit = (e) => {

      e.preventDefault();

      const user = JSON.parse(localStorage.getItem('usuario'));

      const userId = user.id;

      const dataFormatada = moment(startDate).locale('en-in').format("DD/MM/YYYY");

      let chamado = {
        "titulo" : titulo,
        "descricao" : descricao,
        "dataLimite": dataFormatada,
        "urgencia": urgencia,
        "tipoChamado": tipoChamado,
        "usuario": {
          "id": userId
        } 
      }
      TicketService.addChamado(chamado);
    }

 

if(currentUser){
  return (
    <>
    <DrawerMenu/>
    <Flex width="full" align="center" justifyContent="center" mt={-10}>
      <Box
        p={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="70%"
        backgroundColor="teal.100"
        borderRadius="15"
      >
        <Box textAlign="center">
          <Heading>Adicionar novo chamado</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit} style={{width: "500px"}}>
            {message && <ErrorMessage message={message} />}
            <FormControl isRequired>
              <FormLabel>Titulo</FormLabel>
              <Input
                type="text"
                placeholder="Insira um titulo a esse chamado"
                size="lg"
                onChange={(event) => setTitulo(event.currentTarget.value)}
                variant="filled"
                required
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Descri????o</FormLabel>
              <Textarea
               resize="none" 
               variant="filled"
               placeholder='Insira uma descri????o para adicionar mais detalhes'
               value={descricao}
               onChange={(e)=> setDescricao(e.currentTarget.value)}
               required
               />
            </FormControl>

            <FormControl mt="4" display="flex" alignItems="center">
                <FormLabel>Deseja solicitar urg??ncia para esse chamado espec??fico?</FormLabel>
                <Switch colorScheme="red" size="lg" value={urgencia} onChange={handleSwitch}/>
                
            </FormControl>

            <FormControl backgroundColor={"whiteAlpha.800"} rounded="md" p="2" isRequired mt={4}>
                <FormLabel>Qual o tipo do chamado?</FormLabel>
                <RadioGroup onChange={setTipoChamado} value={tipoChamado}>
                    <Stack direction='row'>
                        <Radio value="SOFTWARE">Software</Radio>
                        <Radio value="HARDWARE">Hardware</Radio>
                        <Radio value="INFRAESTRUTURA">Infraestrutura</Radio>                    
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl mt={4} isRequired>
            <FormLabel>Escolha um prazo desse chamado</FormLabel>   
            <DatePicker 
            dateFormat="dd/MM/yyyy" required selected={startDate} onChange={(date) => setStartDate(date)} />
            
            </FormControl>

            <Button
              colorScheme="green"
              variant="solid"
              type="submit"
              width="full"
              mt={8}
              onClick={()=>{
                handleSubmit();
                setOverlay(<OverlayOne />);
                onOpen();
              }}
            >
              Adicionar
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader display="flex">Chamado enviado <AiFillCheckCircle style={{color: "green", fontSize: "35", marginLeft:"10"}}/></ModalHeader>
          
          <ModalCloseButton />
          <ModalBody>
            <Text>O seu chamado j?? foi enviado para nossa equipe, e poder?? ser acompanhado na dashboard de chamados, por isso, fique ligado!</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={()=>{
              onClose();
              navigate("/user/");
            }}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </form>
        </Box>
      </Box>
    </Flex>
    </>
  )
}else{
  return(
    <Box>
      Voc?? precisa estar autenticado para acessar essa p??gina
    </Box>  
  )
}
}
export default AddChamado;
