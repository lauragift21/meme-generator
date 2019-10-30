import * as React from 'react';

// Interface for Form Component
interface FormInterface {
  isMemeGenerated: boolean;
  textBottom: string;
  textTop: string;
  handleImageChange: () => void;
  handleImageInputChange: (event: React.ChangeEvent) => void;
  handleInputChange: (event: React.ChangeEvent) => void;
  handleMemeGeneration: () => void;
  handleMemeReset: () => void;
}

//  Form Component
const Form = (props: FormInterface) => {
  return (
    <div className="form">
      <div className="form__inputs">
      {/* input for text at the top */}
        <input
          name="text-top"
          type="text"
          // placeholder="Text Top"
          value={props.textTop}
          onChange={props.handleInputChange}
        />
        {/* input for text at the bottom */}
        <input
          name="text-bottom"
          placeholder="Text Bottom"
          type="text"
          value={props.textBottom}
          onChange={props.handleInputChange}
        />
      </div>
      <div className="form__btns">
        {/* Button to pull image from API */}
        <button
          className="btn btn-primary"
          type="button"
          onClick={props.handleImageChange}
        >
          Change Image
        </button>

        {/* input field to upload image  */}
        <label
          className="btn btn-primary"
          htmlFor="fileInput"
        >
          Load Image
          <input
            type="file"
            name="fileInput"
            id="fileInput"
            accept=".jpg, .jpeg, .png"
            onChange={props.handleImageInputChange}
            hidden
          />
        </label>

        {/* button to generate meme */}
        <button
          className="btn btn-primary"
          onClick={props.handleMemeGeneration}
        >
          Generate Meme
        </button>

        {/* button to remove image from the DOM */}
        <button
          className="btn btn-danger"
          type="button"
          onClick={props.handleMemeReset}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Form;
