exports.teethInformationHandler = (
  obj,
  q,
  i,
  side = NaN,
  mode,
  target,
  spec_id = NaN
) => {
    // console.log(obj,target,side,mode);
  if (obj.quadrant === q) {
    obj.idxArray.map((data) => {
      if (data.ID === i) {
        if (mode === "PD") {
          const newPD = data.depended_side_data.map((checkSide) => {
            if (checkSide.side === side) {
              checkSide.PD[spec_id] = target;
            }
            return checkSide;
          });

          return newPD;
        } else if (mode === "RE") {
          const newRE = data.depended_side_data.map((checkSide) => {
            if (checkSide.side === side) {
              checkSide.RE[spec_id] = target;
            }
            return checkSide;
          });

          return newRE;
        } else if (mode === "BOP") {
          const newBOP = data.depended_side_data.map((checkSide) => {
            if (checkSide.side === side) {
              checkSide.BOP[spec_id] = target;
            }
            return checkSide;
          });
          
          return newBOP;
        } else if (mode === "SUP") { //add
          const newSUP = data.depended_side_data.map((checkSide) => {
            if (checkSide.side === side) {
              checkSide.SUP[spec_id] = target;
            }
            return checkSide;
          });
          
          return newSUP;
        } else if (mode === "MO") {
          data.MO = target;
          return data;
        } else if (mode === "MGJ") {
          data.MGJ = target;
          return data;
        } else if (mode === "Missing") {
          data.missing = target;
          return data;
        } else if (mode === "Crown") { //add 
          if(data.crown){
            data.crown = false
          }else{
            data.crown = target
          }
          return data;
        } else if (mode === "FUR") {
          data.FUR[spec_id] = target
          return data;
        } else if (mode === "Implant") {
          if(data.implant){
            data.implant = false
          }else{
            data.implant = target
          }
          return data;
        }else if (mode === "Bridge") {
          if(data.bridge){
            data.bridge = false
          }else{
            data.bridge = target
          }
          return data;
        }else if(mode === "-"){
          data.bridge = false
          data.crown = false
          data.missing = false
          data.implant = false
        }
      }
      return data;
    });
  }
  return obj;
};
var rand = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateWeighedList = function (list, weight) {
  var weighed_list = [];

  // Loop over weights
  for (var i = 0; i < weight.length; i++) {
    var multiples = weight[i] * 1000;

    // Loop over the list of items
    for (var j = 0; j < multiples; j++) {
      weighed_list.push(list[i]);
    }
  }

  return weighed_list;
};

function getRandomValue(list, weight) {
  var weighed_list = generateWeighedList(list, weight);
  var random_num = rand(0, weighed_list.length - 1);
  return weighed_list[random_num];
}

function randomValue(mode) {
  var list
  var weight
  switch (mode) {
    case "PD":
      list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      weight = [
        0.25, 0.2, 0.15, 0.1, 0.1, 0.05, 0.05, 0.025, 0.025, 0.0125, 0.0125,
        0.00625, 0.00625, 0.00625, 0.00625,
      ];
      return getRandomValue(list, weight);
    case "RE":
      list = [
        -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15,
      ];
      weight = [
        0.01, 0.01, 0.02, 0.05, 0.15, 0.2, 0.2, 0.1, 0.1, 0.05, 0.04, 0.03,
        0.005, 0.005, 0.005, 0.005, 0.005, 0.00375, 0.00375, 0.00375, 0.00375,
      ];
      return getRandomValue(list, weight);
    case "BOP":
      list = [true, false];
      weight = [0.3, 0.7];
      return getRandomValue(list, weight);
    case "MO":
      list = [null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      weight = [
        0.4, 0.25, 0.15, 0.1, 0.03, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01,
      ];
      return getRandomValue(list, weight);
    case "MGJ":
      list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      weight = [0.5, 0.25, 0.15, 0.03, 0.02, 0.01, 0.01, 0.01, 0.01, 0.01];
      return getRandomValue(list, weight);
    case "Missing":
      list = [true, false];
      weight = [0.2, 0.8];
      return getRandomValue(list, weight);
    case "SUP": //add
      list = [];
      weight = [];
      return getRandomValue(list, weight);
    case "Implant": //add
      list = [];
      weight = [];
      return getRandomValue(list, weight);
    case "Crown": //add
      list = [];
      weight = [];
      return getRandomValue(list, weight);
    case "FUR": //add
      list = [];
      weight = [];
      return getRandomValue(list, weight);
    case "Bridge": //add
      list = [];
      weight = [];
      return getRandomValue(list, weight);
    default:
      return null;
  }
}

exports.valueGenarator = (obj) => {
  const mapped_sides = ["distal", "middle", "mesial"];
  obj.idxArray.map((data) => {
    data.missing = randomValue("Missing");

    if (data.missing === false) {
      data.MO = randomValue("MO");
      data.MGJ = randomValue("MGJ");
      data.FUR = randomValue("FUR");
      data.crown = randomValue("Crown");
      data.implant = randomValue("Implant");
      data.bridge = randomValue("Bridge");

      data.depended_side_data.map((checkSide) => {
        mapped_sides.forEach(function (side) {
          checkSide.PD[side] = randomValue("PD");
          checkSide.RE[side] = randomValue("RE");
          checkSide.BOP[side] = randomValue("BOP");
          checkSide.SUP[side] = randomValue("SUP");
        });
      });
    }
    return data;
  });
  return obj;
};
