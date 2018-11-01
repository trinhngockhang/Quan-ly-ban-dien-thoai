$( document ).ready(function() {
    $.get("/api/allUser",function(user){
      console.log(user);

      $('#user-table').DataTable( {
        data: user,
        columns: [
            { title: "Tên đăng nhập",data:"username" },
            { title: "Email",data:"email" },
            { title: "Chức vụ",data: "type",
                    render : function (val, type, row) {
                      console.log(val,type,row);
                    return val === "boss" ? "Quản lý" : "Quản trị viên";
                }
            }
        ]
      });
    })
});
