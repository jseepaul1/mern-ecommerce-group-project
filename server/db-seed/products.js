const Product = require("../models/product.model");
require("dotenv").config();
const mongoose = require("mongoose");
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const ProductCategories = [
  "Jeans",
  "Shirts",
  "Suits",
  "Coats",
  "Dresses",
  "Hoodies",
  "Hats",
  "Shoes",
  "Shorts",
  "Sweaters",
  "Gym clothes",
  "High heels",
  "Skirts",
  "Socks",
  "Tie",
  "Caps",
  "Scarfs",
  "Swimsuits",
  "Pajamas",
];

const ProductCategoryToImagesMap = {
  Jeans: [
    "https://st.mngbcn.com/rcs/pics/static/T2/fotos/S20/27050828_TM_B.jpg?ts=1635170199453&imwidth=412&imdensity=2",
    "https://img.abercrombie.com/is/image/anf/KIC_155-1144-0753-279_prod1?policy=product-medium&wid=350&hei=438",
    "https://cdn.thewirecutter.com/wp-content/media/2021/05/mensjeans-2048px-3784.jpg?auto=webp&quality=75&width=1024",
    "https://pyxis.nymag.com/v1/imgs/9be/0a9/2d1e70fa5dbe9b2d6b489172b87d2cab92-11-denim.rsquare.w700.jpg",
    "https://eu.wrangler.com/on/demandware.static/-/Sites-Wrangler-Library/default/dw9dcb3b8a/fit-guide-men/Men-Straight.jpg",
    "https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7d367981/images/hi-res/21625_ORSD_CS1.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f5f5f5",
  ],
  Shirts: [
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1657740246-pf22_102-1498_ss-tuscumbia-shirt-bd_blue-white_005_1800x.jpg",
    "https://handcmediastorage.blob.core.windows.net/productimages/BB/BBCFC007-N03-163032-500px-650px.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9UsG-IXuXDAitkTONlEbY2cqXGRzxlOhudNz8YxCWergGWP8soOBk7AwXhKOAQXN-xg4&usqp=CAU",
    "https://www.fieldandstream.com/uploads/2019/11/18/MSNPFBFFE5EGFA6PMQE2QMBDKQ.jpg?auto=webp&width=600&crop=16:10,offset-x50",
    "https://pyxis.nymag.com/v1/imgs/20a/04d/d50c95a0c4bf3af0af3772cef516598475-t-shirt-1.2x.h473.w710.jpg",
    "https://images.express.com/is/image/expressfashion/0097_09708945_0031?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
  ],
  Suits: [
    "https://n.nordstrommedia.com/id/sr3/1158d60a-2576-42d9-8b43-fcc1ac19a371.jpeg?h=365&w=240&dpr=2",
    "https://sc04.alicdn.com/kf/HTB16ECaL6DpK1RjSZFrq6y78VXax.jpg",
    "https://dimg.dillards.com/is/image/DillardsZoom/zoom/kasper-notch-lapel-one-button-long-sleeve-seamed-jacket--straight-leg-fly-front-elastic-back-trouser-pants/00000000_zi_20271135.jpg",
    "https://cdn.shopify.com/s/files/1/1874/2805/products/v2rw-15_tan_600x.jpg?v=1574049995",
    "https://cdn.walletmonitor.com/img/cdf8a367bd5d2bd8914fbf761f898b36.jpg",
    "https://corporette.com/wp-content/uploads/2019/05/suits-for-women-2020.jpg",
  ],
  Coats: [
    "https://i.pinimg.com/236x/b5/29/ea/b529ea9bf4b166511aaf71aa473acaa9--mens-fall-jackets-mens-coats-and-jackets.jpg",
    "https://cdn.laredoute.com/products/a/7/7/a77a27545d9b39c6d935cfa8c32667b7.jpg?imgopt=twic&twic=v1/resize=300",
    "https://n.nordstrommedia.com/id/sr3/a20d2701-7f69-42e6-ac2c-d2bcbe8d8e32.jpeg?h=365&w=240&dpr=2",
    "https://i.insider.com/527a8ca3ecad045760a24805?width=600&format=jpeg&auto=webp",
    "https://media.cntraveler.com/photos/61ddbfa8b03a2467a2e0765c/master/w_2100,h_1500,c_limit/Best%20Winter%20Coats%20for%20Women-2022_Calvin%20Klein%20Mid-Length%20Coat.jpg",
    "https://images.bloomingdalesassets.com/is/image/BLM/products/7/optimized/11652597_fpx.tif?$2014_BROWSE_FASHION$&fmt=jpeg&op_usm=0.7,1.0,0.5,0&resMode=sharp2&qlt=85,0&wid=280&hei=350",
  ],
  Dresses: [
    "https://cdn.shopify.com/s/files/1/0011/9783/4252/products/WhatsApp_Image_2019-07-25_at_1.06.36_PM_1_900x.jpeg?v=1598391125",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_TEZtMrGLua4GG7gM5PJ0YuqKZYOZfTumGw&usqp=CAU",
    "https://www.brides.com/thmb/Ygm4u4ypGUThq0PnuVpXhCrto-Y=/1000x1000/smart/filters:no_upscale()/BRIDES-23-best-places-to-buy-bridesmaids-dresses-online-4783902-7ca9b1dad4c94f8ba53c579715891797.gif",
    "https://n.nordstrommedia.com/id/sr3/c93381a3-cea5-4ce1-94ec-e757e9de12c2.jpeg?h=365&w=240&dpr=2",
    "https://www.telegraph.co.uk/content/dam/fashion/2022/07/08/dresses-with-sleeves_trans_NvBQzQNjv4BqgCXocDQF5kP7s3jSjli3eCH0-jRUT4rHK8EgtaGoQwQ.jpg?imwidth=480",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/51mhkzax8wl-ac-sx-ux-sy-uy-1647457762.jpg",
  ],
  Hoodies: [
    "https://assets.burberry.com/is/image/Burberryltd/1ACA1940-E420-42FB-B753-9FBDC80F2EEC?$BBY_V2_SL_3x4$&wid=1278&hei=1700",
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1641834269-bingerlilly-sweatshirt-1641834265.jpg?crop=1xw:1xh;center,top&resize=480:*",
    "https://m.media-amazon.com/images/I/51GnVvWnxcL._UL1000_.jpg",
    "https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/cache=expiry:max/rotate=deg:exif/resize=width:2400,fit:crop/output=quality:70/compress/https://process.fs.grailed.com/dMLJQ4NRTPyLSCHTs1GH",
    "https://i5.walmartimages.com/asr/f908ad7a-9197-4f00-8fbd-1803b3775f53.1836b3d02b6e9ba56694f4d994617d2e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://columbia.scene7.com/is/image/ColumbiaSportswear2/1992911_362_f?$x1_grid$&v=1642418206",
  ],
  Hats: [
    "https://www.hutstuebele.com/pic/Elegant-hat-for-women.44324a.jpg",
    "https://cdn.shopify.com/s/files/1/0397/0396/9949/files/ALL-WOMEN_S-HATS4_1600x.jpg?v=1655998297",
    "https://www.travelandleisure.com/thmb/rSNOtm5AZ94xwvA_KJUKIgkgFow=/1333x1000/smart/filters:no_upscale()/best-packable-summer-hats-tout-AMZN-NORDSTROM-REI-HATS0522-be9318b34ebd43d9b84cab627aedaf96.jpg",
    "https://cdn.shopify.com/s/files/1/0452/4205/collections/Homepage_Images_grande.png?v=1627498004",
    "https://media.gq-magazine.co.uk/photos/5dceb09dc62d9b0008fc8fc8/master/pass/HATS_Untitled-1.jpg",
    "https://www.highsnobiety.com/static-assets/thumbor/Ua_O7LZcZm3zTaLMcTjWBe2ZSLU=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2020/07/23100120/caps-main1.jpg",
  ],
  Shoes: [
    "https://media.kohlsimg.com/is/image/kohls/2022-112715-womens-shoes-nav1",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2022_19/1869508/light-weight-shoes-2x1-vl-220509.jpg",
    "https://www.travelfashiongirl.com/wp-content/uploads/2021/07/best-orthopedic-shoes-for-women-cover-image-2.jpeg",
    "https://media.gq.com/photos/6255b8d18f61b2696fee345d/master/pass/shoes.jpg",
    "https://manofmany.com/wp-content/uploads/2015/03/Santoni-WIlson-Leather-Oxford.jpg",
    "https://cdn.hiconsumption.com/wp-content/uploads/2017/03/Best-Dress-Shoes-For-Men.jpg",
  ],
  Shorts: [
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lounge-shorts-1617725210.jpg?crop=1xw:1xh;center,top&resize=1200:*",
    "https://media.gq.com/photos/60ef3e4f7e86169f489ff5c7/master/w_2000,h_1334,c_limit/kahki.jpg",
    "https://www.byrdie.com/thmb/CCFRnDjKf5GBwh6qOeGooR3Z8wg=/640x640/smart/filters:no_upscale()/TheA-LineDenimShort-bfc3165a130742f59ab31ecd5a30f3d0.jpg",
    "https://cdn.shopify.com/s/files/1/1367/5207/products/ARRIVAL7_SHORTS_A1A2G-BBBB-M-BY1_BLACK_.A-EditTIFF_IS.jpg?v=1644335076",
    "https://n.nordstrommedia.com/id/sr3/339fc004-3754-4abc-9167-bbcfc630f3f3.jpeg?h=365&w=240&dpr=2",
    "https://images.dickssportinggoods.com/is/image/dkscdn/22CA2WCLWKNDSHRTXWAA_Ardosia_Slate_is/?wid=252&hei=252&qlt=85,0&fmt=jpg&op_sharpen=1",
  ],
  Sweaters: [
    "https://www.technobuffalo.com/sites/technobuffalo.com/files/field/image/2019/12/h2h_slim_fit_pullover_sweater.jpg?itok=eSKUdLCp",
    "https://n.nordstrommedia.com/id/sr3/2631eb37-d36e-451d-96b9-5bf6281874ef.jpeg?h=365&w=240&dpr=2",
    "https://flyingcdn-942385.b-cdn.net/wp-content/uploads/2018/11/Types-of-Sweaters-For-Guys-sized-pull3.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-720w,f_auto,q_auto:best/newscms/2021_32/1760932/51efgtbzuol-sl500--611567d716695.jpg",
    "https://n.nordstrommedia.com/id/sr3/af271686-8585-4c7e-90cf-0e1113ba7a2d.jpeg?h=365&w=240&dpr=2",
    "https://image.made-in-china.com/2f0j00mJstYfQSAdzi/Women-s-Sweaters-Knitted-Dress-Fashion-Ripped-Design-Long-Pullover.jpg",
  ],
  "Gym clothes": [
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d77cfdec-21ee-46c6-bebf-58a3c0d94c67/dri-fit-one-luxe-womens-mid-rise-printed-training-leggings-g3Mvnt.png",
    "https://images.asos-media.com/products/nike-pro-training-365-cropped-leggings-in-black/202771466-1-black?$n_480w$&wid=476&fit=constrain",
    "https://pyxis.nymag.com/v1/imgs/88f/4f1/e7b6d098e8b4a477e21f46cb854df7099e-workout-gear-11.rsquare.w600.jpg",
    "https://i5.walmartimages.com/asr/7f11fcb1-abb3-44bd-aa73-0dc6019afe23.0a41eb96ae86b40b9621259deb7e9011.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
    "https://media-cdn.tripadvisor.com/media/photo-s/1b/86/fd/04/wwwclzlistcom-contact.jpg",
    "https://cdn.shopify.com/s/files/1/0365/1893/products/breatheasyr-training-shorts-grey_1024x.jpg?v=1659708209",
  ],
  "High heels": [
    "https://360view.hum3d.com/zoom/Tools/High_Heels_Shoes_1000_0002.jpg",
    "https://image-ie.s3.eu-west-1.amazonaws.com/uploads/2018/04/27125034/SS17-DetailM-00951.jpg",
    "https://img.joomcdn.net/5fd225465220009d7120ae8c61735a8bc94bb37d_original.jpeg",
    "https://img.jakpost.net/c/2018/12/06/2018_12_06_60228_1544086319._large.jpg",
    "https://media.glamour.com/photos/5f2231a0deb947f343d493d3/1:1/w_2560%2Cc_limit/bc083842-f96d-439e-8a66-cd3c9be8aa4b.jpg",
    "https://media.istockphoto.com/photos/red-high-heels-shoes-front-and-side-view-picture-id157404152?k=20&m=157404152&s=170667a&w=0&h=venrVDSPaNr7X3S4AjWHOBQrSMCG4qcMdh6iZx3iTQE=",
  ],
  Skirts: [
    "https://upload.wikimedia.org/wikipedia/commons/9/96/COLLECTIE_TROPENMUSEUM_Rok_met_panoramische_beschildering_van_Indonesisch_landschap_TMnr_6217-7.jpg",
    "https://img.ltwebstatic.com/images2_pi/2019/07/12/15629164243969762281.webp",
    "https://www.esprit.eu/dw/image/v2/BDSS_PRD/on/demandware.static/-/Sites-esprit-master/default/dw1eeb8bb9/images/20/992/992EO1D301_420_20.jpg?sfrm=jpg&sw=700&sh=1050&sm=fit",
    "https://n.nordstrommedia.com/id/sr3/0fabb432-6ac3-4957-99a2-5ea67cbe7538.jpeg?h=365&w=240&dpr=2",
    "https://cdn.shopify.com/s/files/1/0455/9827/7796/products/MH022B-Z335S07100Z261_1_533x.jpg?v=1660057038",
    "https://www.jilsander.com/dw/image/v2/BDHN_PRD/on/demandware.static/-/Sites-master-catalog/default/dw6de59f6e/images/large/22I/J02MA0014_J14509_468_000.jpg?sw=543&sh=814",
  ],
  Socks: [
    "https://m.media-amazon.com/images/I/81DD+K23t-L._AC_UY445_.jpg",
    "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/3679563_fpx.tif?op_sharpen=1&wid=700&hei=855&fit=fit,1",
    "https://footwearnews.com/wp-content/uploads/2020/06/bonangel-socks.jpg",
    "https://m.media-amazon.com/images/I/81whehIia8S._AC_UL1500_.jpg",
    "https://www.famousfootwear.com/blob/product-images/20000/53/76/6/53766_right_large.jpg",
    "https://images.dsw.com/is/image/DSWShoes/526322_999_ss_01?impolicy=colpg&imwidth=400&imdensity=1",
  ],
  Tie: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP11lFZnghSYzOnWllHoMwgXlKCVPK7J0SQ_I9cofB3Rhh4DzFV2nb35c66LdZXryaTGw&usqp=CAU",
    "https://i.ebayimg.com/thumbs/images/g/zKEAAOSwnNVixwTz/s-l300.jpg",
    "https://rlv.zcache.com/womens_suffrage_movement_memorabilia_collage_print_neck_tie-r9e2d143f452349e5a1c0b1e5c34ee992_6tei7_307.jpg?rlvnet=1",
    "https://ae01.alicdn.com/kf/HTB1jEFyADJYBeNjy1zeq6yhzVXao/Men-Tie-Business-8CM-Striped-Necktie-Mens-Wedding-Parties-Dress-Jacquard-Ties-bowtie-Cravats-Accessories-gravatas.jpg",
    "https://sarahscoop.com/wp-content/uploads/2022/08/The-Top-100-Best-Luxury-Brands-For-Mens-Ties.jpg",
    "https://cdn.shopify.com/s/files/1/1915/8837/collections/Ties-Classy-Men-Collection.jpg?v=1571477584",
  ],
  Caps: [
    "https://images-na.ssl-images-amazon.com/images/I/61J03Z2c+fL._AC_UL600_SR600,400_.jpg",
    "https://ae01.alicdn.com/kf/H3b6c6a0d2bbf46d0abdbdedf1ce1d6b73/New-Brand-Cool-Cap-Men-Summer-Black-Baseball-Cap-Men-Women-Tracker-Caps-Men-Snapback-Women.jpg",
    "https://m.media-amazon.com/images/I/61QmA+fRAqL._AC_UL320_.jpg",
    "https://assets.vogue.com/photos/616f0b3832e6aee08ea490ef/1:1/w_1013,h_1013,c_limit/slide_17.jpg",
    "https://picture-cdn.wheretoget.com/2aw8yj-l-610x610-hat-cap-pink-white-black-kitty-trendy-teenagers-cool-summer-spring-beautifulhalo.jpg",
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/cec3436d-add5-4ad7-a0a0-3469fe54c1ad/dri-fit-adv-aerobill-heritage86-womens-perforated-golf-hat-FrnW33.png",
  ],
  Scarfs: [
    "https://www.yogajournal.com/wp-content/uploads/2020/01/81v0kso8akl_ux679_.jpg",
    "https://n.nordstrommedia.com/id/sr3/7d555027-6c62-4181-9d3c-14efb0bb5c74.jpeg?h=365&w=240&dpr=2",
    "https://media.neimanmarcus.com/f_auto,q_auto:low,ar_2:3,c_fill,dpr_1.0,w_380/01/nm_4210692_100244_k",
    "https://dimg.dillards.com/is/image/DillardsZoom/nav2/eileen-fisher-crinkle-pleated-silk-scarf/00000000_zi_90d0e620-1551-4117-8d0f-3b21081c9481.jpg",
    "https://n.nordstrommedia.com/id/sr3/928fe23d-1174-4c01-853c-12c5a59222ea.jpeg?h=365&w=240&dpr=2",
    "https://www.rd.com/wp-content/uploads/2021/12/Best-winter-scarves-for-women_via-retailers-4.jpg",
  ],
  Swimsuits: [
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1645040827-caef1e85-5940-435a-a267-1abaf088287d.jpg?crop=1xw:1xh;center,top&resize=480:*",
    "https://assets.vogue.com/photos/6260692bb3a7639562aabb97/1:1/w_2667,h_2667,c_limit/slide_33.jpg",
    "https://i5.walmartimages.com/asr/21fb68b6-e6d9-46dc-9dc8-d56d3c8f7739_1.0f4132fd9d39ef396f8d067e121562ec.jpeg",
    "https://pyxis.nymag.com/v1/imgs/2ef/764/bf9098badaea6668b6410fa98ea185789b-bic-swim-trunks.rsquare.w700.jpg",
    "https://media.gq.com/photos/623b4b5532b88720ca867662/master/w_2000,h_1333,c_limit/Frescobol-Carioca-Copacabana-atlantico-print-swim-shorts.jpg",
    "https://www.rei.com/media/cff671e6-44d0-4165-a14c-85e8f2727261.jpg",
  ],
  Pajamas: [
    "https://media.allure.com/photos/622f993a1a4cc434e3413372/1:1/w_2392,h_2392,c_limit/Nordstrom%20Moonlight%20Pajamas.jpg",
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1632422995-amazon-essential-pajamas-for-women-1632422930.jpg?crop=1xw:1xh;center,top&resize=480:*",
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1599067937-31Y90Kh7r3L.jpg?crop=0.889xw:1xh;center,top&resize=480:*",
    "https://media.kohlsimg.com/is/image/kohls/mens-sleepwear-hs-20200323-men-sleep-vn-1?scl=1&fmt=pjpeg",
    "https://www.picclickimg.com/d/l400/pict/361412024023_/Mens-Lounge-PJ-Pyjamas-Sets-Night-Wear-PJs.jpg",
    "https://www.picclickimg.com/d/l400/pict/361412024023_/Mens-Lounge-PJ-Pyjamas-Sets-Night-Wear-PJs.jpg",
  ],
};

