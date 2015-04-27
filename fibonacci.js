// fibonacci.js
// Copyright (c) PyrousNET 2014. All rights reserved.
//
// @author Ben Payne <trixtur@gmail.com>

var fib = function(n) {
	var i = 1,
		j = 0,
		parity = 0;

	var hidden_fib = function(n) {
		for(var index = 0; index < n; index++) { 
			if (parity)
				j = i + j;
			else
				i = i + j;

			parity = !parity;
		}

		if (parity) return i; else return j;
	}

	return hidden_fib(n);
}

for(var i = 1; i <= 10; i++)
	console.log('fib of '+i+' is', fib(i));
