import express, { query } from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
async function init() {
    const app = express()
    const PORT = Number(process.env.PORT) || 8000

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello:String
                say(name:String):String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `I am a graphql server`,
                say: (_, { name }: { name: String }) => `Hey ${name}`
            }
        },
    });

    await gqlServer.start();
    app.get("/", (req, res) => {
        res.json({ message: "Server returned it!" })
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log("Server listening on port ", PORT)
    })
}

init();