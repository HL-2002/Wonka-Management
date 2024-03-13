import { createClient } from '@libsql/client';
const urlMan = process.env.mode === 'production' ? process.env.DB_MAN_URL : 'file:./backend/local.db';


// Configuración de variables de entorno
const Token = process.env.DB_MAN_TOKEN;
// Crear cliente de base de datos
const client = createClient({
    authToken: Token,
    url: urlMan
});

const getOrderbyId = async (id) => {
    const order = await client.execute({sql:"SELECT * FROM OrderTable WHERE id=?",args:[id]});
    return order;
}

// Exportar funciones
export default getOrderbyId ;
