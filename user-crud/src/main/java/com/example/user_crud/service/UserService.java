package com.example.user_crud.service;

import com.example.user_crud.dto.UserDTO;
import com.example.user_crud.entity.User;
import com.example.user_crud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //Crear usuario
    public UserDTO createUser(UserDTO userDTO){
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    //Obtener Todos los usuarios
    public List<UserDTO> getAllUsers(){
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    //Obtener usuario por ID
    public UserDTO getUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuario no encontrado"));
                return convertToDTO(user);
    }

    //Actualizar Usuario
    public UserDTO updateUser(Long id, UserDTO userDTO){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario No encontrado"));
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    //Eliminar Usuario
    public void deleteUser(Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userRepository.delete(user);
    }

    //Metodo auxiliar para convertir entidad a DTO
    private UserDTO convertToDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }
}
