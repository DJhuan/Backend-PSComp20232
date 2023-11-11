import fs from "fs";
import path from "path";

function fileRemover(obj) {
  const singleFilePath = obj.mainImage;

  if (fs.existsSync(singleFilePath)) {
    fs.unlinkSync(path.resolve(`./${singleFilePath}`), (err) => {
      console.error("ERRO - Não foi possível apagar o arquivo.", err);
    });
  }

  const fileArray = obj.images;

  if (fileArray) {
    for (const filepath of fileArray) {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(path.resolve(filepath), (err) => {
          console.error(
            "ERRO - Não foi possível apagar arquivos do vetor.",
            err
          );
        });
      }
    }
  }
}

export default fileRemover;
