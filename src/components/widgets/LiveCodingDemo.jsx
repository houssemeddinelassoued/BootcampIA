import { useState } from 'react';

const DEMOS = [
  {
    tab: '⚡ Générer une fonction',
    prompt: 'Génère un endpoint FastAPI qui reçoit une liste de factures d\'énergie (kWh, source) et calcule le scope 2 en tCO₂e avec le facteur d\'émission du réseau français (0.052 kgCO₂e/kWh). Inclus les type hints et une docstring.',
    code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Facteur d'émission réseau FR (source: ADEME 2024)
EMISSION_FACTOR_FR = 0.052  # kgCO₂e/kWh

class Invoice(BaseModel):
    kwh: float        # consommation en kWh
    source: str       # "réseau" | "photovoltaïque" | ...
    month: str        # "2024-01"

class Scope2Result(BaseModel):
    total_kwh: float
    total_co2e_kg: float
    total_co2e_tonnes: float
    by_month: dict[str, float]

@app.post("/calculate-scope2", response_model=Scope2Result)
def calculate_scope2(invoices: List[Invoice]) -> Scope2Result:
    """
    Calcule les émissions scope 2 (énergie indirecte)
    à partir d'une liste de factures électriques.
    
    Args:
        invoices: Liste des factures avec consommation en kWh
    Returns:
        Scope2Result: Total CO₂e en kg et en tonnes
    """
    total_kwh = sum(inv.kwh for inv in invoices
                    if inv.source == "réseau")
    
    total_co2e_kg = total_kwh * EMISSION_FACTOR_FR
    
    by_month = {}
    for inv in invoices:
        if inv.source == "réseau":
            co2e = inv.kwh * EMISSION_FACTOR_FR
            by_month[inv.month] = by_month.get(inv.month, 0) + co2e
    
    return Scope2Result(
        total_kwh=total_kwh,
        total_co2e_kg=round(total_co2e_kg, 2),
        total_co2e_tonnes=round(total_co2e_kg / 1000, 4),
        by_month={k: round(v, 2) for k, v in by_month.items()}
    )`,
    lang: 'python',
  },
  {
    tab: '🧪 Générer les tests',
    prompt: 'Génère les tests unitaires pytest pour l\'endpoint /calculate-scope2 ci-dessus. Couvre : cas nominal, source non-réseau ignorée, liste vide.',
    code: `import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_scope2_nominal():
    """Test du calcul nominal avec des factures réseau."""
    response = client.post("/calculate-scope2", json=[
        {"kwh": 1000, "source": "réseau", "month": "2024-01"},
        {"kwh":  500, "source": "réseau", "month": "2024-02"},
    ])
    assert response.status_code == 200
    data = response.json()
    
    # 1500 kWh × 0.052 = 78 kgCO₂e
    assert data["total_kwh"] == 1500
    assert data["total_co2e_kg"] == pytest.approx(78.0, rel=1e-3)
    assert data["total_co2e_tonnes"] == pytest.approx(0.078, rel=1e-3)

def test_scope2_ignore_non_reseau():
    """Les sources non-réseau (solaire) ne comptent pas en scope 2."""
    response = client.post("/calculate-scope2", json=[
        {"kwh": 1000, "source": "photovoltaïque", "month": "2024-01"},
        {"kwh":  200, "source": "réseau", "month": "2024-01"},
    ])
    data = response.json()
    assert data["total_kwh"] == 200  # seul le réseau compte

def test_scope2_empty_list():
    """Liste vide → tout à zéro, pas d'erreur."""
    response = client.post("/calculate-scope2", json=[])
    assert response.status_code == 200
    data = response.json()
    assert data["total_kwh"] == 0
    assert data["total_co2e_kg"] == 0`,
    lang: 'python',
  },
  {
    tab: '🐛 Déboguer',
    prompt: `Résous cette erreur :
AttributeError: 'NoneType' object has no attribute 'kwh'
  File "main.py", line 38, in calculate_scope2
    total_kwh = sum(inv.kwh for inv in invoices if inv.source == "réseau")`,
    code: `# 🔍 Analyse de l'erreur :
# La liste 'invoices' contient un élément None
# (une facture mal formée ou un bug d'insertion)

# ❌ Code original (crash si None dans la liste)
total_kwh = sum(inv.kwh for inv in invoices
                if inv.source == "réseau")

# ✅ Fix recommandé — filtrer les None en amont
total_kwh = sum(
    inv.kwh
    for inv in invoices
    if inv is not None and inv.source == "réseau"
)

# ✅ Fix défensif — validation Pydantic (meilleure approche)
# Pydantic rejette les None automatiquement si le champ
# est déclaré List[Invoice] (pas List[Invoice | None])
# → Vérifier que le client n'envoie pas de null dans le tableau JSON

# 💡 Recommandation : ajouter un validator Pydantic
from pydantic import validator

class Scope2Request(BaseModel):
    invoices: List[Invoice]
    
    @validator('invoices', each_item=True)
    def invoice_must_not_be_none(cls, v):
        if v is None:
            raise ValueError("Une facture ne peut pas être null")
        return v`,
    lang: 'python',
  },
];

const TOKEN_COLORS = ['text-blue-300', 'text-violet-300', 'text-emerald-300', 'text-orange-300', 'text-slate-400'];

export default function LiveCodingDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [generated, setGenerated] = useState(false);

  const demo = DEMOS[activeTab];

  const generate = () => {
    setGenerating(true);
    setGenerated(false);
    setVisibleChars(0);
    setTimeout(() => {
      setGenerating(false);
      let i = 0;
      const total = demo.code.length;
      const id = setInterval(() => {
        i = Math.min(i + 8, total);
        setVisibleChars(i);
        if (i >= total) { clearInterval(id); setGenerated(true); }
      }, 16);
    }, 1200);
  };

  const switchTab = (i) => {
    setActiveTab(i);
    setVisibleChars(0);
    setGenerated(false);
    setGenerating(false);
  };

  const displayedCode = demo.code.slice(0, visibleChars);

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-5">
      <div>
        <h3 className="text-2xl font-bold text-white">Accélération — Live Coding avec l'IA</h3>
        <p className="text-slate-400 mt-1">Simulation de GitHub Copilot / Cursor — génération de code, tests et débogage</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {DEMOS.map((d, i) => (
          <button key={i} onClick={() => switchTab(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              activeTab === i
                ? 'bg-orange-500/20 border-orange-500/40 text-orange-200'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}>{d.tab}</button>
        ))}
      </div>

      {/* Prompt */}
      <div className="card p-4 border-orange-500/20 bg-orange-950/10">
        <p className="text-orange-300 text-xs font-bold mb-1">💬 Prompt envoyé à l'IA :</p>
        <p className="text-slate-300 text-sm leading-relaxed italic">« {demo.prompt} »</p>
      </div>

      {!generated && !generating && (
        <button onClick={generate} className="btn-primary w-full py-4 text-base">
          ⚡ Générer avec l'IA →
        </button>
      )}

      {generating && (
        <div className="card p-5 border-orange-500/20 flex items-center gap-3 animate-fade-in">
          <div className="flex gap-1">
            {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay:`${i*150}ms` }} />)}
          </div>
          <span className="text-orange-300 text-sm">L'IA génère le code…</span>
        </div>
      )}

      {/* Code editor */}
      {visibleChars > 0 && (
        <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl animate-fade-in">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-b border-slate-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-400 text-xs font-mono ml-2">
              {activeTab === 0 ? 'main.py' : activeTab === 1 ? 'test_scope2.py' : 'debug.py'}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-orange-400">● Copilot</span>
              {generated && <span className="text-xs text-emerald-400">✓ Généré</span>}
            </div>
          </div>
          {/* Code */}
          <div className="bg-slate-950 overflow-auto max-h-96">
            <pre className="p-4 text-xs font-mono leading-relaxed">
              {displayedCode.split('\n').map((line, i) => (
                <div key={i} className="flex hover:bg-slate-800/30">
                  <span className="text-slate-600 w-8 shrink-0 text-right mr-4 select-none">{i + 1}</span>
                  <span className={
                    line.trim().startsWith('#') ? 'text-slate-500' :
                    line.includes('def ') || line.includes('class ') ? 'text-blue-300' :
                    line.includes('@') ? 'text-orange-300' :
                    line.includes('"') || line.includes("'") ? 'text-green-300' :
                    line.includes('assert') || line.includes('return') ? 'text-violet-300' :
                    'text-slate-300'
                  }>{line}</span>
                </div>
              ))}
              {!generated && <span className="text-orange-400 animate-blink">█</span>}
            </pre>
          </div>
        </div>
      )}

      {generated && (
        <div className="card p-4 bg-emerald-950/15 border-emerald-500/25 animate-bounce-in">
          <p className="text-emerald-400 text-sm font-bold">✅ Code généré — À retenir :</p>
          <p className="text-slate-400 text-sm mt-1">
            {activeTab === 0 && 'Fonction complète avec type hints, docstring et gestion du facteur d\'émission ADEME. À relire avant de déployer !'}
            {activeTab === 1 && '3 tests couvrant les cas critiques : nominal, edge case (source non-réseau), liste vide. TDD possible avec l\'IA.'}
            {activeTab === 2 && 'L\'IA identifie la cause racine, propose 2 solutions et recommande la meilleure pratique (validation Pydantic).'}
          </p>
        </div>
      )}
    </div>
  );
}
