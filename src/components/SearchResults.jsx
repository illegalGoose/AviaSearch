import { useState } from "react";
import Divider from "@mui/material/Divider";

export default function SearchResults({ tickets }) {
  const [ticketsNum, setTicketsNum] = useState(2);

  return tickets.slice(0, ticketsNum).map((item, index) => {
    return (
      <div
        className="results"
        style={{ marginBottom: 25, fontFamily: "sans-serif" }}
      >
        {item.legs.map((leg, index) => {
          const durationHours = Math.floor(leg.duration / 60);
          const durationMinutes = leg.duration % 60;
          const durationTime = durationHours + " ч " + durationMinutes + " мин";
          const firstSegment = leg.segments[0];
          const lastSegment = leg.segments[leg.segments.length - 1];
          const departureCity =
            firstSegment.departureCity || firstSegment.departureAirport;
          const arrivalCity =
            lastSegment.arrivalCity || lastSegment.arrivalAirport;
          const departureTime = firstSegment.departureDate.indexOf("T");
          const arrivalTime = lastSegment.arrivalDate.indexOf("T");
          const airline = firstSegment.airline.caption;
          const transfer = leg.segments.length - 1;
          const departureDayMonth = new Intl.DateTimeFormat("ru", {
            day: "numeric",
            month: "short",
          }).format(new Date(firstSegment.departureDate));
          const departureWeekDay = new Intl.DateTimeFormat("ru", {
            weekday: "short",
          }).format(new Date(firstSegment.departureDate));
          const arrivalDayMonth = new Intl.DateTimeFormat("ru", {
            day: "numeric",
            month: "short",
          }).format(new Date(lastSegment.arrivalDate));
          const arrivalWeekDay = new Intl.DateTimeFormat("ru", {
            weekday: "short",
          }).format(new Date(lastSegment.arrivalDate));
          return (
            <div className="route">
              {index === 0 ? (
                <div
                  className="companyAndPrice"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingInline: 15,
                    backgroundColor: "rgb(12 131 190)",
                    color: "white",
                    height: 50,
                    fontFamily: "sans-serif",
                  }}
                >
                  <span style={{ paddingTop: 10 }}>{item.carrier.caption}</span>
                  <div
                    className="price"
                    style={{ textAlign: "right", paddingTop: 5 }}
                  >
                    <span style={{ fontSize: 25 }}>
                      {item.price.total.amount}&nbsp;&#8381;
                    </span>
                    <h6 style={{ margin: 0, fontWeight: 100 }}>
                      Стоимость для одного взрослого пассажира
                    </h6>
                  </div>
                </div>
              ) : null}
              <div
                style={{ borderBottom: "1px solid lightgrey", padding: 10 }}
                className="routeName"
              >
                {departureCity.caption}, &nbsp;
                {firstSegment.departureAirport.caption}
                &nbsp;
                <span style={{ color: "rgb(12 131 190)" }}>
                  ({firstSegment.departureAirport.uid}) &#8594;
                </span>
                &nbsp;{arrivalCity.caption}, &nbsp;
                {lastSegment.arrivalAirport.caption}
                &nbsp;
                <span style={{ color: "rgb(12 131 190)" }}>
                  ({lastSegment.arrivalAirport.uid})
                </span>
              </div>
              <div
                className="travelTime"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 12px 0 12px",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "20px" }}>
                  {firstSegment.departureDate.substr(departureTime + 1, 5)}
                  &nbsp;
                  <span style={{ color: "rgb(12 131 190)", fontSize: "15px" }}>
                    {departureDayMonth}&nbsp;{departureWeekDay}
                  </span>
                </div>
                {durationTime}
                <div style={{ fontSize: "20px" }}>
                  <span style={{ color: "rgb(12 131 190)", fontSize: "15px" }}>
                    {arrivalDayMonth}&nbsp;{arrivalWeekDay}
                  </span>
                  &nbsp;{lastSegment.arrivalDate.substr(arrivalTime + 1, 5)}
                </div>
              </div>
              {transfer > 0 ? (
                <Divider
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: 500,
                    marginLeft: 50,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingBottom: 5,
                      color: "orange",
                    }}
                  >
                    {transfer + " пересадка"}
                  </span>
                </Divider>
              ) : (
                <Divider
                  style={{
                    padding: 5,
                    marginBottom: 10,
                    display: "flex",
                    justifyContent: "center",
                    width: 500,
                    marginLeft: 50,
                  }}
                ></Divider>
              )}
              <div className="companyName" style={{ padding: "10px 0 0 10px" }}>
                Рейс выполняет:{" "}
                {index === 0
                  ? airline
                  : firstSegment.hasOwnProperty("operatingAirline") == true
                    ? firstSegment.operatingAirline.caption
                    : airline}
              </div>
              {index === 0 ? (
                <hr
                  style={{
                    backgroundColor: "dodgerblue",
                    border: "1px solid dodgerblue",
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    alert("Well, ticket has been selected");
                  }}
                  onMouseOver={(event) => {
                    event.target.style.backgroundColor = "#d28800";
                  }}
                  onMouseLeave={(event) => {
                    event.target.style.backgroundColor = "orange";
                  }}
                  style={{
                    border: 0,
                    color: "white",
                    backgroundColor: "orange",
                    width: "100%",
                    height: 35,
                    marginTop: 5,
                  }}
                >
                  ВЫБРАТЬ
                </button>
              )}
            </div>
          );
        })}
        {index === ticketsNum - 1 ? (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
          >
            <button
              onClick={() => setTicketsNum(ticketsNum + 2)}
              style={{ width: 200, height: 30, fontSize: 17 }}
            >
              Показать еще
            </button>
          </div>
        ) : null}
      </div>
    );
  });
}
