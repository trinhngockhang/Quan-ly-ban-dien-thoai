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
describe("Unit test kiem thu front-end",async () => {
  describe("chua login",async () =>{

    test('trang login',async() => {
      await page.goto('localhost:6969/login');
      await page.waitFor('form');
      const username = await page.$eval("#login-user",el => el.name);
      const pass = await page.$eval("#login-pass",el => el.name);
      expect(username.toString()).toEqual("username");
      expect(pass.toString()).toEqual("password");
    })
  })
  describe("login",async () => {
      beforeAll(async () => {
        await page.login();
      })

      test("kiem tra trang home",async() => {
        const table = await page.getContentOfElement('.home-check-table');
        expect(table.toString()).toEqual(" Số lượng sản phẩm bán ra 10 ngày gần nhất");
      })
      test("kiem tra trang nhap san pham",async () => {
        await page.goto('localhost:6969/form');
        const form = await page.getContentOfElement('.x_title h2');
        expect(form.toString()).toEqual("Thêm sản phẩm");
      })

      test("kiem tra trang nhap hoa don",async () => {
        await page.goto('localhost:6969/form-bill');
        const tableform = await page.getContentOfElement('.x_title h2');
        expect(tableform.toString()).toEqual("Nhập hàng");
      })

      test("kiem tra trang bang hoa hon",async () => {
        await page.goto('localhost:6969/bill-table');
        const tableform = await page.getContentOfElement('.x_title h2');
        expect(tableform.toString()).toEqual("Đơn hàng nhập");
      })

      test("kiem tra trang thong ke nhan vien",async () => {
        await page.goto('localhost:6969/user-table');
        const tableform = await page.getContentOfElement('.x_title h2');
        expect(tableform.toString()).toEqual("Bảng kê khai");
      })

      test("kiem tra trang danh muc san pham",async () => {
        await page.goto('localhost:6969/product-table');
        const tableform = await page.getContentOfElement('.x_title h2');
        expect(tableform.toString()).toEqual("Bảng dữ liệu");
        page.close();
      })
  })
})
