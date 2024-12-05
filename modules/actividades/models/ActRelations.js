import ActCategoria from './ActCategoria.js';
import ActSubCategoria from './ActSubCategoria.js';
import Actividad from './Actividad.js';
import Sucursal from '../../administracion/models/Sucursal.js';
import Unidad from '../../administracion/models/Unidad.js';

// Relación: Una sucursal tiene muchas categorías
Sucursal.hasMany(ActCategoria, { foreignKey: 'sucursalId', as: 'categorias' });

// Relación: Una categoría tiene muchas subcategorías
ActCategoria.hasMany(ActSubCategoria, { foreignKey: 'categoriaId', as: 'subcategorias' });


// Relación: Una subcategoría pertenece a una categoría
ActSubCategoria.belongsTo(ActCategoria, { foreignKey: 'categoriaId', as: 'categoria' });

// Relación: Una categoría pertenece a una sucursal
ActCategoria.belongsTo(Sucursal, { foreignKey: 'sucursalId', as: 'sucursal' });

// Relación: Una actividad pertenece a una unidad de medida
Actividad.belongsTo(Unidad, { foreignKey: 'unidadId', as: 'unidad' });

// Relación: Una unidad de medida tiene muchas actividades
Unidad.hasMany(Actividad, { foreignKey: 'unidadId', as: 'actividades' });

export { Sucursal, ActCategoria, ActSubCategoria,Actividad};