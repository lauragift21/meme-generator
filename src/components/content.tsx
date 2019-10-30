import * as React from 'react';

// Interface for Content Component
interface ContentInterface {
  activeImage: string;
  contentContainerRef: React.RefObject<any>;
  textBottom: string;
  textTop: string;
}

const Content = (props: ContentInterface) => {
  return (
    <div className="content">
    {/* Image Preview */}
      <img src={props.activeImage} alt="Meme"/>
      {/* Top Text */}
      <h1>{props.textTop}</h1>
      {/* Bottom Text */}
      <h2>{props.textBottom}</h2>
    </div>
  )
}

export default Content;
