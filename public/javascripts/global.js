// Userlist data array for filling in info box
var foodListData = [];
var ingredientListData = [];
// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the food table on initial page load
    populateTable();
    // Add FOOD button click
    $('#btnAddFood').on('click', addFood);
    // Delete FOOD link click
    $('#foodList table tbody').on('click', 'td a.linkdeletefood', deleteFood);
//populate recipes from food in db
    $('#foodList table tbody').on('click', 'td a.linkshowfood', getRecipe);
    //populate ingredients table
    $('#recipeList table tbody').on('click', 'td a.linkshowfood', getIngredients);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/food/foodlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowfood" rel="' + this.name + '" title="Show Details">' + this.name + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeletefood" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#foodList table tbody').html(tableContent);
    });
};


// Add Food
function addFood(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addFood input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newFood = {
            'name': $('#addFood fieldset input#inputFoodName').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newFood,
            url: '/food/addfood/'+ newFood,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addFood fieldset input').val('');

                // Update the table
                populateTable();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// mak
function getIngredients(event) {
    event.preventDefault();
  var tableContent = '';
        var thisID = $(this).attr('rel');
         var payload = {
            'rId': thisID
        }

$.ajax({
         url: "https://community-food2fork.p.mashape.com/get?key=427a1179202ef1a549c1ac5875068998",
         data: payload,
         type: "GET",
         dataType: 'JSON',
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'JsCxMD9DswmshxLi27DFJXvZPmuhp1fQuR5jsneTf7z9yKKlZv', 'Accept');},
         success: function(data) { 
             // Stick our ingredient data array into a ingredientList variable in the global object
            ingredientListData = data;
            console.log(data.recipe.ingredients);
        $.each(data.recipe.ingredients, function(){
            tableContent += '<tr>';
            tableContent += '<td>'+ this + '</td>';
            tableContent += '</tr>';
        });
     $('#ingredientList table tbody').html(tableContent);
          }
      });



};


function getRecipe(event) {
 event.preventDefault();
     // Empty content string
    var tableContent = '';

     var thisID = $(this).attr('rel');
         var payload = {
            'q': thisID,
            'sort': 'r'
        }

        //  var payload = {
        //     'q': 'chicken',
        //     'sort': 'r'
        // }
$.ajax({
         url: "https://community-food2fork.p.mashape.com/search?key=427a1179202ef1a549c1ac5875068998",
         data: payload,
         type: "GET",
         dataType: 'JSON',
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'JsCxMD9DswmshxLi27DFJXvZPmuhp1fQuR5jsneTf7z9yKKlZv', 'Accept');},
         success: function(data) { 
            //alert('Success!');
         // console.log(data.count, data.recipes[0]);
         // console.log(JSON.stringify(data));
        $.each(data.recipes, function(){
            tableContent += '<tr>';
            tableContent += '<td><img src="'+ this.image_url + '" alt="test" height="150" width="150"></td>';
            tableContent += '<td><a href="#" class="linkshowfood" rel="' + this.recipe_id + '" title="Show Details">' +  this.title + '</td>';
            tableContent += '</tr>';
        });
     $('#recipeList table tbody').html(tableContent);
     
          }
      });
};


// Delete User
function deleteFood(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this food?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/food/deleteFood/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                //do nothing?
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};