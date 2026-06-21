export async function buscarUsuarios() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const dados = await response.json();

  return dados;
}