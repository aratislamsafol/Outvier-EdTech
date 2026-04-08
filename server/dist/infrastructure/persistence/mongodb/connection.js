"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eligible-student';
let isConnected = false;
const connectDB = async () => {
    if (isConnected)
        return true;
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        isConnected = true;
        console.log('✅ MongoDB connected');
        return true;
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        return false;
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    if (!isConnected)
        return;
    await mongoose_1.default.disconnect();
    isConnected = false;
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=connection.js.map