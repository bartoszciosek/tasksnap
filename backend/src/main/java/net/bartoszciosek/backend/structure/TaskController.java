package net.bartoszciosek.backend.structure;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @PutMapping("/{id}/toggle")
    public Task toggleTaskStatus(@PathVariable Long id) {
        var task = repository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setCompleted(!task.isCompleted());

        return repository.save(task);
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }
}