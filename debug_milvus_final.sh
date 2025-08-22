#!/bin/bash
echo "=== Milvus Debug Final ==="
echo "Testing Milvus V2 REST API endpoints..."

echo "1. Test health:"
curl -s -X GET http://milvus:9091/healthz

echo -e "\n2. Test collection list (v1):"
curl -s -X GET http://milvus:19530/v1/collections 2>&1 | head -3

echo -e "\n3. Test collection list (v2):"
curl -s -X GET http://milvus:19530/v2/vectordb/collections 2>&1 | head -3

echo -e "\n4. Test collection list (v2 with database):"
curl -s -X GET "http://milvus:19530/v2/vectordb/collections?database_name=default" 2>&1 | head -3

echo -e "\n5. Test collection exists (POST):"
curl -s -X POST http://milvus:19530/v2/vectordb/collections/describe \
  -H "Content-Type: application/json" \
  -d '{"database_name": "default", "collection_name": "zh"}' 2>&1 | head -3

echo -e "\n6. Test different port 8080:"
curl -s -X GET http://milvus:8080/v2/vectordb/collections 2>&1 | head -3

echo -e "\n=== End Debug ==="