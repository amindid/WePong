#!/bin/bash

# Wait until Elasticsearch is up
until curl -s http://localhost:9200; do
  echo "Waiting for Elasticsearch..."
  sleep 5
done

# Create ILM policy
curl -X PUT "http://localhost:9200/_ilm/policy/pingpong_log_policy" -H "Content-Type: application/json" -d '{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": {
            "max_size": "50gb",
            "max_age": "30d"
          }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}'

# Create initial index with alias
curl -X PUT "http://localhost:9200/pingpong_logs-000001" -H "Content-Type: application/json" -d '{
  "aliases": {
    "pingpong_logs": {
      "is_write_index": true
    }
  }
}'
