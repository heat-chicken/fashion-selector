const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080/');
      });

    test('has image carousel', async ({ page }) => {
        await expect(page.getByRole('img', { name: 'carousel' })).toBeVisible();
    });
  
    test('discover your style button is functional', async ({ page }) => {
        //test button redirects to search page
        //Right now, it's testing this by looking for a unique element on the second page, it's not testing a "successful redirect"
        await page.getByRole('button', { name: 'Discover Your Style!' }).click();
        await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible(); 
    });

    test('search button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'Search'}).click();
        await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
    });

    test('upload button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'Upload'}).click();
        await expect(page.getByRole('heading', { name: 'Discover Your Style' })).toBeVisible();
    });

    test('about button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'About'}).click();
        await expect(page.getByRole('heading', { name: 'About Fashion Selector' })).toBeVisible();
    });

    test('login button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'Login'}).click();
        await expect(page.getByRole('link', {name: 'Forgot password?'})).toBeVisible();
    })

    test('Sign Up button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'Sign Up'}).click();
        await expect(page.getByRole('link', {name: 'Already have an account? Sign in'})).toBeVisible();
    })

    test('Settings button is functional', async ({page}) => {
        await page.getByRole('button', {name: 'Open settings'}).hover();
        await expect(page.getByText('Open settings')).toBeVisible();

        await page.getByRole('button', {name: 'Open settings'}).click();
        await expect(page.getByText('Dashboard')).toBeVisible();
    })
})

test.describe('Search Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080/search');
      });

    //test all fields in form are editable
    test('style form', async ({ page }) => {
        const labels = ['Item', 'color', 'style', 'features'];
        for (const label of labels) {
            await expect(page.getByLabel(label)).toBeEditable();
        }
    })

    test('generate image button submits POST request & recieves image as response', async ({page}) => {
        await expect(page.getByRole('button', {name: 'Generate Image'})).toBeVisible();

        await page.getByLabel('Item').fill('Hat');
        await page.getByLabel('color').fill('Brown');
        await page.getByLabel('style').fill('Bowler');
        await page.getByLabel('features').fill('Leather');
        page.on('request', request => console.log('>>', request.method(), request.url(), 'req body: ', request.postData()));
        page.on('response', response => console.log('<<', response.status(), response.url()));
        await page.getByRole('button', {name: 'Generate Image'}).click();
        await expect(page.getByAltText('generated')).toBeVisible({ timeout: 15000 });
        await page.getByAltText('generated').screenshot({ path: 'generatedImg.png' });
    })

    // test('testing .route', async({page})=> {
    //     const mockData = {
    //         "Item": 'Hat',
    //         "color": 'Brown',
    //         "style": 'Bowler',
    //         "features": 'Leather'
    //     };
    //     let mock;
    //     await page.route('/api/genImage', async route => {
    //         if (route.request().postData().includes('Item'))
    //           mock = await route.fulfill({ body: {mockData} });
    //         else
    //           await route.continue();
    //     });
    //     console.log('mock: ', mock.body)
    // })


   // test.describe('API tests', () => {
        // let apiContext;
        // test.beforeAll(async ({ playwright }) => {
        //     apiContext = await playwright.request.newContext({
        //       // All requests we send go to this API endpoint.
        //       baseURL: 'https://api.openai.com/',
        //       extraHTTPHeaders: {
        //         // We set this header per GitHub guidelines.
        //         'Accept': 'v1/images',
        //         // Add authorization token to all requests.
        //         // Assuming personal access token available in the environment.
        //         'Authorization': `token ${process.env.OPENAI_API_KEY}`,
        //       },
        //     });
        // });

        // test.afterAll(async ({ }) => {
        //     // Dispose all responses.
        //     await apiContext.dispose();
        // });

        // test('make post request', async ({ page }) => {
        //     const newImage = await apiContext.post(`/images/generations`, {
        //       prompt: 'Create an image of the american flag'
        //     });
        //     expect(newImage.ok()).toBeTruthy();
        // });

       // test('Generate Image Button submits POST request', async ({page}) => {
            

        //})
    //});
});

test.describe('Upload Page', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:8080/upload');
    });

    test('prompt form', async ({page}) => {
        await expect(page.getByLabel('Item Description')).toBeEditable();
    });
});
