import React from "react";

export interface Company {
  id: string;
  name: string;
  logo?: string; // путь к файлу лого, необязательно
  url?: string;  // ссылка на сайт компании, необязательно
}

interface CompaniesProps {
  companies: Company[];
  title?: string;
}

const CompanyItem: React.FC<{ company: Company }> = React.memo(({ company }) => {
  const content = company.logo ? (
    <img
      src={company.logo}
      alt={company.name}
      loading="lazy"
      decoding="async"
      className="max-h-10 lg:max-h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
    />
  ) : (
    <span className="text-sm lg:text-base font-bold tracking-tight text-slate-400 group-hover:text-slate-900 transition-colors uppercase font-mono text-center px-2">
      {company.name}
    </span>
  );

  return (
    <div className="flex items-center justify-center h-20 lg:h-24 px-4 group">
      {company.url ? (
        <a
          href={company.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-full h-full cursor-pointer"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
});

export const Companies: React.FC<CompaniesProps> = React.memo(({ 
  companies, 
  title = "Нам доверяют" 
}) => {
  if (companies.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 lg:mb-14 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 font-bold">
            {title}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-slate-200 border border-slate-200">
          {companies.map((company) => (
            <div key={company.id} className="bg-slate-50">
              <CompanyItem company={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
