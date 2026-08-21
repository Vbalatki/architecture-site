import React from "react";
import { Search, X } from "lucide-react";

interface ProjectSearchProps {
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
}

export const ProjectSearch: React.FC<ProjectSearchProps> = React.memo(({ searchQuery, onChangeSearchQuery }) => {
  return (
    <div className="relative flex-1 max-w-md">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
        <Search size={16} />
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onChangeSearchQuery(e.target.value)}
        placeholder="Поиск по названию или описанию..."
        className="w-full bg-white border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
      />
      {searchQuery && (
        <button 
          onClick={() => onChangeSearchQuery("")}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-900 cursor-pointer focus:outline-none"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
});
