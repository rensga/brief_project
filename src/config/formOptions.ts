// Todas las opciones estáticas del formulario, extraídas para facilitar mantenimiento y traducción.

export interface FormOption {
  value: string;
  label: string;
}

// ---- 2. PROYECTO ----

export const tipoSitioOptions: FormOption[] = [
  { value: 'Landing page', label: 'Landing page' },
  { value: 'Sitio corporativo', label: 'Sitio corporativo' },
  { value: 'Tienda online', label: 'Tienda online' },
  { value: 'Blog / revista', label: 'Blog / revista' },
  { value: 'Portfolio', label: 'Portfolio' },
  { value: 'Sistema / app web', label: 'Sistema / app web' },
  { value: 'Otro', label: 'Otro (aclarar abajo)' },
];

// ---- 3. DISEÑO ----

export const marcaOptions: FormOption[] = [
  { value: 'Tiene logo', label: 'Tengo logo' },
  { value: 'Tiene manual de marca', label: 'Tengo manual de marca' },
  { value: 'Necesita logo', label: 'Necesito que me hagan el logo' },
  { value: 'Necesita asesoría', label: 'Necesito asesoría de imagen' },
];

export const estiloOptions: FormOption[] = [
  { value: 'Minimalista', label: 'Minimalista' },
  { value: 'Moderno', label: 'Moderno' },
  { value: 'Elegante', label: 'Elegante' },
  { value: 'Colorido', label: 'Colorido / llamativo' },
  { value: 'Corporativo', label: 'Corporativo' },
  { value: 'Artesanal', label: 'Artesanal / cálido' },
];

export const modoOptions: FormOption[] = [
  { value: '', label: '— Elegir —' },
  { value: 'Claro', label: 'Claro' },
  { value: 'Oscuro', label: 'Oscuro' },
  { value: 'Ambos (con botón de cambio)', label: 'Ambos (con botón de cambio)' },
];

// ---- 4. CONTENIDO ----

export const seccionesOptions: FormOption[] = [
  { value: 'Inicio', label: 'Inicio' },
  { value: 'Sobre nosotros', label: 'Sobre nosotros' },
  { value: 'Servicios', label: 'Servicios' },
  { value: 'Productos', label: 'Productos' },
  { value: 'Galería', label: 'Galería' },
  { value: 'Blog / noticias', label: 'Blog / noticias' },
  { value: 'Testimonios', label: 'Testimonios' },
  { value: 'Preguntas frecuentes', label: 'Preguntas frecuentes' },
  { value: 'Contacto', label: 'Contacto' },
  { value: 'Otra', label: 'Otra (aclarar abajo)' },
];

export const contenidoProveedorOptions: FormOption[] = [
  { value: '', label: '— Elegir —' },
  { value: 'Yo tengo todo listo', label: 'Yo tengo todo listo' },
  { value: 'Tengo textos pero necesito imágenes', label: 'Tengo textos pero necesito imágenes' },
  { value: 'Necesito que me ayuden a redactar', label: 'Necesito que me ayuden a redactar' },
  { value: 'Necesito banco de imágenes', label: 'Necesito banco de imágenes' },
  { value: 'No tengo nada, necesito todo', label: 'No tengo nada, necesito todo' },
];

// ---- 5. FUNCIONALIDAD ----

export const funcionesOptions: FormOption[] = [
  { value: 'Formulario de contacto', label: 'Formulario de contacto' },
  { value: 'Botón WhatsApp', label: 'Botón de WhatsApp' },
  { value: 'Mapa / ubicación', label: 'Mapa / ubicación' },
  { value: 'Newsletter', label: 'Newsletter / suscripción' },
  { value: 'Blog / CMS', label: 'Blog o CMS editable' },
  { value: 'Tienda / pagos', label: 'Tienda / pagos online' },
  { value: 'Usuarios / login', label: 'Usuarios / login' },
  { value: 'Panel de administración', label: 'Panel de administración' },
  { value: 'Reservas / turnos', label: 'Reservas / turnos' },
  { value: 'Chat / mensajería', label: 'Chat / mensajería' },
  { value: 'Redes sociales', label: 'Integración con redes' },
  { value: 'Otra', label: 'Otra (aclarar abajo)' },
];

export const adminOptions: FormOption[] = [
  { value: '', label: '— Elegir —' },
  { value: 'Yo mismo/a', label: 'Yo mismo/a' },
  { value: 'Un empleado', label: 'Un empleado' },
  { value: 'Vos (con mantenimiento mensual)', label: 'Vos (con mantenimiento mensual)' },
  { value: 'No sé todavía', label: 'No sé todavía' },
];

// ---- 6. BASE DE DATOS ----

export const dbNecesitaOptions: FormOption[] = [
  { value: '', label: '— Elegir —' },
  { value: 'No, solo contenido estático', label: 'No, solo contenido estático' },
  { value: 'Sí, muy simple (contactos, suscriptores, etc.)', label: 'Sí, muy simple (contactos, suscriptores, etc.)' },
  { value: 'Sí, mediana (productos, pedidos, turnos, etc.)', label: 'Sí, mediana (productos, pedidos, turnos, etc.)' },
  { value: 'No sé, necesito que me asesoren', label: 'No sé, necesito que me asesoren' },
];

export const dbSensibleOptions: FormOption[] = [
  { value: '', label: '— Elegir —' },
  { value: 'No', label: 'No' },
  { value: 'Sí, datos personales', label: 'Sí, datos personales' },
  { value: 'Sí, pagos / datos bancarios', label: 'Sí, pagos / datos bancarios' },
];

// ---- 7. TÉCNICO ----

export const tieneOptions: FormOption[] = [
  { value: 'Dominio', label: 'Dominio propio' },
  { value: 'Hosting', label: 'Hosting' },
  { value: 'Ninguno', label: 'Ninguno (necesito todo)' },
  { value: 'Redes activas', label: 'Redes sociales activas' },
];

export const extrasOptions: FormOption[] = [
  { value: 'SEO', label: 'SEO básico' },
  { value: 'Google Analytics', label: 'Google Analytics' },
  { value: 'Mantenimiento', label: 'Mantenimiento mensual' },
  { value: 'Carga de contenido', label: 'Carga de contenido' },
  { value: 'Capacitación', label: 'Capacitación de uso' },
];
