import React from 'react';
// import './style.scss';


class List extends React.Component {
    constructor() {
        let d = [];
        for (let i = 0; i < 100000; i++) {
            d.push({ id: i, value: `渲染第${i}次` });
        }
        this.state = {
            data: d,
            screenHeight: 0,
            startOffset: 0,
            end: null,//结束索引
            start: 0,//起始索引
            newData: []
        }
    }
    itemSize = 40;//每一项的高度先写死40px
    //获取页面的高度
    handleResize() {
        let hei = document.body.clientHeight;
        this.setState({
            screenHeight: hei
        })
    }
    //获取数据列表的高度
    listHeight() {
        let { data } = this.state;
        return data.length * this.itemSize;
    }
    //可显示的列表项数
    visibleCount() {
        let { screenHeight } = this.state;
        return Math.ceil(screenHeight / this.itemSize)
    }
    //偏移量对应的style
    getTransform(startOffset) {
        this.setState({
            startOffset
        })
    }
    //获取真实显示列表数据
    visibleData(start, end) {
        let { data } = this.state;
        let list = data.slice(start, Math.min(end, data.length));
        this.setState({
            newData: list
        })
    }
    screenEvent(e) {
          //当前滚动位置
          let scrollTop = this.refs.list.scrollTop;
          let start = Math.floor(scrollTop / this.itemSize);
          let end = start + this.visibleCount();
          let startOffset = scrollTop - (scrollTop % this.itemSize);
          this.visibleData(start, end);
          this.getTransform(startOffset)
    }
    componentWillMount() {
        let hei = document.body.clientHeight;
        this.setState({
            screenHeight: hei,
        })
    }
    componentDidMount() {
        this.visibleData(0, this.visibleCount())
        window.addEventListener('resize', this.handleResize.bind(this))
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }
    render() {
        let { startOffset, newData } = this.state;
        return <div id='app'
            ref='list'
            onScroll={(e) => this.screenEvent(e)}
        >
            <span>list</span>
            <div id='list' className='list'
                style={{ transform: `translate3d(0,${startOffset}px,0)` }}
            >
                {
                    newData.map((item, ind) => (
                        <p key={ind}>{item.value}</p>
                    ))
                }
            </div>
        </div>
    }
}
export default List