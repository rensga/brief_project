import { type BriefData } from './validation';

export const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1572022802524143746/gqMNUu740--SHJiUjGEJzbI8CATfPvO0_k_gEDp5zyoHb3RNlessWvj3jpMtVrppqpad';

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
 * Genera el payload para el webhook de Discord con un resumen del brief.
 */
export function buildDiscordPayload(data: BriefData) {
  const negocio = v(data.empresa) || v(data.nombre) || 'Sin nombre';
  const now = new Date().toLocaleString('es-ES');

  const fields: { name: string; value: string; inline: boolean }[] = [];

  // Cliente
  fields.push({ name: '👤 Cliente', value: v(data.nombre) || 'No especificado', inline: true });
  fields.push({ name: '🏢 Empresa', value: v(data.empresa) || 'No especificada', inline: true });
  fields.push({ name: '📧 Email', value: v(data.email) || 'No especificado', inline: true });
  if (v(data.telefono)) fields.push({ name: '📞 Teléfono', value: v(data.telefono), inline: true });
  if (v(data.rubro)) fields.push({ name: '🏷️ Rubro', value: v(data.rubro), inline: true });

  // Proyecto
  fields.push({ name: '🌐 Tipo de sitio', value: v(data.tipo_sitio) || 'No especificado', inline: true });
  fields.push({ name: '🎯 Objetivo', value: v(data.objetivo)?.slice(0, 200) || 'No especificado', inline: false });
  if (v(data.publico)) fields.push({ name: '👥 Público', value: v(data.publico)?.slice(0, 200) || '', inline: false });
  if (v(data.presupuesto)) fields.push({ name: '💰 Presupuesto', value: v(data.presupuesto), inline: true });
  if (v(data.fecha_entrega)) fields.push({ name: '📅 Fecha entrega', value: v(data.fecha_entrega), inline: true });

  // Diseño
  if (vArr(data.estilo)) fields.push({ name: '🎨 Estilo', value: vArr(data.estilo), inline: false });
  fields.push({
    name: '🎨 Paleta de colores',
    value: `Principal: \`${v(data.color_principal) || '#2563eb'}\`\nSecundario: \`${v(data.color_secundario) || '#7c3aed'}\`\nAcento: \`${v(data.color_acento) || '#f59e0b'}\``,
    inline: false,
  });
  if (v(data.modo)) fields.push({ name: '🌓 Modo', value: v(data.modo), inline: true });

  // Contenido
  if (vArr(data.secciones)) fields.push({ name: '📄 Secciones', value: vArr(data.secciones), inline: false });
  if (v(data.idiomas)) fields.push({ name: '🌍 Idiomas', value: v(data.idiomas), inline: true });

  // Funcionalidad
  if (vArr(data.funciones)) fields.push({ name: '⚙️ Funcionalidades', value: vArr(data.funciones), inline: false });
  if (v(data.admin)) fields.push({ name: '👨‍💻 Administración', value: v(data.admin), inline: true });

  // Base de datos
  if (v(data.db_necesita)) fields.push({ name: '🗄️ Base de datos', value: v(data.db_necesita), inline: false });

  // Técnico
  if (v(data.dominio)) fields.push({ name: '🔗 Dominio', value: v(data.dominio), inline: true });
  if (vArr(data.extras)) fields.push({ name: '📦 Extras', value: vArr(data.extras), inline: false });

  // Observaciones
  if (v(data.observaciones)) fields.push({ name: '📝 Observaciones', value: v(data.observaciones)?.slice(0, 500) || '', inline: false });

  return {
    username: 'Brief de Proyecto Web',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/3063/3063822.png',
    embeds: [{
      title: `📋 Nuevo Brief: ${negocio}`,
      description: `Se ha recibido un nuevo brief para "${negocio}". Se adjunta el archivo .md con el prompt completo para desarrollo.\n\n**Tipo:** ${v(data.tipo_sitio) || 'No especificado'}\n**Objetivo:** ${v(data.objetivo)?.slice(0, 200) || 'No especificado'}`,
      color: 0x2563eb,
      fields,
      footer: {
        text: `Enviado por ${v(data.nombre) || 'Anónimo'} • ${now}`,
      },
      timestamp: new Date().toISOString(),
    }],
  };
}

export async function sendToDiscord(data: BriefData): Promise<boolean> {
  const payload = buildDiscordPayload(data);
  const response = await fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.ok || response.status === 204;
}
