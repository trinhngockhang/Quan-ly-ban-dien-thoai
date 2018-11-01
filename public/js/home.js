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
    //set curent

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

  //top phone
  $.get("/api/topPhone",function(data){
    console.log(data);
    var best = data[0].sold;
    data.forEach((doc,index)=>{
      $("#phone"+(index+1)).html(doc.name);
      $("#number-phone" +(index+1)).html(doc.sold);
      if(index>0){
         let per = (doc.sold/best * 100) + "%";
         $("#bar-phone" + (index+1)).css("width",per);
      }
    })

  })

  $.get("/api/topType",function(dataType){
    console.log(dataType);
    var sum = dataType[0] + dataType[1] + dataType[2] + dataType[3] + dataType[4];
    console.log("sum",sum);
    $("#per1").html(Math.round(dataType[0]/sum * 100) + "%");
    $("#per2").html(Math.round(dataType[1]/sum * 100) + "%");
    $("#per3").html(Math.round(dataType[2]/sum * 100)+ "%");
    $("#per4").html(Math.round(dataType[3]/sum * 100) + "%");
    $("#per5").html(Math.round(dataType[4]/sum * 100) + "%");
    var ctx = document.getElementById("canvasDoughnut1");
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Iphone","SamSung","Oppo","XiaoMi","Other"],
        datasets: [{
            label: 'Hãng điện thoại yêu thích',
            data: dataType,
            backgroundColor: [
                '#3598dc',
                '#18bb9b',
                '#9b58b6',
                '#9cc2cb',
                '#e84b3c'
            ]
        }]
    },
    options: {

    }
});
})

});
