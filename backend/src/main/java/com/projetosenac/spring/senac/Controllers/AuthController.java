package com.projetosenac.spring.senac.Controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetosenac.spring.senac.Models.ERole;
import com.projetosenac.spring.senac.Models.Role;
import com.projetosenac.spring.senac.Models.Usuario;
import com.projetosenac.spring.senac.Payload.Request.LoginRequest;
import com.projetosenac.spring.senac.Payload.Request.SignupRequest;
import com.projetosenac.spring.senac.Payload.Response.JwtResponse;
import com.projetosenac.spring.senac.Payload.Response.MessageResponse;
import com.projetosenac.spring.senac.Repositories.RoleRepository;
import com.projetosenac.spring.senac.Repositories.UsuarioRepository;
import com.projetosenac.spring.senac.Security.JWT.JWTUtils;
import com.projetosenac.spring.senac.Security.Services.UserDetailsImpl;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JWTUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> autenticarUsuario(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
        .map(item -> item.getAuthority())
        .collect(Collectors.toList());
        
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registrarUsuario(@Valid @RequestBody SignupRequest signupRequest){
        if(usuarioRepository.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity.badRequest()
            .body(new MessageResponse("Erro! Nome de usuário já é utilizado!"));
        }
        if(usuarioRepository.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity.badRequest()
            .body(new MessageResponse("Erro! Esse email já é utilizado!"));
        }
        
        //Criando nova conta de usuário
        Usuario usuario = new Usuario(signupRequest.getUsername(), signupRequest.getEmail(), encoder.encode(signupRequest.getPassword()), signupRequest.getCpf(), signupRequest.getSobrenome(), signupRequest.getNome());

        Set<String> stringRoles = signupRequest.getRole();  
        Set<Role> roles = new HashSet<Role>();

        if(stringRoles == null){
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            .orElseThrow(()-> new RuntimeException("Erro: 'role' não encontrada"));
            roles.add(userRole);
        }else {
            stringRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                    }
            });
            
        }
        usuario.setRoles(roles);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok(new MessageResponse("Usuáreio registrado com sucesso!"));



    }


}
