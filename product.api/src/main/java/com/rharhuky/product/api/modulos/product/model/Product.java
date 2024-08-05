package com.rharhuky.product.api.modulos.product.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = SEQUENCE)
    private Integer id;

    private String name;

    @Column(name = "quantity_available", nullable = false)
    private Integer quantityAvailable;

    @ManyToOne
    @JoinColumn(name = "fk_category", nullable = false)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "fk_supplier", nullable = false)
    private Supplier supplier;
}
