
import React from "react";
import { CheckCircle, Circle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Todo } from "./types";

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  if (todos.length === 0) return null;

  const completed = todos.filter(todo => todo.completed).length;
  const remaining = todos.length - completed;
  const percentComplete = todos.length > 0 
    ? Math.round((completed / todos.length) * 100) 
    : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 p-4 bg-secondary/50 rounded-xl border"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Progress</h3>
        <span className="text-sm text-muted-foreground">{percentComplete}% complete</span>
      </div>
      
      <div className="h-2 bg-background rounded-full overflow-hidden mb-4">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentComplete}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <CheckCircle className="h-4 w-4 mr-1 text-primary" />
            <span>Completed</span>
          </div>
          <span className="font-medium">{completed}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Circle className="h-4 w-4 mr-1" />
            <span>Remaining</span>
          </div>
          <span className="font-medium">{remaining}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <XCircle className="h-4 w-4 mr-1 text-destructive/70" />
            <span>Total</span>
          </div>
          <span className="font-medium">{todos.length}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoStats;
