import { Router } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "@/app/schemas/User";
import authConfig from "@/config/Auth";

const router = new Router();

const generateToken = (params) => {
  return jwt.sign(params, authConfig.secret, { expiresIn: 86400 });
};

router.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  // Busca na base de dados o e-mail enviado;
  User.findOne({ email })
    .then((userData) => {
      if (userData) {
        // Se já existir um usuário com esse e-mail retorna-se erro;
        return res.status(400).send({ error: "Usuário já cadastrado!" });
      } else {
        // Caso contrário cadastramos o novo usuário;
        User.create({ name, email, password })
          .then((user) => {
            user.password = undefined;
            return res.send({ user });
          })
          .catch((error) => {
            console.error("ERRO - Cadastro de usuário masucedido!", error);
            return res
              .status(400)
              .send({ error: "Não foi possível registrar o usuário." });
          });
      }
    })
    .catch((error) => {
      console.error("ERRO - Consulta de usuário malsucedida!", error);
      return res.status(500).send({
        error: "A consulta de usuário resultou em falha, tente enovamente.",
      });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (result) {
              const token = generateToken({ uid: user.id });
              return res.send({ token: token, tokenExpiration: "1d" });
            } else {
              return res.status(400).send({ error: "Senha inválida!" });
            }
          })
          .catch((error) => {
            console.error("ERRO - Verificação de senha masucedida", error);
            return res.status(500).send({ error: "Erro do servidor interno" });
          });
      } else {
        return res.status(404).send({ error: "Usuário não encontrado." });
      }
    })
    .catch((error) => {
      console.error("ERRO - Login malsucedido", error);
      return res.status(500).send({
        error: "Erro do servidor interno.",
      });
    });
});

router.post("/forgot-password", (req, res) => {});

router.post("/reset-password", (req, res) => {});

export default router;
