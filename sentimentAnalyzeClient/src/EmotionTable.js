import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      //Returns the emotions as an HTML table
      return (  
        <div>
          <table className="table table-bordered">
              <thead>
                  <tr>
                    <th>Emotion</th>
                    <th>Confidence level</th>
                  </tr>
              </thead>
            <tbody>
            {
                  Object.entries(this.props.emotions).map(function(emotion) {
                    return (
                        <tr>
                        <td>{emotion[0]}</td>
                        <td>{emotion[1]}</td>
                        </tr>
                    )
                    })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;