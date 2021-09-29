import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Answers.css';

interface IAnswerProps{
  questions: string
  guess: string 
  currentCountry: {
    name: {
    common:string
    }
    languages:{
      name:string
    }
    population: number
    capital: string
    subregion: string
    borders: string[]
    currencies:{
        name:string
    }
    flag: string
  } 
}

const Answers: React.FC<IAnswerProps> = ({ currentCountry, questions, guess }) => {
  const [answer, setAnswer] = useState<string | number>('');
  const currency= currentCountry.currencies;
  const [languages, setLanguage] = useState<string[]>();

   // *******************************************************
    /*DETERMINE USERS INPUTED ANSWER TO CORRECT/INCORRECT*/ 
   // *******************************************************
  const checkPopulation = () => {
    if (Number(guess) < (currentCountry.population + 50000) && Number(guess) > (currentCountry.population - 50000)) {
      setAnswer(`Correct! The population of ${currentCountry.name} is ${currentCountry.population.toLocaleString('en-US')}!`);
    } else {
      setAnswer(`Incorrect- the population of ${currentCountry.name} is ${currentCountry.population.toLocaleString('en-US')}.`);
    }
  }

  const checkCapital = () => {
    if (guess[0].toUpperCase() === currentCountry.capital[0].toUpperCase()) {
      setAnswer(`Correct! The capital of ${currentCountry.name.common} is ${currentCountry.capital}! `);
    } else {
      setAnswer(`Incorrect- the capital of ${currentCountry.name.common} is ${currentCountry.capital}.`);
    }
  }

  const checkBorders = () => {
    if(currentCountry.borders) {
      if (Number(guess) === currentCountry.borders.length) {
        setAnswer(`Correct! ${currentCountry.name.common} shares a border with ${currentCountry.borders.length} countries!`);
      } else {
        setAnswer(`Incorrect- ${currentCountry.name.common} shares a border with ${currentCountry.borders.length} countries.`);
      }

    }else {
      setAnswer(`Incorrect- ${currentCountry.name.common} does not have neighboors`)
    }
    
  }

   // ***********************************************
        /*DEFINE INPUT TYPE TO CHECK ANSWER*/ 
   // ***********************************************
  const findAnswer = (quizQuestion: string) => {
    if (quizQuestion.includes(`population`)) {
      checkPopulation();
    } else if (quizQuestion.includes(`capital`)) {
      checkCapital();
    } else if (quizQuestion.includes(`border`)) {
      checkBorders();
    }
  }

   // ***********************************************
        /*ITERATE OVER LANGUAGES OF GIVEN COUNTRY*/ 
   // ***********************************************
  // const setLanguages = () => {
  //   const checkLanguage = currentCountry.languages.map(country => `${country.name} `)
  //   setLanguage(checkLanguage)
  // }

  useEffect(() => {
    findAnswer(questions)
    // setLanguages()
  }, [])

  return (
    <article className="answer-display">
      {questions.includes('border')|| questions.includes('population') && (
        <p className="user-guess">
          Your guess was {Number(guess).toLocaleString('en-US')}
        </p>
      )}
      {questions.includes('capital') && <p className="user-guess"> Your guess was {guess} </p> }
      <h3>
        {answer}
      </h3>
      <section className="extra-facts">
        <p className='country-stats'>
          {currentCountry.name.common} is located in {currentCountry.subregion}.
          This country has the currency of and the population speaks .
        </p>
      </section>
      <Link to="/" >
        <button className='home-btn'>
          Take Me Home
        </button>
      </Link>
    </article>
  )
}

export default Answers;

