import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import TicketService from "../services/ticket.service";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import DrawerMenu from "./DrawerMenu";


const BoardUser = () => {
  
  const [data, setData] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  let navigate = useNavigate();


  const handleView = (id) => {
    navigate(`/viewChamado/${id}`, {state : {id}})
  }


  useEffect(() => {
    if(currentUser.roles.includes("ROLE_ADMIN")){
      //fazer uma requisicao para todos os chamados
      setData(TicketService.getAllChamados());

      console.log(TicketService.getAllChamados());
    }else{
      

      TicketService.getChamadosByUserId(currentUser.id).then((response)=> setData(response.data));


    }

    
  }, []);
  return (
    <>
    <DrawerMenu/>
    {currentUser && (  
    <Link to={"/addChamado"} className="nav-link">
      <Button position="fixed" top="8" right="40" size="lg" rounded="3xl" colorScheme="green">
  
    Novo chamado                
    
      </Button></Link>)}
    <TableContainer width="80%" rounded="2xl" borderWidth="1px" m="0 auto" my="10">
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Chamados Sistema Helpdesk</TableCaption>
    <Thead>
      <Tr>
        <Th>Staus do chamado</Th>
        <Th>Data de abertura</Th>
        <Th>Titulo</Th>
        <Th>Prazo</Th>
        <Th>Status Chamado</Th>
      </Tr>
    </Thead>
    <Tbody>

      {data.map((chamado)=>{
        return(
        <Tr>
            <Td><Button colorScheme="green" size="sm" rounded="2xl" onClick={()=> handleView(chamado.id)}>Visualizar</Button></Td>
            <Td>{chamado.dataAbertura}</Td>
            <Td>{chamado.titulo}</Td>
            <Td>{chamado.dataLimite}</Td>
            <Td>{chamado.statusChamado.includes("NAO_ATENDIDO") ? <Button colorScheme="red" size="sm" rounded="2xl">Não atendido</Button>: <Button colorScheme="green" size="sm" rounded="2xl">Atendido</Button>}</Td>            
        </Tr>
        )
      })}
    </Tbody>
    <Tfoot>
    </Tfoot>
  </Table>
  </TableContainer>
    </>
  );
};
export default BoardUser;