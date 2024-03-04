const Excel = require("exceljs");
const FileSaver = require("file-saver");

// ----------------setting excel properties --------------------------------
const addBorder = (ws, col, row) => {
  ws.getCell(`${col}${row}`).border = {
    top: { style: `thin` },
    left: { style: `thin` },
    bottom: { style: `thin` },
    right: { style: `thin` },
  };
};

const setCenter = (ws, col, row) => {
  ws.getCell(`${col}${row}`).alignment = {
    vertical: `middle`,
    horizontal: `center`,
    wrapText: true,
  };
};

const setFont = (ws, col, row) => {
  ws.getCell(`${col}${row}`).font = {
    size: 8.5,
  };
};

const setRedFont = (ws, col, row) => {
  ws.getCell(`${col}${row}`).font = {
    size: 8.5,
    color: { argb: "ffef5350" },
  };
};

const setGrayColor = (ws, col, row,is_fill_value = false) => {
  if(is_fill_value){
    ws.getCell(`${col}${row}`).value = null
  }
  ws.getCell(`${col}${row}`).fill = {
    type: `pattern`,
    pattern: `solid`,
    fgColor: { argb: `cccccc` },
  };
};

const setBlueColor = (ws, col, row,is_fill_value = false) => {
  if(is_fill_value){
    ws.getCell(`${col}${row}`).value = null
  }
  ws.getCell(`${col}${row}`).fill = {
    type: `pattern`,
    pattern: `solid`,
    fgColor: { argb: `9dd9f3` }
  };
};

const setExcelProperties = (ws, col, row) => {
  addBorder(ws, col, row);
  setCenter(ws, col, row);
  setFont(ws, col, row);
};
// ---------------------------------------------------------------------

const colID = [
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
  `G`,
  `H`,
  `I`,
  `J`,
  `K`,
  `L`,
  `M`,
  `N`,
  `O`,
  `P`,
  `Q`,
  `R`,
  `S`,
  `T`,
  `U`,
  `V`,
  `W`,
  `X`,
  `Y`,
  `Z`,
  `AA`,
  `AB`,
  `AC`,
  `AD`,
  `AE`,
  `AF`,
  `AG`,
  `AH`,
  `AI`,
  `AJ`,
  `AK`,
  `AL`,
  `AM`,
  `AN`,
  `AO`,
  `AP`,
  `AQ`,
  `AR`,
  `AS`,
  `AT`,
  `AU`,
  `AV`,
  `AW`,
  `AX`,
];
const header = [
  `CAL`,
  `MGJ`,
  `BOP`,
  `SUP`,
  `PD`,
  `RE`,
  ``,
  `Bridge`,
  `Bridge Edge`,
  `Crown`,
  `Implant`,
  `Missing`,
  `FUR1`,
  `FUR2`,
  `MO`,
  `F`,
  `BOP`,
  `SUP`,
  `PD`,
  `RE`,
  `CAL`,
  ``,
  `CAL`,
  `RE`,
  `PD`,
  `BOP`,
  `SUP`,
  `F`,
  `MO`,
  ``,
  `Bridge`,
  `Bridge Edge`,
  `Crown`,
  `Implant`,
  `Missing`,
  `FUR1`,
  `FUR2`,
  `RE`,
  `PD`,
  `BOP`,
  `SUP`,
  `MGJ`,
  `CAL`,
];

const merge = (ws, r) => {
  ws.mergeCells(`${colID[1]}${r}:${colID[3]}${r}`);
  ws.mergeCells(`${colID[4]}${r}:${colID[6]}${r}`);
  ws.mergeCells(`${colID[7]}${r}:${colID[9]}${r}`);
  ws.mergeCells(`${colID[10]}${r}:${colID[12]}${r}`);
  ws.mergeCells(`${colID[13]}${r}:${colID[15]}${r}`);
  ws.mergeCells(`${colID[16]}${r}:${colID[18]}${r}`);
  ws.mergeCells(`${colID[19]}${r}:${colID[21]}${r}`);
  ws.mergeCells(`${colID[22]}${r}:${colID[24]}${r}`);
  ws.mergeCells(`${colID[26]}${r}:${colID[28]}${r}`);
  ws.mergeCells(`${colID[29]}${r}:${colID[31]}${r}`);
  ws.mergeCells(`${colID[32]}${r}:${colID[34]}${r}`);
  ws.mergeCells(`${colID[35]}${r}:${colID[37]}${r}`);
  ws.mergeCells(`${colID[38]}${r}:${colID[40]}${r}`);
  ws.mergeCells(`${colID[41]}${r}:${colID[43]}${r}`);
  ws.mergeCells(`${colID[44]}${r}:${colID[46]}${r}`);
  ws.mergeCells(`${colID[47]}${r}:${colID[49]}${r}`);
};

