package com.madbros.cafe.controller;

import com.madbros.cafe.dto.DeleteOrderedItmDto;
import com.madbros.cafe.service.impl.OrderedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Abhishek Pruthvi V M
 * @since 25/06/23
 */
@RestController
@RequestMapping("/ordereditem")
public class OrderedItemController {

    @Autowired
    OrderedItemService orderedItemService;

    @DeleteMapping("/delete/{orderedItemId}")
    public ResponseEntity<?> deleteOrderedItem(@PathVariable Long orderedItemId) {
        orderedItemService.deleteOrderedItem(orderedItemId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
