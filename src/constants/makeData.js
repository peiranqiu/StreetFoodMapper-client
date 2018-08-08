import React from 'react';
const makeData = (number, titlePrefix = 'Location') => {
    const data = [];
    for (let i = 0; i < number; i++) {
        data.push({
            title: `${titlePrefix} ${i+1}`,
            content:

                    <div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                        <div>SUN</div>
                    </div>

        });
    }
    return data;
}

export {makeData};