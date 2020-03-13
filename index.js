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

    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
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
    return courses.filter(course =>{
        return course.id == id;
    })[0]
};

let getCourses = (args) => {
    if (args.topic) {
        let topic = args.topic;
        return courses.filter(course => course.topic === topic);   
    } else {
        return courses;
    }
};

let updateCourseTopic = ({ id, topic}) => {
    courses.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    })
    return courses.filter(course => course.id === id)[0];
}

//que puede consultar desde root value
//definir métodos a través de funciones
const root = {
    //message: () => "hello"
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
    
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


