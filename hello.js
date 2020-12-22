var vm = new Vue({
    el: '#app',
    data: {
        asteroids:[],
        showSummary :true
    },
    computed: {
        numAsteroids: function(){
            return this.asteroids.length
        },
        closestObject: function(){
            
            var neoHavingData = this.asteroids.filter(function(neo){
                return neo.close_approach_data.length >0;
            });
            var simpleNeos = neoHavingData.map(function(neo){
                return {name: neo.name, miles: neo.close_approach_data[0].miss_distance.miles};
            });
            var sortedNeos = simpleNeos.sort(function(a, b){
                return a.miles - b.miles;
            });
            if(sortedNeos !== null){
                return sortedNeos[0].name;
            }
            else{
                return "No matching";
            }
        }
    },
    methods: {
        getCloseApproachDate: function(a){
            if(a.close_approach_data.length > 0){
                return a.close_approach_data[0].close_approach_date;
            }
            else{
                return 'Not Available';
            }
        },
        remove: function(index){
            this.asteroids.splice(index, 1);
        },
        getRowStyle: function(a){
            if(a.close_approach_data.length == 0){
                return {
                    border: "solid 3px red",
                    color: "red"
                };
            }
        },
        isMissingData: function(a){
            return a.close_approach_data.length == 0;
        }
    },
});
var myAPIkeyAstroids = "QaN3bNxnex7qdM3ROF8kn86evoIeXhheqBNYZFV0";
var url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key="+this.myAPIkeyAstroids;
axios.get(url)
    .then(function (res){
        vm.asteroids = res.data.near_earth_objects.slice(0,20);
        document.getElementById('container').style.display = 'block'
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });