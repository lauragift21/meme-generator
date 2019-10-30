import * as React from 'react';
import { render } from 'react-dom';
import domtoimage from 'dom-to-image-more'
// import components
import Content from './components/content';
import Form from './components/form';
import Result from './components/result';
// import Styles
import './styles/styles.css';

function App() {
  // create refs
  let contentContainerRef = React.useRef<HTMLElement | null>(null)
  let resultContainerRef = React.useRef<HTMLElement | null>(null)

  // create useState hooks
  const [images, setImages] = React.useState([])
  const [activeImage, setActiveImage] = React.useState('')
  const [textTop, setTextTop] = React.useState('')
  const [textBottom, setTextBottom] = React.useState('')
  const [isMemeGenerated, setIsMemeGenerated] = React.useState(false)

  //  fetch images form external api
  async function fetchImage() {
    const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err));
    const { memes } = await imgData.data

    // update image state
    await setImages(memes);

    // update active image state
    await setActiveImage(memes[0].url);
  }

  // handle input elements
  // eslint-disable-next-line no-restricted-globals
  function handleInputChange(event) {
    if (event.target.name === 'text-top') {
      setTextTop(event.target.name)
    } else {
      setTextBottom(event.target.name)
    }
  }

// Choose random images from images fetched from api.imgflip.com
  function handleImageChange() {
    // Choose random image
    const image = images[Math.floor(Math.random() * images.length)]

    // Update activeImage state
    setActiveImage(image.url)
  }

  // handle image upload through file system
  function handleImageInputChange() {
  // eslint-disable-next-line no-restricted-globals
    setActiveImage(window.URL.createObjectURL(event.target.files[0]))
  }

  //  handle meme generation
  function handleMemeGeneration() {
    //  remove existing image
    if (resultContainerRef.current.childNodes.length > 0) {
      resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])
    }

    //  generate meme image from the content of the div
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      // create a new image
      const img = new Image()
      //  use url of the generated image
      img.src = dataUrl

      //  append new image to DOM
      resultContainerRef.current.appendChild(img)

      //  update meme generated state
      setIsMemeGenerated(true)
    })

    // reset the meme generator
    function handleMemeReset() {
      //  remove image from meme container
      resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])

      // update generated meme state
      setIsMemeGenerated(false)
    }

  }
  React.useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="App">
      <Form
        textTop={textTop}
        textBottom={textBottom}
        handleImageInputChange={handleImageInputChange}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleMemeGeneration={handleMemeGeneration}
        handleMemeReset={handleMemeReset}
        isMemeGenerated={isMemeGenerated}
      />

      <Content
        activeImage={activeImage}
        contentContainerRef={contentContainerRef}
        textBottom={textBottom}
        textTop={textTop}
      />

      <Result resultContainerRef={resultContainerRef} />
    </div>
  )
}

render(<App />, document.getElementById('root'));
