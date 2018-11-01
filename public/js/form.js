$( document ).ready(function() {
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
    // Submit

      $( "#form-bill" ).submit(function( event ) {
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

      $( "#form-product" ).submit(function( event ) {
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

      $( "#form-update-product" ).submit(function( event ) {
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
