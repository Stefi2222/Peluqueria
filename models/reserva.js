// models/reserva.js

const sql = require('mssql');

// Configuración de la base de datos
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),  // Asegúrate de que el puerto esté correctamente configurado
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Función para obtener todas las reservas
async function obtenerReservas() {
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request().query('SELECT * FROM Reserva');
        return result;  // Devuelve el resultado de la consulta
    } catch (error) {
        console.error("Error al obtener reservas:", error.message);
        throw new Error("Error al obtener las reservas desde la base de datos");
    } finally {
        await sql.close();
    }
}

// Función para agregar una nueva reserva
async function agregarReserva(ID_Servicio, ID_Producto, ID_Barbero, Nom_Cliente, Correo, Telefono, Fecha_Reserva, Descripcion) {
    try {
        const pool = await sql.connect(dbConfig);

        // Insertar la nueva reserva en la base de datos
        const result = await pool.request()
            .input('ID_Servicio', sql.Int, ID_Servicio)
            .input('ID_Producto', sql.Int, ID_Producto)
            .input('ID_Barbero', sql.Int, ID_Barbero)
            .input('Nom_Cliente', sql.NVarChar, Nom_Cliente)
            .input('Correo', sql.NVarChar, Correo)
            .input('Telefono', sql.NVarChar, Telefono)
            .input('Fecha_Reserva', sql.DateTime, Fecha_Reserva)
            .input('Descripcion', sql.NVarChar, Descripcion)
            .query(`
                INSERT INTO Reserva (ID_Servicio, ID_Producto, ID_Barbero, Nom_Cliente, Correo, Telefono, Fecha_Reserva, Descripcion)
                VALUES (@ID_Servicio, @ID_Producto, @ID_Barbero, @Nom_Cliente, @Correo, @Telefono, @Fecha_Reserva, @Descripcion)
                SELECT SCOPE_IDENTITY() AS ID_Reserva;
            `);

        // Retornar el ID de la nueva reserva
        return result.recordset[0];  // Devuelve el ID de la nueva reserva
    } catch (error) {
        console.error("Error al agregar la reserva:", error.message);
        throw new Error("Error al agregar la reserva en la base de datos");
    } finally {
        await sql.close();
    }
}

// Exportar ambas funciones
module.exports = { obtenerReservas, agregarReserva };
