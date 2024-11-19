#!/bin/bash


/usr/share/kibana/bin/kibana &

# Wait for Kibana to be ready
until curl -s http://localhost:5601/api/status | grep -q "available"; do
  echo "Waiting for Kibana..."
  sleep 5
done

# Set up Kibana index pattern for pingpong_logs-*
curl -u elastic:aouchaadtest -X POST "http://localhost:5601/api/saved_objects/index-pattern" -H "Content-Type: application/json" -H "kbn-xsrf: true" -d '{"attributes": {"title": "pingpong_logs-*","timeFieldName": "@timestamp"}}'

# Set default index pattern
curl -u elastic:aouchaadtest -X POST "http://localhost:5601/api/kibana/settings/defaultIndex" -H "Content-Type: application/json" -H "kbn-xsrf: true" -d '{"value": "pingpong_logs-*"}'


wait



curl -u elastic:aouchaadtest -X POST "http://localhost:9200/pingpong_logs-000001/_doc/" -H "Content-Type: application/json" -d '{"@timestamp": "2024-11-12T00:00:00","message": "initial log event"}'