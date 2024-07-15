package com.example.todolist_app_project.repository;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "todo_tbl")
public class TodoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean completed;

    @Column(nullable = false)
    private String todoName;

    @Builder
    public TodoEntity(long id, boolean completed, String todoName) {
        this.id = id;
        this.completed = completed;
        this.todoName = todoName;
    }
}
