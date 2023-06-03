const express = require('express');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const AWS = require('aws-sdk');
const path = require('path')

/** used - npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./ --grpc_out=./ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` computeandstorage.proto
 * to generate the grpc files
 */