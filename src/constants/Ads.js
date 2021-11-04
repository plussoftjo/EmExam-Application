let dev = false;

// let Ads = {
//     android:{
//         QuestionsAds:dev ?"ca-app-pub-3940256099942544/1033173712":"ca-app-pub-8749426160957410/6678249911",
//     },
//     ios:{
//         QuestionsAds:dev ? "ca-app-pub-3940256099942544/4411468910":"ca-app-pub-8749426160957410/8538126491",
//     }
// }

let Ads = {
  android: {
    QuestionsAds: dev
      ? "VID_HD_16_9_46S_LINK#1970270336481309_1971966762978333"
      : "1970270336481309_1971966762978333",
  },
  ios: {
    QuestionsAds: dev
      ? "VID_HD_16_9_46S_LINK#1970270336481309_1971966639645012"
      : "1970270336481309_1971966639645012",
  },
};

export default Ads;
