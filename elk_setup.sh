# Create ILM policy
curl -u elastic:aouchaadtest -X PUT "http://localhost:9200/_ilm/policy/pingpong_log_policy" -H "Content-Type: application/json" -d '{"policy": {"phases": {"hot": {"actions": {"rollover": {"max_size": "50gb","max_age": "30d"}}},"delete": {"min_age": "90d","actions": {"delete": {}}}}}}'

# Create initial index with alias
curl -u elastic:aouchaadtest -X PUT "http://localhost:9200/pingpong_logs-000001" -H "Content-Type: application/json" -d '{"aliases": {"pingpong_logs": {"is_write_index": true}}}'

# Set up Kibana index pattern for pingpong_logs-*
curl -u elastic:aouchaadtest -X POST "http://localhost:5601/api/saved_objects/index-pattern" -H "Content-Type: application/json" -H "kbn-xsrf: true" -d '{"attributes": {"title": "pingpong_logs-*","timeFieldName": "@timestamp"}}'

# Set default index pattern
curl -u elastic:aouchaadtest -X POST "http://localhost:5601/api/kibana/settings/defaultIndex" -H "Content-Type: application/json" -H "kbn-xsrf: true" -d '{"value": "pingpong_logs-*"}'