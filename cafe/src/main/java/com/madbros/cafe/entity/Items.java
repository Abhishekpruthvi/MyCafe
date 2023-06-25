package com.madbros.cafe.entity;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Table(name = "items")
@Data
@Entity
public class Items {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long itemId;

    private String itemName;

    private Double itemPrice;

}
