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
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const user_1 = __importDefault(require("./services/user"));
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.get("/", (req, res) => {
            res.json({ message: "Server returned it!" });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(yield (0, graphql_1.default)(), {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                // @ts-ignore
                const token = req.headers.token;
                try {
                    const user = user_1.default.decode(token);
                    return { user };
                }
                catch (error) {
                    throw new Error("Token cant decode");
                }
            })
        }));
        app.listen(PORT, () => {
            console.log("Server listening on port ", PORT);
        });
    });
}
init();
