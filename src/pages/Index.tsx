import React from "react";
import TodoList from "@/components/TodoList/TodoList";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background overflow-hidden">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-[5%] right-[5%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" 
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-blue-300/20 blur-[60px]" 
        />
      </div>

      {/* Header */}
      <header className="w-full py-6 px-4 mb-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium text-sm">T</span>
            </div>
            <span className="font-medium text-lg">Taskly</span>
          </motion.div>
          
          {/* Theme Toggle Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <TodoList />
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full py-6 mt-8 text-center text-sm text-muted-foreground"
      >
        <div className="max-w-6xl mx-auto px-4">
          <p>Designed with precision and attention to detail</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
