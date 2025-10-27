"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadWordService = void 0;
require("dotenv/config");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
class BadWordService {
    constructor() {
        this.client = new client_dynamodb_1.DynamoDBClient({}),
            this.docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(this.client);
    }
    async addBadWord(word, tableName) {
        const command = new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: {
                id: "Mahmut",
                word: word,
                isActive: true,
            },
        });
        const response = await this.docClient.send(command);
    }
    async getBadWords(tableName) {
        const command = new lib_dynamodb_1.ScanCommand({
            TableName: tableName,
        });
        const response = await this.docClient.send(command);
        return response.Items;
    }
    async removeBadWord(id, word, tableName) {
        const command = new lib_dynamodb_1.DeleteCommand({
            TableName: tableName,
            Key: {
                id: id,
                word: word,
            },
        });
        const response = await this.hendleSendCommand(command);
    }
    async hendleSendCommand(command) {
        const response = this.docClient.send(command);
        return response;
    }
}
exports.BadWordService = BadWordService;
//# sourceMappingURL=badWordService.js.map