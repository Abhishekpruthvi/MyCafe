package com.madbros.cafe.service;

import com.madbros.cafe.entity.Tables;

import java.util.List;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */
public interface TableService {

    Tables addTable(Tables tables);

    Tables updateTable(Long tableId, Tables tables);

    void deleteTable(Long tableId);

    List<Tables> getAllTables();
}
