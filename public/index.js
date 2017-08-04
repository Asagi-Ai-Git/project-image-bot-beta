$(document).ready(function (e) {
//Crawl or find image based on url and random string 
    var ImageCrawler;

//Search With Imgur
    $("button#searchImgur").click(function (e) {
      
//Stop Searching Image(s)
        if ($("button#searchImgur").text() === "Stop") {
            clearInterval(ImageCrawler);
            console.log("Finished loading images");
            $("button#searchImgur").text("Search With Imgur");
            return false;
        }
//Start Searching Image(s)

        else {
            //Empty Div for new image search query.
            $("div#imageBox").empty();
            $("button#searchImgur").text("Stop");

            ImageCrawler = setInterval(function () {
                             
                var charCount = 2 + Math.floor(Math.random() * 5) + 1;
                //random string and random url of an image
                var randomString = randomStringGen(charCount);
                var randomImageURL = "https://i.imgur.com/" + randomString + "." + $("#noiSelect option:selected").text();

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
   
//End Button Imgur
    });
 
//Search with Danbooru
     $("button#searchDanbooru").click(function (e) {
        var countNumber = 0;

        //Stop Searching Image(s)
        if ($("button#searchDanbooru").text() === "Stop") {
            clearInterval(ImageCrawler);
            console.log("Finished loading images");
            $("button#searchDanbooru").text("Search With Danbooru");
            countNumber = 0;
            return false;
        }
        //Start Searching Image(s)

        else {
            //Empty Div for new image search query.
            $("div#imageBox").empty();
            $("button#searchDanbooru").text("Stop");

            ImageCrawler = setInterval(function () {

                var searchMethod = $("input[name='searchMethod']:checked").val();

                var charCount;
                var randomString;
                var randomImageURL;


                if (searchMethod == "By Random Numbers") {
                    //Search Danbooru with Random Numbers
                    charCount = 3 + Math.floor(Math.random() * 6) + 1;
                    //random number and random url of an image
                    randomString = randomNumberGen(charCount)
                    randomImageURL = "http://danbooru.donmai.us/posts/" + randomString;

                }
                else if (searchMethod == "By Sequence of Numbers") {
                    //Search by sequence of numbers. Starting at a specified number
                    randomString = parseInt($("input#danbooru_InText_numStart").val()) + countNumber;
                    randomImageURL = "http://danbooru.donmai.us/posts/" + randomString;
                    countNumber += 1;
                }
                else {
                    //search by random text
                    charCount = 2 + Math.floor(Math.random() * 6) + 1;
                    //random string and random url of an image
                    randomString = randomStringGen(charCount);
                    randomImageURL = "http://danbooru.donmai.us/posts/" + randomString;
                }



                //Find image using ajax and return possibly existing image to div.
                $.ajax({
                    url: randomImageURL,
                    method: "get",
                    dataType: "html",

                    success: function (response) {
                        var ImgUrl = $(response).find("img").attr("src").slice(1);

                        $("div#imageBox").append("<img src=" + "http://danbooru.donmai.us/" + ImgUrl + " style='max-width: 600px; max-height: 400px;'/><br/>");

                    }
                });

            }, 1000);
        }

//End Button Danbooru
    });

 });



//function return a random string with length 3 to ?
function randomStringGen(charCount) {
    var rValue = [];
    var charTable = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

    for (i = 0; i <= charCount; i++) {
        
        rValue[i] = charTable[Math.floor(Math.random() * charTable.length) + 1];
    }

    return rValue.join("");
}

function randomNumberGen(charCount) {
    var rValue = [];
    var charTable = "0123456789";

    for (i = 0; i <= charCount; i++) {

        rValue[i] = charTable[Math.floor(Math.random() * charTable.length) + 1];
    }

    return rValue.join("");
}

function randomHexGenA(charCount) {
    var rValue = [];
    var charTable = "0123456789abcdef";

    for (i = 0; i <= charCount; i++) {

        rValue[i] = charTable[Math.floor(Math.random() * charTable.length) + 1];
    }

    return rValue.join("");
}