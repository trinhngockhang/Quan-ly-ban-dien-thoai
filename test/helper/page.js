const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');

class CustomPage{
  constructor(page){
    this.page = page;
  }
  static async build(){
    const browser = await puppeteer.launch({
      headless:false
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);
    return new Proxy(customPage, {
      get : function(target,property){
        return customPage[property] || browser[property] || page[property]
      }
    })
  }
  async login(){
    const user = "5bfb51fae5b7f7a9f9407c95";
    const {session,sig} = sessionFactory(user);
    await this.page.setCookie({
      name:'session',
      value:session
    })
    await this.page.setCookie({
      name:'session.sig',
      value:sig
    })
    await this.page.goto('localhost:6969');
    await this.page.waitFor('a.user-profile');
  }
  async getContentOfElement(selector){
    return  await this.page.$eval(selector,el => el.innerHTML);
  }
}


module.exports = CustomPage;
