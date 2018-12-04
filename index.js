const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const excel = require('node-excel-export');
const app = express();
const styles = require('./config/styleExcel');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./services/passport');
app.get("/testE",(req,res) => {
  // You can define styles as json object


  //Array of objects representing heading rows (very top)
  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2'] // <-- It can be only values
  ];

  //Here you specify the export structure
  const specification = {
    customer_name: { // <- the key should match the actual data key
      displayName: 'Customer', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style
      cellStyle: function(value, row) { // <- style renderer function
        // if the status is 1 then color in green else color in red
        // Notice how we use another cell value to style the current one
        return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible
      },
      width: 120 // <- width in pixels
    },
    status_id: {
      displayName: 'Status',
      headerStyle: styles.headerDark,
      cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
        return (value == 1) ? 'Active' : 'Inactive';
      },
      width: '10' // <- width in chars (when the number is passed as string)
    },
    note: {
      displayName: 'Description',
      headerStyle: null,
      cellStyle: styles.cellPink, // <- Cell style
      width: 220 // <- width in pixels
    }
  }

  // The data set should have the following shape (Array of Objects)
  // The order of the keys is irrelevant, it is also irrelevant if the
  // dataset contains more fields as the report is build based on the
  // specification provided above. But you should have all the fields
  // that are listed in the report specification
  const dataset = [
    {customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown'},
    {customer_name: 'HP', status_id: 0, note: 'some note'},
    {customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown'}
  ]

  // Define an array of merges. 1-1 = A:1
  // The merges are independent of the data.
  // A merge will overwrite all data _not_ in the top-left cell.
  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]

  // Create the excel report.
  // This function will return Buffer
  const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'Report', // <- Specify sheet name (optional)
        heading: heading, // <- Raw heading array (optional)
        merges: merges, // <- Merge cell ranges
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );

  // You can then return this straight
  res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
  return res.send(report);



})


mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI,(err) =>{
  console.log("connect ss");
});
app.set("view engine","ejs");
app.set("vỉews","./views");
app.use(express.static(__dirname + '/public'));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/billRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/renderRoute')(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS");
    next();
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
