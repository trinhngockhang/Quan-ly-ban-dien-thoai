$( document ).ready(function() {
  $.get( "/api/current_user", function( data ) {
    $( ".name-user" ).html( data.name );
    $( ".Welcome-name" ).html( data.name );
    $("#avatar-user").attr("src",data.avatarLink);
  });
})
