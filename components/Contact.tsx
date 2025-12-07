import React, { useState } from 'react';
import { Section } from './Section';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { EMAIL, PHONE, ADDRESS } from '../constants';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <Section id="contact" title="Kontakt" subtitle="Zainteresowany współpracą? Napisz do mnie.">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="prose prose-slate">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Porozmawiajmy o projektach</h3>
            <p className="text-slate-600 leading-relaxed">
              Szukam możliwości rozwoju jako Full Stack Developer. Jeśli masz pytania dotyczące mojego doświadczenia 
              lub chcesz omówić potencjalną współpracę, jestem do dyspozycji.
            </p>
          </div>

          <div className="space-y-6">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Email</p>
                <p className="text-slate-900 font-semibold">{EMAIL}</p>
              </div>
            </a>

            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Telefon</p>
                <p className="text-slate-900 font-semibold">{PHONE}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Lokalizacja</p>
                <p className="text-slate-900 font-semibold">{ADDRESS}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Imię</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Twoje imię"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="twoj@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-slate-700">Temat</label>
              <input 
                type="text" 
                id="subject"
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="W czym mogę pomóc?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-700">Wiadomość</label>
              <textarea 
                id="message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Treść wiadomości..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting || submitted}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                submitted ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
              } disabled:opacity-70`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Wysyłanie...
                </>
              ) : submitted ? (
                "Wysłano!"
              ) : (
                <>
                  Wyślij wiadomość
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};