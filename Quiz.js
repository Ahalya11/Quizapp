import React,{Component} from 'react';

import Question from './Question';
import Answer from './Answer';
import './Quiz.css';
class Quiz extends Component{
    
    state={
        questions:{
            1:"Which is the largest country in the world?",
            2:"Which is the closest planet to the Sun?"
        },
        answers:{
            1:{
                1:"America",
                2:"Russia",
                3:"India"
            },
            2:{
                1:"Mercury",
                2:"Earth",
                3:"Mars"
            }
        },
        correctAnswers:{
            1:'2',
            2:'1'
        },
        correctAnswer:0,
        clickedAnswer:0,
        step:1,
        score:0,
        time:1
    }
componentDidMount(){
     this.intervalId=setInterval(() => this.tick(),1000);
}
componentWillUnmount(){
    clearInterval(this.intervalId);
}
tick(){
    this.setState({time:new Date().getSeconds()});
}
    checkAnswer=answer => {
        const{correctAnswers,step,score}=this.state;
        if(answer===correctAnswers[step]){
            this.setState({
                score:score + 1,
                correctAnswer:correctAnswers[step],
                clickedAnswer:answer
            });
        } else {
            this.setState({
                correctAnswer:0,
                clickedAnswer:answer

            });
        }
    }
    nextStep = (step) => {
        this.setState({
            step:step+1,
            correctAnswer:0,
            clickedAnswer:0
        });
    }
    previousStep = (step) => {
        this.setState({
            step:step-1,
            correctAnswer:0,
            clickedAnswer:0
        });
    }
    render(){
        let{questions,answers,correctAnswer,clickedAnswer,step,score}=this.state;
        
        return(
            <div>
            <div className="Content">
                {step <= Object.keys(questions).length ?
                (<>
                <Question question={questions[step]} />
                <Answer answer={answers[step]}
                   step={step}  
                   checkAnswer={this.checkAnswer}
                   correctAnswer={correctAnswer}
                   clickedAnswer={clickedAnswer}  />
                   <button className="NextStep" 
                   enabled={
                       clickedAnswer 
                       && Object.keys(questions) <= step
                       ? true:false
                   }
                   onClick={() => this.previousStep(step)}>Previous</button>
                   <button className="NextStep" 
                   disabled={
                       clickedAnswer && Object.keys(questions) >= step
                       ? true:false
                   }
                   onClick={() => this.nextStep(step)}>Next</button>
                   </>) : (
                       <div className="finalPage">
                           <h1>Quiz is over!</h1>
                          
                              
                           <p>Your score is {score} of {Object.keys(questions).length}</p>;
                           <p>Thank you!</p>
                       </div>
                   )
                   
            }
                </div>
                <h1>{this.state.time}</h1>
                </div>
                );
                
        
    }
}
export default Quiz;