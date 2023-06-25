package com.madbros.cafe.service.impl;

import com.madbros.cafe.dto.DeleteOrderedItmDto;
import com.madbros.cafe.repo.OrderedItemsRepo;
import com.madbros.cafe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * @author Abhishek Pruthvi V M
 * @since 25/06/23
 */

@Repository
public class OrderedItemServiceImpl implements OrderedItemService{

    @Autowired
    OrderedItemsRepo orderedItemsRepo;

    @Autowired
    OrderService orderService;

    @Override
    public void deleteOrderedItem(Long orderedItemId) {
        orderedItemsRepo.deleteById(orderedItemId);
        orderService.recalculateActiveOrders();
    }
}
