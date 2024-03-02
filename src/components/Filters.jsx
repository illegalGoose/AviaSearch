export default function Filters() {
  return (
    <div style={{fontFamily: 'sans-serif'}}>
        <div className="sorting">
            <h4>Сортировать</h4>
            <p><input type="radio" name="ascending price"/>- по возрастанию цены</p>
            <p><input type="radio" name="descending price"/>- по убыванию цены</p>
            <p><input type="radio" name="travel time"/>- по времени в пути</p>
        </div>
        <div className="filtering">
            <h4>Фильтровать</h4>
            <p><input type="checkbox" name="transfer"/>- 1 пересадка</p>
            <p><input type="checkbox" name="without transfer"/>- без пересадок</p>
        </div>
        <div className="price">
            <h4>Цена</h4>
            <p style={{marginBottom: 15}}>От <input type="text" value=""/></p>
            <p>До <input type="text" value=""/></p>
        </div>
        <div className="companies">
            <h4>Авиакомпании</h4>
            <p><input type="checkbox" name="company name"/>- 1 ИМЯ КОМПАНИИ</p>
            <p><input type="checkbox" name="company name"/>- 2 ИМЯ КОМПАНИИ</p>
        </div>
    </div>
  )
}
