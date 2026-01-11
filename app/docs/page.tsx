import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/images/logo.svg" 
            alt="Paradize Space" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold tracking-tight">PARADIZE_SPACE</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-xs text-white/40">
          <span className="text-white">DOCS</span>
          <span className="border border-white/20 px-3 py-1.5 text-white">COMING SOON</span>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 py-24 max-w-4xl mx-auto text-center">
        <div className="text-[10px] tracking-[0.3em] text-white/40 mb-6">
          DOCUMENTATION
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          DOCS COMING SOON
        </h1>
        
        <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
          We&apos;re working on comprehensive documentation for the Paradize Space protocol. Check back soon.
        </p>

        <Link 
          href="/"
          className="inline-block border border-white/20 px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors"
        >
          ← BACK TO HOME
        </Link>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 mt-auto absolute bottom-0 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-white/40">
            PARADIZE SPACE — EST. 2025
          </div>
        </div>
      </footer>
    </div>
  );
}
