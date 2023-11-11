import { Router } from "express";
import fs from "fs";
import path from "path";

const router = new Router();

router.get("/:path/:filename", (req, res) => {
  const filepath = path.resolve(
    `./uploads/${req.params.path}/${req.params.filename}`
  );

  if (fs.existsSync(filepath)) {
    return res.sendFile(filepath);
  } else {
    return res
      .status(404)
      .send({ error: "O arquivo requisitado não pode ser encontrado." });
  }
});

export default router;
