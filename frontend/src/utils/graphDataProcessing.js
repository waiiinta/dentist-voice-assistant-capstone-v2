const graphDataProcessing = (data) =>{
  // console.log(data)
  let buccals = {
    q12:[],
    q34:[]
  }
  let linguals = {
    q12:[],
    q34:[]
  }
  let res = []
  for(let q = 1;q <=4;q++){
    let q_data = data[q-1].idxArray
    // console.log(data[q-1].quadrant,q_data)
    let pd_buc = []
    let re_buc = []
    let pd_lin = []
    let re_lin = []
    for(let idx = 0; idx <8;idx++){
      let idx_data = q_data[idx].depended_side_data
      let buccal = idx_data[0].side === "buccal"? idx_data[0]:idx_data[1]
      let lingual = idx_data[0].side === "buccal"? idx_data[1]:idx_data[0]
      let pd_b = buccal.PD
      let re_b = buccal.RE
      let pd_l = lingual.PD
      let re_l = lingual.RE
      if ([1,4].includes(q)){
        if(q == 1){
          //buccal
          pd_buc = pd_buc.concat([
            [idx*3+1,pd_b.distal? pd_b.distal:0],
            [idx*3+2,pd_b.middle? pd_b.middle:0],
            [idx*3+3,pd_b.mesial? pd_b.mesial:0]
          ])
          re_buc = re_buc.concat([
            [idx*3+1,re_b.distal? -re_b.distal:0],
            [idx*3+2,re_b.middle? -re_b.middle:0],
            [idx*3+3,re_b.mesial? -re_b.mesial:0]
          ])

          //lingual
          pd_lin = pd_lin.concat([
            [idx*3+1,pd_l.distal? pd_l.distal:0],
            [idx*3+2,pd_l.middle? pd_l.middle:0],
            [idx*3+3,pd_l.mesial? pd_l.mesial:0]
          ])
          re_lin = re_lin.concat([
            [idx*3+1,re_l.distal? -re_l.distal:0],
            [idx*3+2,re_l.middle? -re_l.middle:0],
            [idx*3+3,re_l.mesial? -re_l.mesial:0]
          ])

        }else{
          //buccal
          pd_buc = pd_buc.concat([
            [idx*3+1,pd_b.distal? -pd_b.distal:0],
            [idx*3+2,pd_b.middle? -pd_b.middle:0],
            [idx*3+3,pd_b.mesial? -pd_b.mesial:0]
          ])
          re_buc = re_buc.concat([
            [idx*3+1,re_b.distal? re_b.distal:0],
            [idx*3+2,re_b.middle? re_b.middle:0],
            [idx*3+3,re_b.mesial? re_b.mesial:0]
          ])

          //lingual
          pd_lin = pd_lin.concat([
            [idx*3+1,pd_l.distal? -pd_l.distal:0],
            [idx*3+2,pd_l.middle? -pd_l.middle:0],
            [idx*3+3,pd_l.mesial? -pd_l.mesial:0]
          ])
          re_lin = re_lin.concat([
            [idx*3+1,re_l.distal? re_l.distal:0],
            [idx*3+2,re_l.middle? re_l.middle:0],
            [idx*3+3,re_l.mesial? re_l.mesial:0]
          ])
        }
      }else{
        if(q == 2){
          //buccal
          pd_buc = pd_buc.concat([
            [idx*3+1,pd_b.mesial? pd_b.mesial:0],
            [idx*3+2,pd_b.middle? pd_b.middle:0],
            [idx*3+3,pd_b.distal? pd_b.distal:0]
          ])
          re_buc = re_buc.concat([
            [idx*3+1,re_b.mesial? -re_b.mesial:0],
            [idx*3+2,re_b.middle? -re_b.middle:0],
            [idx*3+3,re_b.distal? -re_b.distal:0]
          ])

          //lingual
          pd_lin = pd_lin.concat([
            [idx*3+1,pd_l.mesial? pd_l.mesial:0],
            [idx*3+2,pd_l.middle? pd_l.middle:0],
            [idx*3+3,pd_l.distal? pd_l.distal:0]
          ])
          re_lin = re_lin.concat([
            [idx*3+1,re_l.mesial? -re_l.mesial:0],
            [idx*3+2,re_l.middle? -re_l.middle:0],
            [idx*3+3,re_l.distal? -re_l.distal:0]
          ])
        }else{
          //buccal
          pd_buc = pd_buc.concat([
            [idx*3+1,pd_b.mesial? -pd_b.mesial:0],
            [idx*3+2,pd_b.middle? -pd_b.middle:0],
            [idx*3+3,pd_b.distal? -pd_b.distal:0]
          ])
          re_buc = re_buc.concat([
            [idx*3+1,re_b.mesial? re_b.mesial:0],
            [idx*3+2,re_b.middle? re_b.middle:0],
            [idx*3+3,re_b.distal? re_b.distal:0]
          ])

          //lingual
          pd_lin = pd_lin.concat([
            [idx*3+1,pd_l.mesial? -pd_l.mesial:0],
            [idx*3+2,pd_l.middle? -pd_l.middle:0],
            [idx*3+3,pd_l.distal? -pd_l.distal:0]
          ])
          re_lin = re_lin.concat([
            [idx*3+1,re_l.mesial? re_l.mesial:0],
            [idx*3+2,re_l.middle? re_l.middle:0],
            [idx*3+3,re_l.distal? re_l.distal:0]
          ])
        }
      }
    }

    if(q <= 2){
      buccals.q12.push([{data:pd_buc},{data:re_buc},{data:[[1,0],[24,0]]}])
      linguals.q12.push([{data:pd_lin},{data:re_lin},{data:[[1,0],[24,0]]}])
    }else{
      buccals.q34.push([{data:pd_buc},{data:re_buc},{data:[[1,0],[24,0]]}])
      linguals.q34.push([{data:pd_lin},{data:re_lin},{data:[[1,0],[24,0]]}])
    }
   
  }
  return {buccals,linguals}
}

export default graphDataProcessing