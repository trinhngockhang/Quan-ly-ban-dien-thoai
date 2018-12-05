$( document ).ready(function() {
  $.get("/api/allProduct").done(function(data){
      $("#name").val(data[0].name);
      $("#price").val(data[0].price);
      $("#description").val(data[0].description);
      $("#selectPhone").change(function(){
        var phone = $("select option:selected").text();
        data.forEach((doc,index) => {
          if(doc.name === phone){
            $("#name").val(doc.name);
            $("#price").val(doc.price);
            $("#description").val(doc.description);
          }
        })
      })
  })
})
