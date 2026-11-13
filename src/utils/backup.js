import { addCode, normalizeCode, parseQuantity } from './inventory.js';

export const BACKUP_FORMAT = 'inventario-local-backup';

export function createBackup(ventas, storage) {
  return {
    format: BACKUP_FORMAT,
    version: 1,
    exportedAt: new Date().toISOString(),
    inventarios: ventas.map(venta => ({
      name: venta.name,
      date: venta.date,
      items: JSON.parse(storage.getItem(`inventario_items_${venta.id}`) ?? '[]').map(item => ({
        codigo: item.codigo,
        cantidad: item.cantidad
      }))
    }))
  };
}

export function parseBackup(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('El archivo no contiene un respaldo JSON válido.');
  }

  if (data?.format !== BACKUP_FORMAT || data.version !== 1 || !Array.isArray(data.inventarios)) {
    throw new Error('El archivo no corresponde a un respaldo de Inventario.');
  }

  for (const inventario of data.inventarios) {
    if (typeof inventario.name !== 'string' || !inventario.name.trim() || !Array.isArray(inventario.items)) {
      throw new Error('El respaldo contiene un inventario inválido.');
    }
    for (const item of inventario.items) {
      normalizeCode(item.codigo);
      parseQuantity(item.cantidad);
    }
  }
  return data;
}

export function prepareRestore(backup, makeId) {
  return backup.inventarios.map(inventario => {
    const registro = {
      id: makeId(),
      name: inventario.name.trim().toUpperCase(),
      date: typeof inventario.date === 'string' ? inventario.date : new Date().toLocaleDateString('es-CL')
    };
    let items = [];
    for (const item of inventario.items) {
      items = addCode(items, item.codigo, item.cantidad, makeId()).items;
    }
    return { inventario: registro, items };
  });
}
