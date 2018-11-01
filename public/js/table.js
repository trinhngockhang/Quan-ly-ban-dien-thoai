$( document ).ready(function() {
    $.get("/api/getAllBill",function(bill){
      console.log(bill);
      $('#datatable-bill').DataTable( {
        data: bill,
        columns: [
            { title: "Tên sản phẩm" },
            { title: "Nhân viên" },
            { title: "Loại đơn hàng" },
            { title: "Số lượng" },
            { title: "Đơn giá" },
            { title: "Tổng tiền" },
            { title: "Thời gian"}
        ]
    } );
    })
});
