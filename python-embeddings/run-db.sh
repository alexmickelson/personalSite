#!/bin/bash

docker rm -f timescaledb-postgres &> /dev/null || true

docker run -d \
  --name timescaledb-postgres \
  -p 5432:5432 \
  -e POSTGRES_USER=siteuser \
  -e POSTGRES_PASSWORD=postgresewvraer \
  -e POSTGRES_DB=my_db \
  -v db_data:/var/lib/postgresql/data \
  timescale/timescaledb-ha:pg17