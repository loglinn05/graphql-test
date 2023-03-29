/*
Якщо запустити команду `node server3.js`,
то не буде підключений компілятор Babel,
що унеможливить підтримку директив `import`.
 */
import { graphql, buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

// Побудова схеми з використанням GraphQL.
let schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Визначення функції отримання значення поля
let root = {
    hello: () => {
        return 'Hello!';
    }
}

// Створення серверу.
let app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
);
app.listen(4003);

console.log('http://localhost:4003/graphql');

// Формування GraphQL-запиту
/*
graphql({schema, source: '{ hello }', rootValue: root}).then((response) => {
    console.log(response);
});
 */

// fetch(), введений у консолі браузера
/*
Якщо замість 'POST' поставити 'GET', то у консолі відобразиться помилка
Uncaught (in promise) TypeError: Failed to execute 'fetch' on 'Window':
Request with GET/HEAD method cannot have body.
    at <anonymous>:1:1
тому, що GET-запити не повинні мати тіла, а воно у функції вказане.
Якщо точніше, то специфікацією http це не заборонено, але деякі його
реалізації можуть відкинути такий запит, тому запитам типу 'GET' вкрай
небажано мати тіла.
*/
/*
fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({query: "{ hello }"})
}).then(r => r.json()).then(data => console.log("Data returned:", data))
*/