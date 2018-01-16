import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    handleSelectedOption = () => {
        this.setState(() => ({selectedOption: undefined}))
    }
    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }))
    }
    handlePickOption = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        this.setState(() => ({
            selectedOption: option
        }))
    }
    handleAddOption = (option) => {
        const numbersDetect= option.match(/\d+/g); // to check for numbers input
        if (!option) {
            return 'Enter valid value to add item'
        } else if (!isNaN(option) || numbersDetect !== null) {
            return 'Please enter Alphabetical value, numbers not allowed' // to disallow input for numbers
        } else if (this.state.options.indexOf(option.toLowerCase()) > -1) {
            return 'This option already exists'
        }
        this.setState((prevState) => ({ 
            options: prevState.options.concat(option)
        })
    )}
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }))
    }
    componentDidMount () {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            // Do nothing at all
        } 
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json)
        }
    };
    render() {
        const title = 'Indecision'
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <div className="container">    
                 <Header title= {title} subtitle={subtitle} />
                 <Action 
                     hasOptions={this.state.options.length > 0} // Action buttton 
                    handlePickOption={this.handlePickOption}
                 />
                 <div className="widget">

                 <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                 />
               

                 <AddOption
                    handleAddOption = {this.handleAddOption}
                 />
                 </div>
                </div>
                <OptionModal 
                selectedOption= {this.state.selectedOption}
                handleSelectedOption = {this.handleSelectedOption}
                />
            </div>
        )
    }
};

export default IndecisionApp;
