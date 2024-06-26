import { test } from "playwright/test";

test('DL', async ({ page }) => {

    //     await page.goto('https://uat.shriramhousing.in/home-loan-balance-transfer');
    // let datalayer=await page.locator('//script[@class="layer-script-class"]');
    // let data=datalayer ? await datalayer.textContent()
    // : "FAIL";
    // console.log(data);
    let name = ["https://beta.shriramlife.com/", "https://beta.shriramlife.com/life-insurance/golden-premier-saver-plan", "https://beta.shriramlife.com/life-insurance/early-cash-plan"];



    for (let index = 0; index < name.length; index++) {

       // console.log(name[index]);
      
   await page.goto(name[index]);
   let url= await page.url();
    console.log(url);
    
    }


});
