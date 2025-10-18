import { translateText } from '../../awsTranslate';

export async function POST(req) {
  const { text, targetLanguage } = await req.json();

  try {
    const translatedText = await translateText(text, targetLanguage);
    return new Response(JSON.stringify({ translatedText }), { status: 200 });
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(JSON.stringify({ error: 'Translation failed' }), {
      status: 500,
    });
  }
}
