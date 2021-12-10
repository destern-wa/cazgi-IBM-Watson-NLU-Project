import React from 'react';
import './bootstrap.min.css';

class SentimentTable extends React.Component {
    render() {
        // Returns the sentiment as a HTML table
        return (
            <div>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Sentiment:</th>
                            <td>{this.props.sentiment}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}
export default SentimentTable;