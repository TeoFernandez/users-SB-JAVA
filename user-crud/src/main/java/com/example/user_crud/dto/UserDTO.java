package com.example.user_crud.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long Id;
    private String name;
    private String email;
    private String birth_date;
}
