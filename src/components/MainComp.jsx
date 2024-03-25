import Filters from './Filters';
import SearchResults from './SearchResults';
import data from '../flights.json';
import { useState } from 'react';

export default function MainComp(){
    const [tickets, setSorting] = useState([]);
    const defaultTickets = [];

    for (const ticket of data.result.flights) {
        tickets.push(ticket.flight);
        defaultTickets.push(ticket.flight);
    }
    return (
        <div style={{display: 'flex', gap: 30}}>
            <Filters tickets={tickets} sorting={setSorting} defaultTickets={defaultTickets}/>
            <div style={{display: 'grid', width: '600px'}}><SearchResults tickets={tickets}/></div>
        </div>
    )
}