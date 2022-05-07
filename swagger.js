const swaggerJsDoc = require("swagger-jsdoc");


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'Shorten URL BcakEnd!'
        },
        server: {
            url: "http://localhost:5000"
        },
        tags: {
            name: "Admin Functions",
            description: "These are only for special users!"
        },
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT"
                },
            }
        }
        ,
        security: [{
            jwt: []
        }],
    },
    apis: ['./controller/*.js']
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = swaggerDocs;