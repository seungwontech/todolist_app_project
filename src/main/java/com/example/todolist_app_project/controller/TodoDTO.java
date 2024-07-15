package com.example.todolist_app_project.controller;

import com.example.todolist_app_project.repository.TodoEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {
    private long id;
    private boolean completed;
    private String todoName;

    public static TodoDTO toTodoDTO(TodoEntity todoEntity) {
        TodoDTO todoDTO = new TodoDTO();
        todoDTO.setId(todoEntity.getId());
        todoDTO.setCompleted(todoEntity.isCompleted());
        todoDTO.setTodoName(todoEntity.getTodoName());
        return todoDTO;
    }
}
