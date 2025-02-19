package main

import "fmt"

// sum_to_n_a: Iterative Approach - O(n) time complexity.
func sum_to_n_a(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum
}

// sum_to_n_b: Recursive Approach - O(n) time complexity.
// Note: For very large n, this might lead to a stack overflow.
func sum_to_n_b(n int) int {
	if n <= 1 {
		return n
	}
	return n + sum_to_n_b(n-1)
}

// sum_to_n_c: Formula-based Approach - O(1) time complexity.
// Uses the arithmetic series formula: sum = n*(n+1)/2.
func sum_to_n_c(n int) int {
	return n * (n + 1) / 2
}

func main() {
	n := 5
	fmt.Printf("Summation to %d using Iterative Approach: %d\n", n, sum_to_n_a(n))
	fmt.Printf("Summation to %d using Recursive Approach: %d\n", n, sum_to_n_b(n))
	fmt.Printf("Summation to %d using Formula-based Approach: %d\n", n, sum_to_n_c(n))
}
