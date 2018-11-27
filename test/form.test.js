// const Page = require('./helper/page');
// let page;
//
// beforeEach(async () => {
//   page = await Page.build();
//   await page.goto('localhost:3000');
// })
//
// afterEach(async () => {
//   await page.close();
// })
//
//
//
// describe("when login",async () => {
//   beforeEach(async()=>{
//     await page.login();
//     await page.click('a.btn-floating');
//   })
//
//   test('when log in can see create form',async () => {
//     const label = await page.getContentOfElement('form label');
//     expect(label).toEqual('Blog Title');
//   })
//
//   describe('And using invalid inputs',async() =>{
//     beforeEach(async()=>{
//       await page.click('form button');
//     })
//     test('the form shows an err',async () => {
//       const tittleErr = await page.getContentOfElement('.title .red-text');
//       const contentErr = await page.getContentOfElement('.content .red-text');
//
//       expect(tittleErr).toEqual('You must provide a value');
//       expect(contentErr).toEqual('You must provide a value');
//     })
//   })
//
//   describe('Using valid input',async () => {
//     beforeEach(async() => {
//       await page.type('.title input','test title');
//       await page.type('.content input','test title');
//       await page.type('form button');
//     })
//     test('submiting take user to ...',async () => {
//       const text = await page.getContentOfElement('h5');
//       expect(text).toEqual("Please confirm your entries");
//     })
//
//     test('saving ss',async () => {
//       await page.click('button.green');
//     })
//   })
// })

test("t1",()=>{
  expect(1+1).toEqual(2);
})
