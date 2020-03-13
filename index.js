const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const { buildSchema} = require('graphql');

//que tipo de consulta puedo hacer a los datos
const schema = buildSchema(`
    type Query{
        message: String
    }
`);

//que puede consultar desde root
//definir métodos a través de funciones
const root = {
    message: () => "hello"
}

//middleware
//en donde se van a consultar los datos
//ruta procesada por el modulo graphql
//definir la interfaz de consulta
app.use('/graphql', express_graphql({
    schema: schema,
    root: root,
    graphiql: true
}));


app.listen(3000, () => console.log('server on port 3000'));


