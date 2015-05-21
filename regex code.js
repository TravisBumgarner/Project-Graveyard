//myHtml = '<!DOCTYPE html><html lang="en" ng-app><head>	<meta charset="UTF-8">	<title>AngularJS</title>	<script src="lib/angular/angular.min.js"</script></head><body>	<input type="text" ng-model="name"/>	<h9>Welcome {{name}}</h2></body></html>';


var findElements = function(htmlString){
  var myElements = htmlString.match(/<[a-zA-Z0-9!]+/g).sort();
    for(var i in myElements){
      myElements[i] = myElements[i].slice(1);
    }
  console.log(myElements);
  return myElements;
};

var elementsFound = ["!DOCTYPE", "body", "h9", "head", "head", "head", "html", "input", "meta", "script", "title", "title"];


var findDuplicates = function(arrayWithDuplicates){
	var arrayWithoutDuplicates = [];
	var qtyOfElements = [];
    var totalElements = 0;
	for(var i in arrayWithDuplicates){
        var counter = 0;
		if(arrayWithoutDuplicates.indexOf(arrayWithDuplicates[i]) === -1){
			arrayWithoutDuplicates.push(arrayWithDuplicates[i]);
            qtyOfElements[totalElements] = 1;
            totalElements ++;
            //console.log(arrayWithoutDuplicates);
            //console.log(qtyOfElements);
		}
        else{           
             qtyOfElements[totalElements-1] = qtyOfElements[totalElements-1] + 1;
        }
        counter ++;
    
	}
    console.log(arrayWithoutDuplicates);
    console.log(qtyOfElements);
};

findDuplicates(elementsFound);