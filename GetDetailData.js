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
  // 브라우저 열기
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const productDetails = [];

// 파일을 다시 쓰지 않고 수정 시 추가되도록
  try {
    if (fs.existsSync("public/productDetails.json")) {
      const existingData = fs.readFileSync("public/productDetails.json", "utf8");
      productDetails = JSON.parse(existingData);
    }
  } catch (error) {
    console.error("Error reading existing product details:", error);
  }

  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle2" });

    // 제품 리스트
    await page.waitForSelector(".product_list");

    // 모든 제품 가져오기
    let productDivs = await page.$$(".product_list ul li");
    let i = 0; // 반복을 위한 i 변수

    while (i < productDivs.length) {
      try {
        // re-fetch
        productDivs = await page.$$(".product_list ul li");

        // 현재 div 설정
        const productDiv = productDivs[i];

        // 스크롤을 통해 클릭 가능한지 확인
        await page.evaluate(el => el.scrollIntoView(), productDiv);

        // 제품 클릭 후 상세페이지로 이동
        await Promise.all([
          productDiv.click(),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        // 제품 인덱스를 가져오기 위해 url의 '=' 뒷부분을 가져옴
        const currentUrl = page.url();
        const productIdx = currentUrl.split('=').pop();

        const cleanedProductIdx = productIdx.replace(/\D/g, '');

        // 디테일 페이지 로딩 대기
        await page.waitForSelector(".product_info", { visible: true });

        // 제품 상세 데이터 가져오기
        const productData = await page.evaluate(() => {
          const name =
            document.querySelector(".p_info .p_name .pname")?.innerText || "";
          const keyFeatures =
            document.querySelector(".p_info .p_info_list .key_features ol li")
              ?.innerText || "";
          const imageUrl = document.querySelector(".p_gall ul li img")?.src || "";
          const images = Array.from(
            document.querySelectorAll(".thum_wrap ul li a img")
          ).map(img => img.src);
          const inkColorList = Array.from(
            document.querySelectorAll(
              ".p_info .p_info_list .ink_color .color_lists ul li img"
            )
          ).map(img => img.src);
          const bodyColorList = Array.from(
            document.querySelectorAll(
              ".p_info .p_info_list .body_color .color_lists ul li img"
            )
          ).map(img => img.src);
          const pointSize =
            document.querySelector(".p_info .p_info_list .point_size p")
              ?.innerText || "";
          const nibType = Array.from(
            document.querySelectorAll(
              ".p_info .p_info_list .nib_type ul li img"
            )
          ).map(img => img.src); 
          return {
            name,
            imageUrl,
            images,
            keyFeatures,
            inkColorList,
            bodyColorList,
            pointSize,
            nibType
          };
        });

        // 인덱스까지 데이터에 추가
        productData.idx = cleanedProductIdx;

        // array에 데이터 넣기
        productDetails.push(productData);

        // 다시 제품 목록 페이지로 돌아감 
        await page.goBack({ waitUntil: "networkidle2" });

        // 제품 목록 페이지 로딩 대기
        await page.waitForSelector(".product_list");

        // 다음 제품으로 이동 !!! (드디어 됐다ㅠㅡㅠ)
        i++;
      } catch (error) {
        console.error(
          "Error during page navigation or element interaction:",
          error
        );
        i++; // 무한 루프 방지 (while문)
      }
    }
  }

  // json파일로 저장
  fs.writeFileSync("public/productDetails.json", JSON.stringify(productDetails, null, 2));

  console.log("데이터 저장 완료!");

  // 브라우저 닫기
  await browser.close();
})();