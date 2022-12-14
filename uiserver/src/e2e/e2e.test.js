import puppeteer from "puppeteer";
describe("App.js", () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
    });
  
    it("navigates to the about page", async () => {
      await page.goto("http://localhost:3000");
      await page.waitForSelector(".myhome");
      await page.click("#employee");
      await page.waitForSelector("#welcometext");
      const text = await page.$eval("#welcometext", (e) => e.textContent);
      expect(text).toContain("My Employee");
    });
    test('should login for correct details',async ()=>{
      await page.goto("http://localhost:3000")
      await page.click("#login")
      await page.waitForSelector("#logintext")
      const text = await page.$eval("#logintext",(e)=>e.textContent)
      expect(text).toContain("Login")
    })
    test('should navigate to',async ()=>{
      await page.goto("http://localhost:3000/login")
      await page.waitForSelector("#logintext")

      await page.click('#username')
      await page.type("#username","praveen")

      await page.click('#password')
      await page.type("#password","123")

      await page.click("#submit")

      await page.waitForSelector("#message")

      const text = await page.$eval("#message",(e)=>e.textContent)
      expect(text).toContain("Login success")
    })
    afterAll(() => browser.close());
});