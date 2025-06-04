const axios = require('axios');

const API_URL = 'https://fakestoreapi.com/products';

async function testProductAPI() {
    try {
        // Test 1: Verify server response code
        const response = await axios.get(API_URL);
        console.log('\n=== API Response Test ===');
        console.log(`Status Code: ${response.status} ${response.status === 200 ? '✅' : '❌'}`);

        const products = response.data;
        const defectiveProducts = [];

        // Test 2: Validate each product's data
        console.log('\n=== Product Data Validation ===');
        products.forEach(product => {
            const defects = [];

            // Check title
            if (!product.title || product.title.trim() === '') {
                defects.push('Empty title');
            }

            // Check price
            if (product.price < 0) {
                defects.push('Negative price');
            }

            // Check rating
            if (product.rating && product.rating.rate > 5) {
                defects.push('Rating exceeds 5');
            }

            if (defects.length > 0) {
                defectiveProducts.push({
                    id: product.id,
                    title: product.title,
                    defects: defects
                });
            }
        });

        // Display results
        console.log('\n=== Test Results ===');
        console.log(`Total products tested: ${products.length}`);
        console.log(`Products with defects: ${defectiveProducts.length}`);

        if (defectiveProducts.length > 0) {
            console.log('\n=== Defective Products ===');
            defectiveProducts.forEach(product => {
                console.log(`\nProduct ID: ${product.id}`);
                console.log(`Title: ${product.title}`);
                console.log(`Defects found: ${product.defects.join(', ')}`);
            });
        } else {
            console.log('\nNo defects found in the products! ✅');
        }

    } catch (error) {
        console.error('Error testing API:', error.message);
    }
}

// Run the tests
testProductAPI(); 