const dbSeed = async () => {
  try {
    // Step 1 - Connect to the DB
    const mongoClient = await mongoose.connect(process.env.MONGO_URI);
    // console.log("Successfully connected to Mongo DB - ");

    for (let i = 0; i < 100; i++) {
      // console.log("==================");
      // console.log(`Product #${i + 1}`);
      // console.log("==================");
      // Step 2 - Get a random product price
      const price = Math.ceil(Math.random() * 80) + 20;

      // Step 3 - Get a random product category
      const category =
        ProductCategories[
          Math.ceil(Math.random() * ProductCategories.length - 1)
        ];

      // Step 4 - Get a random product names using LoremIpsum library
      const randomProductNameWordsCount = Math.ceil(Math.random() * 4) + 2;
      const productNameLowerCase = lorem.generateWords(randomProductNameWordsCount);
      const productName = productNameLowerCase.charAt(0).toUpperCase() + productNameLowerCase.slice(1);

      // Step 5 - Get random description sentences using LoremIpsum library
      const randomProductDescriptionSentencesCount = Math.ceil(
        Math.random() * 4
      );
      const description = lorem.generateSentences(
        randomProductDescriptionSentencesCount
      );

      // Step 6 - Get a random image URL based on the product category
      const imagesList = ProductCategoryToImagesMap[`${category}`];
      const image =
        imagesList[Math.ceil(Math.random() * imagesList.length - 1)];

      // Step 7 - Generate the object based on Item model to insert into DB
      const item = {
        productName,
        price,
        category,
        description,
        image,
      };
      // console.log("Item generated for DB insert - ", item);
      const newProduct = await Product.create({
        ...item,
      });
      // console.log("Item inserted to DB - ", newProduct);
      // console.log("==================");
    }
  } catch (err) {
    // console.log("Error while seeding DB - ", err);
  }
};

dbSeed();
// console.log('After dbSeed()')
