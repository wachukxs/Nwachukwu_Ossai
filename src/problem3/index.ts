
/**
 * TODO: Comment on the complexity or efficiency of each function.
 * 
 * I'm assuming we're only concerned with positive numbers.
 * Given a negative number, it won't make sense to sum negative numbers and move in the "opposite direction"
 * I also won't bother with zero.
 */

function sum_to_n_a(n: number): number {
    if (Number.isNaN(n) || n < 1) {
        return 0
    }
	// use while loop

    let total = n
    while ((n = n - 1) > 0) {
        total = total + n
    }

    return total
}

function sum_to_n_b(n: number): number {
    if (Number.isNaN(n) || n < 1) {
        return 0
    }
	// use for loop

    let total: number = 0
    for (n; n > 0; n--) {
        total = total + n
    }
    return total
}

// function sum_to_n_c(n: number, total: number = 0): number {
//     if (Number.isNaN(n) || n < 1) {
//         return total
//     }
//     total = total + n
//     n = n - 1
//     return sum_to_n_c(n, total)
// 	// use recursion
// }

function sum_to_n_c(n: number): number {
    if (Number.isNaN(n) || n < 1) {
        return 0
    }
    return n + sum_to_n_c(n - 1)
	// use recursion
}

// console.log(sum_to_n_a(5))
// console.log(sum_to_n_b(5))
// console.log(sum_to_n_c(5))