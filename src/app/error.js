'use client';
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-3xl text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>Algo salió mal</h2>
      <p className="text-gray-500 mb-8 text-sm">{error?.message || 'Error inesperado'}</p>
      <button onClick={reset}
        className="px-6 py-3 rounded-xl text-sm text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-colors">
        Reintentar
      </button>
    </div>
  );
}
