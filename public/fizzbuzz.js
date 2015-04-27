function FizzBuzzCtrl($scope) {
	var index = 1;
	$scope.values = [];
	$scope.selectedResult = '';
	for(index = 1; index <= 100; index++) 
		$scope.values.push(index); 

	$scope.fizzbuzz = function (val) {
		if (!val) return;
		if (!(val%3) && !(val%5))
			$scope.selectedResult = "FizzBuzz";
		else if(!(val%3))
			$scope.selectedResult = "Fizz";
		else if(!(val%5))
			$scope.selectedResult = "Buzz";
		else
			$scope.selectedResult = val;
	}

	$scope.$watch('selectedValue', $scope.fizzbuzz);
}
