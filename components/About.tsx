import React from 'react';
import { Section } from './Section';
import { User, MapPin, Calendar, Globe, Award } from 'lucide-react';
import { BIRTHDATE, ADDRESS } from '../constants';

export const About: React.FC = () => {
  return (
    <Section id="about" title="O mnie" subtitle="Poznaj mnie lepiej" light={false}>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
          <p>
            Jestem ambitnym i zmotywowanym 18-letnim programistą z Ukrainy, obecnie uczęszczam do trzeciej klasy technikum. 
            Posiadam solidną wiedzę z zakresu technologii webowych oraz praktyczne doświadczenie na stanowisku Full Stack Developer, 
            zdobyte podczas praktyk zawodowych.
          </p>
          <p>
            Moim głównym celem jest dalszy rozwój umiejętności w pracy nad innowacyjnymi projektami pod okiem doświadczonych specjalistów. 
            Cechuje mnie chęć ciągłego doskonalenia, umiejętność pracy w zespole oraz rozwiązywania problemów.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 pt-6">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Lokalizacja</p>
                <p className="text-slate-900 font-semibold">{ADDRESS}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Data urodzenia</p>
                <p className="text-slate-900 font-semibold">{BIRTHDATE}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Języki</p>
                <p className="text-slate-900 font-semibold">Polski (C1), Angielski (B2)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Status</p>
                <p className="text-slate-900 font-semibold">Uczeń / Stażysta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-8 shadow-2xl">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Award className="text-yellow-400" /> 
              Czym się zajmuję?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2.5 bg-blue-500 rounded-full shrink-0"></span>
                <p className="text-slate-300">Tworzenie responsywnych stron internetowych (RWD) przy użyciu HTML5, CSS3, JavaScript.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2.5 bg-blue-500 rounded-full shrink-0"></span>
                <p className="text-slate-300">Projektowanie i wdrażanie relacyjnych baz danych MySQL.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2.5 bg-blue-500 rounded-full shrink-0"></span>
                <p className="text-slate-300">Optymalizacja wydajności i utrzymanie kodu w środowisku Git.</p>
              </li>
              <li className="flex gap-4">
                <span className="w-2 h-2 mt-2.5 bg-blue-500 rounded-full shrink-0"></span>
                <p className="text-slate-300">Współpraca w zespole nad innowacyjnymi rozwiązaniami webowymi.</p>
              </li>
            </ul>
            <div className="pt-4">
               <a href="/cv.pdf" download className="inline-flex items-center justify-center w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                 Pobierz moje CV
               </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};