
import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText("");
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={cn(
        "flex items-center p-3 mb-6 rounded-xl border bg-card shadow-sm",
        "transition-all duration-300 ease-in-out",
        isFocused && "ring-2 ring-ring/30 border-ring"
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Add a new task..."
        className="flex-grow bg-transparent focus:outline-none text-base px-2 py-2"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={!text.trim()}
        className={cn(
          "flex-shrink-0 ml-2 rounded-lg bg-primary text-primary-foreground p-2",
          "transition-all duration-300 ease-in-out",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Add todo"
      >
        <Plus className="h-5 w-5" />
      </motion.button>
    </motion.form>
  );
};

export default TodoInput;
