package ru.alexvpnteam.profburo_os.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @Column(name = "userid", columnDefinition = "VARCHAR(255)", nullable = false)
    private String userId;

    @Column(name = "chatid", columnDefinition = "VARCHAR(255)", nullable = false)
    private String chatId;

    @Column(name = "name", columnDefinition = "VARCHAR(255)", nullable = false)
    private String name;

    @Builder.Default
    @Column(name = "record", columnDefinition = "INT")
    private Integer record = 0;
}
