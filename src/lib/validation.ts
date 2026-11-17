import { z } from 'zod';

export const briefSchema = z.object({
  // 1. Datos del cliente
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  empresa: z.string().optional(),
  email: z.string().email('Introduce un correo electrónico válido'),
  telefono: z.string().optional(),
  rubro: z.string().optional(),

  // 2. Sobre el proyecto
  tipo_sitio: z.string().min(1, 'Selecciona un tipo de sitio'),
  objetivo: z.string().min(10, 'El objetivo debe tener al menos 10 caracteres'),
  publico: z.string().optional(),
  referencias: z.string().optional(),
  fecha_entrega: z.string().optional(),
  presupuesto: z.string().optional(),

  // 3. Diseño e identidad visual
  marca: z.array(z.string()).optional(),
  color_principal: z.string().optional(),
  color_secundario: z.string().optional(),
  color_acento: z.string().optional(),
  colores_no: z.string().optional(),
  estilo: z.array(z.string()).optional(),
  modo: z.string().optional(),

  // 4. Contenido
  secciones: z.array(z.string()).optional(),
  contenido_proveedor: z.string().optional(),
  idiomas: z.string().optional(),

  // 5. Funcionalidad y sistemas
  funciones: z.array(z.string()).optional(),
  sistema: z.string().optional(),
  admin: z.string().optional(),

  // 6. Base de datos
  db_necesita: z.string().optional(),
  db_que: z.string().optional(),
  db_quien: z.string().optional(),
  db_volumen: z.string().optional(),
  db_sensible: z.string().optional(),

  // 7. Técnico y extras
  tiene: z.array(z.string()).optional(),
  dominio: z.string().optional(),
  extras: z.array(z.string()).optional(),

  // 8. Observaciones y aprobación
  observaciones: z.string().optional(),
  fecha_firma: z.string().optional(),
  firma: z.string().optional(),
});

export type BriefData = z.infer<typeof briefSchema>;
