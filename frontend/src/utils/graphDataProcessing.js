const graphDataProcessing = (data) => {
	console.log(data)
	let buccals = {
		q12: [],
		q34: [],
	};
	let linguals = {
		q12: [],
		q34: [],
	};
	for (let q = 1; q <= 4; q++) {
		let q_data = data[q - 1].idxArray;
		let pd_buc = [];
		let re_buc = [];
		let pd_lin = [];
		let re_lin = [];
		for (let idx = 0; idx < 8; idx++) {
			let idx_data = q_data[idx].depended_side_data;
			let buccal =
				idx_data[0].side === "buccal" ? idx_data[0] : idx_data[1];
			let lingual =
				idx_data[0].side === "buccal" ? idx_data[1] : idx_data[0];
			let pd_b = buccal.PD;
			let re_b = buccal.RE;
			let pd_l = lingual.PD;
			let re_l = lingual.RE;

			let pd_b_dis = pd_b.distal ? parseInt(pd_b.distal) : 0;
			let pd_b_mid = pd_b.middle ? parseInt(pd_b.middle) : 0;
			let pd_b_mes = pd_b.mesial ? parseInt(pd_b.mesial) : 0;
			let re_b_dis = re_b.distal ? parseInt(re_b.distal) : 0;
			let re_b_mid = re_b.middle ? parseInt(re_b.middle) : 0;
			let re_b_mes = re_b.mesial ? parseInt(re_b.mesial): 0;

			let pd_l_dis = pd_l.distal ? parseInt(pd_l.distal) : 0;
			let pd_l_mid = pd_l.middle ? parseInt(pd_l.middle) : 0;
			let pd_l_mes = pd_l.mesial ? parseInt(pd_l.mesial) : 0;
			let re_l_dis = re_l.distal ? parseInt(re_l.distal) : 0;
			let re_l_mid = re_l.middle ? parseInt(re_l.middle) : 0;
			let re_l_mes = re_l.mesial ? parseInt(re_l.mesial) : 0;

      console.log(String(data[q-1].quadrant)+String(q_data[idx].ID),pd_b_dis,pd_b_mid,pd_b_mes,re_b_dis,re_b_mid,re_b_mes)
      console.log(pd_l_dis,pd_l_mid,pd_l_mes,re_l_dis,re_l_mid,re_l_mes)

      let converter = 1
      if ([3,4].includes(q)){
        converter = -1
      }
			if ([1, 4].includes(q)) {
					//buccal
					pd_buc = pd_buc.concat([
						[idx * 3 + 1, (pd_b_dis + re_b_dis)*converter],
						[idx * 3 + 2, (pd_b_mid + re_b_mid)*converter],
						[idx * 3 + 3, (pd_b_mes + re_b_mes)*converter],
					]);
					re_buc = re_buc.concat([
						[idx * 3 + 1, re_b_dis*converter],
						[idx * 3 + 2, re_b_mid*converter],
						[idx * 3 + 3, re_b_mes*converter],
					]);

					//lingual
					pd_lin = pd_lin.concat([
						[idx * 3 + 1, (pd_l_dis + re_l_dis)*converter],
						[idx * 3 + 2, (pd_l_mid + re_l_mid)*converter],
						[idx * 3 + 3, (pd_l_mes + re_l_mes)*converter],
					]);
					re_lin = re_lin.concat([
						[idx * 3 + 1, re_l_dis*converter],
						[idx * 3 + 2, re_l_mid*converter],
						[idx * 3 + 3, re_l_mes*converter],
					]);
			} else {
					//buccal
					pd_buc = pd_buc.concat([
						[idx * 3 + 1, (pd_b_mes + re_b_mes)*converter],
						[idx * 3 + 2, (pd_b_mid + re_b_mid)*converter],
						[idx * 3 + 3, (pd_b_dis + re_b_dis)*converter],
					]);
					re_buc = re_buc.concat([
						[idx * 3 + 1, re_b_mes*converter],
						[idx * 3 + 2, re_b_mid*converter],
						[idx * 3 + 3, re_b_dis*converter],
					]);

					//lingual
					pd_lin = pd_lin.concat([
						[idx * 3 + 1, (pd_l_mes + re_l_mes)*converter],
						[idx * 3 + 2, (pd_l_mid + re_l_mid)*converter],
						[idx * 3 + 3, (pd_l_dis + re_l_dis)*converter],
					]);
					re_lin = re_lin.concat([
						[idx * 3 + 1, re_l_mes*converter],
						[idx * 3 + 2, re_l_mid*converter],
						[idx * 3 + 3, re_l_dis*converter],
					]);
			}
		}

		if (q <= 2) {
			buccals.q12.push([
				{ data: pd_buc,zIndex:2 },
				{ data: re_buc,zIndex:1 },
				{
					data: [
						[1, 0],
						[24, 0],
					],
					zIndex:0
				},
        // {
				// 	data: [
				// 		[1, 15],
				// 		[24, 15],
				// 	],
				// },
        // {
				// 	data: [
				// 		[1, -5],
				// 		[24, -5],
				// 	],
				// },
			]);
			linguals.q12.push([
				{ data: pd_lin,zIndex:2 },
				{ data: re_lin,zIndex:1},
				{
					data: [
						[1, 0],
						[24, 0],
					],
					zIndex:0
				},
        // {
				// 	data: [
				// 		[1, 15],
				// 		[24, 15],
				// 	],
				// },
        // {
				// 	data: [
				// 		[1, -5],
				// 		[24, -5],
				// 	],
				// },
			]);
		} else {
			buccals.q34.push([
				{ data: pd_buc,zIndex:2 },
				{ data: re_buc,zIndex:1 },
				{
					data: [
						[1, 0],
						[24, 0],
					],
					zIndex:0
				},
        // {
				// 	data: [
				// 		[1, -15],
				// 		[24, -15],
				// 	],
				// },
        // {
				// 	data: [
				// 		[1, 5],
				// 		[24, 5],
				// 	],
				// },
			]);
			linguals.q34.push([
				{ data: pd_lin,zIndex:2 },
				{ data: re_lin,zIndex:1 },
				{
					data: [
						[1, 0],
						[24, 0],
					],
					zIndex:0
				},
        // {
				// 	data: [
				// 		[1, -15],
				// 		[24, -15],
				// 	],
				// },
        // {
				// 	data: [
				// 		[1, 5],
				// 		[24, 5],
				// 	],
				// },
			]);
		}
	}
	return { buccals, linguals };
};

export default graphDataProcessing;
