'use client';

export function LoadingScreen({ message = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4">
      <div className="spinner" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-4 text-center">
      <div className="text-5xl">⚠️</div>
      <p className="text-gray-400">{message}</p>
      {onRetry && (
        <button onClick={onRetry}
          className="px-4 py-2 text-sm rounded-lg border border-white/10 text-gray-300 hover:border-white/20 hover:text-white transition-colors">
          Reintentar
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '📦', message, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
      <div className="text-5xl">{icon}</div>
      <p className="text-gray-300 font-medium">{message}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );
}

export function Alert({ type = 'error', message, onClose }) {
  const colors = {
    error:   'bg-red-500/10 border-red-500/30 text-red-400',
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    info:    'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-sm ${colors[type]}`}>
      <span className="shrink-0">{type === 'error' ? '✕' : type === 'success' ? '✓' : 'ℹ'}</span>
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="shrink-0 opacity-60 hover:opacity-100">✕</button>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#111620' }}>
      <div className="skeleton h-48 w-full" />
      <div className="p-4 flex flex-col gap-2">
        <div className="skeleton h-3 rounded w-1/3" />
        <div className="skeleton h-5 rounded w-3/4" />
        <div className="skeleton h-4 rounded w-1/2 mt-2" />
      </div>
    </div>
  );
}
