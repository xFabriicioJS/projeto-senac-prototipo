package com.projetosenac.spring.senac.Security.Services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.projetosenac.spring.senac.Models.Usuario;
import com.projetosenac.spring.senac.Repositories.UsuarioRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException("Usuário não foi encontrado com esse parâmetro. " + username));

        return UserDetailsImpl.build(usuario);


    }

}
