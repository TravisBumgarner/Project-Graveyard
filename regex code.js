//myHtml = '<!DOCTYPE html><html lang="en" ng-app><head>	<meta charset="UTF-8">	<title>AngularJS</title>	<script src="lib/angular/angular.min.js"</script></head><body>	<input type="text" ng-model="name"/>	<h9>Welcome {{name}}</h2></body></html>';





//  Find Elements Function  
//  Goal: Search string containing all the content
//   of an HTML page and returns an array of elements on that page. 



var findElements = function(htmlString){
  var myElements = htmlString.match(/<[a-zA-Z0-9!]+/g).sort();
    for(var i in myElements){
      myElements[i] = myElements[i].slice(1);
    }
  console.log(myElements);
  return myElements;
};

var elementsFound = ["!DOCTYPE", "body", "h9", "head", "head", "head", "html", "input", "meta", "script", "title", "title"];



// Find Duplicates Function //
// Goal: Search through an array containing HTML elements or attributes and removes duplicates;

var findDuplicates = function(arrayWithDuplicates){
	var arrayWithoutDuplicates = [];
	var qtyOfElements = [];
    var totalElements = 0; //Keeps track of how many elements total are in the array.
	for(var i in arrayWithDuplicates){
        var counter = 0;
		if(arrayWithoutDuplicates.indexOf(arrayWithDuplicates[i]) === -1){ //If element isn't found in arrayWithoutDuplicates, add to the array.
			arrayWithoutDuplicates.push(arrayWithDuplicates[i]);
            qtyOfElements[totalElements] = 1;
            totalElements ++;
            //console.log(arrayWithoutDuplicates);
            //console.log(qtyOfElements);
		}
        else{           
             qtyOfElements[totalElements-1] = qtyOfElements[totalElements-1] + 1; //The -1 is to account for the fact that the totalElements is increased in the previous part of the if statement. Could flip the else and if statements around to remove this but I prefer this order.
        }
        counter ++; //Counter keeps track of amount of duplicates. 
    
	}
    console.log(arrayWithoutDuplicates);
    console.log(qtyOfElements);
    
    return [
    	arrayWithoutDuplicates,
    	qtyOfElements
    	];
};

testArray = findDuplicates(elementsFound);

console.log("I found " + testArray[1][0] + " instances of the " + testArray[0][0] + " tag");