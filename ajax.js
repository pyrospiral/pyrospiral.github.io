$(document).ready(function() {
	console.log("Asd");
    $.ajax({
    	type: "GET",
        url: "http://pyrospiral.pythonanywhere.com/hello",        
        //data:{q:idiom},
        async:true,
        crossDomain:true,
        success:function(data) {
        	console.log(data)
        	/*
        	console.log(data);
	       $.each(data, function(i, v) {
	        // For each record in the returned array
	        console.log(data);
	        $('.content').append(v.name); 
	  	  });
		*/
    	},
    	error: function (xhr, status, error) {
                 console.log(status);
                 console.log(xhr.responseText);
             }

    });


});
