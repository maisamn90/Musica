$("#submit").on("click", function() {
    $(".col-lg-4").remove();
    $.ajax({
        type: "GET",
        url: "https://api.genius.com/search?q=" + $("#searchTxt").val() + "&access_token=VMf1LmkC5ZxkJuLmjXXcuQ61g-KkD5KzBkaLjR1Y-W8VVwXJgOuZRqRpKBMQ5WoJ",
        dataType: "json",
        success: function(result, status, xhr) {}
    }).done(function(data) {
        var songIds = [];
        for (var i = 0; i < (data.response.hits).length; i++) {
            $("#result-list").append("<div class='col-lg-4 my-3'><div class='card'  id='" + (data.response.hits)[i].result.id + "'></div></div>");
            songIds.push((data.response.hits)[i].result.id);
        }
        findSong(songIds);



    });
});


function findSong(songIdArray) {



    for (var i = 0; i < songIdArray.length; i++) {

        $.ajax({
            type: "GET",
            url: "https://api.genius.com/songs/" + songIdArray[i] + "?access_token=VMf1LmkC5ZxkJuLmjXXcuQ61g-KkD5KzBkaLjR1Y-W8VVwXJgOuZRqRpKBMQ5WoJ",
            dataType: "json",
            success: function(result, status, xhr) {}
        }).done(function(data) {
            console.log(data.response.song);
            var songId = "#" + data.response.song.id;
            // console.log(songId);
            $(songId).append("<img src='" + data.response.song.song_art_image_thumbnail_url + "' class='card-img-top' onerror='imgError(this);'>");
            $(songId).append("<div class='card-body' ><h5 class='card-title'>" + data.response.song.full_title + "</h5><p class='card-text'></p><a herf='' class='hide spotify'><i class='fab fa-spotify'></i><a><a herf='' class='hide youtube'><i class='fab fa-youtube'></i><a><a herf='' class='hide soundcloud'><i class='fab fa-soundcloud'></i><a></div>");
            
            for (var m = 0; m < (data.response.song.description.dom.children).length ; m++) {
                if (typeof(data.response.song.description.dom.children[m]) == "object" && data.response.song.description.dom.children[m].children != null) {

                    for (var l = 0; l < (data.response.song.description.dom.children[m].children).length; l++) {
                        if (typeof(data.response.song.description.dom.children[m].children[l]) == "string" && data.response.song.description.dom.children[m].children[l] != "?") {
                            
                            $(songId + " p.card-text").append(data.response.song.description.dom.children[m].children[l]);
                            
                           
                        }
                    }

                }
            }
            // $(".card-body").append("<a href='' id='read-more'>Read More</a>");
            //  $("#read-more").on("click",function () {
            //                   $("p.card-text").toggleClass("read-more");
            //     })
            // console.log(data.response.song.description.dom.children[0].children[0]);
            for (var j = 0; j < (data.response.song.media).length; j++) {

                if ((data.response.song.media)[j].provider == "spotify") {
                    $(songId + " a.spotify").removeClass("hide");
                    $(songId + " a.spotify").attr("href", (data.response.song.media)[j].url);
                }
                else
                if ((data.response.song.media)[j].provider == "youtube") {
                    $(songId + " a.youtube").removeClass("hide");
                    $(songId + " a.youtube").attr("href", (data.response.song.media)[j].url);
                }
                else
                if ((data.response.song.media)[j].provider == "soundcloud") {
                    $(songId + " a.soundcloud").removeClass("hide");
                    $(songId + " a.soundcloud").attr("href", (data.response.song.media)[j].url);

                }
            }


            // $("#res").append("<a href=" + (data.response.song.media)[j].url + ">" + data.response.song.title + "</a><br>")
            // $("#result-list").append("<div class='col-lg-3 my-3'><div class='card'><img src='"+ data.response.song.song_art_image_thumbnail_url +"' class='card-img-top' onerror='imgError(this);'><div class='card-body' ><h5 class='card-title'>"+ data.response.song.full_title+ "</h5><p class='card-text'>"+ spotify + youtube +"</p></div></div></div>");


        });

    }

};


function imgError(image) {
    image.onerror = "";
    image.src = "No_image_available.svg";
    return true;
}
