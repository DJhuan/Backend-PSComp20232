import express, { Router } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = new Router();

router.get('/', (req, res) => {
  return res.status(200).send({ message: 'Hello world!' });
});

router.post('/teste', (req, res) => {
  const dados = {
    sobrenome: req.body.nome,
    humor: req.body.humor,
  };
  return res.status(200).send({ dados });
});

router.get('/teste', (req, res) => {
  const dados = {
    message: 'Você acabou de fazer uma requisição GET!',
  };
  return res.status(200).send({ dados });
});

app.use(router);

app.listen(port);
