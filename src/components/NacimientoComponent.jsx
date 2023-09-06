import React, {useState} from 'react'
import DatePicker, {registerLocale} from 'react-datepicker'
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getYear";
import getDate from "date-fns/getYear";
import range from "lodash/range";
import moment from 'moment';


const NacimientoComponent = ({nacimiento, setNacimiento}) => {

    console.log('interno', new Date(nacimiento));
    const [startDate, setStartDate] = useState(nacimiento && new Date(nacimiento));
    const years = range(1970, getYear(new Date()) + 1, 1);
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];


    const handleChangeDate = (date) =>{
        setStartDate(date);
        const mes = ("0" + (date.getMonth() + 1)).slice(-2)
        const dia = ("0" + date.getDate()).slice(-2)
        const año = ( date.getFullYear());
        const nacimiento = `${año}${mes}${dia}`;
        setNacimiento(nacimiento) 

    }
    return (
      <DatePicker id='nacimientoPicker'
        placeholderText='Nacimiento'
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,

        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
  
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
  
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => handleChangeDate(date)}
      />
    );
  };

export default NacimientoComponent