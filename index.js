const fs = require("fs");
const json2xlsx = require("node-json-xlsx");
const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log(err);
  }
};
async function init(pathFolderOrigin, pathFolderTarget) {
  var files = fs.readdirSync(pathFolderOrigin);
  for (const fileName of files) {
    const dadosJson = await readFile(`${pathFolderOrigin}\\${fileName}`);
    let xlsx;
    if (dadosJson.length) {
      xlsx = json2xlsx(JSON.parse(dadosJson), {
        fieldNames: Object.keys(JSON.parse(dadosJson)[0]),
      });
    } else {
      xlsx = json2xlsx(dadosJson);
    }
    fs.writeFileSync(
      `${pathFolderTarget}\\${fileName.split(".")[0]}.xlsx`,
      xlsx,
      "binary"
    );
  }
}

init("", "");
