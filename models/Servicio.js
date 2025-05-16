
const sql = require('mssql');

// Configuraci�n de la base de datos, si no lo tienes en otro archivo
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,  // Si est�s usando cifrado en la conexi�n
        trustServerCertificate: true // Evita errores con certificados no confiables
    }
};

// Funci�n para obtener todas los servicios 

async function obtenerServicios() {
    let pool;
    try {
        pool = await sql.connect(dbConfig); // Crear conexi�n en cada solicitud
        const result = await pool.request().query('SELECT * FROM Servicios');
        return result.recordset;
    } catch (error) {
        console.error("Error en la consulta de Servicios: ", error.message);
        throw new Error("Error al obtener Servicios desde la base de datos");
    } finally {
        if (pool) await pool.close(); // Cerrar conexi�n al finalizar
    }
}

module.exports = { obtenerServicios };

