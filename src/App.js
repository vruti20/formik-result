
import './App.css';
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
// import { yup } from "yup";


function App() {
  const [pe, setPe] = useState({
    firstName: '',
    lastName: '',
    maths: '',
    eng: '',
    total: '',
    per: ''
  })
  const [main, setMain] = useState([])
  const [re, setRe] = useState(-1)

  const deletehandler = (index) => {
    const copy = [...main]
    copy.splice(index, 1)
    setMain(copy)
  }
  let edit = (values, index) => {

    setPe(values)
    setRe(index)

  }
  return (
    <div className="App">

      <Formik
        initialValues={pe}
        enableReinitialize
        onSubmit={async (values) => {

          let sum = parseInt(values.maths) + parseInt(values.eng);
          let total = sum / 2;
          if (values.firstName && values.lastName && values.maths && values.eng) {
            if (re >= 0) {
              let copy1 = [...main]
              copy1.splice(re, 1, { firstName: (values.firstName), lastName: (values.lastName), maths: (values.maths), eng: (values.eng), total: (sum), per: (total) })
              setMain(copy1)
            }
            else {
              let copy = [...main]
              copy.push({ firstName: (values.firstName), lastName: (values.lastName), maths: (values.maths), eng: (values.eng), total: (sum), per: (total) })
              setMain(copy)
              console.log(copy);

            }
            setPe({
              firstName: '',
              lastName: '',
              maths: '',
              eng: '',
              total: '',
              per: ''
            })

            setRe(-1)
          }

        }}

      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="name" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="last name" />

          <label htmlFor="maths">maths</label>
          <Field id="maths" name="maths" placeholder="maths" />

          <label htmlFor="eng">english</label>
          <Field id="eng" name="eng" placeholder="english" />

          <button type="submit">Submit</button>

        </Form>
      </Formik>
      <table border={1}>
        <tr>
          <td>frist name</td>
          <td>last name</td>
          <td>maths</td>
          <td>eng</td>
          <td>total</td>
          <td>per</td>
          <td>delete</td>
          <td>edit</td>
        </tr>

        {
          main.map((values, index) => {
            return (
              // re===main[index]? setRe:
              <tr>
                <td>{values.firstName}</td>
                <td>{values.lastName}</td>
                <td>{values.maths}</td>
                <td>{values.eng}</td>
                <td>{values.total}</td>
                <td>{values.per}</td>
                <td><button onClick={() => deletehandler(index)}>delete</button></td>
                <td><button onClick={() => edit(values, index)}>edit</button></td>

              </tr>
            )
          })
        }
      </table>
    </div>
  );
}

export default App;
