let listData; 
let table;

/* 	Function load_data_with_fetch
	Purpose: provides fetch of JSON data and assigns it to the variable "listData". In addition, it populates
	the page with a table displaying all drinks available */
	
function load_data_with_fetch() {
        fetch("https://francef.github.io/final.json"). // link to JSON API
            then(response => response.json()).
            then((json) => {
                let i;
				let j;
                table = `<tr><th>Drink Name</th><th>Alcohol required</th><th></th><th></th><th></th><th></th><th>Recipe</th></tr>`;      // creates the table's headings
                listData = json;
				for (i = 0; i < listData.length; i++) { 
				 // creates each row of the table
                    table += `<tr><td>` + listData[i].drink_name + `</td><td>`;
					for (j = 0; j < listData[i].alcohol.length; j++) {
						table += listData[i].alcohol[j] + `</td><td>`;
					}
					table += `<a href=` + listData[i].recipe_link + `</a></td></tr>`;
                }

				$(`#drinkTable`).append(table);
            });
    }
	
function loadDrinks(liquor) {
	table = `<tr><th>Drink Name</th><th>Alcohol required</th><th></th><th></th><th></th><th></th><th>Recipe</th></tr>`;
	for (i = 0; i < listData.length; i++) { 

					for (j = 0; j < listData[i].alcohol.length; j++) {
						if (listData[i].alcohol[j] == liquor) {
						 // creates each row of the table
						table += `<tr><td>` + listData[i].drink_name + `</td><td>`;
						table += listData[i].alcohol[j] + `</td><td>`;
					}
					table += `<a href=` + listData[i].recipe_link + `</a></td></tr>`;
                }
				document.querySelector(`#drinkTable`).innerHTML = table;
}
}

let selectAlcohol = document.querySelector(`#selectLiquor`);
selectAlcohol.addEventListener('change', (event) => {
		let drink = event.target.value;
		loadDrinks(drink);
		console.log(drink);
});
