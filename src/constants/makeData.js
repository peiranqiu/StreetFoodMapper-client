import React from 'react';

const makeData = (number, titlePrefix = 'Location') => {
    const data = [];
    var options1 = (<select className="form-control opentime mx-3">
        <option>0:00</option>
        <option>6:00</option>
        <option>6:30</option>
        <option>7:00</option>
        <option>7:30</option>
        <option>8:00</option>
        <option>8:30</option>
        <option>9:00</option>
        <option>9:30</option>
        <option>10:00</option>
        <option>10:30</option>
        <option>11:00</option>
        <option>11:30</option>
        <option>12:00</option>
        <option>12:30</option>
        <option>13:00</option>
        <option>13:30</option>
        <option>14:00</option>
        <option>14:30</option>
        <option>15:00</option>
        <option>15:30</option>
        <option>16:00</option>
        <option>16:30</option>
        <option>17:00</option>
        <option>17:30</option>
        <option>18:00</option>
    </select>);
    var options2 = (<select className="form-control closetime ml-3">
        <option>0:00</option>
        <option>10:00</option>
        <option>10:30</option>
        <option>11:00</option>
        <option>11:30</option>
        <option>12:00</option>
        <option>12:30</option>
        <option>13:00</option>
        <option>13:30</option>
        <option>14:00</option>
        <option>14:30</option>
        <option>15:00</option>
        <option>15:30</option>
        <option>16:00</option>
        <option>16:30</option>
        <option>17:00</option>
        <option>17:30</option>
        <option>18:00</option>
        <option>18:30</option>
        <option>19:00</option>
        <option>19:30</option>
        <option>20:00</option>
        <option>20:30</option>
        <option>21:00</option>
        <option>21:30</option>
        <option>22:00</option>
        <option>22:30</option>
        <option>23:00</option>
        <option>23:30</option>
    </select>);
    for (let i = 0; i < number; i++) {
        data.push({
            title: `${titlePrefix} ${i + 1}`,
            content:
                <div>
                    <div className="schedule-content">
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>MON</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>TUE</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>WED</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>THU</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>FRI</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>SAT</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                        <div className="schedule-day ml-3 mt-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value=""/>
                            </div>
                            <span>SUN</span>
                            {options1}
                            <span className="to">TO</span>
                            {options2}
                        </div>
                    </div>
                </div>

        });
    }
    return data;
}

export {makeData};