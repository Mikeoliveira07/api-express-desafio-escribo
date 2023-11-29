const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { nome, email, senha, telefone } = req.body;

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const user = await User.create({ nome, email, senha: hashedPassword, telefone });

    // Gerar token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '30m' });

    res.status(201).json({
      id: user._id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.lastLogin,
      token
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
  }
};

exports.getUser = async (req, res) => {
    try {
      // O usuário já é anexado ao req no middleware
      const user = req.user;
  
      res.json({
        id: user._id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: user.lastLogin
      });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  };
  

exports.signin = async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Verificar se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidas" });
      }
  
      // Comparar a senha
      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(401).json({ mensagem: "Usuário ou senha inválidas" });
      }
  
      // Gerar token
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '30m' });
  
      res.json({
        id: user._id,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: new Date(),
        token
      });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
  }; 