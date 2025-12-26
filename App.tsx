import React, { useState } from 'react';
import { Car, Globe, LayoutDashboard, Calculator, FileBarChart, Newspaper, Lock } from 'lucide-react';
import { Language, UserRole } from './types';
import { CONTENT } from './constants';
import SubsidyWizard from './components/SubsidyWizard';
import VSMEWizard from './components/VSMEWizard';
import NewsHub from './components/NewsHub';
import AdminPanel from './components/AdminPanel';

type View = 'landing' | 'dashboard' | 'subsidy' | 'vsme' | 'news' | 'admin';

const App = () => {
  const [lang, setLang] = useState<Language>('nl');
  const [view, setView] = useState<View>('landing');
  const [role, setRole] = useState<UserRole>(null);
  
  const t = CONTENT[lang];

  // Simple authentication for demo
  const handleLogin = () => setView('dashboard');
  const handleLogout = () => {
    setView('landing');
    setRole(null);
  };

  // Render content based on current view
  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
             <div className="flex justify-between items-center mb-10">
               <div>
                 <h1 className="text-3xl font-black text-slate-900 mb-2">{t.dashboard.welcome}</h1>
                 <p className="text-slate-500 font-medium">AutoParts NL B.V. (Demo)</p>
               </div>
               <button onClick={handleLogout} className="text-sm font-bold text-slate-400 hover:text-red-500">Log Out</button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div onClick={() => setView('subsidy')} className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Calculator size={28}/></div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">{t.dashboard.subsidy_title}</h2>
                    <p className="text-slate-500 mb-8">{t.dashboard.subsidy_desc}</p>
                    <span className="text-blue-600 font-black text-sm uppercase tracking-wider">{t.dashboard.btn_scan} &rarr;</span>
                </div>

                <div onClick={() => setView('vsme')} className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><FileBarChart size={28}/></div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">{t.dashboard.vsme_title}</h2>
                    <p className="text-slate-500 mb-8">{t.dashboard.vsme_desc}</p>
                    <span className="text-green-600 font-black text-sm uppercase tracking-wider">{t.dashboard.btn_create} &rarr;</span>
                </div>

                <div onClick={() => setView('news')} className="group bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Newspaper size={28}/></div>
                    <h2 className="text-2xl font-bold mb-2 text-slate-900">{CONTENT[lang].nav.news}</h2>
                    <p className="text-slate-500 mb-8">Latest industry intelligence.</p>
                    <span className="text-purple-600 font-black text-sm uppercase tracking-wider">Read Updates &rarr;</span>
                </div>
             </div>
          </div>
        );
      case 'subsidy':
        return <SubsidyWizard lang={lang} onExit={() => setView('dashboard')} />;
      case 'vsme':
        return <VSMEWizard onExit={() => setView('dashboard')} />;
      case 'news':
        return <NewsHub lang={lang} onBack={() => setView(role ? 'dashboard' : 'landing')} />;
      case 'admin':
        return <AdminPanel onExit={() => setView('landing')} />;
      default:
        // Landing Page
        return (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="bg-slate-900 text-white pt-32 pb-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 opacity-10 transform skew-x-12 translate-x-20"></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">{t.hero.title}</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 font-medium">{t.hero.subtitle}</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-900/50 transition transform hover:scale-105">{t.hero.cta}</button>
                        <button onClick={() => setView('news')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition">News Hub</button>
                    </div>
                </div>
            </div>

            {/* Roles Grid */}
            <div className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-xs font-black uppercase text-blue-600 tracking-widest mb-2">Platform</h2>
                    <h3 className="text-3xl font-black text-slate-900">Built for every role</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(t.roles).map(([key, label]) => (
                        <div key={key} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition text-center flex flex-col items-center justify-center aspect-square">
                            <div className="bg-blue-50 p-3 rounded-full text-blue-600 mb-4"><Car size={24}/></div>
                            <span className="font-bold text-slate-800">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Footer */}
            <div className="bg-slate-900 text-slate-500 py-12 text-center text-sm font-bold">
                <p>&copy; 2026 Demandio B.V.</p>
                <div className="mt-4">
                    <button onClick={() => setView('admin')} className="opacity-20 hover:opacity-100 transition"><Lock size={12}/></button>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      {/* Navbar (visible on Landing and News, hidden on Dashboard usually, but keeping simple here) */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(role ? 'dashboard' : 'landing')}>
            <div className="bg-blue-900 text-white p-1.5 rounded-lg"><Car size={20} /></div>
            <span className="font-black text-xl tracking-tight text-slate-900">Demandio</span>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={() => setLang(l => l === 'en' ? 'nl' : 'en')} className="flex items-center gap-1 text-xs font-black uppercase bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition text-slate-600">
                <Globe size={12} /> {lang.toUpperCase()}
            </button>
            {view === 'landing' && (
                <button onClick={handleLogin} className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">{t.nav.login}</button>
            )}
            {view === 'dashboard' && (
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">JD</div>
            )}
        </div>
      </nav>

      <div className="pt-16">
        {renderView()}
      </div>
    </div>
  );
};

export default App;