import express, { query } from "express"
import { expressMiddleware } from '@apollo/server/express4';
import creategraphqlServer from "./graphql";
import UserService from "./services/user";


async function init() {
    const app = express()
    const PORT = Number(process.env.PORT) || 8000

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())


    app.get("/", (req, res) => {
        res.json({ message: "Server returned it!" })
    });

    app.use("/graphql", expressMiddleware(await creategraphqlServer(), {
        context: async ({ req }) => {
            // @ts-ignore
            const token = req.headers.token;
            try {
                const user = UserService.decode(token as string);
                return { user };
            } catch (error) {
                throw new Error("Token cant decode");
            }
        }
    }));

    app.listen(PORT, () => {
        console.log("Server listening on port ", PORT)
    })
}

init();