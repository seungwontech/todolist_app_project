package com.example.todolist_app_project.service;

import com.example.todolist_app_project.controller.TodoDTO;
import com.example.todolist_app_project.repository.TodoEntity;
import com.example.todolist_app_project.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TodoService {

    private final TodoRepository todoRepository;

    // 모든 Todo 항목을 가져오기
    public List<TodoEntity> getTodoList() {
        return todoRepository.findAll();
    }

    // 새로운 Todo 항목 추가
    public TodoDTO create(String todoName) {
        TodoEntity todoEntity = TodoEntity.builder()
                .todoName(todoName)
                .build();
        TodoEntity createEntity = todoRepository.save(todoEntity);
        return TodoDTO.toTodoDTO(createEntity);
    }

    // Todo 항목 업데이트 (완료 상태 변경)
    public TodoDTO modify(Long id) {
        Optional<TodoEntity> optionalTodoEntity = todoRepository.findById(id);
        if (optionalTodoEntity.isPresent()) {
            TodoEntity todoEntity = optionalTodoEntity.get();
            TodoEntity modifyEntity = TodoEntity.builder()
                    .id(todoEntity.getId())
                    .todoName(todoEntity.getTodoName())
                    .completed(!todoEntity.isCompleted()) // 상태를 반전시킴
                    .build();
            todoRepository.save(modifyEntity);

            return TodoDTO.toTodoDTO(modifyEntity);
        } else {
            throw new IllegalArgumentException("Todo with id " + id + " not found");
        }
    }

    // Todo 항목 삭제
    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}
