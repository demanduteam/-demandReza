import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, FileBarChart, Printer } from 'lucide-react';
import { VsmeData } from '../types';
import { INITIAL_VSME_DATA } from '../constants';
import VSMEReport from './VSMEReport';

interface Props {
  onExit: () => void;
}

const VSMEWizard: React.FC<Props> = ({ onExit }) => {
  const [mode, setMode] = useState<'setup' | 'wizard' | 'report'>('setup');
  const [data, setData] = useState<VsmeData>(INITIAL_VSME_DATA);
  const [step, setStep] = useState(0);

  const steps = [
    { id: 'gen', title: 'General Info' },
    { id: 'env', title: 'Environment' },
    { id: 'soc', title: 'Social & Gov' },
    { id: 'bp', title: 'Partners' },
    { id: 'finish', title: 'Finish' }
  ];

  const handleInput = (key: keyof VsmeData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  if (mode === 'setup') {
    return (
      <div className="max-w-2xl mx-auto pt-10 px-4 animate-fade-in">
        <button onClick={onExit} className="mb-6 text-slate-500 hover:text-slate-900 flex items-center gap-2 font-bold text-sm"><ArrowLeft size={16} /> Back</button>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
          <h2 className="text-3xl font-black mb-2 text-slate-900">VSME Report Setup</h2>
          <p className="text-slate-500 mb-8">Configure your reporting standards based on EFRAG guidelines.</p>
          
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Listed on EU Market?</label>
              <div className="flex gap-3">
                <button onClick={() => handleInput('isListed', 'yes')} className={`flex-1 py-4 rounded-xl font-bold border-2 transition ${data.isListed === 'yes' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-slate-200 text-slate-600'}`}>Yes</button>
                <button onClick={() => handleInput('isListed', 'no')} className={`flex-1 py-4 rounded-xl font-bold border-2 transition ${data.isListed === 'no' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white border-slate-200 text-slate-600'}`}>No</button>
              </div>
              {data.isListed === 'yes' && <p className="text-red-500 text-xs font-bold mt-2">⛔ Listed companies require full ESRS, not VSME.</p>}
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Report Purpose</label>
              <select className="w-full p-4 border border-slate-200 rounded-xl bg-white font-medium focus:outline-none focus:ring-2 ring-blue-100" value={data.reportPurpose} onChange={(e) => handleInput('reportPurpose', e.target.value as any)}>
                <option value="basic">Internal Transparency (Basic Module)</option>
                <option value="partner">Bank Loan / Supply Chain (Basic + BP)</option>
              </select>
            </div>

            <button 
              onClick={() => setMode('wizard')} 
              disabled={data.isListed === 'yes'} 
              className="w-full bg-demandio-blue text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Start Wizard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'report') {
    return (
      <div>
        <div className="bg-slate-900 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg print:hidden">
          <button onClick={() => setMode('setup')} className="flex items-center gap-2 font-bold hover:text-slate-300"><ArrowLeft size={16}/> Edit Data</button>
          <div className="flex gap-4">
            <button onClick={onExit} className="font-bold hover:text-slate-300">Exit</button>
            <button onClick={() => window.print()} className="bg-green-500 text-slate-900 px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-400 transition"><Printer size={18} /> Print PDF</button>
          </div>
        </div>
        <VSMEReport data={data} />
      </div>
    );
  }

  // Wizard Mode
  const currentStepId = steps[step].id;

  return (
    <div className="max-w-4xl mx-auto pt-10 px-4 animate-fade-in pb-20">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
          <h3 className="font-bold flex items-center gap-3 text-lg"><FileBarChart size={20} /> VSME Generator</h3>
          <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full">{step + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-slate-100 h-2">
          <div className="bg-blue-600 h-2 transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
        </div>
        
        <div className="p-8 md:p-12">
            {currentStepId === 'gen' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2"><h4 className="text-xl font-bold mb-4 text-demandio-blue border-b pb-2">General Information</h4></div>
                    <div><label className="block text-sm font-bold mb-2">Company Name</label><input className="w-full p-3 border rounded-xl" value={data.b1_name} onChange={e=>handleInput('b1_name', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Legal Form</label><input className="w-full p-3 border rounded-xl" value={data.b1_legal_form} onChange={e=>handleInput('b1_legal_form', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Turnover (€)</label><input className="w-full p-3 border rounded-xl" value={data.b1_turnover} onChange={e=>handleInput('b1_turnover', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Employees (HC)</label><input className="w-full p-3 border rounded-xl" value={data.b1_employees} onChange={e=>handleInput('b1_employees', e.target.value)}/></div>
                    <div className="col-span-2"><label className="block text-sm font-bold mb-2">Transition Practices</label><textarea className="w-full p-3 border rounded-xl h-24" value={data.b2_practices} onChange={e=>handleInput('b2_practices', e.target.value)}/></div>
                </div>
            )}

            {currentStepId === 'env' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2"><h4 className="text-xl font-bold mb-4 text-green-700 border-b pb-2">Environmental Metrics</h4></div>
                    <div><label className="block text-sm font-bold mb-2">Total Energy (MWh)</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b3_energy_total} onChange={e=>handleInput('b3_energy_total', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Renewable Energy (MWh)</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b3_energy_ren} onChange={e=>handleInput('b3_energy_ren', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Scope 1 (tCO2e)</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b3_scope1} onChange={e=>handleInput('b3_scope1', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Water Usage (m3)</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b6_water} onChange={e=>handleInput('b6_water', e.target.value)}/></div>
                </div>
            )}

            {currentStepId === 'soc' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2"><h4 className="text-xl font-bold mb-4 text-purple-700 border-b pb-2">Social & Governance</h4></div>
                    <div><label className="block text-sm font-bold mb-2">Permanent Employees</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b8_perm} onChange={e=>handleInput('b8_perm', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Female Employees</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b8_female} onChange={e=>handleInput('b8_female', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Work Accidents</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b9_accidents} onChange={e=>handleInput('b9_accidents', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Legal Convictions</label><input className="w-full p-3 border rounded-xl" type="number" value={data.b11_convictions} onChange={e=>handleInput('b11_convictions', e.target.value)}/></div>
                </div>
            )}
            
            {currentStepId === 'bp' && (
                <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1"><h4 className="text-xl font-bold mb-4 text-orange-700 border-b pb-2">Business Partners</h4></div>
                    <div><label className="block text-sm font-bold mb-2">Code of Conduct exists?</label><select className="w-full p-3 border rounded-xl" value={data.bp_code} onChange={e=>handleInput('bp_code', e.target.value)}><option>Yes</option><option>No</option></select></div>
                    <div><label className="block text-sm font-bold mb-2">Scope 3 Status</label><input className="w-full p-3 border rounded-xl" value={data.bp_scope3_status} onChange={e=>handleInput('bp_scope3_status', e.target.value)}/></div>
                    <div><label className="block text-sm font-bold mb-2">Climate Risks</label><textarea className="w-full p-3 border rounded-xl h-24" value={data.bp_climate_risks} onChange={e=>handleInput('bp_climate_risks', e.target.value)}/></div>
                </div>
            )}

            {currentStepId === 'finish' && (
                <div className="text-center py-12">
                     <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-green-600"/></div>
                     <h3 className="text-3xl font-black mb-4">Ready to Generate</h3>
                     <p className="text-slate-500 mb-10 text-lg">Your data has been validated against the VSME standard.</p>
                     <button onClick={() => setMode('report')} className="bg-demandio-blue text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-blue-800 transition text-lg">Generate Report</button>
                </div>
            )}

            {currentStepId !== 'finish' && (
                <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
                    <button onClick={() => step > 0 ? setStep(s => s-1) : setMode('setup')} className="text-slate-400 font-bold hover:text-slate-700 px-4 py-2">Back</button>
                    <button onClick={() => setStep(s => s+1)} className="bg-demandio-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition shadow-lg">Next Step</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default VSMEWizard;