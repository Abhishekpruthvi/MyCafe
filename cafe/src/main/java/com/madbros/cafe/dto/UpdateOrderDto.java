package com.madbros.cafe.dto;

import lombok.Data;

import java.math.BigDecimal;

/**
 * @author Abhishek Pruthvi V M
 * @since 25/06/23
 */

@Data
public class UpdateOrderDto {

    private Long tableId;
    private Long itemId;
    private Double itemPrice;
    private Integer itemQuantity;
}
