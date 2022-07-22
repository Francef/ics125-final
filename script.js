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
					table += listData[i].recipe_link + `</td></tr>`;
                }

				$(`#drinkTable`).append(table);
            });
    }