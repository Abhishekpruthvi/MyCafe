package com.madbros.cafe.controller;

import com.madbros.cafe.entity.Items;
import com.madbros.cafe.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */
@RestController
@RequestMapping("/item")
public class ItemsController {

    @Autowired
    ItemService itemService;

    @PostMapping("/add")
    public ResponseEntity<?> addItem(@RequestBody Items items) {
        items = itemService.addItems(items);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<?> updateTable(@PathVariable("itemId") Long itemId, @RequestBody Items items) {
        items = itemService.updateItems(itemId, items);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<?> deleteTable(@PathVariable("itemId") Long itemId) {
        itemService.deleteItems(itemId);
        return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/get/all")
    public ResponseEntity<?> getAllTable() {
        List<Items> tablesList =  itemService.getAllItems();
        return new ResponseEntity<>(tablesList, HttpStatus.OK);
    }
}
