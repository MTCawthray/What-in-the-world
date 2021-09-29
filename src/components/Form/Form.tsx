import React, { useState} from 'react';
import Answer from '../Answers/Answers'
import './Form.css';

interface IFormProps{
  questions: string
  currentCountry: {
    name: {
      common:string
    }
    languages:{
      name:string
    }
    population: number
    capital: string
    flag: string
    subregion: string
    borders: string[]
    currencies:{
        name:string
    }
  } 
}

const Form:React.FC <IFormProps> = ({ questions, currentCountry}) => {
  const [answer,setAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // ***********************************************
          /*BUTTON SUBMIT HELPER FUNCTION*/ 
  // ***********************************************
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!answer) {
      return
    }
    setIsSubmitted(true);
  }

  return (
    <div className="display-area">
      {(isSubmitted && answer) && 
        <Answer 
          guess={answer} 
          currentCountry={currentCountry} 
          questions={questions}
        /> }
      {!isSubmitted && (
        <form className="guess-form">
          <label>
            <input type="text" 
              className='answer-input' 
              name='answer' value={answer} 
              placeholder="Make a guess here!"
              onChange={(e:any) => setAnswer(e.target.value.match(/[A-Za-z0-9]+/g)) }
              required pattern="[A-Za-z0-9]+" 
            />
          </label>
          <button className='submit-button' onClick={handleSubmit}>
            Submit Answer
          </button>
        </form>
      )}
      {answer === null && 
        <p className="input-error-message">
          Please only enter valid characters in your guess!
        </p>} 
    </div>
  )
}

export default Form;