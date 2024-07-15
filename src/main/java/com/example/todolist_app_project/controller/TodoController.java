package com.example.todolist_app_project.controller;

import com.example.todolist_app_project.repository.TodoEntity;
import com.example.todolist_app_project.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public List<TodoEntity> getTodoList() {
        return todoService.getTodoList();
    }

    // 새로운 Todo 항목 추가
    @PostMapping
    public void createTodo(@RequestBody String todoName) {
        todoService.create(todoName);
    }

    // Todo 항목 업데이트 (완료 상태 변경)
    @PutMapping("/{id}")
    public TodoDTO modifyTodoCompleted(@PathVariable Long id) {
        return todoService.modify(id);
    }

    // Todo 항목 삭제
    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.delete(id);
    }
}
