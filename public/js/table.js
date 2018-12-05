$( document ).ready(function() {
    $.get("/api/getAllBillIn",function(bill){
      $('#datatable-bill').DataTable( {
        data: bill,
        columns: [
            { title: "Mã GD",data : "_id"},
            { title: "Tên sản phẩm",data:"productName" },
            { title: "Hãng",data : "type"},
            { title: "Người nhập",data:"username" },
            { title: "Số lượng",data:"numberOfProduct" },
            { title: "Nhà cung cấp",data:"name"},
            { title: "SĐT",data :"phone"},
            { title: "Đơn giá",data : "unitPrice" },
            { title: "Tổng tiền" ,data:"totalPrice"},
            { title: "Thời gian",data:"date"}
        ]
    } );
    })
});
