// REACT
import React, { useState, useEffect } from "react";
// COMPONENTES
import Layout from "../../components/layout";
import Seo from "../../components/seo";
// API's
import DatePicker from "react-datepicker";
import { Link } from "gatsby";
import { format } from "date-fns";
import range from "lodash/range";
import axios from "axios";
// CSS
import "../../styles/calendar.css";
import "react-datepicker/dist/react-datepicker.css";
// TEMPORAL 
import { en, es, fr, nb } from "date-fns/locale";

const baseURL = "https://connect-dev.spotlio.com/yield-view";

const CalendarPage = () => {
  const [startDate, setStartDate] = useState(() => {
    const storedMonth = localStorage.getItem("continueMonth");
    return storedMonth ? new Date(storedMonth) : new Date();
  });
  const [post, setPost] = useState();
  const [dateLang, setDateLang] = useState(getDefaultLocale());
  const years = range(2024, 2026);

  useEffect(() => {
    createPost(); 
    localStorage.setItem("continueMonth", startDate.toISOString());
  }, [[startDate]]);

  function getDefaultLocale() {
    const userLang = navigator.language.split("-")[0];
    switch (userLang) {
      case "es":
        return es;
      case "nb":
        return nb;
      case "fr":
        return fr;
      default:
        return en;
    }
  }

  const handleMonthChange = (newDate) => {
    setStartDate(newDate);
    createPost(newDate);
  };

  const SkeletonLoader = () => (
    <div className="loading-skeleton">
      <div className="loading-spinner"></div>
      <p className="loading-text">Cargando...</p>
    </div>
  );

  function createPost(selectedDate = startDate) {
    const startMonth = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const startYear = selectedDate.getFullYear().toString();

    axios.post(baseURL, {
      "id": 3, // hardcoded
      "salesId": 3316173, // hardcoded
      "productCategoryId": 117, // hardcoded
      "days": 1, // hardcoded
      "startMonth": startMonth, // state del mes de la fecha seleccionada
      "startYear": startYear, // state del año de la fecha seleccionada
      "ageCategory": 8, // hardcoded
      "sessionId": "ac50779c-0722-4385-8919-7984b6f6b9b2" // hardcoded
    })
      .then((response) => {
        setPost(response.data.result);
      });
  }

  class CustomHeader extends React.Component {
    shouldComponentUpdate(nextProps) {
      if (nextProps.date !== this.props.date) return true;
      if (nextProps.prevMonthButtonDisabled !== this.props.prevMonthButtonDisabled) return true;
      if (nextProps.nextMonthButtonDisabled !== this.props.nextMonthButtonDisabled) return true;
      return false;
    }
    render() {
      return (
        <div className="flex mb-3">
          <button className="text-lg pl-6 pr-3"
            onClick={this.props.decreaseMonth}
            disabled={this.props.prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <div className="flex-1 flex justify-center my-auto">
            <select 
              className="calendarSelect text-center w-[130px] h-8 capitalize text-base font-semibold border"
              defaultValue={format(this.props.date, "M") - 1}
              onChange={({ target: { value } }) => this.props.changeMonth(value)}
            >
              {range(0, 12).map((option) => (
                <option key={option} value={option}>
                  {format(new Date(2024, option, 3), "MMMM", { locale: dateLang })}
                </option>
              ))}
            </select>
            <select className="calendarSelect text-center ml-4 w-[80px] h-8 capitalize text-base font-semibold border"
              defaultValue={this.props.date.getFullYear()}
              onChange={({ target: { value } }) => this.props.changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button className="text-lg pl-3 pr-6"
            onClick={this.props.increaseMonth}
            disabled={this.props.nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      );
    }
  }

  const renderDayContents = (day, date) => {
    const myDate = new Date(date);
    const formattedDate = `${myDate.getFullYear()}-${(myDate.getMonth() + 1 < 10 ? '0' : '') + (myDate.getMonth() + 1)}-${(myDate.getDate() < 10 ? '0' : '') + myDate.getDate()}`;
    const dayObject = post?.find((day) => day.Date === formattedDate);
    const isToday = new Date().toDateString() === myDate.toDateString();
    const isPreviousDay = myDate < new Date() && !isToday;
    const isWeekday = myDate.getDay() !== 0 && myDate.getDay() !== 6;
  
    return (
      <div key={day} className={`flex flex-col h-[100%] justify-between pb-2 border border-gray-100 ${isPreviousDay && isWeekday ? 'bg-gray-400' : ''} ${isToday ? 'bg-blue-400' : ''}`}>
        <span className={`mt-1 ml-2 text-sm text-left `}>
          {day}
        </span>
        {dayObject ? (
          <div className="flex justify-center mx-3">
            <Link className="px-1 lg:px-5 text-white bg-red-500 rounded-sm flex"
              to={`/Calendar/list?date=${formattedDate}`}
            >
              <p className="pr-1">$</p>
              {!dayObject.Price ? <SkeletonLoader /> : dayObject.Price}
            </Link>
          </div>
        ) : null}
      </div>
    );
  }; 
  
  
  return (
    <Layout pageTitle="My Calendar">
      <div className="flex mx-auto">
        <div>
          <ul>
            <li>
              <button onClick={() => setDateLang(es)}>Español</button>
            </li>
            <li>
              <button onClick={() => setDateLang(en)}>English</button>
            </li>
            <li>
              <button onClick={() => setDateLang(nb)}>Noruego</button>
            </li>
            <li>
              <button onClick={() => setDateLang(fr)}>Frances</button>
            </li>
          </ul>
        </div>
        <DatePicker
          selected={startDate}
          onSelect={(date) => setStartDate(date)}
          onChange={(date) => handleMonthChange(date)}
          onMonthChange={(newDate) => handleMonthChange(newDate)}
          locale={dateLang}
          inline
          calendarClassName="mt-4 mx-auto"
          renderCustomHeader={({ decreaseMonth, date, increaseMonth, changeYear, changeMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
            <CustomHeader
              decreaseMonth={decreaseMonth}
              date={date}
              increaseMonth={increaseMonth}
              changeYear={changeYear}
              changeMonth={changeMonth}
              prevMonthButtonDisabled={prevMonthButtonDisabled}
              nextMonthButtonDisabled={nextMonthButtonDisabled}
            />
          )}
          weekDayClassName={() => "py-1 !text-base !text-white !bg-gray-900 !uppercase"}
          renderDayContents={renderDayContents}
          dayClassName={(date) => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const dayOfWeek = date.getDay();
            const isCurrentMonth = date.getMonth() === currentMonth;
            let classNames = "!w-12 lg:!w-24 h-14 lg:h-24 !text-sm";
            if (dayOfWeek === 0 || dayOfWeek === 6) {
              classNames += " bg-gray-200";
            }
            return classNames;
          }}
        />



      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="My Calendar" />;
export default CalendarPage;
