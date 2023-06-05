const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinination = protoLoader.loadSync("computeandstorage.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinination);
const computeandstorage = grpcObject.computeandstorage;
const express = require("express");

const app = express();
app.use(express.json());

/** Setting up the client for the created gRPC server */
const client = new computeandstorage.EC2Operations("localhost:40000",
    grpc.credentials.createInsecure())
console.log("Client service")

/** /storeData - endpoint that stores the string to S3 Bucket */
client.StoreData({ "data": "data from client" }, (error, response) => {
    console.log(JSON.stringify(response))
})