import React from 'react';
import { Section } from './Section';
import { SKILLS } from '../constants';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const Skills: React.FC = () => {
  const techSkills = SKILLS.filter(s => s.category === 'frontend' || s.category === 'backend' || s.category === 'tools').sort((a, b) => b.level - a.level);
  const langSkills = SKILLS.filter(s => s.category === 'language');

  return (
    <Section id="skills" title="Umiejętności" subtitle="Technologie i narzędzia, z którymi pracuję">
      
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Technical Skills - Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-blue-500">
            Technologie Webowe
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={techSkills.slice(0, 8)} // Top 8 skills
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 12, fill: '#475569' }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
                  {techSkills.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Languages & Soft Skills - Radar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-purple-500">
            Języki Obce
          </h3>
          <div className="h-[400px] w-full flex justify-center items-center">
             <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={langSkills}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Poziom"
                    dataKey="level"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                  />
                  <Tooltip />
                </RadarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Grid for Mobile/Accessibility */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-slate-800">{skill.name}</h4>
              <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
              <div 
                className={`h-1.5 rounded-full ${
                  skill.category === 'frontend' ? 'bg-blue-500' :
                  skill.category === 'backend' ? 'bg-indigo-500' :
                  skill.category === 'tools' ? 'bg-emerald-500' : 'bg-purple-500'
                }`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            {skill.description && (
              <p className="text-xs text-slate-500 mt-2">{skill.description}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};