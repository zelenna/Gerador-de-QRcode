
import React from 'react';
import { BioPageData, EventPageData, QRType } from '../types';
import { Mail, Phone, ExternalLink, Calendar, MapPin, Clock, Save } from 'lucide-react';

interface PublicViewProps {
  type: QRType;
  data: BioPageData | EventPageData;
}

export const PublicView: React.FC<PublicViewProps> = ({ type, data }) => {
  const primaryColor = "#9333ea"; // Default purple
  const secondaryColor = "#ec4899"; // Default pink

  if (type === QRType.BIO) {
    const d = data as BioPageData;
    return (
      <div className="min-h-screen flex flex-col items-center p-6 bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-700">
          <div className="h-40 bg-gradient-to-br from-primary-900 to-secondary-500 flex items-end justify-center">
             <div className="w-28 h-28 rounded-3xl border-4 border-white dark:border-zinc-900 bg-zinc-200 -mb-14 overflow-hidden shadow-2xl transform -rotate-3">
               <img src={`https://picsum.photos/seed/${d.name || 'user'}/200`} alt={d.name} className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="mt-20 text-center px-8 pb-10">
            <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">{d.name || 'Identidade Corporativa'}</h1>
            <p className="text-primary-600 dark:text-primary-400 font-bold text-xs uppercase tracking-widest mt-2">{d.role || 'Cargo'} • {d.company || 'Empresa'}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-10">
              <a href={`mailto:${d.email}`} className="flex flex-col items-center gap-2 p-5 bg-zinc-50 dark:bg-zinc-800 rounded-3xl hover:scale-105 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/20">
                   <Mail size={22} />
                </div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">E-mail</span>
              </a>
              <a href={`tel:${d.phone}`} className="flex flex-col items-center gap-2 p-5 bg-zinc-50 dark:bg-zinc-800 rounded-3xl hover:scale-105 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-secondary-500 text-white flex items-center justify-center shadow-lg shadow-secondary-500/20">
                   <Phone size={22} />
                </div>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Telefone</span>
              </a>
            </div>

            <div className="mt-8 space-y-4">
               <button className="w-full py-5 bg-primary-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-3">
                 <Save size={20} /> Salvar V-Card
               </button>
               {(d.links || []).map((link, idx) => (
                 <a key={idx} href={link.url} target="_blank" className="w-full py-5 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl font-bold text-zinc-700 dark:text-zinc-300 hover:border-primary-500 transition-all flex items-center justify-center gap-3 text-sm">
                   <ExternalLink size={18} /> {link.label}
                 </a>
               ))}
            </div>
            
            <div className="mt-14 flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-2">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=corp-qr" className="w-6 h-6 opacity-20 dark:invert" alt="" />
              </div>
              <p className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em]">Powered by Corporate Hub</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === QRType.EVENT) {
    const d = data as EventPageData;
    return (
      <div className="min-h-screen flex flex-col items-center p-6 bg-zinc-950">
        <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          <div className="aspect-video w-full relative">
             <img src={`https://picsum.photos/seed/${d.title || 'event'}/800/450`} alt={d.title} className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
             <div className="absolute bottom-10 left-10 right-10">
                <span className="bg-accent-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block shadow-lg shadow-accent-500/30">Destaque</span>
                <h1 className="text-3xl font-black text-white leading-none tracking-tighter">{d.title || 'Título do Evento'}</h1>
             </div>
          </div>
          <div className="p-10">
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-4 bg-zinc-800/50 p-5 rounded-3xl flex-1 min-w-[160px] border border-zinc-700/50">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-xl">
                   <Calendar size={20} />
                </div>
                <div>
                   <div className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Data</div>
                   <div className="text-sm font-bold text-white">{d.date || '00/00/0000'}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-zinc-800/50 p-5 rounded-3xl flex-1 min-w-[160px] border border-zinc-700/50">
                <div className="w-12 h-12 rounded-2xl bg-secondary-500 text-white flex items-center justify-center shadow-xl">
                   <Clock size={20} />
                </div>
                <div>
                   <div className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Horário</div>
                   <div className="text-sm font-bold text-white">{d.time || '00:00'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
               <div className="flex items-start gap-5">
                 <div className="mt-1 text-accent-500"><MapPin size={24} /></div>
                 <div>
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Localização</h3>
                    <p className="text-sm text-zinc-300 font-medium leading-relaxed">{d.location || 'Centro de Convenções Corporativas'}</p>
                 </div>
               </div>

               <div className="h-px bg-zinc-800 w-full"></div>

               <div>
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Resumo</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    {d.description || 'Nenhuma descrição detalhada disponível.'}
                  </p>
               </div>
            </div>

            <div className="mt-12">
               <button className="w-full py-6 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-3xl font-black text-lg uppercase tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-primary-500/20 transform active:scale-95">
                 {d.ctaLabel || 'Confirmar Presença'}
               </button>
               <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-6">Acesso restrito a colaboradores autorizados.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-center p-10">
       <div className="max-w-xs space-y-6">
          <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto text-primary-500 animate-pulse">
            <ExternalLink size={36} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Redirecionando</h1>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed">Sua jornada corporativa está a um passo. Prepare-se para a experiência.</p>
       </div>
    </div>
  );
};
