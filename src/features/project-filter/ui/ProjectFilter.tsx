import React from "react";

interface ProjectFilterProps {
  selectedCategory: string;
  onChangeCategory: (category: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = React.memo(({ selectedCategory, onChangeCategory }) => {
  const filters = [
    { id: "all", label: "Все объекты" },
    { id: "commercial", label: "Коммерческие" },
    { id: "residential", label: "Жилые объекты" }
  ];

  return (
    <div className="flex flex-wrap gap-2 text-[10px] font-mono tracking-wider uppercase font-bold text-slate-500">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onChangeCategory(filter.id)}
          className={`px-5 py-3 border transition-all cursor-pointer focus:outline-none ${selectedCategory === filter.id 
            ? "bg-slate-900 border-slate-900 text-white" 
            : "bg-white border-slate-200 hover:border-slate-400 text-slate-600"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});
