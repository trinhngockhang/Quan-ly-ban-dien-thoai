$( document ).ready(function() {
  $.get( "/api/current_user", function( data ) {
    $( ".name-user" ).html( data.username );
    $( ".Welcome-name" ).html( data.username );
    $("#avatar-user").attr("src",data.avatarLink);
  });
})
