package com.madbros.cafe.controller;

import com.madbros.cafe.entity.Tables;
import com.madbros.cafe.service.TableService;
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
@RequestMapping("/table")
public class TablesController {

    @Autowired
    TableService tableService;

    @PostMapping("/add")
    public ResponseEntity<?> addTable(@RequestBody Tables tables) {
        tables = tableService.addTable(tables);
        return new ResponseEntity<>(tables, HttpStatus.OK);
    }

    @PutMapping("/update/{tableId}")
    public ResponseEntity<?> updateTable(@PathVariable("tableId") Long tableId, @RequestBody Tables tables) {
        tables = tableService.updateTable(tableId, tables);
        return new ResponseEntity<>(tables, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{tableId}")
    public ResponseEntity<?> deleteTable(@PathVariable("tableId") Long tableId) {
        tableService.deleteTable(tableId);
        return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTable() {
        List<Tables> tablesList =  tableService.getAllTables();
        return new ResponseEntity<>(tablesList, HttpStatus.OK);
    }
}
