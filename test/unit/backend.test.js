const puppeteer = require('puppeteer');
let browser,page;

beforeEach(async () => {
    browser = await puppeteer.launch({
    headless:false
  });
    page = await browser.newPage();
    await page.goto('localhost:6969');
})

afterEach( async ()=>{
    await browser.close();
});

describe("Test nhap du lieu",async () =>{
  test('Nhap du lieu voi du lieu trong',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'POST',
              'postData': ''
          };

          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/createProduct');
      const responseBody = await response.text();
      expect(responseBody).toEqual("Đã xảy ra lỗi");
  })
  test('Them hoa don voi du lieu trong',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'POST',
              'postData': ''
          };

          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/createBill');
      const responseBody = await response.text();
      expect(responseBody).toEqual("err");
  })
  test('Them nguoi dung voi du lieu trong',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'POST',
              'postData': ''
          };

          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/createUser');
      const responseBody = await response.text();
      expect(responseBody).toEqual("Đã xảy ra lỗi");
})
  test('Them san pham du lieu sai',async () => {
  await page.setRequestInterception(true);
    page.on('request', interceptedRequest => {

        var data = {
            'method': 'POST',
            'postData': 'name=iphone12&price=ahihi&type=iphone&description=mieuta'
        };

        interceptedRequest.continue(data);
    });
    const response = await page.goto('localhost:6969/api/createProduct');
    const responseBody = await response.text();
    expect(responseBody).toEqual("Đã xảy ra lỗi");
})
})

describe("Lay du lieu tu cac route",async ()=> {
  test('Lay tat ca san pham',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'GET'
          };
          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/AllProduct');
      const responseBody = await response;
      expect(typeof(responseBody)).toBeDefined();
  })
  test('Lay tat ca nguoi dung',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'GET'
          };
          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/AllUser');
      const responseBody = await response.text();
      expect(typeof(responseBody)).toBeDefined();
  })
  test('Lay tat ca hoa don',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'GET'
          };
          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/AllBill');
      const responseBody = await response.text();
      expect(responseBody).toBeDefined();
  })
  test('So nguoi dung là INT',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'GET'
          };
          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/countUser');
      const responseBody = await response.text();
      console.log(responseBody);
      expect(typeof(parseInt(responseBody))).toEqual("number");
  })
  test('So san pham là INT',async () => {
    await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {

          var data = {
              'method': 'GET'
          };
          interceptedRequest.continue(data);
      });
      const response = await page.goto('localhost:6969/api/countProduct');
      const responseBody = await response.text();
      console.log(responseBody);
      expect(typeof(parseInt(responseBody))).toEqual("number");
  })
})
