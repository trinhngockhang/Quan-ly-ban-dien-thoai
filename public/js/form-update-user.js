$( document ).ready(function() {
      $( "#form-update-user" ).submit(function( event ) {
        $.ajax({ // create an AJAX call...
          data: $(this).serialize(), // get the form data
          type: $(this).attr('method'), // GET or POST
          url: $(this).attr('action'), // the file to call
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
