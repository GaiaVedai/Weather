var source = document.getElementById("new-result-template").innerHTML;
var template = Handlebars.compile(source);

// var context = {
//     location: Box.cityName + Box.country,
//     temp: box.temp + box.feelslike,
//     condition: box.condition + box.humidity
// }

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
                humidity: data.current.humidity,
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
        }
        // function addComment(text, id) {
        //     comments = [];//change

        //     return newComment = {
        //         text: text
        //     }
        //     this.comments.push(newComment);
        // },

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
    }

    getSearchHTML() {
        let newHTML = template({ weatherBoxes })
        // this
    }

}

class Comment extends WeatherBox {
    constructor(text, id, comments) {
        super(id, comments)
    }
    getCommentHTML() {

    }
};

const app = new WeatherChat();
const api = new AjaxApi();

//events

$('.search').on('click', function () {
    let cityNameInput = $('.search-input').val();
    api.fetch(cityNameInput);
})

$('add-comment').on('click', function (text, id) {
    $(this)('.comment-input').val() = text;
    app.addComment(text, id)
})

