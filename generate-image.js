export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt' });

  try {
    // Pollinations.ai — полностью бесплатный сервис генерации изображений
    // Не нужен API-ключ. Просто формируем URL.
    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 999999);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=768&seed=${seed}&nologo=true`;

    // Возвращаем URL — браузер загрузит изображение напрямую
    return res.status(200).json({ url: imageUrl });

  } catch (error) {
    console.error('Image gen error:', error);
    return res.status(500).json({ error: 'Image generation failed' });
  }
}
