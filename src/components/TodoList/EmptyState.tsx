
import React from "react";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  filter: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  let message = "Add your first task to get started";
  
  if (filter === "active") {
    message = "No active tasks found";
  } else if (filter === "completed") {
    message = "No completed tasks found";
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-2">Your list is empty</h3>
      <p className="text-muted-foreground max-w-xs">
        {message}
      </p>
    </motion.div>
  );
};

export default EmptyState;
