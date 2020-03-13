const express = require('express');
const app = express();

const express_graphql = require('express-graphql');
const { buildSchema} = require('graphql');

//data
const { courses } = require('./data.json');
//console.log(courses);


//que tipo de consulta puedo hacer a los datos
//como se vera el schema de los datos
//puede haber una consulta a una DB o archivo
//query definiendo los datos, la consulta con el tipo de dato creado en el sevidor
const schema = buildSchema(`
    type Query{
        message: String
        course(id: Int!): Course
        courses(topic: String): [Course]
    }

    type Course {
        id: Int
        title: String
        description: String
        author: String
        topic: String
        url: String
    }

`);

let getCourse = (args) => {
    let id = args.id;
}

//que puede consultar desde root value
//definir métodos a través de funciones
const root = {
    //message: () => "hello"
    course: getCourse
    
}

//middleware
//en donde se van a consultar los datos
//ruta procesada por el modulo graphql
//definir la interfaz de consulta
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


app.listen(3000, () => console.log('server on port 3000'));


