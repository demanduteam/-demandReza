import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Article, Language } from '../types';
import { ArrowLeft, Clock, ExternalLink } from 'lucide-react';

interface Props {
  lang: Language;
  onBack: () => void;
}

const NewsHub: React.FC<Props> = ({ lang, onBack }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'Published')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  if (selected) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold mb-8 transition"><ArrowLeft size={18}/> {lang === 'en' ? 'Back to News' : 'Terug naar Nieuws'}</button>
        <article className="prose lg:prose-xl max-w-none">
          <span className="text-xs font-black uppercase text-blue-600 tracking-widest bg-blue-50 px-3 py-1 rounded-full">{selected.category}</span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-slate-900 leading-tight">
            {lang === 'en' ? selected.title_en : selected.title_nl}
          </h1>
          <div className="flex items-center gap-4 text-sm font-bold text-slate-400 mb-10 border-b border-slate-100 pb-8">
            <span className="flex items-center gap-1"><Clock size={14} /> {selected.read_time}</span>
            <span>•</span>
            <span>{selected.source}</span>
            <span>•</span>
            <span>{new Date(selected.created_at || '').toLocaleDateString()}</span>
          </div>
          <div className="text-slate-600 leading-loose text-lg" dangerouslySetInnerHTML={{ __html: lang === 'en' ? selected.content_en : selected.content_nl }} />
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
       <div className="flex justify-between items-center mb-16">
         <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{lang === 'en' ? 'Industry Intelligence' : 'Sector Updates'}</h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl">{lang === 'en' ? 'Latest subsidy alerts and regulatory changes.' : 'Laatste subsidie-alerts en wetswijzigingen.'}</p>
         </div>
         <button onClick={onBack} className="hidden md:flex items-center gap-2 font-bold text-slate-400 hover:text-slate-900"><ArrowLeft size={18}/> Home</button>
       </div>

       {loading ? (
         <div className="text-center py-20 text-slate-400 font-bold">Loading updates...</div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(art => (
              <div key={art.id} onClick={() => setSelected(art)} className="group bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">{art.category}</span>
                   <span className="text-xs font-bold text-slate-300">{new Date(art.created_at || '').toLocaleDateString()}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{lang === 'en' ? art.title_en : art.title_nl}</h2>
                <p className="text-slate-500 mb-8 line-clamp-3 flex-grow">{lang === 'en' ? art.desc_en : art.desc_nl}</p>
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                   <span className="text-xs font-bold text-slate-400">{art.source}</span>
                   <span className="flex items-center gap-1 text-xs font-black uppercase text-blue-600 group-hover:translate-x-1 transition-transform">{lang === 'en' ? 'Read' : 'Lees'} <ExternalLink size={12}/></span>
                </div>
              </div>
            ))}
         </div>
       )}
    </div>
  );
};

export default NewsHub;