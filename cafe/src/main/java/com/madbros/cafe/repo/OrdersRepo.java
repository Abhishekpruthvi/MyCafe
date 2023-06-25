package com.madbros.cafe.repo;

import com.madbros.cafe.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Long> {

    List<Orders> findByIsActiveTrueOrderByOrderId();

    Orders findByIsActiveTrueAndTableId(Long tableId);

}
