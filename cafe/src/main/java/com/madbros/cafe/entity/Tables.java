package com.madbros.cafe.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * @author Abhishek Pruthvi V M
 * @since 24/06/23
 */

@Data
@Table(name = "tables")
@Entity
public class Tables {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long tableId;

    private String tableName;

    private String tableDescription;

}
