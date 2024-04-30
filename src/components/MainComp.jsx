import Filters from "./Filters";
import SearchResults from "./SearchResults";
import data from "../flights.json";
import { useState } from "react";

const defaultTickets = [];

for (const ticket of data.result.flights) {
  defaultTickets.push(ticket.flight);
}

function copyArray(arr) {
  let result = [];
  for (const el of arr) {
    result.push(el);
  }
  return result;
}

function applyFilters(tickets, filters) {
  /**
   * Filters is an object like this:
   {
     sorting: 'ascending' | 'descending' | 'travelTime' | 'default',
     transfers: [] | [1] | [0] | [1, 0],
     priceFrom: 35000 | null,
     priceTo: 105000 | null,
   }
   */

  let result = copyArray(tickets);

  if (filters.sorting === "ascending") {
    result.sort(function (a, b) {
      return a.price.total.amount - b.price.total.amount;
    });
  } else if (filters.sorting === "descending") {
    result.sort(function (a, b) {
      return b.price.total.amount - a.price.total.amount;
    });
  } else if (filters.sorting === "travelTime") {
    result.sort(function (a, b) {
      let durationTimeA = a.legs[0].duration + a.legs[1].duration;
      let durationTimeB = b.legs[0].duration + b.legs[1].duration;
      return durationTimeA - durationTimeB;
    });
  }

  if (filters.transfers.length >= 1) {
    if (filters.transfers[0] !== 0) {
      result = result.filter(function (ticket) {
        return (
          ticket.legs[0].segments.length === 2 ||
          ticket.legs[1].segments.length === 2
        );
      });
    } else {
      result = result.filter(function (ticket) {
        return (
          ticket.legs[0].segments.length < 2 &&
          ticket.legs[1].segments.length < 2
        );
      });
    }
  }

  return result;
}

export default function MainComp() {
  const [tickets, setSorting] = useState(defaultTickets);
  return (
    <div style={{ display: "flex", gap: 30 }}>
      <Filters
        tickets={tickets}
        sorting={setSorting}
        defaultTickets={defaultTickets}
        filtersFunction={applyFilters}
      />
      <div style={{ display: "grid", width: "600px" }}>
        <SearchResults tickets={tickets} />
      </div>
    </div>
  );
}
