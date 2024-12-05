import ActCategoria from './ActCategoria.js';
import ActSubCategoria from './ActSubCategoria.js';
import Sucursal from '../../administracion/models/Sucursal.js';

// Relación: Una categoría tiene muchas subcategorías
ActCategoria.hasMany(ActSubCategoria, { foreignKey: 'categoriaId', as: 'subcategorias' });

// Relación: Una subcategoría pertenece a una categoría
ActSubCategoria.belongsTo(ActCategoria, { foreignKey: 'categoriaId', as: 'categoria' });

// Relación: Una sucursal tiene muchas categorías
Sucursal.hasMany(ActCategoria, { foreignKey: 'sucursalId', as: 'categorias' });

// Relación: Una categoría pertenece a una sucursal
ActCategoria.belongsTo(Sucursal, { foreignKey: 'sucursalId', as: 'sucursal' });

export { Sucursal, ActCategoria, ActSubCategoria };