import React from 'react';
import './style.scss'

class List extends React.Component {
    constructor() {
        let d = [];
        for (let i = 0; i < 100000; i++) {
            d.push({ id: i, value: `渲染第${i}次` });
        }
        this.state = {
            data: d,
        }
    }
    render() {
        let {  data } = this.state;
        return <div id='app'
        >
            <span>listError</span>
            <div id='list' className='list' >
                {
                    data.map((item, ind) => (
                        <p key={ind}>{item.value}</p>
                    ))
                }
            </div>
        </div>
    }
}
export default List