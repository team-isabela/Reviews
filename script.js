import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '60s',
};

// export const options = {
//   stages: [
//     { duration: '10s', target: 1 },
//     { duration: '15s', target: 500 },
//     { duration: '10s', target: 100 },
//     { duration: '10s', target: 1000 },
//     { duration: '10s', target: 100 },
//     { duration: '10s', target: 10 },
//     { duration: '30s', target: 0 },
//   ],
// };

export default function () {
  let id = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1;

  const res = http.get(`http://localhost:3000/reviews?product_id=${id}`);
  sleep(1);
  check(res, {
    'is status 200': (r) => r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 500ms': (r) => r.timings.duration < 500,
    'transaction time < 1000ms': (r) => r.timings.duration < 1000,
    'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  });

  // const res2 = http.get(`http://localhost:3000/reviews/meta?product_id=${id}`);
  // sleep(1);
  // check(res2, {
  //   'is status 200': (r) => r.status === 200,
  //   'transaction time < 200ms': (r) => r.timings.duration < 200,
  //   'transaction time < 500ms': (r) => r.timings.duration < 500,
  //   'transaction time < 1000ms': (r) => r.timings.duration < 1000,
  //   'transaction time < 2000ms': (r) => r.timings.duration < 2000,
  // });
}
