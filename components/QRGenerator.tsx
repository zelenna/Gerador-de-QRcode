
import React, { useState } from 'react';
import { QRType, QRStyle, BioPageData, EventPageData, QRCodeEntry } from '../types';
import { QRCanvas } from './QRCanvas';
// Added Shield to the list of imports from lucide-react
import { 
  Globe, MessageCircle, Mail, Phone, MapPin, 
  CreditCard, User, Calendar, ArrowLeft, 
  Save, Palette, Type, ChevronRight, Info, Shield
} from 'lucide-react';

interface QRGeneratorProps {
  initialData?: QRCodeEntry;
  onSave: (data: any) => void;
  onCancel: () => void;
  defaultStyle: QRStyle;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ 
  initialData, 
  onSave, 
  onCancel, 
  defaultStyle 
}) => {
  const [step, setStep] = useState<'type' | 'content' | 'style'>('type');
  const [type, setType] = useState<QRType>(initialData?.type || QRType.URL);
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [style, setStyle] = useState<QRStyle>(initialData?.style || defaultStyle);
  
  const [bioData, setBioData] = useState<BioPageData>(
    (initialData?.intermediateData as BioPageData) || {
      name: '',
      role: '',
      company: '',
      email: '',
      phone: '',
      links: [],
      theme: { primary: '#9333ea', background: '#faf5ff' }
    }
  );

  const [eventData, setEventData] = useState<EventPageData>(
    (initialData?.intermediateData as EventPageData) || {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      ctaLabel: 'Inscreva-se',
      ctaUrl: '',
      theme: { primary: '#9333ea', background: '#faf5ff' }
    }
  );

  const types = [
    { id: QRType.URL, label: 'Website', icon: <Globe size={24} />, desc: 'Link direto para site ou landing page' },
    { id: QRType.WHATSAPP, label: 'WhatsApp', icon: <MessageCircle size={24} />, desc: 'Abrir conversa direto no app' },
    { id: QRType.EMAIL, label: 'E-mail', icon: <Mail size={24} />, desc: 'Enviar e-mail pré-preenchido' },
    { id: QRType.PHONE, label: 'Telefone', icon: <Phone size={24} />, desc: 'Realizar uma chamada' },
    { id: QRType.MAPS, label: 'Localização', icon: <MapPin size={24} />, desc: 'Endereço no Google Maps' },
    { id: QRType.PIX, label: 'Pagamento Pix', icon: <CreditCard size={24} />, desc: 'Facilitar recebimento via Pix' },
    { id: QRType.BIO, label: 'Cartão de Visita', icon: <User size={24} />, desc: 'Página de bio com contatos' },
    { id: QRType.EVENT, label: 'Página de Evento', icon: <Calendar size={24} />, desc: 'Informações e RSVP' },
  ];

  const handleSave = () => {
    if (!name) return alert('Dê um nome ao seu QR Code');
    let finalContent = content;
    let intermediateData = undefined;
    if (type === QRType.BIO) { intermediateData = bioData; finalContent = '#/view/bio-placeholder'; }
    else if (type === QRType.EVENT) { intermediateData = eventData; finalContent = '#/view/event-placeholder'; }
    onSave({ name, description, type, content: finalContent, style, intermediateData, status: 'active' });
  };

  const renderContentForm = () => {
    const inputClass = "w-full p-3 border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition-all";
    switch (type) {
      case QRType.URL:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Link de Destino (URL)</label>
            <input type="url" placeholder="https://suaempresa.com.br" className={inputClass} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        );
      case QRType.WHATSAPP:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Número (com DDD)</label>
            <input type="text" placeholder="5511999999999" className={inputClass} value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        );
      case QRType.BIO:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome Completo</label>
                <input type="text" className={inputClass} value={bioData.name} onChange={(e) => setBioData({...bioData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Cargo</label>
                <input type="text" className={inputClass} value={bioData.role} onChange={(e) => setBioData({...bioData, role: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Empresa</label>
              <input type="text" className={inputClass} value={bioData.company} onChange={(e) => setBioData({...bioData, company: e.target.value})} />
            </div>
          </div>
        );
      case QRType.EVENT:
        return (
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Título do Evento</label>
                <input type="text" className={inputClass} value={eventData.title} onChange={(e) => setEventData({...eventData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Data</label>
                  <input type="date" className={inputClass} value={eventData.date} onChange={(e) => setEventData({...eventData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Horário</label>
                  <input type="time" className={inputClass} value={eventData.time} onChange={(e) => setEventData({...eventData, time: e.target.value})} />
                </div>
              </div>
          </div>
        );
      default: return <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-dashed text-zinc-400">Em breve...</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onCancel} className="flex items-center gap-2 text-zinc-500 hover:text-primary-600 transition-colors font-medium">
          <ArrowLeft size={20} /> Dashboard
        </button>
        <div className="flex gap-2">
          {['type', 'content', 'style'].map((s, idx) => (
            <div key={s} className="flex items-center">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all shadow-sm ${step === s ? 'bg-primary-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                 {idx + 1}
               </div>
               {idx < 2 && <div className={`w-8 h-1 mx-2 rounded-full ${['type','content','style'].indexOf(step) > idx ? 'bg-primary-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 transition-colors">
            {step === 'type' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Qual tipo de QR Code?</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">Selecione o formato ideal para seu objetivo corporativo.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {types.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all ${
                        type === t.id 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm' 
                          : 'border-zinc-100 dark:border-zinc-800 hover:border-primary-200'
                      }`}
                    >
                      <div className={`${type === t.id ? 'text-primary-600 dark:text-primary-400' : 'text-zinc-400'} mt-1`}>
                        {t.icon}
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${type === t.id ? 'text-primary-900 dark:text-primary-100' : 'text-zinc-900 dark:text-zinc-100'}`}>{t.label}</div>
                        <div className="text-[11px] text-zinc-500 mt-1 leading-tight">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <button onClick={() => setStep('content')} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2">
                    Continuar <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 'content' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div>
                   <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Informações do Conteúdo</h2>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm">Preencha os dados que serão codificados.</p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Nome Interno</label>
                      <input type="text" placeholder="Ex: Campanha RH" className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest">Categoria</label>
                      <input type="text" placeholder="Ex: RH, MKT" className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                  </div>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800"></div>
                  {renderContentForm()}
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep('type')} className="px-8 py-3 rounded-xl font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Voltar</button>
                  <button onClick={() => setStep('style')} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all flex items-center gap-2">
                    Personalizar Visual <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {step === 'style' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div>
                   <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Estética Profissional</h2>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm">Cores e logotipos da sua marca.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <Palette size={14} className="text-primary-500" /> Esquema de Cores
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-[10px] text-zinc-500 uppercase font-bold">Código</span>
                          <div className="flex items-center gap-2 p-2 border dark:border-zinc-700 rounded-lg">
                            <input type="color" value={style.fgColor} onChange={(e) => setStyle({...style, fgColor: e.target.value})} className="w-8 h-8 rounded-md cursor-pointer border-0 bg-transparent" />
                            <input type="text" value={style.fgColor} onChange={(e) => setStyle({...style, fgColor: e.target.value})} className="text-xs uppercase w-full bg-transparent dark:text-white focus:outline-none font-mono" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] text-zinc-500 uppercase font-bold">Fundo</span>
                          <div className="flex items-center gap-2 p-2 border dark:border-zinc-700 rounded-lg">
                            <input type="color" value={style.bgColor} onChange={(e) => setStyle({...style, bgColor: e.target.value})} className="w-8 h-8 rounded-md cursor-pointer border-0 bg-transparent" />
                            <input type="text" value={style.bgColor} onChange={(e) => setStyle({...style, bgColor: e.target.value})} className="text-xs uppercase w-full bg-transparent dark:text-white focus:outline-none font-mono" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                       <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <Type size={14} className="text-primary-500" /> Detalhes & Logo
                      </label>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border dark:border-zinc-700 rounded-lg">
                          <span className="text-sm font-medium dark:text-zinc-300">Incluir Logo Central</span>
                          <input type="checkbox" checked={style.includeLogo} onChange={(e) => setStyle({...style, includeLogo: e.target.checked})} className="w-5 h-5 accent-primary-600" />
                        </div>
                        {style.includeLogo && (
                          <input type="text" placeholder="URL da Logo (PNG)" className="w-full p-2.5 border dark:border-zinc-700 rounded-lg text-sm bg-transparent dark:text-white" value={style.logoUrl || ''} onChange={(e) => setStyle({...style, logoUrl: e.target.value})} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 flex flex-col items-center justify-center border border-zinc-100 dark:border-zinc-800">
                    <QRCanvas value={content || 'Preview'} style={style} size={200} />
                    <p className="mt-4 text-[10px] text-primary-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span> Visualização ao vivo
                    </p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button onClick={() => setStep('content')} className="px-8 py-3 rounded-xl font-bold text-zinc-400">Voltar</button>
                  <button onClick={handleSave} className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg flex items-center gap-2">
                    <Save size={20} /> Salvar QR Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-6">
           <div className="bg-primary-950 rounded-2xl p-6 text-white overflow-hidden relative shadow-xl">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Info size={20} className="text-accent-500" />
                Resumo Corporativo
              </h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between text-xs py-1.5 border-b border-white/10">
                  <span className="text-white/50 uppercase tracking-widest font-bold">Tipo:</span>
                  <span className="font-bold text-secondary-500">{type}</span>
                </div>
                <div className="flex justify-between text-xs py-1.5 border-b border-white/10">
                  <span className="text-white/50 uppercase tracking-widest font-bold">Nome:</span>
                  <span className="font-bold">{name || '-'}</span>
                </div>
              </div>
              <p className="text-white/40 text-[10px] mt-6 leading-relaxed">Este QR Code é dinâmico. Você poderá alterar o destino no futuro sem trocar a imagem.</p>
            </div>
            {/* Fixed: Shield icon is now imported correctly */}
            <div className="absolute -bottom-10 -right-10 text-white/5 transform rotate-45 scale-150">
               <Shield size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
