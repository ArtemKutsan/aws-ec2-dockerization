const appConfig = {
  // Vite подставляет значение из frontend .env при сборке приложения.
  apiUrl: import.meta.env.VITE_API_URL || '/api/v1',
};

export default appConfig;
