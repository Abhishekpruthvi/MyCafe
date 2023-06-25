package com.madbros.cafe.repo;

import com.madbros.cafe.entity.OrderedItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Repository
public interface OrderedItemsRepo extends JpaRepository<OrderedItems, Long> {

    void deleteByOrderedItemId(Long orderedItemId);
}
