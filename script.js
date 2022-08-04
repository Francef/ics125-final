let listData; 											// variable to store JSON data to limit amount of fetches
let table;

load_data_with_fetch();									// initial fetch upon load of page

$(`#drinkTable`).hide(); 								// keep this hidden until user presses "Load all drinks"
$(`#refineDrinkList`).hide(); 							// keep this hidden until user presses "Load all drinks"

// login event handler
 $(`#login-button`).on(`click`, function (event) {
        // prevent the form from submitting
        event.preventDefault();
        // keep track of the form validity
        let validity = true;
        // validate the email field
        if ($(`#login-email`).val() == ``) {
            //use the bootstrap built in styles to indicate a problem with the fiekd
            $(`#login-email`).addClass(`is-invalid`);

            // add a hover tooltip to the #login-email fields
            let tooltip = new bootstrap.Tooltip(`#login-email`, {
                title: `Email cannot be blank`
            });

            // set the validity to false
            validity = false;
        } else {
            // remove the is-invalid class, if it exists, from the login-email field
            $(`#login-email`).removeClass(`is-invalid`);

            // add the css class "is-valid" to give positive feedback to the user
            $(`#login-email`).addClass(`is-valid`);

            // remove any tooltip on this element
            if ($(`#login-email`).tooltip != undefined) {
                $(`#login-email`).tooltip(`dispose`);
            }
        }

        // validate the password field
        if ($(`#login-password`).val() == ``) {
            //use the bootstrap built in styles to indivate a problem with the fiekd
            $(`#login-password`).addClass(`is-invalid`);

            // add a hover tooltip to the #login-password fields
            let tooltip = new bootstrap.tooltip(`#login-password`, {
                title: `Password cannot be blank`
            });

            // set the validity to false
            validity = false;
        } else {
            // remove the is-invalid class, if it exists, from the login-password field
            $(`#login-password`).removeClass(`is-invalid`);

            // add the css class "is-invalid" to give positive feedback to the user
            $(`#login-password`).addClass(`is-valid`);

            // remove any tooltip on this element
            if ($(`#login-password`).tooltip != undefined) {
                $(`#login-password`).tooltip(`dispose`);
            }
        }
        if (!validity) {
            return false;
        } else {
            // give class of "spin" to login-spinner if form is valid
            $(`#login-spinner`).addClass(`spin`);
        }
        $(`#login-button`).attr(`disabled`, `disabled`);

        $(`#loginModal`).animate({ opacity: 0 }, 2000, function () {
            // what we are going to do once the animation completes
            // hide modal
            $(`#loginModal`).modal(`hide`);

            // hide login button
            $(`#part-1`).hide();

            // show part 2 of the exercise
            $(`#part-2`).show();
        });
    }); // end click handler

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


/* 	Function randomDrink
	Purpose: Generate a random index between 0 and the last index of listData, then retrieve the cocktail name, image, and recipe for display on the page */
function randomDrink() {
	let totalCocktails = listData.length;
	let randomIndex = Math.floor(Math.random() * totalCocktails);					// generates a random integer between 0 and 5, inclusive
	let randomDrinkIs = `<h4>Your random drink is: ` + listData[randomIndex].drink_name + `</h4>`;
	if (listData[randomIndex].drinkImage != "") {									// if the drinkImage attribute is not empty, display on screen
		randomDrinkIs += `<img src="` + listData[randomIndex].drinkImage + `">`;
	}
	if (listData[randomIndex].recipe_link != "") {									// if the recipe_link is not empty, display the recipe link on screen
		randomDrinkIs += `<p>Recipe: <a href=` + listData[randomIndex].recipe_link + `</a></p>`;
	}
	$(`#drinkTable`).hide(); 														// hide drinks table when random button is chosen
	$(`#showRefinedList`).html(randomDrinkIs);										// display random drink, image, recipe 
}
