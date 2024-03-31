import JWT from "jsonwebtoken";
import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";

const JWT_SECRET_KEY = "kiran_suar_and_rahul_katla_mach";

export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
}

export interface getUserTokenPayload {
    email: string,
    password: string
}

class UserService {
    static getUserById(id: any) {
        throw new Error("Method not implemented.");
    }
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString('hex');
        const hashPassword = UserService.generateHash(salt, password);
        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                password: hashPassword
            }
        });
    }

    private static generateHash(salt: string, password: string) {
        const hashPassword = createHmac('sha256', salt).update(password).digest('hex');
        return hashPassword;
    }

    private static getuserByEmail(email: string) {
        return prismaClient.user.findUnique({
            where: {
                email
            }
        });
    };

    public static async getUserToken(payload: getUserTokenPayload) {
        const { email, password } = payload;
        const user = await UserService.getuserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const userSalt = user.salt;
        const userHashPassword = UserService.generateHash(userSalt, password);
        if (userHashPassword !== user.password) {
            throw new Error("Invalid password");
        }
        const token = JWT.sign({
            email: user.email,
            id: user.id
        }, JWT_SECRET_KEY)
        return token;
    }

    public static decode(token:string){
        return JWT.verify(token,JWT_SECRET_KEY);
    }
}
export default UserService;