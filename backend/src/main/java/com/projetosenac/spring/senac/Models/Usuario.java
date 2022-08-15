package com.projetosenac.spring.senac.Models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table (name = "usuarios", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "email")
})
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String nome;

    @NotBlank
    @Size(max = 40)
    private String sobrenome;

    @Size(max = 11)
    private String CPF;


    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
	@Size(max = 50)
	@Email
	private String email;
    
	@NotBlank
	@Size(max = 120)
	private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "usuario_roles",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<Role>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
    // @JoinTable(
    //     name = "usuario_chamados",
    //     joinColumns = @JoinColumn(name = "usuario_id"),
    //     inverseJoinColumns = @JoinColumn(name = "chamado_id")
    // )
    private Set<Chamado> chamados = new HashSet<Chamado>();



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public Usuario(){
        
    }

    

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }

    public Usuario(String username, String email, String password, String CPF, String sobrenome, String nome) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.CPF = CPF;
        this.sobrenome = sobrenome;
        this.nome = nome;
    }

    

    

}
