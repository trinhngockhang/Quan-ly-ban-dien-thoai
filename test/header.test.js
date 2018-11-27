// let page;
//
// const Page = require('./helper/page');
// //before every single test
// beforeEach(async () => {
//   page = await Page.build();
//   await page.goto('localhost:3000');
// })
//
// afterEach( async () => {
//   await page.close();
// });
//
// test('The header is right',async () => {
//   const text = await page.$eval('a.brand-logo', el => el.innerHTML);
//   expect(text).toEqual('Blogster');
// })
//
// test('clicking login starts oauth',async() => {
//   await page.click('.right a');
//   const url = page.url();
//   expect(url).toMatch(/accounts\.google\.com/);
// })
//
// test('When signed in,show logput button',async() => {
//   await page.login();
//   const text = await page.getContentOfElement('a[href="/auth/logout"]');
//   expect(text).toEqual('Logout');
// })
test("t1",()=>{
  expect(1+1).toEqual(2);
})
