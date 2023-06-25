package com.madbros.cafe.dto;

import lombok.Data;

/**
 * @author Abhishek Pruthvi V M
 * @since 25/06/23
 */
@Data
public class DeleteOrderedItmDto {

    private Long orderId;

    private Long itemId;
}
