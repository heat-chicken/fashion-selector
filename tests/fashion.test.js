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

    test('generate image button functionality', async ({page}) => {
        test.setTimeout(60000);
        await expect(page.getByRole('button', {name: 'Generate Image'})).toBeVisible();

        await page.getByLabel('Item').fill('Hat');
        await page.getByLabel('color').fill('Brown');
        await page.getByLabel('style').fill('Bowler');
        await page.getByLabel('features').fill('Leather');
        page.on('request', request => {
            if(request.method() === 'POST'){ 
                console.log('>>', request.method(), '\n', 'req url: ', request.url(), '\n', 'req body: ', request.postData())
            };            
            if(request.method() === 'GET'){
                console.log('>>', request.method(),)
            };
        });
        page.on('response', response => {
            if(response.status() === 200){
                console.log('<<', response.status())
            }
        });
    
        await page.getByRole('button', {name: 'Generate Image'}).click();

        // recieves image as response
        await expect(page.getByAltText('generated')).toBeVisible({ timeout: 15000 });
        await page.getByAltText('generated').screenshot({ path: 'generatedImg.png' });

        // generates yes and no buttons
        await expect(page.getByRole('button', {name: 'yes'})).toBeVisible();
        await expect(page.getByRole('button', {name: 'no'})).toBeVisible();

        // no button sends a second post request and recieves another image
        await page.getByRole('button', {name: 'no'}).click();
        await expect(page.getByAltText('generated')).toBeVisible({ timeout: 15000 });
        await page.getByAltText('generated').screenshot({ path: '2ndgeneratedImg.png' });

        // yes button sends a post request to bing API
        await page.getByRole('button', {name: 'yes'}).click(); 
        await expect(page.getByRole('list')).toBeVisible({ timeout: 15000 });
        // yes no button -- bing search -- save
    })
});

test.describe('Upload Page', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:8080/upload');
    });

    test('prompt form', async ({page}) => {
        await expect(page.getByLabel('Item Description')).toBeEditable();
    });
});
