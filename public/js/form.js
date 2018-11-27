$( document ).ready(function() {

    $.get("/api/getAllProducer").done(function(data){
      data.forEach((doc,index) => {
        $("#producer-select").append("<option class='option-producer' id= " + 'producer' + index + "></option>");
        $("#producer" + index).html(doc.name);
        $("#producer" + index).val(doc._id);
      })
    })
    $.post("/api/productType",{type:"Iphone"}).done(function(data){
      data.forEach((doc,index) => {
        console.log(doc.name);
        $(".opt-iphone").append("<option class='option-iphone' id = "+ 'iphone' + index  + "> </option>");
        $("#iphone" + index).html(doc.name);
        $("#iphone" + index).val(doc._id);
      })
    })
    $.post("/api/productType",{type:"Xiaomi"}).done(function(data){
      data.forEach((doc,index) => {
        console.log(doc.name);
        $(".opt-xiaomi").append("<option class='option-xiaomi' id = "+ 'xiaomi' + index  + "> </option>");
        $("#xiaomi" + index).html(doc.name);
        $("#xiaomi" + index).val(doc._id);
      })
    })
    $.post("/api/productType",{type:"Oppo"}).done(function(data){
      data.forEach((doc,index) => {
        console.log(doc.name);
        $(".opt-oppo").append("<option class='option-oppo' id = "+ 'oppo' + index  + "> </option>");
        $("#oppo" + index).html(doc.name);
        $("#oppo" + index).val(doc._id);
      })
    })
    $.post("/api/productType",{type:"Samsung"}).done(function(data){
      data.forEach((doc,index) => {
        console.log(doc.name);
        $(".opt-samsung").append("<option class='option-samsung' id = "+ 'samsung' + index  + "> </option>");
        $("#samsung" + index).html(doc.name);
        $("#samsung" + index).val(doc._id);
      })
    })

    $.post("/api/productType",{type:"Other"}).done(function(data){
      data.forEach((doc,index) => {
        console.log(doc.name);
        $(".opt-other").append("<option class='option-other' id = "+ 'other' + index  + "> </option>");
        $("#other" + index).html(doc.name);
        $("#other" + index).val(doc._id);
      })
    })

    $( "#form-bill-out").submit(function( event ) {
      $.ajax({ // create an AJAX call...
        data: $(this).serialize(), // get the form data
        type: $(this).attr('method'), // GET or POST
        url: $(this).attr('action'), // the file to call
        success: function(response) { // on success..
          console.log(response);
            if(response === "Success"){
              $("#bill-in").html("✓ Nhập thành công");
              $("#bill-in").css("color","green");
              $("#bill-in").css("display","block");
            }else if(response === "Not enough"){
              $("#bill-in").html("✕ Không đủ hàng trong kho");
              $("#bill-in").css("color","red");
              $("#bill-in").css("display","block");
            }
            else{
              $("#bill-in").html("✕ Nhập không thành công");
              $("#bill-in").css("color","red");
              $("#bill-in").css("display","block");
            }
        }
    });
      event.preventDefault();
    });
    // Submit

      $( "#form-bill-in" ).submit(function( event ) {
        $.ajax({ // create an AJAX call...
          data: $(this).serialize(), // get the form data
          type: $(this).attr('method'), // GET or POST
          url: $(this).attr('action'), // the file to call
          success: function(response) { // on success..
            console.log(response);
              if(response === "Success"){
                $("#bill-in").html("✓ Nhập thành công");
                $("#bill-in").css("color","green");
                $("#bill-in").css("display","block");
              }else{
                $("#bill-in").html("✕ Nhập không thành công");
                $("#bill-in").css("color","red");
                $("#bill-in").css("display","block");
              }
          }
      });
        event.preventDefault();
      });



      $( "#form-product" ).submit(function( event ) {
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
                console.log("ko thanh cong");
                $(".mess").html("✕ Nhập không thành công");
                $(".mess").css("color","red");
                $(".mess").css("display","block");
              }
          }
      });
        event.preventDefault();
      });

      $( "#form-update-product" ).submit(function( event ) {
        $.ajax({ // create an AJAX call...
          data: $(this).serialize(), // get the form data
          type: $(this).attr('method'), // GET or POST
          url: $(this).attr('action'), // the file to call
          success: function(response) { // on success..
              if(response === "Success"){
                $(".mess").css("display","block");
              }else{
                $(".mess").html("✕ Nhập không thành công");
                $(".mess").css("color","red");
                $(".mess").css("display","block");
              }
          }
      });
        event.preventDefault();
      });



});
