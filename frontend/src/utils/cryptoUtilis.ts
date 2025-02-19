import CryptoJS from "crypto-js";

/**
 * Chiffre un texte en utilisant AES.
 * @param plaintext - Le texte à chiffrer.
 * @param secretKey - La clé secrète (doit être de 16, 24 ou 32 caractères pour AES).
 * @returns Le texte chiffré sous forme de string.
 */
export function encrypt(plaintext: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
}

/**
 * Déchiffre un texte AES chiffré.
 * @param ciphertext - Le texte chiffré.
 * @param secretKey - La clé secrète utilisée pour le chiffrement.
 * @returns Le texte en clair.
 */
export function decrypt(ciphertext: string, secretKey: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
