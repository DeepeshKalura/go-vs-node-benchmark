import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // Define failure thresholds
  thresholds: {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
'http_req_duration': ['p(95)<800'], // 95% of requests must complete below 800ms
  },
  // Define the ramping-up load profile
  stages: [
    { duration: '10s', target: 20 },   // 1. Warm-up: ramp up to 20 virtual users over 10s
    { duration: '30s', target: 20 },   // 2. Baseline: stay at 20 VUs for 30s
    { duration: '20s', target: 100 },  // 3. Ramp-up: ramp up to 100 VUs over 20s
    { duration: '1m', target: 100 },   // 4. Sustained Load: stay at 100 VUs for 1 min
    { duration: '20s', target: 250 },  // 5. High Load: ramp up to 250 VUs over 20s
    { duration: '1m', target: 250 },   // 6. Stress: stay at 250 VUs for 1 min
    { duration: '30s', target: 0 },    // 7. Cool-down: ramp down to 0 VUs
  ],
};

export default function () {
  // Read the target URL from an environment variable for flexibility
  const targetUrl = __ENV.TARGET_URL || 'http://node-app:3000';

  const res = http.get(`${targetUrl}/products`);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });
  sleep(1); // Wait for 1 second between requests per VU
}
