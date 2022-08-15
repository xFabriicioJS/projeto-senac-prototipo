package com.projetosenac.spring.senac.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetosenac.spring.senac.Models.Chamado;


@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long>{

    List<Chamado> findByUsuarioId(Long id);


}


