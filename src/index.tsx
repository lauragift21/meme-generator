import * as React from 'react';
import { render } from 'react-dom';
import domtoimage from 'dom-to-image-more';
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

 // Fetch images from https://api.imgflip.com/get_memes
 async function fetchImage() {
  // Get the memes
  const imgData = await fetch('https://api.imgflip.com/get_memes').then(res => res.json()).catch(err => console.error(err))
  const { memes } = await imgData.data

  // Update images state
  await setImages(memes)

  // Update activeImage state
  await setActiveImage(memes[0].url)
}

// Handle input elements
function handleInputChange(event) {
  if (event.target.name === 'text-top') {
    // Update textTop state
    setTextTop(event.target.value)
  } else {
    // Update textBottom state
    setTextBottom(event.target.value)
  }
}

// Choose random images from images fetched from api.imgflip.com
function handleImageChange() {
  // Choose random image
  const image = images[Math.floor(Math.random() * images.length)]

  // Update activeImage state
  setActiveImage(image.url)
}

// Handle image upload via file input
function handleImageInputChange(event) {
  // Update activeImage state
  setActiveImage(window.URL.createObjectURL(event.target.files[0]))
}

// Handle meme generation
function handleMemeGeneration() {
  // Remove any existing images
  if (resultContainerRef.current.childNodes.length > 0) {
    resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])
  }

  // Generate meme image from the content of 'content' div
  domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
    // Create new image
    const img = new Image()

    // Use url of the generated image as src
    img.src = dataUrl

    // Append new image to DOM
    resultContainerRef.current.appendChild(img)

    // Update state for isMemeGenerated
    setIsMemeGenerated(true)
  })
}

// Handle resetting the meme generator/removing existing pictures
function handleMemeReset() {
  // Remove existing child node inside result container (generated meme image)
  resultContainerRef.current.removeChild(resultContainerRef.current.childNodes[0])

  // Update state for isMemeGenerated
  setIsMemeGenerated(false)
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
