'use client';

import { useState, useEffect } from 'react';

const ComingSoon = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = [
      '> initializing gossip protocol...',
      '> discovering micro-cluster [HIVE_NYC_01]...',
      '> node_found: RTX_4090 [ID: 8x92] — 1.2km',
      '> node_found: A100 [ID: 3b11] — 0.8km',
      '> aggregating VRAM: 128GB total',
      '> checkpoint: state_snapshot_created',
      '> speculative_exec: task_migration_ready',
      '> hive_status: ONLINE [4 nodes]',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < lines.length) {
        setTerminalLines(prev => [...prev, lines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo.svg" 
            alt="Paradize Space" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold tracking-tight">PARADIZE_SPACE</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs text-white/40">
          <a href="/docs" className="hover:text-white transition-colors">DOCS</a>
          <span className="border border-white/20 px-3 py-1.5 text-white">COMING SOON</span>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 py-16 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-white/40 mb-6 border border-white/10 inline-block px-3 py-1">
              DECENTRALIZED INFRASTRUCTURE PROTOCOL
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
              THE WORLD&apos;S<br />
              <span className="text-white/40">IDLE GPUs.</span><br />
              ONE SUPERCOMPUTER.
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-white animate-pulse" />
              <span className="text-sm tracking-wider">COMING SOON</span>
            </div>
          </div>

          {/* Terminal */}
          <div className="border border-white/10 bg-black">
            <div className="border-b border-white/10 px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-white/20" />
              <div className="w-2 h-2 bg-white/20" />
              <div className="w-2 h-2 bg-white/20" />
              <span className="text-[10px] text-white/30 ml-2">paradize-network</span>
            </div>
            <div className="p-4 text-xs space-y-1 min-h-[200px]">
              {terminalLines.map((line, i) => (
                <div key={i} className={line?.includes('node_found') || line?.includes('hive_status') ? 'text-white' : 'text-white/50'}>
                  {line}
                </div>
              ))}
              <span className="text-white animate-pulse">█</span>
            </div>
          </div>
        </div>

        {/* What We Are */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="text-[10px] tracking-[0.3em] text-white/40 mb-8">WHAT IS PARADIZE SPACE</div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg leading-relaxed text-white/70">
                Paradize Space is a <span className="text-white">decentralized infrastructure network (DePIN)</span> that aggregates the world&apos;s idle, fragmented GPU capacity—from high-end gaming rigs to independent data centers—into a single, programmable supercomputer.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-white/70">
                Unlike traditional cloud providers that rely on centralized control, Paradize uses a <span className="text-white">biologically-inspired gossip protocol</span> to manage the network, treating compute power like a self-organizing fluid rather than a static list of servers.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="text-[10px] tracking-[0.3em] text-white/40 mb-8">UNDER THE HOOD</div>
          
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {[
              {
                title: 'CHECKPOINTING',
                desc: 'Application-Level Checkpointing allows tasks to "teleport" between nodes in milliseconds if a provider goes offline.',
              },
              {
                title: 'SPECULATIVE EXEC',
                desc: 'Speculative Execution solves the reliability problem of consumer hardware with predictive task migration.',
              },
              {
                title: 'MICRO-CLUSTERS',
                desc: 'Local 1km Hives minimize the speed-of-light bottleneck, enabling high-performance AI inference at 80% lower cost.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-black p-6">
                <div className="text-[10px] tracking-[0.2em] text-white/40 mb-4">0{i + 1}</div>
                <h3 className="font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-24 border-t border-white/10 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
            {[
              { value: '80%', label: 'COST REDUCTION VS AWS' },
              { value: '<1ms', label: 'TASK MIGRATION' },
              { value: '1km', label: 'HIVE RADIUS' },
              { value: '∞', label: 'SCALABILITY' },
            ].map((stat, i) => (
              <div key={i} className="bg-black p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-[10px] tracking-[0.15em] text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="font-bold mb-2">PARADIZE SPACE</div>
            <div className="text-xs text-white/40 space-y-1">
              <p>DISTRIBUTED COMPUTE PROTOCOL</p>
              <p>EST. 2025</p>
            </div>
          </div>
          <div className="flex gap-12 text-xs">
            <div className="space-y-2">
              <div className="text-white/40 mb-3">NETWORK</div>
              <a href="/docs" className="block text-white/60 hover:text-white transition-colors">Docs</a>
              <a href="/explorer" className="block text-white/60 hover:text-white transition-colors">Explorer</a>
            </div>
            <div className="space-y-2">
              <div className="text-white/40 mb-3">SOCIAL</div>
              <a href="https://github.com/paradize-space" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">Github</a>
              <a href="/discord" className="block text-white/60 hover:text-white transition-colors">Discord</a>
              <a href="https://x.com/paradize_space" target="_blank" rel="noopener noreferrer" className="block text-white/60 hover:text-white transition-colors">X</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
