import { Router } from 'express';
import CoasterSchema from '@/app/schemas/Coaster';

const router = new Router();

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
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
        'ERRO - Projeto enviado não salvo no banco de dados.',
        error,
      );
      // 400 - Significa BAD REQUEST
      res.status(400).send({
        error:
          'Infelizmente ocorreu um erro ao salvar o seu projeto. Atente-se as obrigatoriedades e reveja os campos preenchidos!',
      });
    });
});

router.put('/', (req, res) => {});

router.delete('/', (req, res) => {});

export default router;
