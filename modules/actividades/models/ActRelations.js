import ActCategoria from './ActCategoria.js';
import ActSubCategoria from './ActSubCategoria.js';
import Actividad from './Actividad.js';
import Sucursal from '../../administracion/models/Sucursal.js';
import Unidad from '../../administracion/models/Unidad.js';
import Finca from '../../../models/Finca.js';
import Programacion from './Programacion.js';
import Estado from '../../administracion/models/Estado.js';
import Prioridad from '../../administracion/models/Prioridad.js';
import User from '../../../auth/models/User.js';


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


// Relación: Una actividad pertenece a una subcategoría
Actividad.belongsTo(ActSubCategoria, { foreignKey: 'subCategoriaId', as: 'subcategoria' });
// Relación: Una subcategoría tiene muchas actividades
ActSubCategoria.hasMany(Actividad, { foreignKey: 'subCategoriaId', as: 'actividades' });




// Programaciones


// Relación: Programación pertenece a una sucursal
Programacion.belongsTo(Sucursal, { foreignKey: 'sucursalId', as: 'sucursal' });
Sucursal.hasMany(Programacion, { foreignKey: 'sucursalId', as: 'programaciones' });

// // Relación: Programación pertenece a un responsable
Programacion.belongsTo(User, { foreignKey: 'responsableId', as: 'responsable' });
User.hasMany(Programacion, { foreignKey: 'responsableId', as: 'programaciones' });

// Relación: Programación pertenece a una finca
Programacion.belongsTo(Finca, { foreignKey: 'fincaId', as: 'finca' });
Finca.hasMany(Programacion, { foreignKey: 'fincaId', as: 'programaciones' });

// Relación: Programación pertenece a una actividad
Programacion.belongsTo(Actividad, { foreignKey: 'actividadId', as: 'actividad' });
Actividad.hasMany(Programacion, { foreignKey: 'actividadId', as: 'programaciones' });

// Relación: Programación pertenece a una actividad
Programacion.belongsTo(Estado, { foreignKey: 'estadoId', as: 'estado' });
Estado.hasMany(Programacion, { foreignKey: 'estadoId', as: 'programaciones' });

// Relación: Programación pertenece a una actividad
Programacion.belongsTo(Prioridad, { foreignKey: 'prioridadId', as: 'prioridad' });
Prioridad.hasMany(Programacion, { foreignKey: 'prioridadId', as: 'programaciones' });




export { Sucursal, ActCategoria, ActSubCategoria,Actividad};

// hola