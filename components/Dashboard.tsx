
import React, { useState } from 'react';
import { QRCodeEntry, QRType } from '../types';
import { LayoutGrid, List, Search, Plus, Trash2, Edit, BarChart2, MoreVertical, Copy, Power } from 'lucide-react';

interface DashboardProps {
  items: QRCodeEntry[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onAnalytics: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: 'active' | 'inactive') => void;
  onDuplicate: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  items,
  onAdd,
  onEdit,
  onAnalytics,
  onDelete,
  onUpdateStatus,
  onDuplicate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredItems = items.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Seus QR Codes</h1>
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
        >
          <Plus size={20} />
          Criar Novo QR
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 transition-colors">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou descrição..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
          <button 
            onClick={() => setView('grid')}
            className={`p-2 rounded-md transition-all ${view === 'grid' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary-600' : 'text-zinc-500'}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setView('list')}
            className={`p-2 rounded-md transition-all ${view === 'list' ? 'bg-white dark:bg-zinc-700 shadow-sm text-primary-600' : 'text-zinc-500'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-12 text-center transition-colors">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-400 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Nenhum QR Code encontrado</h3>
          <p className="text-zinc-500 max-w-sm mx-auto mt-1">Sua biblioteca está vazia. Comece criando um QR code profissional agora.</p>
          <button onClick={onAdd} className="mt-6 text-primary-600 font-semibold hover:underline">Criar agora →</button>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <div className="p-4 flex flex-col items-center justify-center bg-zinc-50/50 dark:bg-zinc-800/50 relative">
                <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === 'active' ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400'}`}>
                  {item.status === 'active' ? 'Ativo' : 'Inativo'}
                </div>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(item.type === QRType.URL ? item.content : `#/view/${item.id}`)}&color=${item.style.fgColor.replace('#', '')}&bgcolor=${item.style.bgColor.replace('#', '')}`}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-zinc-900 dark:text-white truncate" title={item.name}>{item.name}</h3>
                  <span className="text-[10px] text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-0.5 rounded uppercase font-bold tracking-tight">{item.type}</span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4 h-10">{item.description || 'Sem descrição'}</p>
                
                <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-4 border-t border-zinc-50 dark:border-zinc-800 pt-4">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1 text-accent-600 dark:text-accent-400 font-bold uppercase tracking-wider">
                    <BarChart2 size={12} />
                    {item.analytics.length} Scans
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                   <button onClick={() => onEdit(item.id)} className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-900/40 dark:hover:text-primary-300 transition-all flex items-center justify-center gap-1">
                     <Edit size={14} /> Editar
                   </button>
                   <button onClick={() => onAnalytics(item.id)} className="p-2 bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400 rounded-lg hover:bg-accent-100 transition-colors">
                     <BarChart2 size={18} />
                   </button>
                   <div className="relative group/menu">
                      <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                      <div className="absolute right-0 bottom-full mb-2 hidden group-hover/menu:block bg-white dark:bg-zinc-800 shadow-xl rounded-xl border border-gray-100 dark:border-zinc-700 py-2 w-48 z-10 animate-in fade-in slide-in-from-bottom-2">
                        <button onClick={() => onDuplicate(item.id)} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2">
                          <Copy size={14} /> Duplicar
                        </button>
                        <button onClick={() => onUpdateStatus(item.id, item.status === 'active' ? 'inactive' : 'active')} className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2">
                          <Power size={14} /> {item.status === 'active' ? 'Desativar' : 'Ativar'}
                        </button>
                        <div className="h-px bg-zinc-100 dark:bg-zinc-700 my-1"></div>
                        <button onClick={() => onDelete(item.id)} className="w-full text-left px-4 py-2 text-sm text-secondary-500 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 flex items-center gap-2 font-medium">
                          <Trash2 size={14} /> Excluir
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors">
          <table className="w-full text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Identificação</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Métricas</th>
                <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded p-1">
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=40x40&data=${encodeURIComponent(item.content)}`} className="w-full h-full opacity-80" alt="" />
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white text-sm">{item.name}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 max-w-[200px]">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded tracking-tighter">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-accent-500' : 'bg-zinc-300'}`}></div>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 capitalize">{item.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-bold">
                      <BarChart2 size={16} className="text-accent-500" />
                      {item.analytics.length} Scans
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <button onClick={() => onEdit(item.id)} className="p-2 text-zinc-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => onAnalytics(item.id)} className="p-2 text-zinc-400 hover:text-accent-500 transition-colors">
                      <BarChart2 size={16} />
                    </button>
                    <button onClick={() => onDelete(item.id)} className="p-2 text-zinc-400 hover:text-secondary-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
