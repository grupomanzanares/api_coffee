import ActCategoria from './ActCategoria.js';
import ActSubCategoria from './ActSubCategoria.js';

// Relación: Una categoría tiene muchas subcategorías
ActCategoria.hasMany(ActSubCategoria, { foreignKey: 'categoriaId', as: 'subcategorias' });

// Relación: Una subcategoría pertenece a una categoría
ActSubCategoria.belongsTo(ActCategoria, { foreignKey: 'categoriaId', as: 'categoria' });

export { ActCategoria, ActSubCategoria };