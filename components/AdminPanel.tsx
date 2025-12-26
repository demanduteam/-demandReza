import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { Article } from '../types';
import { LayoutDashboard, Save, Trash2, Edit2, Plus, ArrowLeft } from 'lucide-react';

const AdminPanel = ({ onExit }: { onExit: () => void }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (data) setArticles(data);
  };

  const handleSave = async () => {
    if (!editing) return;
    const { error } = await supabase.from('articles').upsert(editing);
    if (!error) {
        setEditing(null);
        fetch();
    } else {
        alert('Error saving article');
    }
  };

  const handleDelete = async (id: string) => {
    if(confirm('Delete?')) {
        await supabase.from('articles').delete().eq('id', id);
        fetch();
    }
  };

  const createNew = () => {
    setEditing({
        category: 'subsidy', status: 'Draft', read_time: '3 min', source: 'Demandio',
        title_en: '', title_nl: '', desc_en: '', desc_nl: '', content_en: '<p>Content...</p>', content_nl: '<p>Inhoud...</p>'
    });
  };

  if (editing) {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between mb-8">
                <button onClick={() => setEditing(null)} className="font-bold text-slate-500">Cancel</button>
                <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"><Save size={18}/> Save</button>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <input className="border p-3 rounded" placeholder="Title EN" value={editing.title_en} onChange={e => setEditing({...editing, title_en: e.target.value})} />
                    <input className="border p-3 rounded" placeholder="Title NL" value={editing.title_nl} onChange={e => setEditing({...editing, title_nl: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <textarea className="border p-3 rounded h-24" placeholder="Desc EN" value={editing.desc_en} onChange={e => setEditing({...editing, desc_en: e.target.value})} />
                    <textarea className="border p-3 rounded h-24" placeholder="Desc NL" value={editing.desc_nl} onChange={e => setEditing({...editing, desc_nl: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <textarea className="border p-3 rounded h-64 font-mono text-xs" placeholder="HTML Content EN" value={editing.content_en} onChange={e => setEditing({...editing, content_en: e.target.value})} />
                    <textarea className="border p-3 rounded h-64 font-mono text-xs" placeholder="HTML Content NL" value={editing.content_nl} onChange={e => setEditing({...editing, content_nl: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <input className="border p-3 rounded" placeholder="Category" value={editing.category} onChange={e => setEditing({...editing, category: e.target.value})} />
                    <select className="border p-3 rounded" value={editing.status} onChange={e => setEditing({...editing, status: e.target.value as any})}><option>Draft</option><option>Published</option></select>
                    <input className="border p-3 rounded" placeholder="Source" value={editing.source} onChange={e => setEditing({...editing, source: e.target.value})} />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-black flex items-center gap-3"><LayoutDashboard /> Admin CMS</h1>
            <div className="flex gap-4">
                 <button onClick={onExit} className="text-slate-400 hover:text-slate-900 font-bold"><ArrowLeft /></button>
                 <button onClick={createNew} className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"><Plus size={18}/> New</button>
            </div>
        </div>
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b"><tr className="text-xs uppercase text-slate-400 font-bold"><th className="p-4">Title</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr></thead>
                <tbody>
                    {articles.map(art => (
                        <tr key={art.id} className="border-b hover:bg-slate-50">
                            <td className="p-4 font-bold">{art.title_en || 'Untitled'}</td>
                            <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${art.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{art.status}</span></td>
                            <td className="p-4 text-right flex justify-end gap-2">
                                <button onClick={() => setEditing(art)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={16}/></button>
                                <button onClick={() => handleDelete(art.id!)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminPanel;