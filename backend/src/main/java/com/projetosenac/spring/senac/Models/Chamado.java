package com.projetosenac.spring.senac.Models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name =  "chamado")

public class Chamado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @Size(min =  1, max = 40, message =  "Titulo muito longo")
    private String titulo;
    

    @NotNull
    @Size(min =  1, max = 500, message =  "Descricao muito longa")
    private String descricao;

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm:ss a")
    private LocalDateTime dataAbertura = LocalDateTime.now();

    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataLimite;
    
    @Enumerated(EnumType.STRING)
    private StatusChamado statusChamado = StatusChamado.NAO_ATENDIDO;


    private Boolean urgencia;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private TipoChamado tipoChamado = TipoChamado.SOFTWARE;


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getTitulo() {
        return titulo;
    }


    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }


    public String getDescricao() {
        return descricao;
    }


    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }


    public Usuario getUsuario() {
        return usuario;
    }


    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


    public Chamado(String titulo, String descricao, Usuario usuario) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.usuario = usuario;
    }


    public Chamado(){

    }


    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }


    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }


    public LocalDate getDataLimite() {
        return dataLimite;
    }


    public void setDataLimite(LocalDate dataLimite) {
        this.dataLimite = dataLimite;
    }


    public StatusChamado getStatusChamado() {
        return statusChamado;
    }


    public void setStatusChamado(StatusChamado statusChamado) {
        this.statusChamado = statusChamado;
    }


    public Boolean getUrgencia() {
        return urgencia;
    }


    public void setUrgencia(Boolean urgencia) {
        this.urgencia = urgencia;
    }


    public TipoChamado getTipoChamado() {
        return tipoChamado;
    }


    public void setTipoChamado(TipoChamado tipoChamado) {
        this.tipoChamado = tipoChamado;
    }

    

    
    
}
