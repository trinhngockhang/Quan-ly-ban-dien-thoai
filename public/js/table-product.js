$( document ).ready(function() {
    $.get("/api/allProduct",function(bill){
      console.log(bill);
      $('#product-table').DataTable( {
        data: bill,
        columns: [
            { title: "Tên sản phẩm",data:"name" },
            { title: "Hãng sản xuất",data:"type" },
            { title: "Giá",data:"price" },
            { title: "Hàng còn",data:"available" },
            { title: "Đã bán" ,data:"sold"},
            { title: "Miêu tả",data:"description"}
        ]
    } );
    })
});
