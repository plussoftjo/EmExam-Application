import { Dimensions } from "react-native";

// Width,Height
let { width, height } = Dimensions.get("window");

// Models
let Models = {
  window: {
    width: width,
    height: height,
  },
  header: {
    svgHeight: height * 0.4,
    ltrSpace: 70,
    rtlSpace: 300,
  },
  iconSize:{
    width:width / 3,
    height:height / 3
  },
  imageSize:{
    width:width/2.25 ,
    height:height / 4.5
  },
  iconSimple:{
    width:32,
    height:32
  }
};

export default Models;
