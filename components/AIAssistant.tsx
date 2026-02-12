
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, BrainCircuit, ShieldAlert, CheckSquare } from 'lucide-react';
import { getAuditAnalysis } from '../services/geminiService';

interface AuditAnalysis {
  summary: string;
  riskRating: string;
  suggestedRemediation: string[];
  complianceImplications: string;
}

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AuditAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await getAuditAnalysis(input);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="text-yellow-300" />
            <span className="font-bold tracking-wider text-sm uppercase">AI Audit Intelligence</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Smart Findings Analysis</h2>
          <p className="text-blue-100 max-w-lg">
            Paste raw audit observations below. Our AI will categorize risks, identify compliance implications, and suggest remediation steps.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-bold text-slate-700 mb-2">Audit Observation / Evidence Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            placeholder="Example: During the review of IT access logs, it was noted that 15 terminated employees still had active VPN accounts 30 days after separation..."
          ></textarea>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !input.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            <span>Analyze Observation</span>
          </button>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4 text-blue-600">
              <BrainCircuit size={24} />
              <h3 className="font-bold text-lg text-slate-900">Summary & Risk</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{analysis.summary}</p>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm font-semibold text-blue-800">Assessed Risk Level</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white border border-blue-200`}>
                {analysis.riskRating}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4 text-orange-500">
              <ShieldAlert size={24} />
              <h3 className="font-bold text-lg text-slate-900">Compliance Impact</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{analysis.complianceImplications}</p>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4 text-green-600">
              <CheckSquare size={24} />
              <h3 className="font-bold text-lg text-slate-900">Suggested Remediation Steps</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.suggestedRemediation.map((step, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm text-slate-700 leading-tight">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
