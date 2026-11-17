import { type BriefData } from './validation';

function v(value?: string) {
  return value && value.trim() ? value.trim() : '';
}
function vArr(values?: string[]) {
  return values && values.length ? values.join(', ') : '';
}

/**
 * Genera el contenido del archivo .md con un prompt completo para un agente de IA
 * que pueda desarrollar la página web basada en el brief.
 */
export function generateMarkdownPrompt(data: BriefData): string {
  const negocio = v(data.empresa) || v(data.nombre) || 'Proyecto sin nombre';
  const lines: string[] = [];

  lines.push(`# Brief de Desarrollo Web: ${negocio}`);
  lines.push('');
  lines.push(`> Este documento fue generado automáticamente a partir del brief completado por el cliente.`);
  lines.push(`> Úsalo como prompt para desarrollar la página web completa.`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 🤖 Prompt para Agente de IA');
  lines.push('');
  lines.push(`Eres un desarrollador web senior experto en crear sitios web profesionales, modernos y funcionales.`);
  lines.push(`Tu tarea es desarrollar la página web completa para el negocio "${negocio}" siguiendo las especificaciones detalladas a continuación.`);
  lines.push('');
  lines.push('### Contexto del Proyecto');
  lines.push('');

  if (v(data.rubro)) {
    lines.push(`- **Rubro/Actividad:** ${v(data.rubro)}`);
  }
  if (v(data.tipo_sitio)) {
    lines.push(`- **Tipo de sitio:** ${v(data.tipo_sitio)}`);
  }
  if (v(data.objetivo)) {
    lines.push(`- **Objetivo principal:** ${v(data.objetivo)}`);
  }
  if (v(data.publico)) {
    lines.push(`- **Público objetivo:** ${v(data.publico)}`);
  }
  if (v(data.idiomas)) {
    lines.push(`- **Idiomas:** ${v(data.idiomas)}`);
  }
  lines.push('');

  lines.push('### 🎨 Diseño e Identidad Visual');
  lines.push('');
  lines.push('Instrucciones de diseño:');
  lines.push('');

  if (vArr(data.estilo)) {
    lines.push(`- **Estilo visual:** ${vArr(data.estilo)}`);
  }
  if (v(data.color_principal)) {
    lines.push(`- **Color principal:** \`${v(data.color_principal)}\``);
  }
  if (v(data.color_secundario)) {
    lines.push(`- **Color secundario:** \`${v(data.color_secundario)}\``);
  }
  if (v(data.color_acento)) {
    lines.push(`- **Color de acento:** \`${v(data.color_acento)}\``);
  }
  if (v(data.modo)) {
    lines.push(`- **Modo de visualización:** ${v(data.modo)}`);
  }
  if (vArr(data.marca)) {
    lines.push(`- **Identidad de marca:** ${vArr(data.marca)}`);
  }
  if (v(data.colores_no)) {
    lines.push(`- **⚠️ Colores/estilos a evitar:** ${v(data.colores_no)}`);
  }
  lines.push('');

  lines.push('### 📄 Estructura y Secciones');
  lines.push('');
  lines.push('El sitio debe incluir las siguientes secciones:');
  lines.push('');

  if (vArr(data.secciones)) {
    const secciones = vArr(data.secciones).split(', ');
    secciones.forEach((sec, i) => {
      lines.push(`${i + 1}. **${sec.trim()}**`);
    });
  } else {
    lines.push('1. **Inicio** - Hero section con CTA principal');
    lines.push('2. **Sobre nosotros** - Descripción del negocio');
    lines.push('3. **Servicios** - Catálogo de servicios');
    lines.push('4. **Contacto** - Formulario y datos de contacto');
  }
  lines.push('');

  if (v(data.contenido_proveedor)) {
    lines.push(`**Proveedor de contenido:** ${v(data.contenido_proveedor)}`);
    lines.push('');
  }

  lines.push('### ⚙️ Funcionalidades Requeridas');
  lines.push('');

  if (vArr(data.funciones)) {
    const funcs = vArr(data.funciones).split(', ');
    funcs.forEach((fn) => {
      lines.push(`- [ ] ${fn.trim()}`);
    });
  }
  lines.push('');

  if (v(data.sistema)) {
    lines.push(`**Sistema especial requerido:** ${v(data.sistema)}`);
    lines.push('');
  }

  lines.push('### 🗄️ Base de Datos');
  lines.push('');

  if (v(data.db_necesita)) {
    lines.push(`- **Necesidad de BD:** ${v(data.db_necesita)}`);
  }
  if (v(data.db_que)) {
    lines.push(`- **Datos a almacenar:** ${v(data.db_que)}`);
  }
  if (v(data.db_quien)) {
    lines.push(`- **Quién gestiona datos:** ${v(data.db_quien)}`);
  }
  if (v(data.db_volumen)) {
    lines.push(`- **Volumen estimado:** ${v(data.db_volumen)}`);
  }
  if (v(data.db_sensible)) {
    lines.push(`- **Datos sensibles:** ${v(data.db_sensible)}`);
  }
  lines.push('');

  lines.push('### 🛠️ Aspectos Técnicos');
  lines.push('');

  if (vArr(data.tiene)) {
    lines.push(`**Recursos disponibles:** ${vArr(data.tiene)}`);
  }
  if (v(data.dominio)) {
    lines.push(`**Dominio deseado:** ${v(data.dominio)}`);
  }
  if (vArr(data.extras)) {
    lines.push(`**Servicios adicionales:** ${vArr(data.extras)}`);
  }
  if (v(data.admin)) {
    lines.push(`**Administración post-entrega:** ${v(data.admin)}`);
  }
  lines.push('');

  lines.push('### 📋 Instrucciones de Desarrollo');
  lines.push('');
  lines.push('1. **Analiza** todas las especificaciones anteriores antes de comenzar.');
  lines.push('2. **Planifica** la estructura del proyecto y la arquitectura.');
  lines.push('3. **Diseña** la interfaz siguiendo la paleta de colores y el estilo indicado.');
  lines.push('4. **Implementa** todas las secciones y funcionalidades requeridas.');
  lines.push('5. **Asegúrate** de que el sitio sea responsive (móvil, tablet, escritorio).');
  lines.push('6. **Optimiza** para rendimiento y SEO básico.');
  lines.push('7. **Entrega** un sitio funcional y listo para producción.');
  lines.push('');

  if (v(data.referencias)) {
    lines.push('### 🔗 Referencias de Diseño');
    lines.push('');
    lines.push(v(data.referencias));
    lines.push('');
  }

  if (v(data.observaciones)) {
    lines.push('### 📝 Observaciones Adicionales');
    lines.push('');
    lines.push(v(data.observaciones));
    lines.push('');
  }

  if (v(data.presupuesto)) {
    lines.push(`**Presupuesto:** ${v(data.presupuesto)}`);
  }
  if (v(data.fecha_entrega)) {
    lines.push(`**Fecha de entrega:** ${v(data.fecha_entrega)}`);
  }

  lines.push('');
  lines.push('---');
  lines.push(`_Generado el ${new Date().toLocaleString('es-ES')} desde el Brief de Proyecto Web_`);

  return lines.join('\n');
}

/**
 * Genera el mensaje de Telegram con un resumen del brief.
 */
export function buildTelegramMessage(data: BriefData): string {
  const negocio = v(data.empresa) || v(data.nombre) || 'Sin nombre';
  const now = new Date().toLocaleString('es-ES');

  let message = `📋 *Nuevo Brief: ${negocio}*\n\n`;
  message += `Se ha recibido un nuevo brief para "${negocio}".\n\n`;

  // Cliente
  message += `*👤 Cliente:*\n`;
  message += `• Nombre: ${v(data.nombre) || 'No especificado'}\n`;
  message += `• Empresa: ${v(data.empresa) || 'No especificada'}\n`;
  message += `• Email: ${v(data.email) || 'No especificado'}\n`;
  if (v(data.telefono)) message += `• Teléfono: ${v(data.telefono)}\n`;
  if (v(data.rubro)) message += `• Rubro: ${v(data.rubro)}\n`;
  message += `\n`;

  // Proyecto
  message += `*🌐 Proyecto:*\n`;
  message += `• Tipo: ${v(data.tipo_sitio) || 'No especificado'}\n`;
  message += `• Objetivo: ${v(data.objetivo)?.slice(0, 200) || 'No especificado'}\n`;
  if (v(data.publico)) message += `• Público: ${v(data.publico)?.slice(0, 200)}\n`;
  if (v(data.presupuesto)) message += `• Presupuesto: ${v(data.presupuesto)}\n`;
  if (v(data.fecha_entrega)) message += `• Fecha entrega: ${v(data.fecha_entrega)}\n`;
  message += `\n`;

  // Diseño
  message += `*🎨 Diseño:*\n`;
  if (vArr(data.estilo)) message += `• Estilo: ${vArr(data.estilo)}\n`;
  message += `• Colores: ${v(data.color_principal) || '#2563eb'} / ${v(data.color_secundario) || '#7c3aed'} / ${v(data.color_acento) || '#f59e0b'}\n`;
  if (v(data.modo)) message += `• Modo: ${v(data.modo)}\n`;
  message += `\n`;

  // Contenido
  if (vArr(data.secciones)) {
    message += `*📄 Secciones:*\n${vArr(data.secciones)}\n\n`;
  }
  if (v(data.idiomas)) {
    message += `*🌍 Idiomas:*\n${v(data.idiomas)}\n\n`;
  }

  // Funcionalidad
  if (vArr(data.funciones)) {
    message += `*⚙️ Funcionalidades:*\n${vArr(data.funciones)}\n\n`;
  }
  if (v(data.admin)) {
    message += `*👨‍💻 Administración:*\n${v(data.admin)}\n\n`;
  }

  // Base de datos
  if (v(data.db_necesita)) {
    message += `*🗄️ Base de datos:*\n${v(data.db_necesita)}\n\n`;
  }

  // Técnico
  if (v(data.dominio)) {
    message += `*🔗 Dominio:*\n${v(data.dominio)}\n\n`;
  }
  if (vArr(data.extras)) {
    message += `*📦 Extras:*\n${vArr(data.extras)}\n\n`;
  }

  // Observaciones
  if (v(data.observaciones)) {
    message += `*📝 Observaciones:*\n${v(data.observaciones)?.slice(0, 500)}\n\n`;
  }

  message += `---\n`;
  message += `📅 Enviado por ${v(data.nombre) || 'Anónimo'} • ${now}`;

  return message;
}

/**
 * Envía el brief a Telegram.
 * - En desarrollo local: llama directamente a la API de Telegram usando las variables VITE_TELEGRAM_*.
 * - En producción: usa la Netlify Function que protege el token del bot.
 */
export async function sendToTelegram(data: BriefData): Promise<boolean> {
  // En desarrollo, usar API directa de Telegram
  if (import.meta.env.DEV) {
    return sendToTelegramDirect(data);
  }

  // En producción, usar Netlify Function
  return sendToTelegramViaFunction(data);
}

/**
 * Envía directamente a la API de Telegram (solo desarrollo local).
 */
async function sendToTelegramDirect(data: BriefData): Promise<boolean> {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('Credenciales de Telegram no configuradas en .env.local');
    return false;
  }

  try {
    // 1. Enviar mensaje de resumen
    const message = buildTelegramMessage(data);
    const messageUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const messageResponse = await fetch(messageUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!messageResponse.ok) {
      const errorData = await messageResponse.json().catch(() => null);
      console.error('Error al enviar mensaje a Telegram:', errorData?.description || messageResponse.statusText);
      return false;
    }

    // 2. Enviar documento .md
    const mdContent = generateMarkdownPrompt(data);
    const negocio = (data.empresa || data.nombre || 'brief').toString().toLowerCase().replace(/\s+/g, '-');
    const filename = `prompt-${negocio}.md`;
    const docUrl = `https://api.telegram.org/bot${botToken}/sendDocument`;

    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', new Blob([mdContent], { type: 'text/markdown;charset=utf-8' }), filename);

    const docResponse = await fetch(docUrl, {
      method: 'POST',
      body: formData,
    });

    if (!docResponse.ok) {
      const errorData = await docResponse.json().catch(() => null);
      console.error('Error al enviar documento a Telegram:', errorData?.description || docResponse.statusText);
      // No fallar completamente si el mensaje ya se envió
    }

    return true;
  } catch (error) {
    console.error('Error al enviar a Telegram:', error);
    return false;
  }
}

/**
 * Envía a través de la Netlify Function (producción).
 */
async function sendToTelegramViaFunction(data: BriefData): Promise<boolean> {
  const url = '/.netlify/functions/send-brief';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Error al enviar brief:', errorData?.error || response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error de red al enviar brief:', error);
    return false;
  }
}
