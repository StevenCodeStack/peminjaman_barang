export function generateCode(length: number = 6) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
