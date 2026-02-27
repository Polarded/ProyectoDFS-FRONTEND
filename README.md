# Revesshop Frontend

Frontend de la tienda de pádel **Revesshop**, construido con **Next.js 14 (App Router)**.

## Stack

- **Framework**: Next.js 14 con App Router
- **Auth**: JWT almacenado en `localStorage` + React Context
- **API**: Fetch nativo centralizado en `src/lib/api.js`
- **Estilos**: CSS puro con variables custom (sin framework externo)

## Requisitos

- Node.js ≥ 18
- Backend Revesshop corriendo (ver repositorio del backend)

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu URL de backend:
# NEXT_PUBLIC_API_URL=https://tu-api.railway.app

# 3. Desarrollo
npm run dev

# 4. Producción
npm run build
npm start
```

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base del backend (sin / final) | `https://api.revesshop.com` |

> ⚠️ **Nunca hardcodees `localhost` en producción.** Siempre usa `NEXT_PUBLIC_API_URL`.

## Estructura

```
src/
├── app/
│   ├── layout.js              # Layout raíz con AuthProvider + Navbar
│   ├── page.js                # Home / Landing
│   ├── not-found.js           # 404
│   ├── error.js               # Error boundary
│   ├── auth/
│   │   ├── login/page.js      # Login con JWT
│   │   └── register/page.js   # Registro
│   ├── products/
│   │   ├── page.js            # Catálogo con filtros y paginación
│   │   └── [id]/page.js       # Detalle con conversor de divisas
│   ├── profile/page.js        # Perfil (protegido)
│   └── admin/page.js          # CRUD de productos (solo admin)
├── components/
│   ├── Navbar.js              # Navegación con estado de sesión
│   ├── ProductCard.js         # Tarjeta de producto
│   └── UIHelpers.js           # LoadingScreen, Alert, Skeleton, etc.
├── lib/
│   ├── api.js                 # Cliente HTTP centralizado
│   └── auth.js                # AuthContext + hooks
└── styles/
    └── globals.css            # Sistema de diseño completo
```

## Rutas

| Ruta | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing con productos destacados y tasas de cambio |
| `/products` | Público | Catálogo con filtros (categoría, marca, búsqueda) |
| `/products/[id]` | Público | Detalle + conversor de divisas en tiempo real |
| `/auth/login` | Público | Login con JWT |
| `/auth/register` | Público | Registro de usuario |
| `/profile` | 🔒 Autenticado | Perfil del usuario |
| `/admin` | 🔒 Solo admin | Panel CRUD de productos |

## Seguridad

- Token JWT se almacena en `localStorage` bajo la clave `rs_token`
- Se inyecta automáticamente en el header `Authorization: Bearer <token>` de toda petición API
- Las rutas `/profile` y `/admin` redirigen a login si no hay sesión válida
- El rol `admin` se valida tanto en el backend como en el frontend para mostrar/ocultar opciones
