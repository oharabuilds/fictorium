import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "";
const generateAction = async (req, res) => {
  const {subject, author, shouldIncludeImages} = req.body

  console.log('Create Keywords...')
  const keywords = (await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Write a list of words and phrases that ${author} might have said`,
    temperature: 0.7,
    max_tokens: 100,
  })).data.choices.pop().text;

  console.log('Create Quotes...')
  const quotes = (await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Wrote a list of quotes by ${author}`,
    temperature: 0.3,
    max_tokens: 250,
  })).data.choices.pop().text;

  const prompt = `
    Write me a detailed short story with a beginning, a middle and an ending.
    Make sure the story has paragraphs.
    Write the story in the style of Dr. Seuss.
    Make it about the subject below.
    Use these keywords below.
    Use some of the quotes below.

    Subject: ${subject}
    Keywords: ${keywords}
    Quotes: ${quotes}
  `
  console.log('Create Story...')
  const story = (await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${prompt}`,
    temperature: 0.7,
    max_tokens: 500,
  })).data.choices.pop().text;

  console.log('Create Title...')
  const title = (await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `
    Write a zany title for the Story below.
    Story: ${story}
    `,
    temperature: 0.5,
    max_tokens: 20,
  })).data.choices.pop().text;

  const sentences = story
    .split(".")
    .filter(s => s)
    .map(s => `${s}.`)

  const images = [];
  if(shouldIncludeImages) {
    console.log('Create Images...', sentences.length)
    let i=0;
    for(const sentence of sentences) {
      try {
        i++
        console.log('createImage', i)
        const response = await openai.createImage({
          prompt: `Cartoon of ${sentence}`,
          n: 1,
          size: "1024x1024",
        });
        const imageUrl = response.data.data[0].url;
        images.push({
          sentence,
          imageUrl,
        })
      } catch(err) {
        console.error(err.message)
        images.push({
          sentence,
        })
      }
    }
  }

  console.log('Done...')
  res.status(200).json({ story, images, title, quotes, sentences });
};

export default generateAction;
