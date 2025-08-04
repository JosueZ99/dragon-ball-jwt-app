import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Error al encriptar la contraseña");
  }
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error al verificar la contraseña");
  }
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];

  if (password.length < minLength) {
    errors.push(`La contraseña debe tener al menos ${minLength} caracteres`);
  }
  if (!hasUpperCase) {
    errors.push("La contraseña debe contener al menos una letra mayúscula");
  }
  if (!hasLowerCase) {
    errors.push("La contraseña debe contener al menos una letra minúscula");
  }
  if (!hasNumbers) {
    errors.push("La contraseña debe contener al menos un número");
  }
  if (!hasSpecialChar) {
    errors.push("La contraseña debe contener al menos un carácter especial");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
