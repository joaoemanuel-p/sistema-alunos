import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const CHAVE_USUARIOS = "usuarios";
const CHAVE_SESSAO = "usuarioLogado";

function carregarUsuarios() {
  try {
    const dados = localStorage.getItem(CHAVE_USUARIOS);
    return dados ? JSON.parse(dados) : [];
  } catch {
    return [];
  }
}

function salvarUsuarios(usuarios) {
  try {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
  } catch (error) {
    console.error("Não foi possível salvar os usuários:", error);
  }
}

function carregarSessao() {
  try {
    const dados = localStorage.getItem(CHAVE_SESSAO);
    return dados ? JSON.parse(dados) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuarioAtual, setUsuarioAtual] = useState(carregarSessao);

  function registrar({ nome, email, senha }) {
    const usuarios = carregarUsuarios();

    const jaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (jaExiste) {
      return { sucesso: false, erro: "Já existe uma conta com esse e-mail." };
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha,
    };

    salvarUsuarios([...usuarios, novoUsuario]);

    const sessao = { id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email };
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    setUsuarioAtual(sessao);

    return { sucesso: true };
  }

  function login({ email, senha }) {
    const usuarios = carregarUsuarios();

    const usuario = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );

    if (!usuario) {
      return { sucesso: false, erro: "E-mail ou senha incorretos." };
    }

    const sessao = { id: usuario.id, nome: usuario.nome, email: usuario.email };
    localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    setUsuarioAtual(sessao);

    return { sucesso: true };
  }

  function logout() {
    localStorage.removeItem(CHAVE_SESSAO);
    setUsuarioAtual(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuarioAtual,
        estaLogado: Boolean(usuarioAtual),
        registrar,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}