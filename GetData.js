const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// 모나미 사이트에서 데이터 찾기
const GetData = async url => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let ulList = [];
    const $productList = $("div.product_list ul li");

    $productList.each(function (i, elem) {
      ulList[i] = {
        name: $(this).find("div.info div.product_name").text().trim(),
        url: "https://www.monami.com" + $(this).find("a").attr("href"),
        image_url: $(this).find("div.thum img").attr("src"),
        image_alt: $(this).find("div.info div.product_name").text(),
      };
    });

    // 이름이 있는 제품 가져오기
    return ulList.filter(n => n.name);
  } catch (error) {
    console.log(error);
    return [];
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

  // 전체 데이터 저장 변수
  let allData = {};

  // 각 URL fetch
  for (let i = 0; i < urls.length; i++) {
    const data = await GetData(urls[i]);
    allData[`data${i + 1}`] = data; //data1, data2, ... 로 저장
  }

  // 하나의 json 파일로 저장
  fs.writeFile("MonamiData.json", JSON.stringify(allData, null, 2), err => {
    if (err) throw err;
    console.log("MonamiData.json 저장 완료!");
  });
};


fetchAndSaveData();
