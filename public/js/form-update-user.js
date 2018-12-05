$( document ).ready(function() {
      $.get( "/api/current_user", function( data ) {
        console.log(data);
        $( "#name" ).val(data.name);
        $( "#user-name" ).val( data.username );
        $( "#email").val(data.email);
        $( "#phone").val(data.phone);
      });
      $( "#form-update-user" ).submit(function( event ) {
        var form = $('#form-update-user')[0];

        var data = new FormData(form);
        $.ajax({ // create an AJAX call...
          data: data, // get the form data
          type: $(this).attr('method'), // GET or POST
          url: $(this).attr('action'),
          enctype: 'multipart/form-data',
          processData: false,  // Important!
          contentType: false,
          cache: false, // the file to call
          success: function(response) { // on success..
              if(response === "Success"){
                console.log(response);
                $("#bill-in").html("✓ Nhập thành công");
                $("#bill-in").css("color","green");
                $(".mess").css("display","block");

              }else{
                console.log("ko thanh cong" + response);
                $(".mess").html("✕ Nhập không thành công");
                $(".mess").css("color","red");
                $(".mess").css("display","block");
              }
          }
      });
        event.preventDefault();
      });
});
