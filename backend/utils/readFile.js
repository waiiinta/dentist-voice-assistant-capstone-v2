import xlsx from "xlsx"

const readXlsxFile = async (file) => {
	const workbook = xlsx.readFile(file.path);
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
	const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
	var tpose = [];
	for (var i = 0; i < data.length; ++i) {
		for (var j = 0; j < data[i].length; ++j) {
			if (!tpose[j]) tpose[j] = [];
			tpose[j][i] = data[i][j];
		}
	}
  let format = Formatter(tpose)
	return format;
  // return Formatter()
};

const Formatter = async (data) => {
	let format = getFormat();
	//NOTE - Q1
  let q1 = format[0]
	for (let i = 1; i <= 24; i += 3) {
    let teethdata = q1.idxArray[parseInt(i/3)]
    teethdata.ID = parseInt((8-(i/3))+1)
		let col1 = data[i];
		let col2 = data[i + 1];
		let col3 = data[i + 2];
    //if missing
    if(col1[11]){
      teethdata.missing = true
      continue
    }
    //if bridge
    if(col1[7]){
      teethdata.bridge = true
      teethdata.bridge_edge = col1[8]
      if(!col1[8]){
        continue
      }
    }
    //NOTE - PDRE
    teethdata.depended_side_data[0].PD.mesial = col3[4] != null? col3[4]:null
    teethdata.depended_side_data[0].PD.middle = col2[4] != null? col2[4]:null
    teethdata.depended_side_data[0].PD.distal = col1[4] != null? col1[4]:null
    teethdata.depended_side_data[0].RE.mesial = col3[5] != null? col3[5]:null
    teethdata.depended_side_data[0].RE.middle = col2[5] != null? col2[5]:null
    teethdata.depended_side_data[0].RE.distal = col1[5] != null? col1[5]:null

    teethdata.depended_side_data[1].PD.mesial = col3[18] != null? col3[18]:null
    teethdata.depended_side_data[1].PD.middle = col2[18] != null? col2[18]:null
    teethdata.depended_side_data[1].PD.distal = col1[18] != null? col1[18]:null
    teethdata.depended_side_data[1].RE.mesial = col3[19] != null? col3[19]:null
    teethdata.depended_side_data[1].RE.middle = col2[19] != null? col2[19]:null
    teethdata.depended_side_data[1].RE.distal = col1[19] != null? col1[19]:null
  
    //BOP
    teethdata.depended_side_data[0].BOP.mesial = col3[2]? col3[2]:null
    teethdata.depended_side_data[0].BOP.middle = col2[2]? col2[2]:null
    teethdata.depended_side_data[0].BOP.distal = col1[2]? col1[2]:null

    teethdata.depended_side_data[1].BOP.mesial = col3[16]? col3[16]:null
    teethdata.depended_side_data[1].BOP.middle = col2[16]? col2[16]:null
    teethdata.depended_side_data[1].BOP.distal = col1[16]? col1[16]:null
    
    //SUP
    teethdata.depended_side_data[0].SUP.mesial = col3[3]? col3[3]:null
    teethdata.depended_side_data[0].SUP.middle = col2[3]? col2[3]:null
    teethdata.depended_side_data[0].SUP.distal = col1[3]? col1[3]:null

    teethdata.depended_side_data[1].SUP.mesial = col3[17]? col3[17]:null
    teethdata.depended_side_data[1].SUP.middle = col2[17]? col2[17]:null
    teethdata.depended_side_data[1].SUP.distal = col1[17]? col1[17]:null
    //MGJ
    teethdata.MGJ = col1[1]
    //MO
    teethdata.MO = col1[14]
    //crown
    teethdata.crown = col1[9]
    //implant
    teethdata.implant = col1[10]
    //furcation
    if(teethdata.FUR){
      teethdata.FUR.mesial = parseInt(col3[13])
      if (teethdata.FUR.buccal === null){
        teethdata.FUR.buccal = parseInt(col2[12])
        teethdata.FUR.lingual = parseInt(col2[13])
      }
      teethdata.FUR.distal = parseInt(col1[13])
    }
	}
  let q2 = format[1]
	for (let i = 26; i <= 49; i += 3) {
    let teethdata = q2.idxArray[parseInt((i-25)/3)]
    teethdata.ID = parseInt((((i-25)/3))+1)
		let col1 = data[i];
		let col2 = data[i + 1];
		let col3 = data[i + 2];
    //if missing
    if(col1[11]){
      teethdata.missing = true
      continue
    }
    //if bridge
    if(col1[7]){
      teethdata.bridge = true
      teethdata.bridge_edge = col1[8]
      if(!col1[8]){
        continue
      }
    }
    //NOTE - PDRE
    teethdata.depended_side_data[0].PD.mesial = col1[4] != null? col1[4]:null
    teethdata.depended_side_data[0].PD.middle = col2[4] != null? col2[4]:null
    teethdata.depended_side_data[0].PD.distal = col3[4] != null? col3[4]:null
    teethdata.depended_side_data[0].RE.mesial = col1[5] != null? col1[5]:null
    teethdata.depended_side_data[0].RE.middle = col2[5] != null? col2[5]:null
    teethdata.depended_side_data[0].RE.distal = col3[5] != null? col3[5]:null

    teethdata.depended_side_data[1].PD.mesial = col1[18] != null? col1[18]:null
    teethdata.depended_side_data[1].PD.middle = col2[18] != null? col2[18]:null
    teethdata.depended_side_data[1].PD.distal = col3[18] != null? col3[18]:null
    teethdata.depended_side_data[1].RE.mesial = col1[19] != null? col1[19]:null
    teethdata.depended_side_data[1].RE.middle = col2[19] != null? col2[19]:null
    teethdata.depended_side_data[1].RE.distal = col3[19] != null? col3[19]:null
  
    //BOP
    teethdata.depended_side_data[0].BOP.mesial = col1[2]? col1[2]:null
    teethdata.depended_side_data[0].BOP.middle = col2[2]? col2[2]:null
    teethdata.depended_side_data[0].BOP.distal = col3[2]? col3[2]:null

    teethdata.depended_side_data[1].BOP.mesial = col1[16]? col1[16]:null
    teethdata.depended_side_data[1].BOP.middle = col2[16]? col2[16]:null
    teethdata.depended_side_data[1].BOP.distal = col3[16]? col3[16]:null
    
    //SUP
    teethdata.depended_side_data[0].SUP.mesial = col1[3]? col1[3]:null
    teethdata.depended_side_data[0].SUP.middle = col2[3]? col2[3]:null
    teethdata.depended_side_data[0].SUP.distal = col3[3]? col3[3]:null

    teethdata.depended_side_data[1].SUP.mesial = col1[17]? col1[17]:null
    teethdata.depended_side_data[1].SUP.middle = col2[17]? col2[17]:null
    teethdata.depended_side_data[1].SUP.distal = col3[17]? col3[17]:null
    //MGJ
    teethdata.MGJ = col1[1]
    //MO
    teethdata.MO = col1[14]
    //crown
    teethdata.crown = col1[9]
    //implant
    teethdata.implant = col1[10]
    //furcation
    if(teethdata.FUR){
      teethdata.FUR.mesial = parseInt(col1[13])
      if (teethdata.FUR.buccal === null){
        teethdata.FUR.buccal = parseInt(col2[12])
        teethdata.FUR.lingual = parseInt(col2[13])
      }
      teethdata.FUR.distal = parseInt(col3[13])
    }
	}
  let q3 = format[2]
  for (let i = 26; i <= 49; i += 3) {
    let teethdata = q3.idxArray[parseInt((i-25)/3)]
    teethdata.ID = parseInt((((i-25)/3))+1)
		let col1 = data[i];
		let col2 = data[i + 1];
		let col3 = data[i + 2];
    //if missing
    if(col1[34]){
      teethdata.missing = true
      continue
    }
    //if bridge
    if(col1[30]){
      teethdata.bridge = true
      teethdata.bridge_edge = col1[31]
      if(!col1[31]){
        continue
      }
    }
    //NOTE - PDRE
    teethdata.depended_side_data[1].PD.mesial = col1[24] != null? col1[24]:null
    teethdata.depended_side_data[1].PD.middle = col2[24] != null? col2[24]:null
    teethdata.depended_side_data[1].PD.distal = col3[24] != null? col3[24]:null
    teethdata.depended_side_data[1].RE.mesial = col1[23] != null? col1[23]:null
    teethdata.depended_side_data[1].RE.middle = col2[23] != null? col2[23]:null
    teethdata.depended_side_data[1].RE.distal = col3[23] != null? col3[23]:null

    teethdata.depended_side_data[0].PD.mesial = col1[38] != null? col1[38]:null
    teethdata.depended_side_data[0].PD.middle = col2[38] != null? col2[38]:null
    teethdata.depended_side_data[0].PD.distal = col3[38] != null? col3[38]:null
    teethdata.depended_side_data[0].RE.mesial = col1[37] != null? col1[37]:null
    teethdata.depended_side_data[0].RE.middle = col2[37] != null? col2[37]:null
    teethdata.depended_side_data[0].RE.distal = col3[37] != null? col3[37]:null
  
    //BOP
    teethdata.depended_side_data[1].BOP.mesial = col1[25]? col1[25]:null
    teethdata.depended_side_data[1].BOP.middle = col2[25]? col2[25]:null
    teethdata.depended_side_data[1].BOP.distal = col3[25]? col3[25]:null

    teethdata.depended_side_data[0].BOP.mesial = col1[39]? col1[39]:null
    teethdata.depended_side_data[0].BOP.middle = col2[39]? col2[39]:null
    teethdata.depended_side_data[0].BOP.distal = col3[39]? col3[39]:null
    
    //SUP
    teethdata.depended_side_data[1].SUP.mesial = col1[26]? col1[26]:null
    teethdata.depended_side_data[1].SUP.middle = col2[26]? col2[26]:null
    teethdata.depended_side_data[1].SUP.distal = col3[26]? col3[26]:null

    teethdata.depended_side_data[0].SUP.mesial = col1[40]? col1[40]:null
    teethdata.depended_side_data[0].SUP.middle = col2[40]? col2[40]:null
    teethdata.depended_side_data[0].SUP.distal = col3[40]? col3[40]:null
    //MGJ
    teethdata.MGJ = col1[41]
    //MO
    teethdata.MO = col1[28]
    //crown
    teethdata.crown = col1[32]
    //implant
    teethdata.implant = col1[33]
    //furcation
    if(teethdata.FUR){
      teethdata.FUR.mesial = parseInt(col1[36])
      if (teethdata.FUR.buccal === null){
        teethdata.FUR.buccal = parseInt(col2[35])
        teethdata.FUR.lingual = parseInt(col2[36])
      }
      teethdata.FUR.distal = parseInt(col3[36])
    }
	}
  let q4 = format[3]
  for (let i = 1; i <= 24; i += 3) {
    let teethdata = q4.idxArray[parseInt(i/3)]
    teethdata.ID = parseInt((8-(i/3))+1)
		let col1 = data[i];
		let col2 = data[i + 1];
		let col3 = data[i + 2];
    //if missing
    if(col1[34]){
      teethdata.missing = true
      continue
    }
    //if bridge
    if(col1[30]){
      teethdata.bridge = true
      teethdata.bridge_edge = col1[31]
      if(!col1[31]){
        continue
      }
    }
    //NOTE - PDRE
    teethdata.depended_side_data[1].PD.mesial = col3[24] != null? col3[24]:null
    teethdata.depended_side_data[1].PD.middle = col2[24] != null? col2[24]:null
    teethdata.depended_side_data[1].PD.distal = col1[24] != null? col1[24]:null
    teethdata.depended_side_data[1].RE.mesial = col3[23] != null? col3[23]:null
    teethdata.depended_side_data[1].RE.middle = col2[23] != null? col2[23]:null
    teethdata.depended_side_data[1].RE.distal = col1[23] != null? col1[23]:null

    teethdata.depended_side_data[0].PD.mesial = col3[38] != null? col3[38]:null
    teethdata.depended_side_data[0].PD.middle = col2[38] != null? col2[38]:null
    teethdata.depended_side_data[0].PD.distal = col1[38] != null? col1[38]:null
    teethdata.depended_side_data[0].RE.mesial = col3[37] != null? col3[37]:null
    teethdata.depended_side_data[0].RE.middle = col2[37] != null? col2[37]:null
    teethdata.depended_side_data[0].RE.distal = col1[37] != null? col1[37]:null
  
    //BOP
    teethdata.depended_side_data[1].BOP.mesial = col3[25]? col3[25]:null
    teethdata.depended_side_data[1].BOP.middle = col2[25]? col2[25]:null
    teethdata.depended_side_data[1].BOP.distal = col1[25]? col1[25]:null

    teethdata.depended_side_data[0].BOP.mesial = col3[39]? col3[39]:null
    teethdata.depended_side_data[0].BOP.middle = col2[39]? col2[39]:null
    teethdata.depended_side_data[0].BOP.distal = col1[39]? col1[39]:null
    
    //SUP
    teethdata.depended_side_data[1].SUP.mesial = col3[26]? col3[26]:null
    teethdata.depended_side_data[1].SUP.middle = col2[26]? col2[26]:null
    teethdata.depended_side_data[1].SUP.distal = col1[26]? col1[26]:null

    teethdata.depended_side_data[0].SUP.mesial = col3[40]? col3[40]:null
    teethdata.depended_side_data[0].SUP.middle = col2[40]? col2[40]:null
    teethdata.depended_side_data[0].SUP.distal = col1[40]? col1[40]:null
    //MGJ
    teethdata.MGJ = col1[41]
    //MO
    teethdata.MO = col1[28]
    //crown
    teethdata.crown = col1[32]
    //implant
    teethdata.implant = col1[33]
    //furcation
    if(teethdata.FUR){
      teethdata.FUR.mesial = parseInt(col3[36])
      if (teethdata.FUR.buccal === null){
        teethdata.FUR.buccal = parseInt(col2[35])
        teethdata.FUR.lingual = parseInt(col2[36])
      }
      teethdata.FUR.distal = parseInt(col1[36])
    }
	}

  return format
};

