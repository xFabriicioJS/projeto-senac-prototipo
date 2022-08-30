import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import TicketService from "../services/ticket.service";
import DrawerMenu from "./DrawerMenu";

const BoardAdmin = () => {
  const [data, setData] = useState([]);
  const currentUser = AuthService.getCurrentUser();




  useEffect(() => {
    //checar se o usuario é admin
    //if(user...)
    //requisicao para todos os chamados
    if (currentUser.roles.includes("ROLE_ADMIN")) {
      //fazer uma requisicao para todos os chamados
      TicketService.getAllChamados().then((response) => setData(response.data));
    }
  }, []);


  const handleView = (id) => {
    console.log(id)
  }


  //checar se o usuario e admin
  //if(blalvlal){}return("voce nao tem permissoes para acessar essa pagina") else return "todos os chamados"
  if (currentUser.roles.includes("ROLE_ADMIN")) {
    return (
      <>
       <DrawerMenu/>
      <Heading>
      Todos os chamados
      </Heading>
      <TableContainer
        width="95%"
        rounded="2xl"
        borderWidth="1px"
        m="0 auto"
        my="10"
      >
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Chamados Sistema Helpdesk</TableCaption>
          <Thead>
            <Tr>
              <Th>Staus do chamado</Th>
              <Th>Data de abertura</Th>
              <Th>Titulo</Th>
              <Th>Prazo</Th>
              <Th>Status Chamado</Th>
              <Th>Autor chamado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((chamado) => {
              return (
                <Tr>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      rounded="2xl"
                      onClick={handleView(chamado.id)}
                    >
                      Visualizar
                    </Button>
                  </Td>
                  <Td>{chamado.dataAbertura}</Td>
                  <Td>{chamado.titulo}</Td>
                  <Td>{chamado.dataLimite}</Td>
                  <Td>
                    {chamado.statusChamado.includes("NAO_ATENDIDO") ? (
                      <Button colorScheme="red" size="sm" rounded="2xl">
                        Não atendido
                      </Button>
                    ) : (
                      <Button colorScheme="green" size="sm" rounded="2xl">
                        Atendido
                      </Button>
                    )}
                  </Td>
                  <Td>
                    {chamado.usuario.username}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
      </>
    );
  } else {
    return <Box>Você não tem permissões para acessar essa página!</Box>;
  }
};

export default BoardAdmin;