"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../generated/prisma/client");
var prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
    log: ['query'],
});
var dbClient = global.cachedPrisma || prisma;
if (process.env.NODE_ENV === 'development') {
    global.cachedPrisma = dbClient;
}
exports.default = dbClient;
