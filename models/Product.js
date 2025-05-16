const sql = require('mssql');

// Configuración de la base de datos, si no lo tienes en otro archivo
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
        requestTimeout: 60000  // Aumentar a 60 segundos
    }
};

async function obtenerProductos() {
    let pool;
    try {
        pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Productos');
        return result.recordset;
    } catch (error) {
        console.error("Error en la consulta de los Productos: ", error.message);
        throw new Error("Error al obtener los Productos desde la base de datos");
    } finally {
        // Siempre cerrar la conexión incluso si ocurre un error
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error("Error al cerrar la conexión a la base de datos:", closeError);
            }
        }
    }
}

module.exports = { obtenerProductos };
