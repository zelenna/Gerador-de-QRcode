
import React, { useState, useEffect } from 'react';
import { ViewMode, QRCodeEntry, QRType } from './types';
import { useQRStore } from './store';
import { Dashboard } from './components/Dashboard';
import { QRGenerator } from './components/QRGenerator';
import { Analytics } from './components/Analytics';
import { PublicView } from './components/PublicView';
import { Shield, Layout, LogOut, Settings, BarChart3, HelpCircle, User, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const { items, addItem, updateItem, deleteItem, DEFAULT_STYLE, logScan } = useQRStore();
  const [view, setView] = useState<ViewMode>('dashboard');
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const activeItem = items.find(i => i.id === activeItemId);

  const handleCreate = (data: any) => {
    addItem(data);
    setView('dashboard');
  };

  const handleUpdate = (data: any) => {
    if (activeItemId) {
      updateItem(activeItemId, data);
      setView('dashboard');
      setActiveItemId(null);
    }
  };

  const handleDuplicate = (id: string) => {
    const original = items.find(i => i.id === id);
    if (original) {
      const { id: _, createdAt: __, analytics: ___, ...rest } = original;
      addItem({ ...rest, name: `${rest.name} (Cópia)` });
    }
  };

  if (view === 'public' && activeItem) {
    return <PublicView type={activeItem.type} data={activeItem.intermediateData!} />;
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950 transition-colors">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-primary-950 text-primary-300 p-6 border-r border-primary-900/50 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
            <Shield size={24} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-tight tracking-tight">QR Hub</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-500">Corporate Elite</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${view === 'dashboard' ? 'bg-white/10 text-white' : 'hover:text-white hover:bg-white/5'}`}
          >
            <Layout size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setView('create')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${view === 'create' ? 'bg-white/10 text-white' : 'hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 size={20} /> Analytics Global
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:text-white hover:bg-white/5">
            <Settings size={20} /> Configurações
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:text-white hover:bg-white/5">
            <HelpCircle size={20} /> Suporte
          </button>
        </nav>

        <div className="mt-auto space-y-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-white text-xs font-bold">JD</div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-semibold">Jane Doe</span>
                <span className="text-[10px] text-primary-500">Administrador</span>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary-900 hover:bg-primary-800 text-white text-xs font-bold rounded-lg transition-colors">
              <LogOut size={14} /> Sair do Painel
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-2">
            <div className="lg:hidden w-8 h-8 rounded bg-primary-600 text-white flex items-center justify-center mr-2">
               <Shield size={18} />
            </div>
            <h2 className="text-sm font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
              {view === 'dashboard' ? 'Painel Principal' : view === 'create' ? 'Criador de QR Code' : 'Monitoramento'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setDarkMode(!darkMode)}
               className="p-2 text-zinc-400 hover:text-primary-500 bg-zinc-50 dark:bg-zinc-800 rounded-lg transition-colors"
             >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Status</span>
                <span className="text-[10px] text-accent-500 font-bold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span> Online
                </span>
             </div>
             <div className="h-10 w-px bg-gray-100 dark:bg-zinc-800"></div>
             <button className="p-2 text-zinc-400 hover:text-primary-500 bg-zinc-50 dark:bg-zinc-800 rounded-lg transition-colors">
                <User size={20} />
             </button>
          </div>
        </header>

        <div className="p-8 max-w-[1600px] mx-auto">
          {view === 'dashboard' && (
            <Dashboard 
              items={items} 
              onAdd={() => setView('create')}
              onEdit={(id) => { setActiveItemId(id); setView('edit'); }}
              onAnalytics={(id) => { setActiveItemId(id); setView('analytics'); }}
              onDelete={deleteItem}
              onUpdateStatus={(id, status) => updateItem(id, { status })}
              onDuplicate={handleDuplicate}
            />
          )}

          {(view === 'create' || view === 'edit') && (
            <QRGenerator 
              initialData={activeItem}
              onSave={view === 'create' ? handleCreate : handleUpdate}
              onCancel={() => { setView('dashboard'); setActiveItemId(null); }}
              defaultStyle={DEFAULT_STYLE}
            />
          )}

          {view === 'analytics' && activeItem && (
            <Analytics 
              item={activeItem} 
              onBack={() => { setView('dashboard'); setActiveItemId(null); }} 
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
