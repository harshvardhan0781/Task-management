
import React, { useState, useRef, useEffect } from "react";
import { Check, Trash, Edit, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={cn(
        "group flex items-center p-4 mb-3 rounded-xl border bg-card shadow-sm",
        "transition-all duration-300 ease-in-out",
        todo.completed && "bg-secondary border-secondary"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3",
          "transition-all duration-300 ease-in-out",
          todo.completed 
            ? "bg-primary border-primary" 
            : "border-input hover:border-primary/50"
        )}
      >
        {todo.completed && (
          <Check className="h-4 w-4 text-primary-foreground" />
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent focus:outline-none border-b border-primary py-1"
          autoFocus
        />
      ) : (
        <span
          className={cn(
            "flex-grow text-base transition-all duration-300",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.text}
        </span>
      )}

      <div className="flex-shrink-0 flex ml-2 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {isEditing ? (
          <button
            onClick={() => {
              setEditValue(todo.text);
              setIsEditing(false);
            }}
            className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Edit todo"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 rounded-full hover:bg-destructive hover:text-destructive-foreground text-muted-foreground transition-colors"
          aria-label="Delete todo"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </motion.li>
  );
};

export default TodoItem;
