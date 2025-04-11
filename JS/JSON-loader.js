$(document).ready(function(){

    $.getJSON("../JSON/news-data.json", function(data){
        console.log(data)

        $('.country_id').html(data.country);
        $('.days_on_road').html(data.days_on_road);
        $('.countries_visited').html(data.countries_visited);
        
        document.querySelector(".travel-progress-bar").style.width = data.progress_level;

    }).fail(function(){
        console.error("Hiba a Kódban!")
    })
})