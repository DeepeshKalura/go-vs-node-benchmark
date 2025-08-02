# How to run.
Docker compose up -d

```bash
# To run node-app cool
docker-compose run k6-tester run /scripts/script.js -e TARGET_URL=http://node-app:3000 --out experimental-prometheus-rw
# To run go-app cool
docker-compose run k6-tester run /scripts/script.js -e TARGET_URL=http://go-app:3001 --out experimental-prometheus-rw
```