exports.createReport = (DATA, file_name) => {
  //--------------create a workbook and worksheet--------------
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet(`My Sheet`);
  ws.views = [{}];

  //---------------set width and height ---------------------
  const colW = [{ width: 4.5 }];
  for (let i = 1; i <= colID.length; i++) {
    colW.push(colW[0]);
  }
  for (let i = 1; i <= 43; i++) {
    ws.getRow(i).height = 20;
  }
  ws.columns = colW;

  //----------------------set gray color----------------------------------
  for (let i = 0; i < colID.length; i++) {
    setGrayColor(ws, colID[i], 22);
  }
  for (let i = 1; i <= 43; i++) {
    setGrayColor(ws, `Z`, i);
  }

  //-----------------------merge cell ---------------------------------
  merge(ws, `2`);
  merge(ws, `7`);
  merge(ws, `8`);
  merge(ws, `9`);
  merge(ws, `10`);
  merge(ws, `11`);
  merge(ws, `12`);
  merge(ws, `15`);
  merge(ws, `29`);
  merge(ws, `30`);
  merge(ws, `31`);
  merge(ws, `32`);
  merge(ws, `33`);
  merge(ws, `34`);
  merge(ws, `35`);
  merge(ws, `42`);

  ws.mergeCells(`A22:AX22`);
  ws.mergeCells(`Z1:Z6`);
  ws.mergeCells(`Z7:Z14`);
  ws.mergeCells(`Z15:Z21`);
  ws.mergeCells(`Z23:Z29`);
  ws.mergeCells(`Z30:Z37`);
  ws.mergeCells(`Z38:Z43`);

  //-----------------------fill side---------------------------------
  ws.getCell(`Z1`).value = `B\nU\nC\nC\nA\nL`;
  ws.getCell(`Z15`).value = `L\nI\nN\nG\nU\nA\nL`;
  ws.getCell(`Z23`).value = `L\nI\nN\nG\nU\nA\nL`;
  ws.getCell(`Z38`).value = `B\nU\nC\nC\nA\nL`;

  //-----------------------set properties at side---------------------------------
  setExcelProperties(ws, `Z`, 1);
  setExcelProperties(ws, `Z`, 7);
  setExcelProperties(ws, `Z`, 15);
  setExcelProperties(ws, `Z`, 23);
  setExcelProperties(ws, `Z`, 30);
  setExcelProperties(ws, `Z`, 38);

  //-----------------------set row header and properties---------------------------------
  const row_header = ws.getColumn(1);
  row_header.values = header;

  for (let row = 1; row <= 43; row++) {
    setExcelProperties(ws, `A`, row);
  }

  //-----------------------create instant for indexing---------------------------------

  const mo_mode = [15, 29];
  const f_mode = [16, 28];
  const mgj_mode = [2, 42];
  const tooth_mode = [7, 30];
  const pd_mode = { buccal: [5, 39], lingual: [19, 25] };
  const re_mode = { buccal: [6, 38], lingual: [20, 24] };
  const bop_mode = { buccal: [3, 40], lingual: [17, 26] };
  const sup_mode = { buccal: [4, 41], lingual: [18, 27] };
  const cal_mode = { buccal: [1, 43], lingual: [21, 23] };
  const bridge_mode = [8,31]
  const bridge_edge_mode = [9,32]
  const crown_mode = [10,33]
  const implant_mode = [11,34]
  const missing_mode = [12,35]
  const fur_mode = [13,14,36,37]
  for (let row = 1; row <= 43; row++) {
    setExcelProperties(ws, `A`, row);
  }
  
  const pattern_flag = [
    { 0: `distal`, 1: `middle`, 2: `mesial` },
    { 0: `mesial`, 1: `middle`, 2: `distal` },
  ];

  //-----------------------fill data to each cell---------------------------------
  DATA.forEach((data) => {
    const flag = data.quadrant === 1 || data.quadrant === 4 ? 0 : 1;
    let start_col = data.quadrant === 1 || data.quadrant === 4 ? 1 : 26;
    const mode = data.quadrant === 1 || data.quadrant === 2 ? 0 : 1;

    const mo_row = mo_mode[mode];
    const mgj_row = mgj_mode[mode];
    const tooth_row = tooth_mode[mode];
    const bridge_row = bridge_mode[mode]
    const bridge_edge_row = bridge_edge_mode[mode]
    const crown_row = crown_mode[mode]
    const implant_row = implant_mode[mode]
    const missing_row = missing_mode[mode]
    const f_row = f_mode[mode];

    data.idxArray.forEach((idx) => {
      ws.getCell(
        `${colID[start_col]}${tooth_row}`
      ).value = `${data.quadrant}${idx.ID}`;

      ws.getCell(`${colID[start_col]}${mo_row}`).value = idx.MO;
      ws.getCell(`${colID[start_col]}${mgj_row}`).value = idx.MGJ;

      setExcelProperties(ws, colID[start_col], tooth_row);
      setExcelProperties(ws, colID[start_col], mo_row);
      setExcelProperties(ws, colID[start_col], mgj_row);
      setExcelProperties(ws, colID[start_col], bridge_row);
      setExcelProperties(ws, colID[start_col], bridge_edge_row);
      setExcelProperties(ws, colID[start_col], implant_row);
      setExcelProperties(ws, colID[start_col], crown_row);
      setExcelProperties(ws, colID[start_col], missing_row);

      for (let row = 0;row < 4;row++){
        for(let id = 0;id < 3;id++){
          setExcelProperties(
            ws,
            colID[start_col+id],
            fur_mode[row]
          )
        }
      }

      idx.depended_side_data.forEach((side_data) => {
        for (let id = 0; id < 3; id++) {
          setExcelProperties(
            ws,
            colID[start_col + id],
            pd_mode[side_data.side][mode]
          );
          setExcelProperties(
            ws,
            colID[start_col + id],
            re_mode[side_data.side][mode]
          );
          setExcelProperties(
            ws,
            colID[start_col + id],
            bop_mode[side_data.side][mode]
          );
          setExcelProperties(
            ws,
            colID[start_col + id],
            sup_mode[side_data.side][mode]
          );
          setExcelProperties(
            ws,
            colID[start_col + id],
            cal_mode[side_data.side][mode]
          );
          setExcelProperties(ws, colID[start_col + id], f_row);
          if (side_data.PD[pattern_flag[flag][id]] >= 4) {
            setRedFont(
              ws,
              colID[start_col + id],
              pd_mode[side_data.side][mode]
            );
          }
          ws.getCell(
            `${colID[start_col + id]}${pd_mode[side_data.side][mode]}`
          ).value = side_data.PD[pattern_flag[flag][id]];

          if (side_data.RE[pattern_flag[flag][id]] >= 4) {
            setRedFont(
              ws,
              colID[start_col + id],
              re_mode[side_data.side][mode]
            );
          }
          ws.getCell(
            `${colID[start_col + id]}${re_mode[side_data.side][mode]}`
          ).value = side_data.RE[pattern_flag[flag][id]];

          ws.getCell(
            `${colID[start_col + id]}${cal_mode[side_data.side][mode]}`
          ).value =
            parseInt(side_data.PD[pattern_flag[flag][id]]) ||
            null + parseInt(side_data.RE[pattern_flag[flag][id]]) ||
            null;

          if (side_data.BOP[pattern_flag[flag][id]] | 0) {
            ws.getCell(
              `${colID[start_col + id]}${bop_mode[side_data.side][mode]}`
            ).fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ef5350" },
            };
            ws.getCell(
              `${colID[start_col + id]}${bop_mode[side_data.side][mode]}`
            ).value = true
          }
          if (side_data.SUP[pattern_flag[flag][id]] | 0) {
            ws.getCell(
              `${colID[start_col + id]}${sup_mode[side_data.side][mode]}`
            ).fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ffae42" },
            };
            ws.getCell(
              `${colID[start_col + id]}${sup_mode[side_data.side][mode]}`
            ).value = true
          }
          if (idx.missing) {
            setGrayColor(
              ws,
              colID[start_col + id],
              pd_mode[side_data.side][mode],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              re_mode[side_data.side][mode],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              bop_mode[side_data.side][mode],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              sup_mode[side_data.side][mode],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              cal_mode[side_data.side][mode],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              fur_mode[mode*2],
              true
            );
            setGrayColor(
              ws,
              colID[start_col + id],
              fur_mode[(mode*2)+1],
              true
            );
            setGrayColor(ws, colID[start_col + id], f_row,true);
            continue;
          }
          if (idx.bridge){
            if(!idx.bridge_edge){
              setBlueColor(
                ws,
                colID[start_col + id],
                pd_mode[side_data.side][mode],
                !idx.bridge_edge
              );
              setBlueColor(
                ws,
                colID[start_col + id],
                re_mode[side_data.side][mode],
                !idx.bridge_edge
              );
              setBlueColor(
                ws,
                colID[start_col + id],
                bop_mode[side_data.side][mode],
                !idx.bridge_edge
              );
              setBlueColor(
                ws,
                colID[start_col + id],
                sup_mode[side_data.side][mode],
                !idx.bridge_edge
              );
              setBlueColor(ws, colID[start_col + id], f_row,true);
              setBlueColor(
                ws,
                colID[start_col + id],
                cal_mode[side_data.side][mode],
                !idx.bridge_edge
              );
              setBlueColor(
                ws,
                colID[start_col + id],
                fur_mode[(mode*2)],
                !idx.bridge_edge
              );
              setBlueColor(
                ws,
                colID[start_col + id],
                fur_mode[(mode*2)+1],
                !idx.bridge_edge
              );
            }
            
            
            
            continue;
          }
        }
      });
      if(idx.crown || idx.implant || idx.bridge || idx.missing || true){
        let mode_select = crown_mode
        let other1 = implant_mode
        let other2 = bridge_mode
        let other3 = missing_mode
        let other4 = bridge_edge_mode
        if(idx.implant){
          mode_select = implant_mode
          other1 = crown_mode
        }
        if(idx.missing){
          mode_select = missing_mode
          other3 = crown_mode
        }
        if(idx.bridge){
          mode_select = bridge_mode
          other2 = crown_mode
        }
        ws.getCell(
          `${colID[start_col]}${mode_select[mode]}`
        ).value = idx.crown || idx.implant || idx.bridge || idx.missing ? true:false
        ws.getCell(
          `${colID[start_col]}${other1[mode]}`
        ).value = false
        ws.getCell(
          `${colID[start_col]}${other2[mode]}`
        ).value = false
        ws.getCell(
          `${colID[start_col]}${other3[mode]}`
        ).value = false
        ws.getCell(
          `${colID[start_col]}${other4[mode]}`
        ).value = idx.bridge_edge? idx.bridge_edge:false
      }
      if(idx.FUR && (!idx.missing && (!idx.bridge || idx.bridge_edge))){
        let mesial_col = flag == 0? start_col+2:start_col
        let distal_col = flag == 0? start_col:start_col+2
        if(idx.FUR.mesial){
          ws.getCell(
            `${colID[mesial_col]}${fur_mode[mode*2+1]}`
          ).value = idx.FUR.mesial
        }
        if(idx.FUR.buccal){
          ws.getCell(
            `${colID[start_col+1]}${fur_mode[mode*2]}`
          ).value = idx.FUR.buccal
        }
        if(idx.FUR.lingual){
          ws.getCell(
            `${colID[start_col+1]}${fur_mode[mode*2+1]}`
          ).value = idx.FUR.lingual
        }
        if(idx.FUR.distal){
          ws.getCell(
            `${colID[distal_col]}${fur_mode[mode*2+1]}`
          ).value = idx.FUR.distal
        }
      }
      if (idx.missing) {
        setGrayColor(ws, colID[start_col], tooth_row,false);
        setGrayColor(ws, colID[start_col], mo_row,true);
        setGrayColor(ws, colID[start_col], mgj_row,true);
        setGrayColor(ws, colID[start_col], bridge_row);
        setGrayColor(ws, colID[start_col], bridge_edge_row);
        setGrayColor(ws, colID[start_col], crown_row,false);
        setGrayColor(ws, colID[start_col], implant_row,false);
        setGrayColor(ws, colID[start_col], missing_row,false);
      }

      if (idx.bridge){
        setBlueColor(ws, colID[start_col], tooth_row);
        if(!idx.bridge_edge){
          setBlueColor(ws, colID[start_col], mo_row,(idx.bridge && !idx.bridge_edge));
          setBlueColor(ws, colID[start_col], mgj_row,(!idx.bridge && !idx.bridge_edge));
        }
        setBlueColor(ws, colID[start_col], bridge_row);
        setBlueColor(ws, colID[start_col], bridge_edge_row);
        setBlueColor(ws, colID[start_col], crown_row);
        setBlueColor(ws, colID[start_col], implant_row);
        setBlueColor(ws, colID[start_col], missing_row);
      }
      start_col = start_col + 3;
    });
  });

  wb.xlsx.writeBuffer().then(function (buffer) {
    const blob = new Blob([buffer], { type: "applicationi/xlsx" });
    FileSaver.saveAs(blob, `${file_name}.xlsx`);
  });
};
