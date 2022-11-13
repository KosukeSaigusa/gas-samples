/** 対象とする Google Drive のフォルダ ID */
const folderId = 'folder-id'

/** 実行する関数 */
function main() {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadSheet.getActiveSheet()
  const folder = DriveApp.getFolderById(folderId)
  const files = folder.getFiles()
  const sortedFileNamesAndUrls = []

  while (files.hasNext()) {
    const file = files.next()
    console.log(`fileName: ${file.getName()}`)
    sortedFileNamesAndUrls.push({
      fileName: file.getName(),
      url: file.getUrl(),
    })
  }

  sortedFileNamesAndUrls.sort((a, b) => (a.fileName > b.fileName ? 1 : -1))

  sheet.appendRow([folder.getName()])
  for (const e of sortedFileNamesAndUrls) {
    console.log(`${e.fileName}: ${e.url}`)
    sheet.appendRow([e.fileName, e.url])
  }
}
