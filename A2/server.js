const express = require('express');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const AWS = require('aws-sdk');
const path = require('path')

/** used - npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=./ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` computeandstorage.proto
 * to generate the grpc files
 */
const packageDefinination = protoLoader.loadSync("computeandstorage.proto", {})
const grpcObject = grpc.loadPackageDefinition(packageDefinination);
const computeandstorage = grpcObject.computeandstorage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure());

server.addService(computeandstorage.EC2Operations.service, {
    "StoreData": StoreData,
    "AppendData":AppendData,
    "DeleteFile":DeleteFile
})

function StoreData(call, callback) {
    console.log(call.request);
    callback(null, `call sent from rpc server ${call.request}`);

}

function AppendData(){

}

function DeleteFile(){
    
}

