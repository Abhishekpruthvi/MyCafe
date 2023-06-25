package com.madbros.cafe.service.impl;

import com.madbros.cafe.dto.UpdateOrderDto;
import com.madbros.cafe.entity.Items;
import com.madbros.cafe.entity.OrderedItems;
import com.madbros.cafe.entity.Orders;
import com.madbros.cafe.repo.ItemsRepo;
import com.madbros.cafe.repo.OrderedItemsRepo;
import com.madbros.cafe.repo.OrdersRepo;
import com.madbros.cafe.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    OrderedItemsRepo orderedItemsRepo;

    @Autowired
    ItemsRepo itemsRepo;

    @Override
    public Orders placeOrder(Orders orders) {
        return ordersRepo.save(orders);
    }

    @Override
    public Orders updateOrder(UpdateOrderDto updateOrderDto) {
        Orders orders = ordersRepo.findByIsActiveTrueAndTableId(updateOrderDto.getTableId());
        Optional<Items> items = itemsRepo.findById(updateOrderDto.getItemId());
        log.info("Items================== {}", items);

        if (orders == null) {
            orders = new Orders();
        }

        orders.setTableId(updateOrderDto.getTableId());
        orders.setActive(true);

        Optional<OrderedItems> updateOrderItem = orders.getItemsList().stream().filter(orderedItems -> orderedItems.getItemId() == updateOrderDto.getItemId())
                .findFirst()
                .map(orderedItems -> {
                    orderedItems.setItemQuantity(updateOrderDto.getItemQuantity());
                    log.info("======================================{}, {} ", orderedItems.getItemQuantity(), items.get().getItemPrice());
                    orderedItems.setItemTotal(new BigDecimal(updateOrderDto.getItemQuantity() * items.get().getItemPrice()));
                    return orderedItems;
                });

        Orders finalOrders = orders;
        updateOrderItem.orElseGet(() -> {
            OrderedItems orderedItems = new OrderedItems();
            orderedItems.setTableId(updateOrderDto.getTableId());
            orderedItems.setItemQuantity(updateOrderDto.getItemQuantity());
            orderedItems.setItemId(updateOrderDto.getItemId());
            orderedItems.setItemPrice(items.get().getItemPrice());
            orderedItems.setItemName(items.get().getItemName());
            orderedItems.setItemTotal(new BigDecimal(updateOrderDto.getItemQuantity() * items.get().getItemPrice()));
            orderedItems.setOrders(finalOrders);
            finalOrders.getItemsList().add(orderedItems);
            return orderedItems;
        });

        BigDecimal orderTotal = finalOrders.getItemsList().stream().map(OrderedItems::getItemTotal).reduce(BigDecimal.ZERO, BigDecimal::add);
        finalOrders.setOrderTotal(orderTotal);
        log.info("Saving final Order =========================== {} {}", orderTotal, finalOrders);
        return ordersRepo.save(finalOrders);
    }

    @Override
    public List<Orders> getAllActiveOrders() {
        log.info("Get All Active Orders=======================================");
        return ordersRepo.findByIsActiveTrueOrderByOrderId();
    }

    @Override
    public void recalculateActiveOrders() {
        List<Orders> ordersList = ordersRepo.findByIsActiveTrueOrderByOrderId();

        for (Orders orders : ordersList) {
            BigDecimal orderTotal = BigDecimal.ZERO;
            for (OrderedItems orderedItems : orders.getItemsList()) {
                orderTotal = orderTotal.add(BigDecimal.valueOf(orderedItems.getItemQuantity() * orderedItems.getItemPrice()));
                log.info("total should be========== {} {}", BigDecimal.valueOf(orderedItems.getItemQuantity() * orderedItems.getItemPrice()), orderTotal);
            }
            orders.setOrderTotal(orderTotal);
        }

        ordersRepo.saveAll(ordersList);
    }

    @Override
    public void makeInActive(Long orderId) {
        Optional<Orders> orders = ordersRepo.findById(orderId);
        if(orders.isPresent()) {
            Orders currOrder = orders.get();
            currOrder.setActive(false);
            ordersRepo.save(currOrder);
        }
    }
}
