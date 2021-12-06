import './App.css';
import { useEffect, useState } from 'react';
// {
//     accelerations: 0.001,
//     prolongued_decelerations: 0.0,
//     abnormal_short_term_variability: 24.0,
//     mean_value_of_short_term_variability: 1.2,
//     percentage_of_time_with_abnormal_long_term_variability: 12.0,
//     mean_value_of_long_term_variability: 7.6,
//     histogram_mode: 134.0,
//     histogram_mean: 133.0,
//     histogram_median: 135.0,
//   }
function App() {
  const [inputs, setInputs] = useState({
    accelerations: 0,
    prolongued_decelerations: 0,
    abnormal_short_term_variability: 0,
    mean_value_of_short_term_variability: 0,
    percentage_of_time_with_abnormal_long_term_variability: 0,
    mean_value_of_long_term_variability: 0,
    histogram_mode: 0,
    histogram_mean: 0,
    histogram_median: 0,
  });
  const [resultado, setResultado] = useState('');
  const [isFetchFinish, setIsFetchFinish] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    fetch('http://172.24.99.219:8000/health/', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const result = data['Salud del feto predicho'];
        setResultado(result);
        setIsFetchFinish(true);
      });
  };

  return (
    <div className="App">
      {isFetchFinish ? (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'gray',
              opacity: 0.5,
              cursor: 'pointer',
            }}
            onClick={() => setIsFetchFinish(false)}
          ></div>
          <div
            className={resultado === 'Normal' ? 'ToastNormal' : 'ToastAnormal'}
          >
            El resultado del examen es: {resultado}
          </div>
        </div>
      ) : null}

      <div className="Modal">
        <div style={{ display: 'flex' }}>
          <div>
            <img src="doctor.png" alt="doctor" style={{ width: 470 }} />
          </div>
          <div style={{ paddingLeft: 20, width: '300px' }}>
            <h1 className="Title">
              Sistema de clasificación para la salud fetal
            </h1>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  // border: '1px solid red',
                }}
              >
                <div className="InputSection">
                  <div>Accelerations</div>
                  <input
                    className="Input"
                    type="text"
                    name="accelerations"
                    value={inputs.accelerations}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Prolongued decelerations</div>
                  <input
                    className="Input"
                    type="text"
                    name="prolongued_decelerations"
                    value={inputs.prolongued_decelerations}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Abnormal short term variability</div>
                  <input
                    className="Input"
                    type="text"
                    name="abnormal_short_term_variability"
                    value={inputs.abnormal_short_term_variability}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Mean value of short term variability</div>
                  <input
                    className="Input"
                    type="text"
                    name="mean_value_of_short_term_variability"
                    value={inputs.mean_value_of_short_term_variability}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>
                    Percentage of time with abnormal long term variability
                  </div>
                  <input
                    className="Input"
                    type="text"
                    name="percentage_of_time_with_abnormal_long_term_variability"
                    value={
                      inputs.percentage_of_time_with_abnormal_long_term_variability
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Mean value of long term variability</div>
                  <input
                    className="Input"
                    type="text"
                    name="mean_value_of_long_term_variability"
                    value={inputs.mean_value_of_long_term_variability}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Histogram mode</div>
                  <input
                    className="Input"
                    type="text"
                    name="histogram_mode"
                    value={inputs.histogram_mode}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Histogram mean</div>
                  <input
                    className="Input"
                    type="text"
                    name="histogram_mean"
                    value={inputs.histogram_mean}
                    onChange={handleChange}
                  />
                </div>

                <div className="InputSection">
                  <div>Histogram median</div>
                  <input
                    className="Input"
                    type="text"
                    name="histogram_median"
                    value={inputs.histogram_median}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <input type="submit" value="Submit" className="Submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
