let page;
jest.setTimeout(30000);
const Page = require('../helper/page');
beforeAll(async () => {
  page = await Page.build();
  await page.goto('localhost:6969');
})

afterAll( async () => {
  await page.close();
});


describe("Chua Login",async () => {
  test("khong vao duoc trang home",async () => {
    const url = page.url();
    expect(url).toEqual("http://localhost:6969/login");
  })
})

describe("Da Login",async () => {
  beforeAll(async() => {
    await page.login();
  })

  test("Nhap sai san pham",async () => {
    await page.goto('localhost:6969/form');
    await page.click('button.btn-success');
    const err = await page.getContentOfElement('.parsley-required');
    expect(err).toEqual("This value is required.");
  })
  test("Nhap sai nguoi dung",async () => {
    await page.goto('localhost:6969/form-user');
    await page.click('button.btn-success');
    const err = await page.getContentOfElement('.parsley-required');
    expect(err).toEqual("This value is required.");
  })
  test("Nhap sai hoa don",async () => {
    await page.goto('localhost:6969/form-bill');
    await page.click('button.btn-success');
    const err = await page.getContentOfElement('.parsley-required');
    expect(err).toEqual("This value is required.");
  })
  test("Nhap dung san pham",async () => {
    await page.goto('localhost:6969/form');
    await page.type('#first-name', 'iphone14');
    await page.type('#price', '90000');
    await page.click('button.btn-success');
    var msg = await page.getContentOfElement("h5.mess");
    await page.goto('localhost:6969/api/deleteProductByName?name=iphone14');
    expect(msg).toEqual("✓ Nhập thành công");
  })
  test("Nhap dung nguoi dung",async () => {
    await page.goto('localhost:6969/form-user');
    await page.type('#user-name', 'khangkhangkhang');
    await page.type('#password', '123456');
    await page.click('button.btn-success');
    var msg = await page.getContentOfElement("h5.mess");
    await page.goto('localhost:6969/api/deleteUserByName?name=khangkhangkhang');
    expect(msg).toEqual("✓ Nhập thành công");
  })
  test("Lay thong tin san pham",async() => {
    await page.goto("http://localhost:6969/product-table");
    await page.waitFor("td.sorting_1");
    var  columnFirst = await page.getContentOfElement("td.sorting_1");
    expect(columnFirst).toBeDefined();
  })
  test("Lay thong tin hoa don",async() => {
    await page.goto("http://localhost:6969/bill-table");
    await page.waitFor("td.sorting_1");
    var  columnFirst = await page.getContentOfElement("td.sorting_1");
    expect(columnFirst).toBeDefined();
  })
  test("Lay thong tin cac nhan vien",async() => {
    await page.goto("http://localhost:6969/user-table");
    await page.waitFor("td.sorting_1");
    var  columnFirst = await page.getContentOfElement("td.sorting_1");
    expect(columnFirst).toBeDefined();
  })
})
