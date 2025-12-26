import React, { useState } from 'react';
import { ShieldCheck, Calendar, Zap, Truck, Home, GraduationCap, CheckCircle, AlertTriangle, Send, HelpCircle, FileText, ArrowLeft } from 'lucide-react';
import { SubsidyData, Language } from '../types';

interface Props {
  lang: Language;
  onExit: () => void;
}

const SubsidyWizard: React.FC<Props> = ({ lang, onExit }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SubsidyData>({
    hasEH3: null, recentPurchase: null, categories: [],
    invoiceValue: null, isElectricVehicle: null, isHeavyVehicle: null, smallStaff: null
  });

  const texts = {
    en: {
        step1: { title: "The Gatekeeper", q: "Do you have eHerkenning Level 3 (EH3)?", yes: "Yes, I have it", no: "No / Don't know", alert: "You need EH3 to apply for subsidies." },
        step2: { title: "90-Day Rule", q: "Did you purchase equipment in the last 3 months?", yes: "Yes", no: "No" },
        step3: { title: "Investment Details", msg: "Select categories:", opt_ev: "EV Equipment", opt_fleet: "Fleet (Vans)", opt_build: "Building", opt_train: "Training" },
        step5: { title: "Eligibility Results", msg: "Based on your inputs, you qualify for:", claim: "Proceed to Claim" },
        step6: { title: "Next Steps", btn1: "Download ESG Kit", btn2: "Email Accountant", back: "Return to Dashboard" },
        nav: { back: "Back", next: "Next Step" }
    },
    nl: {
        step1: { title: "De Poortwachter", q: "Heeft u eHerkenning Niveau 3 (EH3)?", yes: "Ja, dat heb ik", no: "Nee / Weet ik niet", alert: "U heeft EH3 nodig voor subsidieaanvragen." },
        step2: { title: "90-Dagen Regel", q: "Heeft u in de afgelopen 3 maanden geïnvesteerd?", yes: "Ja", no: "Nee" },
        step3: { title: "Investering Details", msg: "Selecteer categorieën:", opt_ev: "EV Apparatuur", opt_fleet: "Wagenpark", opt_build: "Pand", opt_train: "Opleiding" },
        step5: { title: "Uw Potentieel", msg: "Op basis van uw antwoorden komt u in aanmerking voor:", claim: "Start Claim" },
        step6: { title: "Volgende Stappen", btn1: "Download ESG Kit", btn2: "Mail Boekhouder", back: "Terug naar Dashboard" },
        nav: { back: "Terug", next: "Volgende" }
    }
  };

  const t = texts[lang];

  const toggleCategory = (cat: string) => {
    setData(prev => ({
        ...prev,
        categories: prev.categories.includes(cat) ? prev.categories.filter(c => c !== cat) : [...prev.categories, cat]
    }));
  };

  const calculateResults = () => {
    const res = [];
    if ((data.categories.includes('ev') && data.invoiceValue) || (data.categories.includes('building'))) {
        res.push({ title: 'MIA/Vamil', desc: lang === 'en' ? 'Tax deduction up to 45%' : 'Fiscale aftrek tot 45%' });
    }
    if (data.categories.includes('fleet') && data.isElectricVehicle && data.isHeavyVehicle) {
        res.push({ title: 'SEBA', desc: lang === 'en' ? 'Up to €5,000 cash grant' : 'Tot €5.000 cash subsidie' });
    }
    if (data.categories.includes('training') && data.smallStaff) {
        res.push({ title: 'SLIM', desc: lang === 'en' ? '80% training cost reimbursement' : '80% vergoeding opleidingskosten' });
    }
    return res.length ? res : [{ title: 'General Check', desc: lang === 'en' ? 'Contact us for analysis' : 'Neem contact op voor analyse' }];
  };

  return (
    <div className="max-w-3xl mx-auto p-4 animate-fade-in">
        <button onClick={onExit} className="mb-4 text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-bold"><ArrowLeft size={16}/> {t.nav.back}</button>
        
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-6 flex justify-between items-center">
                <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><Zap className="text-blue-600" size={20}/> {lang === 'en' ? 'Subsidy Finder' : 'Subsidie Zoeker'}</h2>
                <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <div key={s} className={`h-1.5 w-8 rounded-full transition-colors ${s <= step ? 'bg-blue-600' : 'bg-slate-200'}`}></div>)}
                </div>
            </div>

            <div className="p-8 min-h-[400px] flex flex-col justify-center">
                {step === 1 && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={40} /></div>
                        <h3 className="text-2xl font-bold mb-4">{t.step1.title}</h3>
                        <p className="text-slate-600 mb-8 text-lg">{t.step1.q}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => { setData({...data, hasEH3: true}); setStep(2); }} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md">{t.step1.yes}</button>
                            <button onClick={() => setData({...data, hasEH3: false})} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">{t.step1.no}</button>
                        </div>
                        {data.hasEH3 === false && <div className="mt-8 p-4 bg-orange-50 text-orange-800 rounded-xl flex items-center justify-center gap-2 border border-orange-100"><AlertTriangle size={20}/> {t.step1.alert}</div>}
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6"><Calendar size={40} /></div>
                        <h3 className="text-2xl font-bold mb-4">{t.step2.title}</h3>
                        <p className="text-slate-600 mb-8 text-lg">{t.step2.q}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => { setData({...data, recentPurchase: true}); setStep(3); }} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-md">{t.step2.yes}</button>
                            <button onClick={() => { setData({...data, recentPurchase: false}); setStep(3); }} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition">{t.step2.no}</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-center">{t.step3.msg}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div onClick={() => toggleCategory('ev')} className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${data.categories.includes('ev') ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <Zap className={data.categories.includes('ev') ? "text-blue-600" : "text-slate-400"} />
                                    {data.categories.includes('ev') && <CheckCircle className="text-blue-600" size={20} />}
                                </div>
                                <span className="font-bold text-lg">{t.step3.opt_ev}</span>
                                {data.categories.includes('ev') && <div className="mt-4 pt-4 border-t border-blue-200">
                                    <p className="text-xs mb-2 font-bold text-blue-800">> €2,500?</p>
                                    <div className="flex gap-2"><button onClick={(e)=>{e.stopPropagation(); setData({...data, invoiceValue: true})}} className={`text-xs px-2 py-1 rounded ${data.invoiceValue ? 'bg-blue-600 text-white':'bg-white'}`}>Yes</button><button onClick={(e)=>{e.stopPropagation(); setData({...data, invoiceValue: false})}} className={`text-xs px-2 py-1 rounded ${data.invoiceValue===false ? 'bg-blue-600 text-white':'bg-white'}`}>No</button></div>
                                </div>}
                            </div>

                            <div onClick={() => toggleCategory('fleet')} className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${data.categories.includes('fleet') ? 'border-orange-500 bg-orange-50' : 'border-slate-200 hover:border-orange-300'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <Truck className={data.categories.includes('fleet') ? "text-orange-600" : "text-slate-400"} />
                                    {data.categories.includes('fleet') && <CheckCircle className="text-orange-600" size={20} />}
                                </div>
                                <span className="font-bold text-lg">{t.step3.opt_fleet}</span>
                                {data.categories.includes('fleet') && <div className="mt-4 pt-4 border-t border-orange-200">
                                    <p className="text-xs mb-2 font-bold text-orange-800">Electric & >2500kg?</p>
                                    <div className="flex gap-2"><button onClick={(e)=>{e.stopPropagation(); setData({...data, isElectricVehicle: true, isHeavyVehicle: true})}} className={`text-xs px-2 py-1 rounded ${data.isElectricVehicle ? 'bg-orange-600 text-white':'bg-white'}`}>Yes</button><button onClick={(e)=>{e.stopPropagation(); setData({...data, isElectricVehicle: false})}} className={`text-xs px-2 py-1 rounded ${data.isElectricVehicle===false ? 'bg-orange-600 text-white':'bg-white'}`}>No</button></div>
                                </div>}
                            </div>

                            <div onClick={() => toggleCategory('building')} className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${data.categories.includes('building') ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-300'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <Home className={data.categories.includes('building') ? "text-green-600" : "text-slate-400"} />
                                    {data.categories.includes('building') && <CheckCircle className="text-green-600" size={20} />}
                                </div>
                                <span className="font-bold text-lg">{t.step3.opt_build}</span>
                            </div>

                            <div onClick={() => toggleCategory('training')} className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${data.categories.includes('training') ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-purple-300'}`}>
                                <div className="flex justify-between items-center mb-2">
                                    <GraduationCap className={data.categories.includes('training') ? "text-purple-600" : "text-slate-400"} />
                                    {data.categories.includes('training') && <CheckCircle className="text-purple-600" size={20} />}
                                </div>
                                <span className="font-bold text-lg">{t.step3.opt_train}</span>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setStep(5)} className="px-8 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 shadow-lg">{t.nav.next}</button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-8">{t.step5.msg}</h3>
                        <div className="space-y-4 mb-10 max-w-md mx-auto">
                            {calculateResults().map((item, idx) => (
                                <div key={idx} className="bg-white border-2 border-green-500 p-4 rounded-xl flex items-center gap-4 text-left shadow-md transform hover:scale-105 transition-transform">
                                    <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle size={24} /></div>
                                    <div>
                                        <h4 className="font-black text-xl text-slate-900">{item.title}</h4>
                                        <p className="text-sm font-medium text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setStep(6)} className="w-full max-w-md bg-green-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg text-lg">{t.step5.claim}</button>
                    </div>
                )}

                {step === 6 && (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><FileText size={32} /></div>
                        <h3 className="text-2xl font-bold mb-8">{t.step6.title}</h3>
                        <div className="grid gap-4 max-w-sm mx-auto">
                            <button className="w-full p-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-md"><Send size={18}/> {t.step6.btn1}</button>
                            <button className="w-full p-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center gap-2 shadow-sm"><HelpCircle size={18}/> {t.step6.btn2}</button>
                        </div>
                        <button onClick={onExit} className="mt-8 text-slate-400 hover:text-slate-600 font-bold text-sm">{t.step6.back}</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default SubsidyWizard;