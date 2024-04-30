export default function Filters({
  tickets,
  sorting,
  defaultTickets,
  filtersFunction,
}) {
  let filters = { sorting: "", transfers: [], priceFrom: null, priceTo: null };
  return (
    <div style={{ fontFamily: "sans-serif", width: 200 }}>
      <div className="sorting">
        <h4>Сортировать</h4>
        <div>
          <input
            onChange={() => {
              filters.sorting = "ascending";
              sorting(filtersFunction(tickets, filters));
            }}
            type="radio"
            name="sorting"
          />
          - по возрастанию цены
        </div>
        <div>
          <input
            onChange={() => {
              filters.sorting = "descending";
              sorting(filtersFunction(tickets, filters));
            }}
            type="radio"
            name="sorting"
          />
          - по убыванию цены
        </div>
        <div>
          <input
            onChange={() => {
              filters.sorting = "travelTime";
              sorting(filtersFunction(tickets, filters));
            }}
            type="radio"
            name="sorting"
          />
          - по времени в пути
        </div>
        <div>
          <input
            onChange={() => {
              sorting(defaultTickets);
            }}
            type="radio"
            name="sorting"
          />
          - по умолчанию
        </div>
      </div>
      <div className="filtering">
        <h4>Фильтровать</h4>
        <div>
          <input
            onChange={(event) => {
              if (event.currentTarget.checked) {
                if (filters.transfers.length >= 1) {
                  filters.transfers = [1, 0];
                } else {
                  filters.transfers = [1];
                }
              } else if (filters.transfers.length > 0) {
                filters.transfers = [0];
              } else {
                filters.transfers = [];
              }
              sorting(filtersFunction(defaultTickets, filters));
            }}
            type="checkbox"
            name="transfer"
          />
          - 1 пересадка
        </div>
        <div>
          <input
            onChange={(event) => {
              if (event.currentTarget.checked) {
                if (filters.transfers.length >= 1) {
                  filters.transfers = [1, 0];
                } else {
                  filters.transfers = [0];
                }
              } else if (filters.transfers.length >= 1) {
                filters.transfers = [1];
              } else {
                filters.transfers = [];
              }
              sorting(filtersFunction(defaultTickets, filters));
            }}
            type="checkbox"
            name="withoutTransfer"
          />
          - без пересадок
        </div>
      </div>
      <div className="price">
        <h4>Цена</h4>
        <div style={{ marginBottom: 15 }}>
          От{" "}
          <input
            onChange={(event) => {
              filters.priceFrom = event.target.value;
              console.log(filters.priceFrom);
              filtersFunction(tickets, filters, sorting);
            }}
            type="number"
          />
        </div>
        <div>
          До <input type="number" />
        </div>
      </div>
      <div className="companies">
        <h4>Авиакомпании</h4>
        <div style={{ fontSize: 14 }}>
          <input type="checkbox" name="company name" />-{" "}
          {defaultTickets[0].carrier.caption} от{" "}
          {defaultTickets[0].price.total.amount} руб.
          <br />
          <input type="checkbox" name="company name" />-{" "}
          {defaultTickets[1].carrier.caption} от{" "}
          {defaultTickets[1].price.total.amount} руб.
        </div>
      </div>
    </div>
  );
}
