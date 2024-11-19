#!/bin/bash


/usr/share/elasticsearch/bin/elasticsearch &

until curl -s -o /dev/null -w "%{http_code}" http://localhost:9200 | grep -q "200"; do
  sleep 5
done

# curl -u elastic:$(curl -s -X GET "http://localhost:9200/_xpack/security/user/elastic" | jq -r '.password') \
#      -X POST "http://localhost:9200/_security/user/elastic/_password" \
#      -H "Content-Type: application/json" \
#      -d "{\"password\":\"aouchaadtest\"}"

# bin/elasticsearch-setup-passwords auto -u "http://localhost:9200"


# curl -u elastic:$ELASTIC_PASSWORD -X POST "http://localhost:9200/_security/user/elastic/_password" -H 'Content-Type: application/json' -d"
# {
#   \"password\": \"$ELASTIC_PASSWORD\"
# }
# "

echo "Waiting for Elasticsearch to start..."
# until $(curl --output /dev/null --silent --head -u elastic:$ELASTIC_PASSWORD http://localhost:9200); do
#     printf '.'
#     sleep 5
# done

echo "Elasticsearch is up and running!"

# Create ILM policy
curl -u elastic:aouchaadtest -X PUT "http://localhost:9200/_ilm/policy/pingpong_log_policy" -H "Content-Type: application/json" -d '{"policy": {"phases": {"hot": {"actions": {"rollover": {"max_size": "50gb","max_age": "30d"}}},"delete": {"min_age": "90d","actions": {"delete": {}}}}}}'

# Create initial index with alias
curl -u elastic:aouchaadtest -X PUT "http://localhost:9200/pingpong_logs-000001" -H "Content-Type: application/json" -d '{"aliases": {"pingpong_logs": {"is_write_index": true}}}'


wait
