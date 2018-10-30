$( document ).ready(function() {
    console.log(new Date() );
    var today = new Date();
    var timeArr = new Array();
    for(let i=0;i<10;i++){
      let newDay = new Date();
      newDay.setDate(today.getDate() - i);
      timeArr[i] = newDay.getDate() + "/" +(1+ newDay.getMonth()) + "/" +
      newDay.getFullYear();
    }
    console.log(timeArr);


    //set curent
    $.get( "/api/current_user", function( data ) {
      $( ".name-user" ).html( data.username );
      $( ".Welcome-name" ).html( data.username );
      $("#avatar-user").attr("src",data.avatarLink);
    });
    //set number of product
    $.get("/api/billCountProduct",function(data){
      $("#count-out-month").html(data.monthOut);
      $("#count-in-month").html(data.monthIn);
      $("#count-out-week").html(data.weekOut);
      $("#count-in-week").html(data.weekIn);
    })

    $.get("/api/countUser",function(data) {
      $("#count-staff").html(data);
    })

    $.get("/api/countProduct",function(data) {
      $("#count-product").html(data);
    })

    $.get("/api/dataTenDays",function(dataPhone){
      console.log(dataPhone);
      dataPhone = dataPhone.reverse();
      timeArr = timeArr.reverse();
      var ctx = document.getElementById("firtChart");
      var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: timeArr,
          datasets: [{
              label: 'Tổng sản phẩm bán ra',
              data: dataPhone,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
})

    //charjs

});
