'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productosApi, divisasApi } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { SkeletonCard, Alert } from '@/components/UIHelpers';

const CATEGORIAS = [
  { key: 'palas', label: 'Palas', icon: '🏓' },
  { key: 'pelotas', label: 'Pelotas', icon: '🎾' },
  { key: 'ropa', label: 'Ropa', icon: '👕' },
  { key: 'calzado', label: 'Calzado', icon: '👟' },
  { key: 'accesorios', label: 'Accesorios', icon: '🎽' },
];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [prod, div] = await Promise.allSettled([
          productosApi.getAll({ limit: 6 }),
          divisasApi.getTasas(),
        ]);
        if (prod.status === 'fulfilled') setFeatured(prod.value?.productos || []);
        if (prod.status === 'rejected')  setError('No se pudo cargar el catálogo.');
        if (div.status  === 'fulfilled') setRates(div.value);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(198,241,53,0.12) 0%, transparent 70%)' }}>
        {/* Grid */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* BG text */}
        <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 select-none pointer-events-none leading-none whitespace-nowrap"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(8rem,20vw,22rem)', color: 'transparent', WebkitTextStroke: '1px rgba(198,241,53,0.06)' }}>
          PÁDEL
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl fade-up">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-6"
              style={{ background: 'rgba(198,241,53,0.12)', color: '#c6f135', border: '1px solid rgba(198,241,53,0.25)' }}>
              ⚡ Nueva temporada 2025
            </span>
            <h1 className="text-7xl md:text-9xl leading-none text-white mb-6"
              style={{ fontFamily: 'var(--font-display)' }}>
              JUEGA<br />
              <span style={{ color: '#c6f135' }}>DIFERENTE</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
              El mejor equipamiento de pádel para jugadores que buscan la perfección. Palas, pelotas y accesorios de élite.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products"
                className="px-8 py-4 rounded-xl font-bold text-black text-sm transition-all hover:scale-105 hover:brightness-110"
                style={{ background: '#c6f135' }}>
                Ver Catálogo
              </Link>
              <Link href="/auth/register"
                className="px-8 py-4 rounded-xl font-semibold text-sm transition-all border border-white/10 hover:border-white/20 text-gray-300 hover:text-white">
                Crear cuenta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl text-white mb-10" style={{ fontFamily: 'var(--font-display)' }}>
            CATEGORÍAS
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIAS.map(cat => (
              <Link key={cat.key} href={`/products?categoria=${cat.key}`}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105 text-gray-300 hover:text-white"
                style={{ background: '#111620', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span>{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-5xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
              DESTACADOS
            </h2>
            <Link href="/products" className="text-sm hover:underline" style={{ color: '#c6f135' }}>
              Ver todos →
            </Link>
          </div>

          {error && <Alert type="error" message={error} />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.map(p => <ProductCard key={p._id} producto={p} />)}
          </div>
        </div>
      </section>

      {/* EXCHANGE RATES */}
      {rates && (
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto rounded-2xl p-8"
            style={{ background: '#111620', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-3xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              TIPOS DE CAMBIO — USD
            </h3>
            <div className="flex flex-wrap gap-4">
              {Object.entries(rates.tasas || {}).slice(0, 6).map(([moneda, tasa]) => (
                <div key={moneda} className="px-5 py-3 rounded-xl text-sm"
                  style={{ background: '#0d1017', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-gray-500 uppercase tracking-wider text-xs">{moneda}</span>
                  <p className="font-bold text-white mt-0.5">{Number(tasa).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center py-20 rounded-2xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #111620, #0d1017)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #c6f135, transparent 60%)' }} />
          <div className="relative z-10">
            <h2 className="text-6xl text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              ¿LISTO PARA JUGAR?
            </h2>
            <p className="text-gray-400 mb-8">Únete a miles de jugadores que ya confían en Revesshop.</p>
            <Link href="/auth/register"
              className="inline-block px-10 py-4 rounded-xl font-bold text-black text-sm hover:brightness-110 transition-all"
              style={{ background: '#c6f135' }}>
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
