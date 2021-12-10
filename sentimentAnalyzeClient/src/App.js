import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import SentimentTable from './SentimentTable.js';
import React from 'react';

class App extends React.Component {
    componentDidMount() {
        document.title = "Sentiment Analyzer"
    }

    /*
    We are setting the component as a state named innercomp.
    When this state is accessed, the HTML that is set as the 
    value of the state, will be returned. The initial input mode
    is set to text
    */
    state = {
        innercomp: <textarea rows="4" cols="50" id="textinput" />,
        mode: "text",
        sentimentOutput: [],
        sentiment: true
    }

    /*
    This method returns the component based on what the input mode is.
    If the requested input mode is "text" it returns a textbox with 4 rows.
    If the requested input mode is "url" it returns a textbox with 1 row.
    */

    renderOutput = (input_mode) => {
        let rows = 1
        let mode = "url"
        //If the input mode is text make it 4 lines
        if (input_mode === "text") {
            mode = "text"
            rows = 4
        }
        this.setState({
            innercomp: <textarea rows={rows} cols="50" id="textinput" />,
            mode: mode,
            sentimentOutput: [],
            sentiment: true
        });
    }

    showErrorMessage = errMsg => {
        this.setState({ sentimentOutput: <p>Oops, something went wrong: {errMsg}</p> });
    }

    sendForSentimentAnalysis = () => {
        this.setState({ sentiment: true, sentimentOutput: <p>Loading, please wait...</p> });
        let url = ".";
        let mode = this.state.mode
        url = url + "/" + mode + "/sentiment?" + mode + "=" + document.getElementById("textinput").value;

        fetch(url).then((response) => {
            try {
                response.json().then((data) => {
                    if (data.error) {
                        this.showErrorMessage(data.error);
                        return;
                    }
                    this.setState({ sentimentOutput: data.label });
                    let output = data.label;
                    let color = "white"
                    switch (output) {
                        case "positive": color = "#00a800"; break; // green
                        case "negative": color = "#d40404"; break; // red
                        default: color = "#fcba03"; // yellow
                    }
                    output = <div style={{ color: color, fontSize: 20 }}>{output}</div>
                    this.setState({sentimentOutput: <SentimentTable sentiment={output}/>})
                })
            } catch (err) {
                this.showErrorMessage(err.message);
            }
        }).catch(err => {
            this.showErrorMessage(err);
        });
    }

    sendForEmotionAnalysis = () => {

        this.setState({ sentiment: false, sentimentOutput: <p>Loading, please wait...</p> });
        let url = ".";
        let mode = this.state.mode
        url = url + "/" + mode + "/emotion?" + mode + "=" + document.getElementById("textinput").value;

        fetch(url).then((response) => {
            try {
                response.json().then((data) => {
                    if (data.error) {
                        this.showErrorMessage(data.error);
                        return;
                    }
                    this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
                })
            } catch (err) {
                this.showErrorMessage(err.message);
            }
        }).catch(err => {
            this.showErrorMessage(err.message);
        });
    }

    render() {
        return (
            <div className="App">
                <h1>Sentiment Analyzer</h1>
                <button className="btn btn-info" style={{ textDecoration: this.state.mode === "text" ? "underline" : 'none' }} onClick={() => { this.renderOutput('text') }}>Text</button>
                <button className="btn btn-dark" style={{ textDecoration: this.state.mode === "url" ? "underline" : 'none' }} onClick={() => { this.renderOutput('url') }}>URL</button>
                <br /><br />
                {this.state.innercomp}
                <br />
                <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
                <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
                <br />
                {this.state.sentimentOutput}
            </div>
        );
    }
}

export default App;
