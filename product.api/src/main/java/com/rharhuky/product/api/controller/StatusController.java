package com.rharhuky.product.api.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class StatusController {

    @GetMapping(value = "/status")
    public ResponseEntity<Map<String, Object>> status(){
        Map<String, Object> response = new HashMap<>();
        response.put("service", "product api");
        response.put("status", "up");
        response.put("httpStatus", HttpStatus.OK);
        return ResponseEntity.ok(response);
    }

}
