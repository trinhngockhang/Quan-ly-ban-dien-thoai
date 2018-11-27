$( document ).ready(function() {
    $.get("/api/getAllBillIn",function(bill){
      $('#datatable-bill').DataTable( {
        data: bill,
        columns: [
            { title: "Tên sản phẩm" },
            { title: "Hãng"},
            { title: "Người nhập" },
            { title: "Số lượng" },
            { title: "Nhà cung cấp" },
            { title: "Đơn giá" },
            { title: "Tổng tiền" },
            { title: "Thời gian"}
        ]
    } );
    })
});
