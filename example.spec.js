import { test } from "playwright/test";
const ExcelJS = require('exceljs');
test('DL', async ({ page }) => {

    //await page.goto('https://uat.shriramhousing.in/home-loan-balance-transfer');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sitemap');

    // Add headers to the Excel worksheet
    worksheet.addRow(['URL', 'Datalayer']);
    let name = ["https://uat1.shriramfinance.in/calculator.xml",
        "https://uat1.shriramfinance.in/insurance.xml", "https://uat1.shriramfinance.in/credit-score.xml"];
    for (let index = 0; index < name.length; index++) {
        let URL = name[index];
        // console.log(name[index]);
        await page.goto(URL);
 test.setTimeout(7000000);

        const locValues = await page.$$eval("loc", (elements) =>
            elements.map((element) => element.textContent)
          );
          for (const locValue of locValues) {
            await page.goto(locValue);
           

            const result = await page.evaluate(() => {
                return window.dataLayer.filter(item => item.event === 'customDL');
              });
           // let datalayer = await page.locator('//script[@class="layer-script-class"]');
            let data = result ? await datalayer.textContent()
                : "FAIL";
            console.log(data);
    
            worksheet.addRow([locValue, data]);
            const path = 'sfldl_data.xlsx';
            //const path = 'SFL_Sitemap/bbps.xlsx';
            await workbook.xlsx.writeFile(path);
          }

        

    }


});
