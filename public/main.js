var source = document.getElementById("new-result-template").innerHTML;
var template = Handlebars.compile(source);

class AjaxApi {

    fetch(cityName) {
        $.ajax({
            method: "GET",
            url: "http://api.apixu.com/v1/current.json?key=db0d77d4d01445f4bd7105144181908&q=" + cityName,
            success: function (data) {
                app.addSearch(data)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    }
}
const WeatherChat = function () {
    // let searches = []; //<<== the value should come from get local
    // let STORAGE_ID = WeatherSearches;
    let currentID = 0;
    const weatherBoxes = []
    // const comments = []

    return {
        // function saveToLocalStorage() {
        //     return localStorage.setItem(STORAGE_ID, JSON.stringify(WeatherSearches));
        // },
        // function getFromLocalStorage() {
        //     return JSON.parse(localStorage.getItem(WeatherSearches) || '[]');
        // },

        _createID: function () {
            //     parseLocal = function () {
            //         JSON.parse(localStorage.getItem(WeatherSearches);
            //     } 
            //     let currentID = (JSON.parse(localStorage.getItem(localID) || 0));
            return (currentID += 1)
        },
        addSearch: function (data) {
            let searchID = this._createID(currentID);

            let search = {
                searchID: searchID,
                cityName: data.location.name,
                country: data.location.country,
                temp_c: data.current.temp_c + '°C',
                condition_txt: data.current.condition.text,
                condition_img: data.current.condition.icon,
                humidity: data.current.humidity +'%',
                feelslike: data.current.feelslike_c + '°C'
            };
            weatherBoxes.push(new WeatherBox(search))
            this.renderBoxes()
        },

        generateHTML() {
            const newHTML = template({ weatherBoxes })
            $('.results-container').append(newHTML)
           
        },

        renderBoxes() {
            $('.results-container').empty();

            this.generateHTML()
        },
        addComment(text, id) {
        
            for (let i=0; i<weatherBoxes.length; i++){
                if (id === weatherBoxes[i].searchID){
                    weatherBoxes[i].comments.push(new Comment(text))
                }
            }
            this.renderBoxes()
        }

        // function removeComment() {
        //     comments.splice(this.newComment);
        // }
    }
}

class WeatherBox {
    constructor({ cityName, searchID, country, temp_c, condition_txt, condition_img, humidity, feelslike }) {

        this.cityName = cityName
        this.searchID = searchID
        this.country = country
        this.temp = temp_c
        this.condition_txt = condition_txt
        this.condition_img = condition_img
        this.humidity = humidity
        this.feelslike = feelslike
        
        this.comments = [];
    }

    getSearchHTML() {
        let newHTML = template({ weatherBoxes })
        // this
    }

}

class Comment {
    constructor(commentText, searchID) {
        this.commentText = commentText
       
    }

};

const app = new WeatherChat();
const api = new AjaxApi();

//events

$('.search').on('click', function () {
    let cityNameInput = $('.search-input').val();
    api.fetch(cityNameInput);
})

$('.results-container').on('click', '.add-comment', function () {
    let commentText = $('.comment-input').val();
    let id = $(this).closest('.result-box').data().id
    app.addComment(commentText, id)
})

