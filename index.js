import express from "express";                      // Para el manejo del servidor.
import axios from "axios";                          // Para el manejo de HTTP.
import * as cheerio from "cheerio";                 // Para manejar la data de HTTP.
import cors from "cors";                            // Para la comunicación entre servidores.

// Crea una instancia de EXPRESS.
const app=express();

// Indica que cualquier servidor puede solicitar información. 
const corsOptions={
    origin: '*',
};

// Constante con el numero de puerto a utilizar en el servidor.
const PORT=process.env.PORT || 5000;

// Realizar petición a la ruta raiz.
app.get("/", cors(corsOptions), async (req,res)=>{
    try {
        // Obtener los datos de una página WEB por medio de AXIOS.
        const {data}=await axios.get('https://www.eldolar.info/es-MX/mexico/dia/hoy');
        const $=cheerio.load(data);                 // Pasamos el string de datos a CHEERIO.

        // Se crea un selector que apunta al valor deseado.
        const selectorDolar="body > div > main > div:nth-child(1) > h1 > strong > span:nth-child(2)";

        // Se crea un objeto con los datos JSON.
        const objetoValores={
            fecha: new Date().toLocaleDateString(),
            dolar:$(selectorDolar).text() ?? "Sin datos"
        }

        res.json(objetoValores);  // Muestra el valor en formato JSON.
    } catch (error) {
        // En caso de error envie el mensaje en un objeto JSON.
        res.json({error})
    }
});

// Inicializa la instancia.
app.listen(PORT,()=>console.log("Server en puerto "+PORT+" ⭐"));