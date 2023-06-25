package com.madbros.cafe.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Table(name = "orders")
@Entity
@Data
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id",nullable = false)
    private Long orderId;

    private Long tableId;

    @JsonManagedReference
    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL)
    private List<OrderedItems> itemsList = new ArrayList<>();

    private BigDecimal orderTotal;

    private boolean isActive;

    @Transient
    private Long itemId;

    @Transient
    private Double itemPrice;

    @Transient
    private Integer itemQuantity;
}
