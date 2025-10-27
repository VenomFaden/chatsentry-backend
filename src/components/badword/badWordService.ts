import 'dotenv/config';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand,DeleteCommand  } from "@aws-sdk/lib-dynamodb";

export class BadWordService {
  private client : DynamoDBClient;
  private docClient : DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({}),
    this.docClient = DynamoDBDocumentClient.from(this.client)
  }
  async addBadWord(word: string, tableName: string): Promise<any> {
    const command = new PutCommand({
      TableName: tableName,
      Item: { 
        id: "Mahmut",
        word: word,
        isActive: true,
       
       },
    });
    const response = await this.docClient.send(command);
  }
  async getBadWords(tableName: string): Promise<any> {
      const command = new ScanCommand({
      TableName: tableName,
    });
    const response = await this.docClient.send(command);
    return response.Items;
  }

  async removeBadWord(id:string, word: string, tableName: string): Promise<any> {
      const command = new DeleteCommand({
        TableName: tableName,
        Key: {
          id: id,
          word: word,
        },
      });
     
      const response = await this.hendleSendCommand(command);
  }

  private async hendleSendCommand(command: any): Promise<any> {
      const response = this.docClient.send(command);
      return response;
  }
}
