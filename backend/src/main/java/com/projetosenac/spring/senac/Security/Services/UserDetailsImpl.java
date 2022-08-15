package com.projetosenac.spring.senac.Security.Services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projetosenac.spring.senac.Models.Usuario;

public class UserDetailsImpl implements UserDetails{
    private Long id;

	private String username;

	private String email;

    private String cpf;

    private String nome;

    private String sobrenome;

	@JsonIgnore
	private String password;

    private Collection<? extends GrantedAuthority> authorities;


	public UserDetailsImpl(Long id, String username, String email, String password, String cpf, String nome, String sobrenome,
			Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
        this.cpf = cpf;
        this.sobrenome = sobrenome;
        this.nome = nome;
		this.authorities = authorities;
	}


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    
    public Long getId() {
        return id;
    }


    public String getEmail() {
        return email;
    }


    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public String getUsername() {
        return username;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

        

    public String getCpf() {
        return cpf;
    }


    public String getNome() {
        return nome;
    }


    public String getSobrenome() {
        return sobrenome;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return true;
    }



    @Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

    public static UserDetailsImpl build(Usuario usuario) {
		List<GrantedAuthority> authorities = usuario.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());
		return new UserDetailsImpl(
				usuario.getId(), 
				usuario.getUsername(), 
				usuario.getEmail(),
				usuario.getPassword(),
                usuario.getSobrenome(),
                usuario.getNome(),
                usuario.getCPF(), 
				authorities);
	}
    
    


}
