import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = path.join(__dirname, '../storage');  // Ruta a la carpeta 'storage'
        console.log('Destino del archivo:', pathStorage);  // Depuración: Verificar si se genera correctamente el destino
        cb(null, pathStorage);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);  // Obtén la extensión de forma segura
        const filename = `file-${Date.now()}${ext}`;
        console.log('Nombre del archivo generado:', filename);  // Depuración: Verifica el nombre del archivo
        cb(null, filename);
    }
});

// Configuración de multer con filtro de archivos
const uploadFile = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|svg/;  // Tipos de archivo permitidos
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        console.log('Extensión del archivo:', extname);  // Depuración: Verificar si el archivo tiene una extensión permitida
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido'));  // Error si el archivo no es permitido
        }
    }
});

export default uploadFile;
