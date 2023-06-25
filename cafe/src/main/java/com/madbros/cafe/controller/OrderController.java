package com.madbros.cafe.controller;

import com.madbros.cafe.dto.UpdateOrderDto;
import com.madbros.cafe.entity.Orders;
import com.madbros.cafe.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 25/06/23
 */

@RestController
@RequestMapping("/order")
@Slf4j
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping("/update")
    public ResponseEntity<?> updateOrder(@RequestBody UpdateOrderDto updateOrderDto) {

        Orders orders = orderService.updateOrder(updateOrderDto);

        return new ResponseEntity<>(orders, HttpStatus.OK);

    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrder(){
        List<Orders> ordersList = orderService.getAllActiveOrders();
        log.info("Fetched ALL ORders============================");
        return new ResponseEntity<>(ordersList, HttpStatus.OK);
    }

    @PostMapping("/inactive/{orderId}")
    public ResponseEntity<?> makeInActive(@PathVariable("orderId") Long orderId) {
        orderService.makeInActive(orderId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
