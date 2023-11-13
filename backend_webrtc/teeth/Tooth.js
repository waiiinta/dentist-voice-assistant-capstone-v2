class Tooth {
  constructor(ID, quadrant) {
    this.ID = ID;
    this.quadrant = quadrant;
    this.missing = false;
    this.implant = false;
    this.crown = false;
    this.start_end_bridge = null; // for ex. Bridge 16 to 18; Tooth 16,17,18 will have this.start_end_bridge = (16,18)

    this.PD = {
      buccal: { distal: null, buccal: null, mesial: null },
      lingual: { distal: null, lingual: null, mesial: null },
    };

    this.RE = {
      buccal: { distal: null, buccal: null, mesial: null },
      lingual: { distal: null, lingual: null, mesial: null },
    };

    this.BOP = {
      buccal: { distal: null, buccal: null, mesial: null },
      lingual: { distal: null, lingual: null, mesial: null },
    };
    
    this.SUP = {
      buccal: { distal: null, buccal: null, mesial: null },
      lingual: { distal: null, lingual: null, mesial: null },
    }

    this.FUR = {
      buccal: null, distal: null, lingual: null, mesial: null
    }

    this.MO = null;
    this.MGJ = null;
  }

  exportValue() {
    const toothSides = ["buccal", "lingual"];
    let result = [];
    toothSides.forEach((toothSide) => {
      result.push({
        side: toothSide,
        PD: {
          mesial: this.PD[toothSide]["mesial"],
          middle: this.PD[toothSide][toothSide],
          distal: this.PD[toothSide]["distal"],
        },
        RE: {
          mesial: this.RE[toothSide]["mesial"],
          middle: this.RE[toothSide][toothSide],
          distal: this.RE[toothSide]["distal"],
        },
        BOP: {
          mesial: this.BOP[toothSide]["mesial"],
          middle: this.BOP[toothSide][toothSide],
          distal: this.BOP[toothSide]["distal"],
        },
        SUP: {
          mesial: this.SUP[toothSide]["mesial"],
          middle: this.SUP[toothSide][toothSide],
          distal: this.SUP[toothSide]["distal"],
        }
      });
    });
    return {
      ID: this.ID,
      missing: this.missing,
      implant: this.implant,
      crown: this.crown,
      start_end_bridge: this.start_end_bridge,
      depended_side_data: result,
      MO: this.MO,
      MGJ: this.MGJ,
      FUR: this.FUR,
    };
  }

  importValue(toothData) {
    const commands = ["PD", "RE", "BOP", "SUP"];
    let result = {};
    commands.forEach((command) => {
      result[command] = {
        buccal: {
          distal: toothData.depended_side_data[0][command]["distal"],
          buccal: toothData.depended_side_data[0][command]["middle"],
          mesial: toothData.depended_side_data[0][command]["mesial"],
        },
        lingual: {
          distal: toothData.depended_side_data[1][command]["distal"],
          lingual: toothData.depended_side_data[1][command]["middle"],
          mesial: toothData.depended_side_data[1][command]["mesial"],
        },
      };
    });
    this.missing = toothData.missing;
    this.implant = toothData.implant;
    this.crown = toothData.crown;
    this.start_end_bridge = toothData.start_end_bridge;
    this.PD = result.PD;
    this.RE = result.RE;
    this.BOP = result.BOP;
    this.SUP = result.SUP;
    this.MO = toothData.MO;
    this.MGJ = toothData.MGJ;
    this.FUR = toothData.FUR;
    return;
  }
}

module.exports = Tooth;