package com.madbros.cafe.service;

import com.madbros.cafe.dto.UpdateOrderDto;
import com.madbros.cafe.entity.Orders;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */
public interface OrderService {

    Orders placeOrder(Orders orders);

    Orders updateOrder(UpdateOrderDto updateOrderDto);

    List<Orders> getAllActiveOrders();

    void recalculateActiveOrders();

    void makeInActive(Long orderId);
}
