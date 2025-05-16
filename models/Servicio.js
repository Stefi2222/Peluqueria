
const sql = require('mssql');

// Configuración de la base de datos, si no lo tienes en otro archivo
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,  // Si estás usando cifrado en la conexión
        trustServerCertificate: true // Evita errores con certificados no confiables
    }
};

// Función para obtener todas los servicios 

async function obtenerServicios() {
    let pool;
    try {
        pool = await sql.connect(dbConfig); // Crear conexión en cada solicitud
        const result = await pool.request().query('SELECT * FROM Servicios');
        return result.recordset;
    } catch (error) {
        console.error("Error en la consulta de Servicios: ", error.message);
        throw new Error("Error al obtener Servicios desde la base de datos");
    } finally {
        if (pool) await pool.close(); // Cerrar conexión al finalizar
    }
}

module.exports = { obtenerServicios };

