/**
 * Descarga un archivo desde el navegador creando un Blob y un link temporal.
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Lista de campos de texto para calcular el progreso del formulario.
 * Se deriva de los campos del esquema de validación.
 */
export const textFieldsForProgress = [
  'nombre', 'empresa', 'email', 'telefono', 'rubro',
  'tipo_sitio', 'objetivo', 'publico', 'referencias', 'fecha_entrega', 'presupuesto',
  'colores_no', 'modo', 'contenido_proveedor', 'idiomas', 'sistema', 'admin',
  'db_necesita', 'db_que', 'db_quien', 'db_volumen', 'db_sensible',
  'dominio', 'observaciones', 'fecha_firma', 'firma',
] as const;

/**
 * Lista de campos de array (checkbox) para calcular el progreso.
 */
export const arrayFieldsForProgress = [
  'marca', 'estilo', 'secciones', 'funciones', 'tiene', 'extras',
] as const;
