 //				Working
 //				
 //
 //
 //

     	$("#submit").click(function(event){
	     	var htmlInput = $('#htmlInput').val(); //Input Text from First Text Box

	     	var htmlInputSplit = htmlInput.split('<');
	     	var cleanArray=[];

	     	for(var i=0; i<htmlInputSplit.length;i++){
	     		var dirtyString = htmlInputSplit[i];
	     		var spaceLoc = dirtyString.search(" ");
	     		var bracketLoc = dirtyString.search(">"); 
	     		var closeTagLoc = dirtyString.search("/"); //Special Case for close tags
	     		var commentLoc = dirtyString.search("!"); //Speacial Case for Comments
	     		var scriptLoc = dirtyString.search("script ") //Special Case for other languages

	     		if(closeTagLoc===0){}
	     		else if(commentLoc===0){		cleanArray.push('!--Comment--')	}
	     		else if(scriptLoc===0){		cleanArray.push('script')	}
	     		
	     		else if(spaceLoc<bracketLoc){
	     			cleanArray.push($.trim(dirtyString.slice(0,spaceLoc)));
	     		}
	     		
	     		else if(spaceLoc>bracketLoc){
	     			cleanArray.push($.trim(dirtyString.slice(0,bracketLoc)));
	     		}
	     		else{
	     			cleanArray.push($.trim(dirtyString));
	     		}
	     	}