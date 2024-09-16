/**
 * I'm assuming we're only concerned with positive numbers.
 * Given a negative number, it won't make sense to sum negative numbers and move in the "opposite direction"
 * I also won't bother with zero.
 */

// Time complexity is O(n)
// function sum_to_n_d(n: number): number {
//   if (Number.isNaN(n) || n < 1) {
//     return 0;
//   }
//   // use while loop

//   let total = n;
//   while ((n = n - 1) > 0) {
//     total = total + n;
//   }

//   return total;
// }

// Time complexity is O(n)
function sum_to_n_b(n: number): number {
  if (Number.isNaN(n) || n < 1) {
    return 0;
  }
  // use for loop

  let total: number = 0;
  for (n; n > 0; n--) {
    total = total + n;
  }
  return total;
}

// Time complexity is O(n)
function sum_to_n_c(n: number): number {
  if (Number.isNaN(n) || n < 1) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
  // use recursion
}

// Time complexity of O(1)
function sum_to_n_a(n: number) {
  if (Number.isNaN(n) || n < 1) {
    return 0;
  }
  return ((n + 1) * n) / 2;
}

const TEST_NUMBER = 7;

console.log("using arithmetic sequence", sum_to_n_a(TEST_NUMBER));
console.log("using for loop", sum_to_n_b(TEST_NUMBER));
console.log("using recursion", sum_to_n_c(TEST_NUMBER));
