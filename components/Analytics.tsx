
import React from 'react';
import { QRCodeEntry } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { ArrowLeft, Calendar, Smartphone, Globe, TrendingUp } from 'lucide-react';

interface AnalyticsProps {
  item: QRCodeEntry;
  onBack: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ item, onBack }) => {
  const scanData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = date.toLocaleDateString('pt-BR', { weekday: 'short' });
    return {
      day: dayStr,
      scans: Math.floor(Math.random() * 80) + 20 
    };
  });

  const deviceData = [
    { name: 'Mobile', value: 85 },
    { name: 'Desktop', value: 15 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 text-zinc-500 hover:text-primary-600 shadow-sm transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
           <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{item.name}</h1>
           <p className="text-zinc-500 dark:text-zinc-400 text-sm">Monitoramento de tráfego e engajamento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
           <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Scans</div>
           <div className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tighter">{item.analytics.length || 247}</div>
           <div className="mt-2 flex items-center gap-1 text-accent-500 text-xs font-bold">
             <TrendingUp size={14} /> +24% hoje
           </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
           <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Engajamento</div>
           <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 tracking-tighter">42.8%</div>
           <div className="mt-2 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">Altas taxas de clique</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
           <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Principal Canal</div>
           <div className="text-xl font-bold text-secondary-500 flex items-center gap-2">
             <Smartphone size={18} /> Mobile App
           </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
           <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-2">Conversão</div>
           <div className="text-3xl font-bold text-accent-500 tracking-tighter">12.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
               <Calendar size={18} className="text-primary-500" />
               Acessos Semanais
             </h3>
           </div>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={scanData}>
                 <defs>
                   <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2}/>
                     <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                 <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: '#18181b', color: '#fff'}} itemStyle={{color: '#a855f7'}} />
                 <Area type="monotone" dataKey="scans" stroke="#9333ea" strokeWidth={4} fillOpacity={1} fill="url(#colorScans)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
           <div className="flex items-center justify-between mb-8">
             <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
               <Smartphone size={18} className="text-secondary-500" />
               Hardware & OS
             </h3>
           </div>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={deviceData} layout="vertical">
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.2} />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', background: '#18181b', color: '#fff'}} />
                 <Bar dataKey="value" fill="#ec4899" radius={[0, 10, 10, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};
