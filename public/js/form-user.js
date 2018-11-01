$( document ).ready(function() {

      $( "#form-user" ).submit(function( event ) {
        $.ajax({ // create an AJAX call...
          data: $(this).serialize(), // get the form data
          type: $(this).attr('method'), // GET or POST
          url: $(this).attr('action'), // the file to call
          success: function(response) { // on success..
              alert(response);
              console.log(response);
          }
      });
        event.preventDefault();
      });
});
