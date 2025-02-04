const puppeteer = require("puppeteer");
const fs = require("fs");

const urls = [
   // 프리미엄 펜
   "https://www.monami.com/product/product_list.php?ccode=005",
   "https://www.monami.com/product/product_list.php?ccode=005&pg=2",
 
   // 펜, 펜슬
   "https://www.monami.com/product/product_list.php?ccode=003",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=2",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=3",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=4",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=5",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=6",
   "https://www.monami.com/product/product_list.php?ccode=003&pg=7",
 
   // 마카, 컬러링
   "https://www.monami.com/product/product_list.php?ccode=004",
   "https://www.monami.com/product/product_list.php?ccode=004&pg=2",
   "https://www.monami.com/product/product_list.php?ccode=004&pg=3",
   "https://www.monami.com/product/product_list.php?ccode=004&pg=4",
   "https://www.monami.com/product/product_list.php?ccode=004&pg=5",
   "https://www.monami.com/product/product_list.php?ccode=004&pg=6",
 
   // 노트, 사무용품
   "https://www.monami.com/product/product_list.php?ccode=002",
   "https://www.monami.com/product/product_list.php?ccode=002&pg=2",
   "https://www.monami.com/product/product_list.php?ccode=002&pg=3",
   "https://www.monami.com/product/product_list.php?ccode=002&pg=4",
   "https://www.monami.com/product/product_list.php?ccode=002&pg=5",
 
   // 잉크, 리필
   "https://www.monami.com/product/product_list.php?ccode=001",
];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let existingProductDetails = [];

  // Step 1: Read the existing data from productDetails.json
  try {
    if (fs.existsSync("public/productDetails.json")) {
      const existingData = fs.readFileSync("public/productDetails.json", "utf8");
      existingProductDetails = JSON.parse(existingData);
    }
  } catch (error) {
    console.error("Error reading existing product details:", error);
  }

  // Step 2: Start scraping to get new nibType data
  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector(".product_list");
    let productDivs = await page.$$(".product_list ul li");
    let i = 0;

    while (i < productDivs.length) {
      try {
        productDivs = await page.$$(".product_list ul li");
        const productDiv = productDivs[i];
        await page.evaluate(el => el.scrollIntoView(), productDiv);

        await Promise.all([
          productDiv.click(),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        const currentUrl = page.url();
        const productIdx = currentUrl.split('=').pop();
        const cleanedProductIdx = productIdx.replace(/\D/g, '');

        await page.waitForSelector(".product_info", { visible: true });

        // Fetch the nibType data
        const nibTypeData = await page.evaluate(() => {
          const nibType = Array.from(
            document.querySelectorAll(".p_info .p_info_list .nib_type ul li img")
          ).map(img => img.src);
          return nibType;
        });

        // Find the existing product with the same idx
        const existingProduct = existingProductDetails.find(
          product => product.idx === cleanedProductIdx
        );

        if (existingProduct) {
          // Update the existing product with the new nibType data
          existingProduct.nibType = nibTypeData;
        } else {
          console.warn(`No matching product found for idx: ${cleanedProductIdx}`);
        }

        await page.goBack({ waitUntil: "networkidle2" });
        await page.waitForSelector(".product_list");

        i++;
      } catch (error) {
        console.error(
          "Error during page navigation or element interaction:",
          error
        );
        i++;
      }
    }
  }

  // Step 3: Save the updated data back to productDetails.json
  try {
    fs.writeFileSync("public/productDetails.json", JSON.stringify(existingProductDetails, null, 2));
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error writing to productDetails.json:", error);
  }

  await browser.close();
})();
