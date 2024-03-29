"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
            type Query{
                hello:String
                say(name:String):String
            }
        `,
            resolvers: {
                Query: {
                    hello: () => `I am a graphql server`,
                    say: (_, { name }) => `Hey ${name}`
                }
            },
        });
        yield gqlServer.start();
        app.get("/", (req, res) => {
            res.json({ message: "Server returned it!" });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
        app.listen(PORT, () => {
            console.log("Server listening on port ", PORT);
        });
    });
}
init();
