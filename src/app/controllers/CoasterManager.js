import { Router } from "express";
import CoasterSchema from "@/app/schemas/Coaster";
import Slugify from "@/utils/Slugify";

const router = new Router();

router.get("/", (req, res) => {
  CoasterSchema.find()
    .then((rawData) => {
      // Filtrando os dados do backend;
      const coasters = rawData.map((coaster) => {
        return {
          coasterName: coaster.coasterName,
          coasterType: coaster.coasterType,
        };
      });

      res.send(coasters);
    })
    .catch((error) => {
      console.error("ERRO - O acesso aos dados foi mal sucedido.", error);
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error: "Impossível acessar os dados do banco. Tente mais uma vez",
      });
    });
});

router.get("/id/:coasterId", (req, res) => {
  CoasterSchema.findById(req.params.coasterId)
    .then((coaster) => {
      res.send(coaster);
    })
    .catch((error) => {
      console.error("ERRO - O acesso aos dados foi mal sucedido.", error);
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error: "Impossível acessar pelo Id escolhido. Tente outro.",
      });
    });
});

router.get("/:coasterSlug", (req, res) => {
  CoasterSchema.findOne({ slug: req.params.coasterSlug })
    .then((coaster) => {
      res.send(coaster);
    })
    .catch((error) => {
      console.error("ERRO - O acesso aos dados foi mal sucedido.", error);
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error: "Impossível acessar pelo Slug escolhido. Tente outro.",
      });
    });
});

router.post("/", (req, res) => {
  const {
    coasterName,
    slug,
    description,
    coasterType,
    createdAt,
    exitement,
    nausea,
    maxSpeed,
    length,
  } = req.body;

  CoasterSchema.create({
    coasterName,
    slug,
    description,
    coasterType,
    createdAt,
    exitement,
    nausea,
    maxSpeed,
    length,
  })
    .then((coaster) => {
      res.status(200).send(coaster);
    })
    .catch((error) => {
      console.error(
        "ERRO - Projeto enviado não salvo no banco de dados.",
        error
      );
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error:
          "Infelizmente ocorreu um erro ao salvar o seu projeto. Atente-se as obrigatoriedades e reveja os campos preenchidos!",
      });
    });
});

router.put("/:coasterId", (req, res) => {
  const {
    coasterName,
    description,
    coasterType,
    createdAt,
    exitement,
    nausea,
    maxSpeed,
    length,
  } = req.body;

  let slug = undefined;
  if (coasterName) {
    slug = Slugify(coasterName);
  }

  CoasterSchema.findByIdAndUpdate(
    req.params.coasterId,
    {
      coasterName,
      slug,
      description,
      coasterType,
      createdAt,
      exitement,
      nausea,
      maxSpeed,
      length,
    },
    {
      new: true,
    }
  )
    .then((coaster) => {
      res.status(200).send(coaster);
    })
    .catch((error) => {
      console.error(
        "ERRO - Projeto enviado não salvo no banco de dados.",
        error
      );
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error: "Infelizmente ocorreu um erro ao atualizar os dados.",
      });
    });
});

router.delete("/:projectId", (req, res) => {
  CoasterSchema.findByIdAndRemove(req.params.projectId)
    .then(() => {
      res.send({ message: "Projeto removido com sucesso!" });
    })
    .catch((error) => {
      console.error("ERRO - A tentativa de exclusão foi malsucedida.");
      res.status(400).send({
        error: "Não foi possível excluir o Id solicitado.",
      });
    });
});

export default router;
