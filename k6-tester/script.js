import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
  // Define failure thresholds
  thresholds: {
    'http_req_failed': ['rate<0.1'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<5000'], // 95% of requests must complete below 800ms
  },
  // Define the ramping-up load profile
  stages: [
    { duration: '30s', target: 500 },   // 1. Ramp up to our previous peak
    { duration: '1m', target: 500 },    // 2. Hold at 500 to stabilize
    { duration: '30s', target: 2000 },  // 3. Major ramp to 2,000 VUs
    { duration: '1m', target: 2000 },   // 4. Hold at 2,000 VUs, see if it survives
    { duration: '30s', target: 10000 }, // 5. Extreme ramp to 10,000 VUs
    { duration: '1m', target: 10000 },  // 6. BREAKPOINT: Hold at 10,000 VUs
    { duration: '30s', target: 0 },     // 7. Cool-down
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
