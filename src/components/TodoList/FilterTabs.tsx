
import React from "react";
import { cn } from "@/lib/utils";
import { TodoFilter } from "./types";
import { motion } from "framer-motion";

interface FilterTabsProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  filter, 
  onFilterChange,
  counts
}) => {
  const tabs: { value: TodoFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex justify-center mb-6">
      <div className="p-1 bg-secondary rounded-lg inline-flex">
        {tabs.map((tab) => (
          <motion.button
            key={tab.value}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterChange(tab.value)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
              "focus:outline-none",
              filter === tab.value 
                ? "text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {filter === tab.value && (
              <motion.span
                layoutId="activeFilterTab"
                className="absolute inset-0 bg-primary rounded-md"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative">
              {tab.label} 
              <span className="ml-1.5 px-1.5 py-0.5 text-xs rounded-full bg-background/80">
                {counts[tab.value]}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
