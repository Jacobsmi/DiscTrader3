"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = 5000;
app.get("/", function (req, res) {
    res.send(JSON.stringify({
        success: true,
    }));
});
app.listen(PORT, function () {
    console.log("Listening at http://localhost:" + PORT);
});
