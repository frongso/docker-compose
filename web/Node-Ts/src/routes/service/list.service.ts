export const compute = () => {
  const set1 = new Set();
  const set2 = new Set();
  const buffer = [];

  let i = 0;
  for (; i < 100000; i++) {
    set1.add(Math.floor(Math.random() * 100000) + 1);
    set2.add(Math.floor(Math.random() * 1000000) + 1);
  }
  let j = 0;
  for (; j < 900000; j++) {
    set2.add(Math.floor(Math.random() * 1000000) + 1);
  }

  // method 1
  // 1.30 min
  // list2.forEach((numberTarget) => {
  //   if (!buffer.includes(numberTarget)) {
  //     let v = 0;
  //     for (; v < list1.length; v++) {
  //       if (list1[v] === numberTarget) {
  //         buffer.push(numberTarget);
  //         list1.splice(v, 1);
  //         break;
  //       }
  //     }
  //   }
  // });

  // method 2
  set1.forEach((numberTarget) => {
    if (set2.has(numberTarget)) {
      buffer.push(numberTarget);
    }
  });

  const result = buffer.length;
  return { result, buffer };
};

export const maximumSum = (n: number, matrix: number[][]) => {
  // tslint:disable-next-line:no-console
  console.log(matrix);

  // prefix sum
  for (let r = 0; r < n; r++) {
    for (let c = 1; c < n; c++) {
      matrix[r][c] += matrix[r][c - 1];
    }
  }

  // tslint:disable-next-line:no-console
  console.log(matrix);

  let v;
  // initial maxsum
  let maxSum = -99999999999;

  // position
  const pos = [
    [0, 0], // 0 บนซ้าย
    [0, 0], // 1 บนขวา
    [0, 0], // 2 ล่างซ้าย
    [0, 0], // 3 ล่างขวา
  ];

  // sliding window
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let cur = 0;
      const v = [0];
      let start = 0;
      for (let k = 0; k < n; k++) {
        cur = matrix[k][j] - (i > 0 ? matrix[k][i - 1] : 0);
        start = k - start;
        // v.push(cur + v[k] > cur ? cur + v[k] : cur);
        if (cur + v[k] > cur) {
          v.push(cur + v[k]);
          (pos[0] = [start, i]), (pos[1] = [start, j]), (pos[2] = [k, i]), (pos[3] = [k, j]);
        } else {
          v.push(cur);
          (pos[0] = [k, i]), (pos[1] = [k, j]), (pos[2] = [k, i]), (pos[3] = [k, j]);
          start = k;
        }
        maxSum = maxSum > v[v.length - 1] ? maxSum : v[v.length - 1];
      }
    }
  }

  // tslint:disable-next-line:no-console
  console.log('fin');
  return { maxSum, pos };
};
