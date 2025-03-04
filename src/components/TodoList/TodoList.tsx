
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import FilterTabs from "./FilterTabs";
import EmptyState from "./EmptyState";
import TodoStats from "./TodoStats";
import { Todo, TodoFilter } from "./types";
import { useLocalStorage } from "./useLocalStorage";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const { toast } = useToast();

  // Get filtered todos based on the current filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Sort todos: incomplete first, then by creation date (newest first)
  filteredTodos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Get counts for the tabs
  const counts = {
    all: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  // Add a new todo
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    
    setTodos([newTodo, ...todos]);
    
    toast({
      title: "Task added",
      description: "Your new task has been added.",
    });
  };

  // Toggle todo completion status
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed } 
          : todo
      )
    );
  };

  // Delete a todo
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    
    toast({
      title: "Task deleted",
      description: "Your task has been deleted.",
      variant: "destructive",
    });
  };

  // Edit a todo
  const handleEditTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id 
          ? { ...todo, text: newText } 
          : todo
      )
    );
  };

  // Change the current filter
  const handleFilterChange = (newFilter: TodoFilter) => {
    setFilter(newFilter);
  };

  // Container variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Tasks</h1>
        <p className="text-muted-foreground">Organize your day with clarity and purpose</p>
      </motion.div>

      <TodoInput onAddTodo={handleAddTodo} />
      
      <FilterTabs 
        filter={filter} 
        onFilterChange={handleFilterChange} 
        counts={counts}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredTodos.length > 0 ? (
            <motion.ul layout className="space-y-1">
              <AnimatePresence initial={false}>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <EmptyState filter={filter} />
          )}
        </AnimatePresence>
      </motion.div>
      
      <TodoStats todos={todos} />
    </motion.div>
  );
};

export default TodoList;
