'use client'

import { useEffect, useState } from 'react'
import { Activity, Check, Clipboard, Cpu, ShieldCheck, Wallet } from 'lucide-react'

const agents = ['AI_Agent_Alpha', 'Compute_Node_09', 'Palantir_Mesh_Link', 'Seastead_Router_3', 'Sovereign_Identity_Bot', 'Nostr_Relay_Edge']
const purposes = ['Reputation Log Auth', 'Data Integrity Verification', 'Micro-routing Settle', 'Cryptographic Compliance Proof', 'Model API Call Settle']

type Transaction = { agent: string; purpose: string; amount: number; time: string }

function createTransaction(): Transaction {
  return {
    agent: agents[Math.floor(Math.random() * agents.length)],
    purpose: purposes[Math.floor(Math.random() * purposes.length)],
    amount: Math.floor(Math.random() * 45) + 5,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  }
}

export default function Page() {
  const [totalSettled, setTotalSettled] = useState(48920)
  const [txCount, setTxCount] = useState(1402)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setTransactions(Array.from({ length: 5 }, createTransaction))
    const interval = window.setInterval(() => {
      const next = createTransaction()
      setTransactions((current) => [next, ...current].slice(0, 20))
      setTotalSettled((value) => value + next.amount)
      setTxCount((value) => value + 1)
    }, 2600)
    return () => window.clearInterval(interval)
  }, [])

  const copyPubkey = async () => {
    await navigator.clipboard.writeText('npub1qqs9viresinnumeris73892x047cfa29k')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-orange-500/30">
      <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-[#090909]/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-tr from-orange-600 to-amber-400 text-lg font-bold text-black shadow-lg shadow-orange-500/20">₿</div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-zinc-200">BITCOIN BANK</h1>
              <p className="text-[10px] tracking-[0.14em] text-zinc-500">LAYER 3 AGENTIC PROTOCOL</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> ENGINE ACTIVE
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col gap-4 px-4 py-5">
        <section className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 shadow-[0_0_24px_rgba(249,115,22,0.12)]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="size-4 text-orange-500" aria-hidden="true" />
              <h2 className="text-xs font-semibold uppercase tracking-wide">Sovereign Element</h2>
            </div>
            <span className="text-[10px] text-zinc-500">NIP-05 Verified</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-black/50 p-2.5">
            <div className="min-w-0 pr-4">
              <p className="mb-0.5 text-[9px] uppercase tracking-wider text-zinc-500">Active Nostr Pubkey (npub)</p>
              <p className="truncate font-mono text-xs text-orange-400/90">npub1qqs9viresinnumeris73892x047cfa29k...</p>
            </div>
            <button type="button" onClick={copyPubkey} aria-label="Copy Nostr public key" className="shrink-0 rounded p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-zinc-200">
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Clipboard className="size-3.5" />}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3" aria-label="Liquidity metrics">
          <Metric label="Engine Balance" value="2,405,190" unit="sats" detail="≈ $1,540.23 USD" icon={<Wallet className="size-3.5" />} />
          <Metric label="Settled (24h)" value={totalSettled.toLocaleString()} unit="sats" detail={`${txCount.toLocaleString()} autonomous txs`} icon={<Activity className="size-3.5 text-emerald-500" />} positive />
        </section>

        <section className="flex h-[360px] flex-col rounded-xl border border-zinc-800 bg-zinc-900/20 p-4">
          <div className="mb-3 flex items-center justify-between border-b border-zinc-800/60 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4 text-emerald-400" aria-hidden="true" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Autonomous Payment Matrix</h2>
            </div>
            <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[9px] text-zinc-400">L3_STREAM: ACTIVE</span>
          </div>
          <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto pr-1" aria-live="polite" aria-label="Recent autonomous settlements">
            {transactions.length === 0 ? <div className="pt-12 text-center font-mono text-[11px] text-zinc-600">Booting agentic protocol sequence...</div> : transactions.map((transaction, index) => (
              <article key={`${transaction.time}-${index}`} className="flex animate-in items-center justify-between gap-2 rounded-lg border border-zinc-900 border-l-2 border-l-emerald-500/60 bg-zinc-950/60 p-2 text-[11px] font-mono fade-in slide-in-from-top-1">
                <div className="min-w-0 truncate">
                  <span className="font-bold text-emerald-400">[⚡ SETTLED]</span>{' '}
                  <span className="font-medium text-zinc-300">{transaction.agent}</span>
                  <p className="mt-0.5 truncate text-[9px] text-zinc-500">↳ {transaction.purpose}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-bold text-zinc-200">+{transaction.amount} sats</span>
                  <p className="mt-0.5 font-mono text-[8px] text-zinc-600">{transaction.time}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 bg-zinc-950/40 px-4 py-4 text-center">
        <p className="font-mono text-[10px] text-zinc-500">Open by design. Accountable by law. Vires in Numeris.</p>
        <p className="mt-1 text-[9px] text-zinc-600">Bitcoin Bank Technologies © 2026. Built Over Lightning/Nostr.</p>
      </footer>
    </div>
  )
}

function Metric({ label, value, unit, detail, icon, positive = false }: { label: string; value: string; unit: string; detail: string; icon: React.ReactNode; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-3.5">
      <div className="mb-1 flex items-center justify-between text-zinc-500"><span className="text-[10px] uppercase tracking-wider">{label}</span>{icon}</div>
      <div className={`text-xl font-bold ${positive ? 'text-emerald-400' : 'text-zinc-200'}`}>{value} <span className="text-xs font-normal text-orange-500">{unit}</span></div>
      <div className="mt-0.5 text-[10px] text-zinc-500">{detail}</div>
    </div>
  )
}

