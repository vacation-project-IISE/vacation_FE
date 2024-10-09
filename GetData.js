const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// 모나미 사이트에서 데이터 찾기
const GetData = async url => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let cateList = [];
    let ulList = [];

    const $categoryList = $("ul.subcate li");
    const $productList = $("div.product_list ul li");

    $categoryList.each(function (i, elem) {
      cateList[i] = $(this).find("a").text().trim();
    });

    $productList.each(function (i, elem) {
      const href = $(this).find("a").attr("href");
      const ccodeMatch = href.match(/ccode=(\d{3})/); // ccode 뒤의 세 자리 숫자 추출
      const idxMatch = href.match(/idx=(\d+)/); // idx 뒤의 숫자 추출

      ulList[i] = {
        category: $(this).find("div.info div.cate1").text(),
        name: $(this).find("div.info div.product_name").text().trim(),
        url: "https://www.monami.com" + $(this).find("a").attr("href"),
        image_url: $(this).find("div.thum img").attr("src"),
        image_alt: $(this).find("div.info div.product_name").text(),
        code: ccodeMatch ? ccodeMatch[1] : null, // ccode 값이 있으면 할당, 없으면 null
        idx: idxMatch ? idxMatch[1] : null, // idx 값이 있으면 할당, 없으면 null
      };
    });

    // 카테고리 및 제품 목록 반환
    return { categories: cateList, products: ulList.filter(n => n.name) };
  } catch (error) {
    console.log(error);
    return { categories: [], products: [] };
  }
};

// 여러 url에서 가져온 데이터 하나의 json파일로 저장
const fetchAndSaveData = async () => {
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

  const cateurls = [
    "https://www.monami.com/product/product_list.php?ccode=005",
    "https://www.monami.com/product/product_list.php?ccode=003",
    "https://www.monami.com/product/product_list.php?ccode=004",
    "https://www.monami.com/product/product_list.php?ccode=002",
    "https://www.monami.com/product/product_list.php?ccode=001",
  ];

  // 전체 데이터 저장 변수
  let allCategories = {};
  let allProducts = {};

  // 각 URL fetch
  for (let i = 0; i < cateurls.length; i++) {
    const { categories } = await GetData(cateurls[i]);

    allCategories[`data${i + 1}`] = categories;
  }

  // 각 URL fetch
  for (let i = 0; i < urls.length; i++) {
    const { products } = await GetData(urls[i]);

    allProducts[`data${i + 1}`] = products;
  }

  // 하나의 json 파일로 저장
  const result = {
    category: allCategories,
    product: allProducts,
  };

  fs.writeFile(
    "public/MonamiData.json",
    JSON.stringify(result, null, 2),
    err => {
      if (err) throw err;
      console.log("MonamiData.json 저장 완료!");
    }
  );
};

fetchAndSaveData();
