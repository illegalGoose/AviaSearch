export default function Filters({ sorting, defaultTickets }) {
    return (
        <div style={{ fontFamily: 'sans-serif', width: 200 }}>
            <div className="sorting">
                <h4>Сортировать</h4>
                <div>
                    <input onChange={() => {
                        sorting(
                            [...defaultTickets].sort(function (a, b) {
                                return a.price.total.amount - b.price.total.amount;
                            }))
                    }}
                        type="radio" name="sorting" />- по возрастанию цены
                </div>
                <div>
                    <input onChange={() => {
                        sorting(
                            [...defaultTickets].sort(function (a, b) {
                                return b.price.total.amount - a.price.total.amount;
                            }))
                    }}
                        type="radio" name="sorting" />- по убыванию цены
                </div>
                <div>
                    <input onChange={() => {
                        sorting(
                            [...defaultTickets].sort(function (a, b) {
                                let durationTimeA = a.legs[0].duration + a.legs[1].duration;
                                let durationTimeB = b.legs[0].duration + b.legs[1].duration;
                                return durationTimeA - durationTimeB;
                            })
                        )
                    }}
                        type="radio" name="sorting" />- по времени в пути
                </div>
                <div>
                    <input onChange={() => {
                        sorting(defaultTickets)
                    }}
                        type="radio" name="sorting" />- по умолчанию
                </div>
            </div>
            <div className="filtering">
                <h4>Фильтровать</h4>
                <div><input onChange={(event) => {
                    if (event.currentTarget.checked) {
                        sorting(
                            defaultTickets.filter(function (ticket) {
                                return ticket.legs[0].segments.length == 2 || ticket.legs[1].segments.length == 2;
                            })
                        )
                    } else {
                        sorting(defaultTickets);
                    }
                }}
                    type="checkbox" name="transfer" />- 1 пересадка</div>
                <div><input onChange={(event) => {
                    if (event.currentTarget.checked) {
                        sorting(
                            defaultTickets.filter(function (ticket) {
                                return ticket.legs[0].segments.length < 2 && ticket.legs[1].segments.length < 2;
                            })
                        )
                    } else {
                        sorting(defaultTickets);
                    }
                }}
                    type="checkbox" name="withoutTransfer" />- без пересадок</div>
            </div>
            <div className="price">
                <h4>Цена</h4>
                <div style={{ marginBottom: 15 }}>От <input type="text" value="" /></div>
                <div>До <input type="text" value="" /></div>
            </div>
            <div className="companies">
                <h4>Авиакомпании</h4>
                <div style={{ fontSize: 14 }}>
                    <input type="checkbox" name="company name" />- {defaultTickets[0].carrier.caption} от {defaultTickets[0].price.total.amount} руб.<br />
                    <input type="checkbox" name="company name" />- {defaultTickets[1].carrier.caption} от {defaultTickets[1].price.total.amount} руб.
                </div>
            </div>
        </div>
    )
}
