package com.projetosenac.spring.senac.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetosenac.spring.senac.Exceptions.ResourceNotFoundException;
import com.projetosenac.spring.senac.Models.Chamado;
import com.projetosenac.spring.senac.Repositories.ChamadoRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ChamadoController {
    

    @Autowired
    ChamadoRepository chamadoRepository;

    //Chamados por id de Usuario
    @GetMapping("/chamados")
    public List<Chamado> getChamados() {
        return chamadoRepository.findAll();
    }

    //Adicionar chamado

    @PostMapping("/chamados")
   public Chamado createChamado(@RequestBody Chamado chamado){
    return chamadoRepository.save(chamado);
   }

   //Listar chamados por usuario
   @GetMapping("/chamados/PerUser/{id}")
   public List<Chamado> listChamadosPerUser(@PathVariable Long id){
        return chamadoRepository.findByUsuarioId(id);
   }

   @DeleteMapping("/chamados/{id}")
   public ResponseEntity<Void> deleteChamado(@PathVariable Long id){
        chamadoRepository.deleteById(id);

        return ResponseEntity.ok().build();
   }

   @PutMapping("/chamados/{id}")
    public ResponseEntity<Chamado> updateChamado(@PathVariable Long id, @RequestBody Chamado detailsChamado){
        Chamado chamado = chamadoRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Chamado não existe! chamado = " + id));

        chamado.setDescricao(detailsChamado.getDescricao());
        chamado.setTitulo(detailsChamado.getTitulo());

        Chamado novoChamado = chamadoRepository.save(chamado);

        return ResponseEntity.ok(novoChamado);
        
    }

    @GetMapping("/chamados/{id}")
    public ResponseEntity<Chamado> getChamadoById(@PathVariable Long id){
        Chamado chamado = chamadoRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Chamado não existe! chamado = " + id));

        return ResponseEntity.ok(chamado);
    }






}
