export interface Specs {
  scale: string;
  area: string;
  format: string;
  sheets: string;
  software: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  type: string;
  folder: string;
  description: string;
  specs: Specs;
  image: string;
  drawings: string[];
}
