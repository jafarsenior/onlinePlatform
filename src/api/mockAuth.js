// Mock user ma'lumotlar bazasi
let users = [
  { username: "demo", email: "demo@mail.com", phone: "998901112233", password: "123456" },
];

// Register uchun mock API
export const mockRegister = async ({ username, email, phone, password }) => {
  await new Promise((res) => setTimeout(res, 700)); // loading efekti uchun
  const userExists = users.some((u) => u.email === email);

  if (userExists) {
    return { success: false, message: "Bu email allaqachon ro‘yxatdan o‘tgan" };
  }

  const newUser = { username, email, phone, password };
  users.push(newUser);

  return { success: true, message: "Ro‘yxatdan o‘tish muvaffaqiyatli", user: newUser };
};

// Login uchun mock API
export const mockLogin = async ({ username, password }) => {
  await new Promise((res) => setTimeout(res, 700));

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return { success: false, message: "Login yoki parol xato" };
  }

  return { success: true, message: "Kirish muvaffaqiyatli", token: "fake-jwt-token", user };
};
