package com.madbros.cafe.service.impl;

import com.madbros.cafe.entity.Items;
import com.madbros.cafe.repo.ItemsRepo;
import com.madbros.cafe.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemsRepo itemsRepo;

    @Override
    public Items addItems(Items items) {
        return itemsRepo.save(items);
    }

    @Override
    public Items updateItems(Long itemId, Items items) {
        Optional<Items> currItem = itemsRepo.findById(itemId);

        if(currItem.isPresent()) {
            currItem.get().setItemName(items.getItemName());
            currItem.get().setItemPrice(items.getItemPrice());
            return itemsRepo.save(currItem.get());
        }
        return null;
    }

    @Override
    public void deleteItems(Long itemId) {
        itemsRepo.deleteById(itemId);
    }

    @Override
    public List<Items> getAllItems() {
        return itemsRepo.findAll();
    }
}
