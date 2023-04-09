import {
  DynamoDBClient,
  CreateTableCommand,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { readFileSync } from "fs";

// Set up AWS credentials and region
const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: "ACCESS-KEY-HERE",
    secretAccessKey: "SECRET-ACCESS-KEY-HERE",
  },
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = "My-Table";


interface Item {
  [key: string]: any;
}

const createTable = async () => {
  try {
    const params = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: "HomeTeam", KeyType: "HASH" }, // Partition key
        { AttributeName: "AwayTeam", KeyType: "RANGE" }, // Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "HomeTeam", AttributeType: "S" },
        { AttributeName: "AwayTeam", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    };
    const command = new CreateTableCommand(params);
    const result = await client.send(command);
    if (result.TableDescription !== undefined) {
      console.log(`Table created: ${result.TableDescription.TableName}`);
    } else {
      console.error("Table description is undefined");
    }
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

const uploadData = async () => {
  try {
    const data = readFileSync("data/temp.json", "utf-8");
    const items: Item[] = JSON.parse(data);

    for (const item of items) {
      const params = {
        TableName: tableName,
        Item: {
          ["HomeTeam"]: item.HomeTeam,
          ["AwayTeam"]: item.AwayTeam,
          FTHG: item.FTHG,
          FTAG: item.FTAG,
          FTR: item.FTR,
          HTHG: item.HTHG,
          HTAG: item.HTAG,
          HTR: item.HTR,
          Referee: item.Referee,
          HS: item.HS,
          AS: item.AS,
          HST: item.HST,
          AST: item.AST,
          HC: item.HC,
          AC: item.AC,
          HF: item.HF,
          AF: item.AF,
          HY: item.HY,
          AY: item.AY,
          HR: item.HR,
          AR: item.AR,
        },
      };
      const command = new PutCommand(params);
      await ddbDocClient.send(command);
    }

    console.log(`Data uploaded to ${tableName}`);
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

const getData = async () => {
  try {
    const params = {
      TableName: tableName,
    };
    const command = new ScanCommand(params);
    const result = await ddbDocClient.send(command);
    console.log(JSON.stringify(result.Items, null, 1));
  } catch (error) {
    console.error("Error getting data:", error);
  }
};


createTable().then(async () => {
  await uploadData();
  getData();
});
