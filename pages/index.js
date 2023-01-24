import { useState } from 'react';
import Head from 'next/head';
import { Gallery } from "react-grid-gallery";
import shuffle from 'shuffle-array'
import fictorium from '../assets/fictorium.png'
import Image from 'next/image'
import HomeStyled from './index.styled'

const Home = () => {
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [data, setDate] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [shouldIncludeImages, setShouldIncludeImages] = useState(false)
  const [backgroundImages] = useState(shuffle(process.env.backgroundImages))

  // this shows the working state to the user
  const emojiStates = {
    welcome: "🤗",
    thinking: "🤔",
    laughing: "😂",
  }

  const [emojis, setEmojis] = useState(emojiStates.welcome)
  const callGenerateEndpoint = async (e) => {
    e && e.preventDefault()
    setEmojis(emojiStates.thinking)
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: author,
        subject: subject,
        shouldIncludeImages: shouldIncludeImages
      }),
    });
    setDate(await response.json())
    setIsGenerating(false);
    setEmojis(emojiStates.laughing)
  }

  return (
    <HomeStyled>
      <Head>
        <title>Short Story Creator</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap" rel="stylesheet" />
      </Head>
      <div className='emojis'>{emojis}</div>
      <div className='background'>
        <Gallery images={backgroundImages} />
      </div>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Welcome one and all to the wondrous oddity known as THE FICTORIUM!</h1>
            <Image className='fictorium-image' src={fictorium} alt="Fictorium" />
            <p>Here you will find the most extraordinary, curious, and captivating tales of the ages, spanning from fantasy to science-fiction to the bizarre and beyond. Step inside and explore an ever-growing library of stories, poems, and more, all crafted with love and care.
            </p>
            <p>You'll also find plenty of art and multimedia creations inspired by the Fictorium's unique and eclectic atmosphere. So come on in and get lost in the imaginings of many a talented and creative mind.</p>
          </div>
        </div>
        <div className="prompt-container">
          <form onSubmit={callGenerateEndpoint}>
            <h2>Who should tell the story?</h2>
            <input
              type='text'
              placeholder="ex. Winston Churchill, Britney Spears, Donald Duck"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
            <h2>What should it be about?</h2>
            <input
              type='text'
              placeholder="ex. quantum computers, moon walking, carrots"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
            <div className='check-images'>
              <input
                type='checkbox'
                placeholder="ex. quantum computers, moon walking, carrots"
                checked={shouldIncludeImages}
                onChange={() => setShouldIncludeImages(!shouldIncludeImages)}
              />
              <h3>Do you want to include pictures with your story?</h3>
            </div>
            <div className="prompt-buttons">
              <input type="submit" value="Create!" />
            </div>
          </form>
          {data && (
            <div className="images">
            <h2>{data.title}</h2>
            <p>{data.story}</p>
            {data.images.map((image, i) => (
              <div key={`image-${image.imageUrl}-${i}`} className='image-container'>
                <p>{data.sentences[i]}</p>
                {image.imageUrl && <img src={image.imageUrl} />}
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </HomeStyled>
  );
};


export default Home;

