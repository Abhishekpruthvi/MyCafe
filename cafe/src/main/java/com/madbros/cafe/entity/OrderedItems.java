package com.madbros.cafe.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Table(name = "ordered_items")
@Entity
@Data
public class OrderedItems {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ordered_item_id")
    private Long orderedItemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Orders orders;

    private Long tableId;

    private Long itemId;

    private String itemName;

    private Integer itemQuantity;

    private Double itemPrice;

    private BigDecimal itemTotal;
}
