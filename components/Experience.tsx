import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '../constants';
import { Briefcase, GraduationCap } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Doświadczenie i Edukacja" subtitle="Moja ścieżka rozwoju zawodowego" light={false}>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
          
          {EXPERIENCE_DATA.map((item, index) => {
            const isWork = item.type === 'work';
            const Icon = isWork ? Briefcase : GraduationCap;
            const alignClass = index % 2 === 0 ? 'md:flex-row-reverse' : '';

            return (
              <div key={item.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isWork ? 'is-work' : 'is-education'}`}>
                
                {/* Icon Circle */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Icon size={18} className={isWork ? "text-blue-600" : "text-emerald-600"} />
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1">
                    <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                    <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-xs font-semibold text-slate-500 whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-blue-600 font-medium text-sm mb-4">{item.organization}</div>
                  <ul className="space-y-2">
                    {item.description.map((desc, i) => (
                      <li key={i} className="text-slate-600 text-sm flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></span>
                        <span className="leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};