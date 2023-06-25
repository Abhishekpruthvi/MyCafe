package com.madbros.cafe.service.impl;

import com.madbros.cafe.entity.Tables;
import com.madbros.cafe.repo.TablesRepo;
import com.madbros.cafe.service.TableService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */
@Service
@Slf4j
public class TableServiceImpl implements TableService {

    @Autowired
    TablesRepo tablesRepo;

    @Override
    public Tables addTable(Tables tables) {
        return tablesRepo.save(tables);
    }

    @Override
    public Tables updateTable(Long tableId, Tables tables) {
        Optional<Tables> currentTable = tablesRepo.findById(tableId);
         log.info("fetch by id {} {}",tableId, currentTable );
        if(currentTable.isPresent()) {
            currentTable.get().setTableName(tables.getTableName());
            currentTable.get().setTableDescription(tables.getTableDescription());
            return tablesRepo.save(currentTable.get());
        }
        return null;
    }

    @Override
    public void deleteTable(Long tableId) {
          tablesRepo.deleteById(tableId);
    }

    @Override
    public List<Tables> getAllTables() {
        return tablesRepo.findAll();
    }
}
