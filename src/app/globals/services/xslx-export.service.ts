import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class XslxExportService {

  constructor() { }

  xlsxExportToPC(data: any) {
    /* starting from this data */
    console.log('Descargando... ', data);

    let jsonArr = [];

    /* Create the Json obj of every player */
    for (let i = 0; i < data.playersJoined.length; i++) {
      let jsonObj = {};
      let totalPoints:Number = 0;

      jsonObj["Nombre"] = data.playersJoined[i];

      /* Adds the diferent questions and points gained, also calculate the total of points gained */
      for (let j = 0; j < data.result.length; j++) {

        

        let k;

        for (k = 0; k < data.result[j].submissions.length; k++) {
          if(data.result[j].submissions[k].username == data.playersJoined[i]) break;
        }

        jsonObj[j + '- ' + data.result[j].questionText] = data.result[j].submissions[k].answerSent + '';
        jsonObj[j + '- ' + "Puntos"] = data.result[j].submissions[k].pointsGained + '';

        totalPoints = totalPoints + data.result[j].submissions[k].pointsGained;
      }

      jsonObj["Puntos totales"] = totalPoints;

      /* It push the Json obj to the array */
      jsonArr.push(jsonObj);
      
    }

    console.log(jsonArr);

    /* generate a worksheet */
    var ws = XLSX.utils.json_to_sheet(jsonArr);

    /* add to workbook */
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    /* write workbook and force a download */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

}
