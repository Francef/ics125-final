let listData; 											// variable to store JSON data to limit amount of fetches
let table;

load_data_with_fetch();									// initial fetch upon load of page

$(`#drinkTable`).hide(); 								// keep this hidden until user presses "Load all drinks"
$(`#refineDrinkList`).hide(); 							// keep this hidden until user presses "Load all drinks"

/* 	Function load_data_with_fetch
	Purpose: provides fetch of JSON data and assigns it to the variable "listData". In addition, it populates
	the page with a table displaying all drinks available */
	
function load_data_with_fetch() {
        fetch("https://francef.github.io/final.json"). // link to JSON API
            then(response => response.json()).
            then((json) => {
                let i;
				let j;
                table = `<tr><th>Drink Name</th><th>Alcohol required</th><th>Recipe</th></tr>`;      // creates the table's headings
                listData = json;
				for (i = 0; i < listData.length; i++) { 
				 // creates each row of the table
                    table += `<tr><td>` + listData[i].drink_name + `</td><td>`;
					for (j = 0; j < listData[i].alcohol.length; j++) {
						if (j < listData[i].alcohol.length -1) {
							table += listData[i].alcohol[j] + `, `;
						} else {
							table += listData[i].alcohol[j];
						}
					}
					table += `</td><td><a href=` + listData[i].recipe_link + `</a></td></tr>`;
                }

				$(`#drinkTable`).html(table);
            });
    }
/* 	Function loadDrinks
	Purpose: Search the JSON data for the drinks made with the chosen liquor. When found, display the drinks names,
	images, and link to their recipe. */
	
function loadDrinks(liquor) {
	let youCanMake = `<h4>You can make the following drinks: </h4>`;
	for (i = 0; i < listData.length; i++) { 
		for (j = 0; j < listData[i].alcohol.length; j++) {
			if (listData[i].alcohol[j] == liquor) {
				youCanMake += `<h4>` + listData[i].drink_name + `</h4>`;
					if (listData[i].drinkImage != "") {									// if the drinkImage attribute is not empty, display on screen
						youCanMake += `<img src="` + listData[i].drinkImage + `">`;
					}
					if (listData[i].recipe_link != "") {								// if the recipe_link is not empty, display the recipe link on screen
						youCanMake += `<p>Recipe: <a href=` + listData[i].recipe_link + `</a></p>`;
					}
                }
	$(`#drinkTable`).hide(); 															// hide drinks table when a selection is made
	$(`#showRefinedList`).html(youCanMake);												// show the cocktail list based on the chosen liquor
	}
	}
}


let selectAlcohol = document.querySelector(`#selectLiquor`);
selectAlcohol.addEventListener('change', (event) => {									// select dropdown event listener
		let drink = event.target.value;
		loadDrinks(drink);
});

function showAll() {
	$(`#drinkTable`).show(); // show drink table only when user selects "Load All Drinks"
	$(`#loadAll`).hide();
	$(`#refineDrinkList`).show();
}
