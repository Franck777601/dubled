// ISPA CRM - Google Apps Script
// Copiez tout ce code dans Google Apps Script

// Global variable to store the spreadsheet ID (set after creation)
var SPREADSHEET_ID = '';

function createISPAcrm(){
  var ss = SpreadsheetApp.create('ISPA CRM 2026');
  SPREADSHEET_ID = ss.getId();
  var namesToKeep = ['PROSPECTS','STATUTS','CONSEILLERS','REPORTING'];
  var sheet = ss.getSheets()[0];
  sheet.setName('PROSPECTS');
  if(ss.getSheetByName('STATUTS')==null) ss.insertSheet('STATUTS');
  if(ss.getSheetByName('CONSEILLERS')==null) ss.insertSheet('CONSEILLERS');
  if(ss.getSheetByName('REPORTING')==null) ss.insertSheet('REPORTING');
  ss.getSheets().forEach(function(sh){ if(namesToKeep.indexOf(sh.getName())<0) ss.deleteSheet(sh); });
  var prospects = ss.getSheetByName('PROSPECTS');
  var headers = ['Prospect_ID','Date_Creation','Nom_Complet','Telephone','Ville','Niveau_Etude','Filiere','Source','Score','Statut','Conseiller','Derniere_Interaction','Notes'];
  prospects.getRange(1,1,1,headers.length).setValues([headers]);
  var headerRange = prospects.getRange(1,1,1,headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');
  prospects.setFrozenRows(1);
  var colWidths = [120,120,220,140,120,140,160,120,80,140,160,160,260];
  for(var i=0;i<colWidths.length;i++){ prospects.setColumnWidth(i+1,colWidths[i]); }
  prospects.getRange('B:B').setNumberFormat('dd/MM/yyyy');
  var statuses = ['Nouveau','Préqualifié','Qualifié','Contacté','Visite programmée','Dossier en cours','Inscrit','Perdu'];
  var statSheet = ss.getSheetByName('STATUTS');
  statSheet.getRange(1,1,statuses.length,1).setValues(statuses.map(s=>[s]));
  statSheet.setColumnWidth(1,220);
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(statSheet.getRange('A1:A8'), true).setAllowInvalid(false).build();
  prospects.getRange('J2:J1000').setDataValidation(rule);
  ['STATUTS','CONSEILLERS','REPORTING'].forEach(function(n){ var sh = ss.getSheetByName(n); sh.getRange(1,1,1,1).setFontWeight('bold'); sh.setFrozenRows(1); });
  var report = ss.getSheetByName('REPORTING'); report.getRange('A1').setValue('Reporting : mettre ici vos formules / graphiques'); report.getRange('A1').setFontWeight('bold');
  var cons = ss.getSheetByName('CONSEILLERS'); cons.getRange('A1').setValue('Nom_Conseiller'); cons.getRange('B1').setValue('Telephone'); cons.getRange('C1').setValue('Zone'); cons.getRange(1,1,1,3).setFontWeight('bold'); cons.setColumnWidths(1,3,160);
  var url = ss.getUrl();
  Logger.log('Feuille créée : ISPA CRM 2026 - URL: ' + url);
  report.getRange('A2').setValue('Spreadsheet URL: ' + url);
  return url;
}

// Receive POST request from Node.js server
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // Find the spreadsheet (assumes ISPA CRM 2026 exists)
    var sheets = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/u/0/?key=' + SPREADSHEET_ID).getSheetByName('PROSPECTS');
    if (!sheets) {
      // Try to find it by name if ID not set
      var openSheets = SpreadsheetApp.getActiveSpreadsheet();
      sheets = openSheets ? openSheets.getSheetByName('PROSPECTS') : null;
    }
    
    if (!sheets) {
      return ContentService.createTextOutput(JSON.stringify({success: false, error: 'Sheet PROSPECTS not found'})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add new row
    var newRow = [
      data.id || '',
      new Date(),
      data.nom || '',
      data.telephone || '',
      data.ville || '',
      data.niveau || '',
      data.filiere || '',
      data.source || 'form',
      '',
      'Nouveau',
      '',
      new Date(),
      data.school + ' / ' + data.lang
    ];
    
    sheets.appendRow(newRow);
    
    return ContentService.createTextOutput(JSON.stringify({success: true, message: 'Prospect added', id: data.id})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}
