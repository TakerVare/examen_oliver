// @ts-check
const { test, expect } = require('@playwright/test');

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('check input name validations', async ({page}) => {
  await page.goto('http://localhost:8080')

  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('');
  await page.getByPlaceholder('Full Name').press('Tab');

  await expect(page.getByText('Username field is invalid!')).toBeVisible();

  await page.getByPlaceholder('Full Name').click();
  await page.getByPlaceholder('Full Name').fill('test a valid name');
  await page.getByPlaceholder('Full Name').press('Tab');

  await expect(page.getByText('Username field is valid!')).toBeVisible();
})


test('check input email validations', async ({page}) => {
  await page.goto('http://localhost:8080')

  const EMAIL_PLACEHOLDER = 'E-mail Address'
  const INVALID_MESSAGE = 'Email field is invalid!'
  const VALID_MESSAGE = 'Email field is valid!'

  // empty value
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).clear()
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).click();
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).fill('');
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE)).toBeVisible();

  // invalid email regex
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).clear()
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).click();
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).fill('test.com');
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE)).toBeVisible();

  await page.getByPlaceholder(EMAIL_PLACEHOLDER).clear()
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).click();
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).fill('test@test');
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE)).toBeVisible();

  // valid email
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).click();
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).fill('test@gmail.com');
  await page.getByPlaceholder(EMAIL_PLACEHOLDER).press('Tab');

  await expect(page.getByText(VALID_MESSAGE)).toBeVisible();
})

test('check country select validations', async ({page}) => {
  await page.goto('http://localhost:8080')

  await page.getByPlaceholder('Country').click();
  await page.getByPlaceholder('Country').fill('istan', { });

  await expect(page.locator('.search-box div')).toHaveCount(6)

  await page.getByPlaceholder('Country').click();
  await page.getByPlaceholder('Country').fill('')
  await page.getByPlaceholder('Country').fill('state');

  await expect(page.locator('.search-box div')).toHaveCount(5)
})

const PASSWORD_PLACEHOLDER = 'Password'
const INVALID_MESSAGE = '%s field is invalid!'
const VALID_MESSAGE = '%s field is valid!'


test('check empty password', async ({page}) => {
  await page.goto('http://localhost:8080')

  // empty value
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).clear()
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).click();
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill('');
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE.replace('%s', 'Password'))).toBeVisible();
})

test('check too short password', async ({page}) => {
  await page.goto('http://localhost:8080')

  // empty value
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).clear()
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).click();
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill('1234');
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE.replace('%s', 'Password'))).toBeVisible();
})

test('check too weak passwords', async ({page}) => {
  await page.goto('http://localhost:8080')

  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).clear()
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).click();
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill('hola_hola_hola');
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE.replace('%s', 'Password'))).toBeVisible();

  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).clear()
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).click();
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill('Hola_hola_hola');
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).press('Tab');

  await expect(page.getByText(INVALID_MESSAGE.replace('%s', 'Password'))).toBeVisible();
})

test('check good passwords', async ({page}) => {
  await page.goto('http://localhost:8080')

  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).clear()
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).click();
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).fill('Hola_hola_hola1');
  await page.getByPlaceholder(PASSWORD_PLACEHOLDER).press('Tab');

  await expect(page.getByText(VALID_MESSAGE.replace('%s', 'Password'))).toBeVisible();
})