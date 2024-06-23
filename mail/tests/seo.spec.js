
import { test, chromium } from "@playwright/test";


const ExcelJS = require("exceljs");


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Sitemap Data");

// Add headers to the Excel worksheet
worksheet.addRow([
  "URL",
  "Response Code",
  "Title",
  "Title_Length",
  "Description",
  "Description_Length",
  "Keyword",
  "Keyword_Length",
  "H1 Value",
  "H1 Count",
  "Index",
  "Canonical",
  "GTM",
  "Schema",
  "A_tag_check",
  "IMG_SRC",
  "ALT EXIST",
  "ALT NAME EXIST"

]);


  test(`check csv data `, async () => {
    
    const browser = await chromium.launch();
    const context = await browser.newContext({ incognito: true });
    const page = await context.newPage();

    const sitemapURL = "https://www.shriramlife.com/sitemap.xml";
    await page.goto(sitemapURL);
    
    const locValues = await page.$$eval("loc", (elements) =>
      elements.map((element) => element.textContent)
    );
    for (const locValue of locValues) {
     
      console.log(locValue);
      const response = await page.goto(locValue);
      const responseCode = response?.status();
      let pageTitle = await page.title();
      let titlelength=pageTitle.length;
      let pagetitlevalue = pageTitle ? pageTitle : "FAIL";
      let pageDescription = await page
        .locator("meta[name='description']")
        .getAttribute("content");
        let deslength=pageDescription.length
      let pagedesvalue = pageDescription ? pageDescription : "FAIL";

      let keywords = await page.$eval("meta[name='keywords']", (meta) =>
        meta.getAttribute("content")
      );
      let keywordlength=keywords.length;
      let pagekey = keywords ? keywords : "FAIL";

      const h1value = await page.$$("h1");
      console.log("----------" + h1value.length);
      let h1count = h1value.length;

      let h1Text =
        h1value.length > 0
          ? await page.$eval("h1", (elements) => elements.textContent)
          : "FAIL";
      console.log(h1Text);
      console.log(h1count);

      let index = await page.$$("//meta[contains(@content,'index, follow')]");
      let IndexFollow =
        index.length > 0 ? "Index,Follow" : "No Index,No Follow";
      console.log(IndexFollow);

      let canonicalElement = await page.$('link[rel="canonical"]');
      let canonicalCount = canonicalElement
        ? await canonicalElement.getAttribute("href")
        : "FAIL";
      console.log("CCC" + canonicalCount);
      let canonicalResult =
        canonicalCount == locValue ? "PASS" : canonicalCount;
      console.log(canonicalResult);

      let GTMDOM = await page.$("//script[contains(text(),'id=GTM-PM7MMHP')]");
      let GTMCount = GTMDOM ? "id=GTM-MTVPFQX" : "FAIL";
      console.log(GTMCount);
    
      let schemaElement = await page.locator("(//script[@type='application/ld+json'])[1]");
      let schemaValue = schemaElement
        ? await schemaElement.textContent()
        : "FAIL";
      console.log(schemaValue);

      let allLinks = await page.$$("a");
      let attr = "";
      for (let link of allLinks) {
        const attribute = await link.getAttribute("href");

        // Check if attribute is not null before using startsWith
        attr =
          attribute &&
            (attribute.startsWith("https://beta.shriramlife.com/") ||
              attribute.startsWith("https://uatcopscdn.shriramlife.me/"))
            ? attribute
            : " ";

        console.log("href", attr);
      }
      let attr2 = "";
      let altExist = "";
      let altSrc = "";
      let allimgLinks = await page.$$("img");

      for (let link1 of allimgLinks) {
        const imgverification = await link1.getAttribute("src");

        //------Start  Check if attribute is not null before using startsWith
        attr2 =
          imgverification &&
            (imgverification.startsWith("https://beta.shriramlife.com/") ||
              imgverification.startsWith("https://uatcopscdn.shriramlife.me/"))
            ? imgverification
            : " Verified";

        console.log("### img src", attr2);
        //----- End Check if attribute is not null before using startsWith

        let altTag = await link1.getAttribute("alt");
        if (altTag != null && altTag != undefined) {
          if (altTag == '') {
            altExist = "alt exist but empty"
            altSrc = imgverification;
          }
        } else {
          altExist = "alt not exist"
          altSrc = imgverification;
        }
      }



      console.log(
        locValue,
        responseCode,
        pagetitlevalue,
        pagedesvalue,
        pagekey,
        h1Text,
        h1count,
        IndexFollow,
        canonicalResult,
        schemaValue
      );
      worksheet.addRow([
        locValue,
        responseCode,
        pagetitlevalue,
        titlelength,
        pagedesvalue,
        deslength,
        pagekey,
        keywordlength,
        h1Text,
        h1count,
        IndexFollow,
        canonicalResult,
        GTMCount,
        schemaValue,
        attr,
        attr2,
        altExist,
        altSrc

      ]);

      const excelFilePath = "../SEO_SLIC_LIVE.xlsx";
      await workbook.xlsx.writeFile(excelFilePath);
    }
  });

  // Add data to the Excel worksheet row-wise