const getFormat = () => {
  let q1 = []
  for(let i = 8;i >0;i--){
    q1.push(getTeethFormat(1,i))
  }
  let q2 = []
  for(let i = 1;i <9;i++){
    q2.push(getTeethFormat(2,i))
  }let q3 = []
  for(let i = 1;i <9;i++){
    q3.push(getTeethFormat(3,i))
  }let q4 = []
  for(let i = 8;i > 0;i--){
    q4.push(getTeethFormat(4,i))
  }
	let format = [
		{
			quadrant: 1,
			idxArray: q1,
		},
		{
			quadrant: 2,
			idxArray: q2,
		},
		{
			quadrant: 3,
			idxArray: q3,
		},
		{
			quadrant: 4,
			idxArray: q4,
		},
	];
	return format;
};

const getTeethFormat = (q,i) => {
	let teeth_full_fur = {
		ID: null,
		missing: false,
		depended_side_data: [
			{
				side: "buccal",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
      {
				side: "lingual",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
		],
		MO: null,
		MGJ: null,
		FUR: {
			mesial: null,
			buccal: null,
			lingual: null,
			distal: null,
		},
		crown: null,
		bridge: null,
		implant: null,
		bridge_edge: null,
	};
	let teeth_semi_fur = {
		ID: null,
		missing: false,
		depended_side_data: [
			{
				side: "buccal",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
      {
				side: "lingual",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
		],
		MO: null,
		MGJ: null,
		FUR: {
			mesial: null,
			distal: null,
		},
		crown: null,
		bridge: null,
		implant: null,
		bridge_edge: null,
	};
	let teeth_no_fur = {
		ID: null,
		missing: false,
		depended_side_data: [
			{
				side: "buccal",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
      {
				side: "lingual",
				PD: {
					mesial: null,
					middle: null,
					distal: null,
				},
				RE: {
					mesial: null,
					middle: null,
					distal: null,
				},
				BOP: {
					mesial: null,
					middle: null,
					distal: null,
				},
				SUP: {
					mesial: null,
					middle: null,
					distal: null,
				},
			},
		],
		MO: null,
		MGJ: null,
		crown: null,
		bridge: null,
		implant: null,
		bridge_edge: null,
	};
  if([1,2].includes(q) && [8,7,6].includes(i) || [3,4].includes(q) && [6,7,8].includes(i)){
    return teeth_full_fur
  }
  if([1,2].includes(q) && [4].includes(i)){
    return teeth_semi_fur
  }
  return teeth_no_fur
};

export default readXlsxFile
