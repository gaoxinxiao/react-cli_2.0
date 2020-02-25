import React from 'react';

export const TabItem = (props) => {
    return <div style={{ color: props.active }} onClick={props.click}>{props.children}</div>
}

class Tabs extends React.Component {
    state = {
        ind: 0
    }
    render() {
        return React.Children.map(this.props.children, (child: JSX.Element, index) => {
            if (child.type) {
                return React.cloneElement(child, {
                    active: this.state.ind == index ? "red" : "green",
                    click: () => this.setState({ ind: index })
                })
            }
            return child;
        })
    }
}
export default Tabs