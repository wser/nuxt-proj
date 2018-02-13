// This file will be exposed to browser.
// Don't put any sensitive information here.
module.exports = {
  // https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_FROM_HERE/edit
  spreadsheetId: '1tsaM4x_joUgVEtNzCrrR0-_RV9H04dr2WwaMaPmSJkU', // get spreadsheet id from spreadsheet url
  sheetName: 'Sheet2', 
  gmacros:'https://script.google.com/macros/s/AKfycbx_X_-IujIAG6Q6NnmRMCFHUaeeaq2ZSK-i7o0n0QwPOmoJSxY/exec'
};


/* in the Google sheets > Tools > Script editor; paste this:

  var SHEET_URL = "https://docs.google.com/spreadsheets/d/1tsaM4x_joUgVEtNzCrrR0-_RV9H04dr2WwaMaPmSJkU/edit?usp=sharing";
  var SHEET_NAME;


  function doGet(e) {
    SHEET_NAME = e.parameter.sheetid;  
    var ss = SpreadsheetApp.openByUrl(SHEET_URL);
    var sheet = ss.getSheetByName(SHEET_NAME);
    
    var op = e.parameter.action;
    switch (op) {
      case "insert": return insert_value(e, sheet); break;
      case "read":   return read_value(e, ss);      break;
      case "update": return update_value(e, sheet); break;
      case "delete": return delete_value(e, sheet); break;
    }
  }

  //Recieve parameter and pass it to function to handle
  function insert_value(request, sheet) {
    var id = request.parameter.id;
    var name = request.parameter.name;
    var result;

    var flag = 1;
    var lr = sheet.getLastRow();
    for (var i = 1; i <= lr; i++) {
      var id1 = sheet.getRange(i, 2).getValue();
      if (id1 == id) {
        flag = 0;
        result = "Id already exist..";
      }
    }
    //add new row with recieved parameter from client
    if (flag == 1) {
      var d = new Date();
      var currentTime = d.toLocaleString();
      var rowData = sheet.appendRow([currentTime, id, name]);
      result = "Insertion successful";
    }
    result = JSON.stringify({
      "result": result
    });

    return ContentService
      .createTextOutput(request.parameter.callback + result)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  function read_value(request, ss) {
    var output = ContentService.createTextOutput(),
        data = {};
    //Note : here sheet is sheet name , don't get confuse with other operation 
    var sheet = SHEET_NAME;

    data.records = readData_(ss, sheet);

    var callback = request.parameters.callback;

    if (callback === undefined) {
      output.setContent(JSON.stringify(data));
    } else {
      output.setContent(callback + "(" + JSON.stringify(data) + ")");
    }
    output.setMimeType(ContentService.MimeType.JAVASCRIPT);

    return output;
  }

  function readData_(ss, sheetname, properties) {
    if (typeof properties == "undefined") {
      properties = getHeaderRow_(ss, sheetname);
      properties = properties.map(function (p) {
        return p.replace(/\s+/g, '_');
      });
    }

    var rows = getDataRows_(ss, sheetname),
        data = [];

    for (var r = 0, l = rows.length; r < l; r++) {
      var row = rows[r],
          record = {};

      for (var p in properties) {
        record[properties[p]] = row[p];
      }

      data.push(record);
    }
    return data;
  }

  function getDataRows_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
  }

  function getHeaderRow_(ss, sheetname) {
    var sh = ss.getSheetByName(sheetname);
    return sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
  }

  //update function
  function update_value(request, sheet) {
    var output = ContentService.createTextOutput();
    var id = request.parameter.id;
    var name = request.parameter.name;
    var flag = 0;
    var lr = sheet.getLastRow();

    for (var i = 1; i <= lr; i++) {
      var rid = sheet.getRange(i, 2).getValue();
      if (rid == id) {
        sheet.getRange(i, 3).setValue(name);
        var result = "value updated successfully";
        flag = 1;
      }
    }
    if (flag == 0)
      var result = "id not found";

    result = JSON.stringify({
      "result": result
    });

    return ContentService
      .createTextOutput(request.parameter.callback + result)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  function delete_value(request, sheet) {
    var output = ContentService.createTextOutput();
    var id = request.parameter.id;
    var flag = 0;
    var lr = sheet.getLastRow();
  
    for (var i = 1; i <= lr; i++) {
      var rid = sheet.getRange(i, 2).getValue();
      if (rid == id) {
        sheet.deleteRow(i);
        var result = "value deleted successfully";
        flag = 1;
      }
    }

    if (flag == 0) var result = "id not found";

    result = JSON.stringify({ "result": result });

    return ContentService
      .createTextOutput(request.parameter.callback + result)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

*/
// change the correct paths in gmacros; spreadsheetId; sheetName
// copy url from share button of your spreadsheet
