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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var fs_1 = require("fs");
// Set up AWS credentials and region
var client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
    credentials: {
        accessKeyId: "ACCESS-KEY-HERE",
        secretAccessKey: "SECRET-ACCESS-KEY-HERE"
    }
});
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
var tableName = "My-Table";
var createTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params, command, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                params = {
                    TableName: tableName,
                    KeySchema: [
                        { AttributeName: "HomeTeam", KeyType: "HASH" },
                        { AttributeName: "AwayTeam", KeyType: "RANGE" }, // Sort key
                    ],
                    AttributeDefinitions: [
                        { AttributeName: "HomeTeam", AttributeType: "S" },
                        { AttributeName: "AwayTeam", AttributeType: "S" },
                    ],
                    ProvisionedThroughput: {
                        ReadCapacityUnits: 5,
                        WriteCapacityUnits: 5
                    }
                };
                command = new client_dynamodb_1.CreateTableCommand(params);
                return [4 /*yield*/, client.send(command)];
            case 1:
                result = _a.sent();
                if (result.TableDescription !== undefined) {
                    console.log("Table created: ".concat(result.TableDescription.TableName));
                }
                else {
                    console.error("Table description is undefined");
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error("Error creating table:", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var uploadData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, items, _i, items_1, item, params, command, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                data = (0, fs_1.readFileSync)("data/temp.json", "utf-8");
                items = JSON.parse(data);
                _i = 0, items_1 = items;
                _b.label = 1;
            case 1:
                if (!(_i < items_1.length)) return [3 /*break*/, 4];
                item = items_1[_i];
                params = {
                    TableName: tableName,
                    Item: (_a = {},
                        _a["HomeTeam"] = item.HomeTeam,
                        _a["AwayTeam"] = item.AwayTeam,
                        _a.FTHG = item.FTHG,
                        _a.FTAG = item.FTAG,
                        _a.FTR = item.FTR,
                        _a.HTHG = item.HTHG,
                        _a.HTAG = item.HTAG,
                        _a.HTR = item.HTR,
                        _a.Referee = item.Referee,
                        _a.HS = item.HS,
                        _a.AS = item.AS,
                        _a.HST = item.HST,
                        _a.AST = item.AST,
                        _a.HC = item.HC,
                        _a.AC = item.AC,
                        _a.HF = item.HF,
                        _a.AF = item.AF,
                        _a.HY = item.HY,
                        _a.AY = item.AY,
                        _a.HR = item.HR,
                        _a.AR = item.AR,
                        _a)
                };
                command = new lib_dynamodb_1.PutCommand(params);
                return [4 /*yield*/, ddbDocClient.send(command)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log("Data uploaded to ".concat(tableName));
                return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                console.error("Error uploading data:", error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params, command, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                params = {
                    TableName: tableName
                };
                command = new client_dynamodb_1.ScanCommand(params);
                return [4 /*yield*/, ddbDocClient.send(command)];
            case 1:
                result = _a.sent();
                console.log(JSON.stringify(result.Items, null, 1));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error("Error getting data:", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
createTable().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, uploadData()];
            case 1:
                _a.sent();
                getData();
                return [2 /*return*/];
        }
    });
}); });
