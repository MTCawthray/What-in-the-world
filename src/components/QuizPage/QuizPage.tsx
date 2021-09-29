import React, {useEffect, useState} from 'react';
import Form from '../Form/Form'
import './QuizPage.css'

interface IQuizPageProps {
  currentCountry: {
    name: {
      common:string
    }
    languages:[{
      name:string
    }]
    population: number
    capital: string
    flag: string
    subregion: string
    currencies:[{
      name:string
    }]
    borders: string[]
  } 
  country: string
  name: string
}

const QuizPage: React.FC<IQuizPageProps> = ({ currentCountry }) => {
  const [questions, setQuestions] = useState< string>('')
  const [country, setCountry] = useState<any>()
  const questionList = [
    'What is the population of',
    'What is the capital of',
    'How many countries border'
  ]

  // ***********************************************
      /*UPDATING STATE, GETTING LOCAL STORAGE*/ 
  // ***********************************************
  useEffect(() => {
    if (currentCountry && currentCountry.name) {
      setCountry(currentCountry);
      getRandomElement(currentCountry.name.common);
    } else {
      setCountry(JSON.parse(localStorage.getItem('currentCountry')!));
      getRandomElement(JSON.parse(localStorage.getItem('currentCountry')!).name.common);
    }
  }, [])

  // ***********************************************
          /*RANDOMIZING QUIZ QUESTIONS*/ 
  // ***********************************************
  const getRandomElement = (name: string) => {
    const result = questionList[Math.floor(Math.random() * questionList.length)] +` ${name}`
    setQuestions((result));
  }
  
  return (
    <div className="quiz-display" >
        {currentCountry && (
        <div className="quiz-contents">
          {country && <img src={country.flags.svg} alt={`${currentCountry.name} flag`} className="flag-img" />}
          <div className="form-styling">
            {country && <h2>{questions}?</h2>}
            {country && <Form questions={`${questions} ${country.name.common}?`} currentCountry={country}/>}
          </div>  
        </div>
        )}
    </div>
  )
}

export default QuizPage;

