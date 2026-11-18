# Brief del Proyecto — React

Formulario moderno de brief de proyecto construido con **React 19**, **TypeScript**, **Vite** y **Zustand**. Diseño inspirado en la estética de JetBrains Junie con glassmorphism, modo oscuro y gradientes.

## Características

- 🎨 **Diseño glassmorphism** — Tarjetas translúcidas con backdrop-blur y gradientes
- 🌙 **Modo oscuro/claro** — Toggle con detección automática de preferencia del sistema
- ✅ **Validación en tiempo real** — React Hook Form + Zod
- 💬 **Envío a Discord** — Embed formateado enviado a webhook de Discord
- 📊 **Barra de progreso** — Muestra el porcentaje de campos completados
- 💾 **Persistencia local** — Los datos se guardan automáticamente en localStorage
- 📤 **Exportar JSON** — Descarga los datos del brief como archivo JSON
- 🖨️ **Imprimir** — Estilos optimizados para impresión
- 🔔 **Notificaciones toast** — Feedback visual para cada acción
- 📱 **Responsive** — Adaptado para móvil, tablet y escritorio

## Stack

- **React 19** — UI framework
- **TypeScript** — Tipado estático
- **Vite** — Build tool y dev server
- **Zustand** — Gestión de estado
- **React Hook Form** — Manejo de formularios
- **Zod** — Validación de esquemas
- **Lucide React** — Iconos

## Estructura

```
src/
├── components/     # Componentes UI reutilizables
├── lib/            # Utilidades (validación, Discord)
├── stores/         # Stores de Zustand
├── App.tsx         # Componente principal
├── main.tsx        # Entry point
└── index.css       # Estilos globales
```

## Uso local

```bash
pnpm install
pnpm dev
```

## Deploy en Vercel

```bash
pnpm build
vercel --prod
```

O conectá tu repositorio de GitHub a [vercel.com](https://vercel.com) para deploy automático.

## Variables de entorno

Antes de desplegar, copiá `.env.example` a `.env.local` y completá los valores:

```bash
cp .env.example .env.local
```

En Vercel, agregá las variables de entorno desde el panel de configuración del proyecto.

## Navegadores soportados

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
