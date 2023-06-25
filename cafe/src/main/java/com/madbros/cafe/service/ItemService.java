package com.madbros.cafe.service;

import com.madbros.cafe.entity.Items;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */
public interface ItemService {

    Items addItems(Items items);

    Items updateItems(Long itemId,  Items items);

    void deleteItems(Long itemId);

    List<Items> getAllItems();
}
