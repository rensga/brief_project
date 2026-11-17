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

## Deploy en Netlify

```bash
pnpm build
netlify deploy --prod
```

O arrastra la carpeta `dist` a [app.netlify.com/drop](https://app.netlify.com/drop).

## Navegadores soportados

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
