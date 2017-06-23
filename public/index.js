$(document).ready(function (e) {
//Crawl or find image based on url and random string 
    var ImageCrawler;

//Search Button
    $("button#searchButton").click(function (e) {
      
//Stop Searching Image(s)
        if ($("button#searchButton").text() === "Stop") {
            clearInterval(ImageCrawler);
            console.log("Finished loading images");
            $("button#searchButton").text("Search It");
            return false;
        }
//Start Searching Image(s)

        else {
            //Empty Div for new image search query.
            $("div#imageBox").empty();
            $("button#searchButton").text("Stop");

            ImageCrawler = setInterval(function () {
                             
                var charCount = 2 + Math.floor(Math.random() * 5) + 1;
                //random string and random url of an image
                var randomString = randomStringGen(charCount);
                var randomImageURL = "http://i.imgur.com/" + randomString + "." + $("#noiSelect option:selected").text();

//Find image using ajax and return possibly existing image to div.
                $.ajax({
                    url: randomImageURL,
                    method: "get",
                    success: function (response) {
                        $("div#imageBox").append("<img src=" + randomImageURL + " style='max-width: 600px; max-height: 400px;'/><br/>");                  
                    }
                });
             
            }, 1000);
           }
   
//End Button
    });
 
   
});

//function return a random string with length 3 to 7
function randomStringGen(charCount) {
    var rValue = [];
    var charTable = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

    for (i = 0; i <= charCount; i++) {
        
        rValue[i] = charTable[Math.floor(Math.random() * charTable.length) + 1];
    }

    return rValue.join("");
}