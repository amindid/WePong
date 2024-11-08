#!/bin/bash

# Wait for Kibana to be ready
until curl -s http://localhost:5601/api/status | grep -q "available"; do
  echo "Waiting for Kibana..."
  sleep 5
done

# Set up Kibana index pattern for pingpong_logs-*
curl -X POST "http://localhost:5601/api/saved_objects/index-pattern" \
  -H "Content-Type: application/json" \
  -H "kbn-xsrf: true" \
  -d '{
    "attributes": {
      "title": "pingpong_logs-*",
      "timeFieldName": "@timestamp"
    }
  }'

# Set default index pattern
curl -X POST "http://localhost:5601/api/kibana/settings/defaultIndex" \
  -H "Content-Type: application/json" \
  -H "kbn-xsrf: true" \
  -d '{
    "value": "pingpong_logs-*"
  }'
