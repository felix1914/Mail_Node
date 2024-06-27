import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Set up request listener before navigation
  let capturedRequest;
  page.on('request', (request) => {
    if (request.url() === 'https://uatapi.shriramhousing.in/api/v1/website/customer-query' && request.method() === 'POST') {
      capturedRequest = request;
      console.log('Request payload:', request.postData());
    }
  });

  await page.goto('https://uat.shriramhousing.in/raise-a-query');
  await page.getByLabel('Name *').click();
  await page.getByLabel('Name *').fill('jerald');
  await page.getByLabel('Email ID *').click();
  await page.getByLabel('Email ID *').fill('test@gmail.com');
  await page.getByLabel('Mobile Number *').click();
  await page.getByLabel('Mobile Number *').fill('9500255789');
  await page.getByLabel('Subject').click();
  await page.getByText('Subject 1').click();
  await page.getByLabel('Select State').click();
  await page.getByText('Tamil Nadu').click();
  await page.getByLabel('City *').click();
  await page.getByLabel('City *').fill('chennai');
  await page.getByLabel('Feedback / Suggestions *').click();
  await page.getByLabel('Feedback / Suggestions *').fill('testststst');
  await page.getByText('I agree to the Terms and').click();
  await page.locator('#raise-a-query-submit').click();

  // Wait for the response
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.status() == 200 &&
        res.url() === 'https://uatapi.shriramhousing.in/api/v1/website/customer-query'
    ),
  ]);

  if (capturedRequest) {
    console.log('Captured Request payload:', capturedRequest.postData());
  } else {
    console.log("Data Empty");
  }

  console.log('Response:', await response.json());
  // expect(response.ok()).toBeTruthy();
  // expect(response.status()).toBe(200);
});
