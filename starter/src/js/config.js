fetch("https://tasty.p.rapidapi.com/tags/list", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "acd05c5711msha05183ddac026c8p169ec7jsn414fc820b394"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.log(err);
});
