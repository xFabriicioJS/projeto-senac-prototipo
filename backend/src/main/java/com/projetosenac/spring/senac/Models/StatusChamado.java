package com.projetosenac.spring.senac.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusChamado {
    @JsonValue
    NAO_ATENDIDO,
    @JsonValue
    ATENDIDO
}
