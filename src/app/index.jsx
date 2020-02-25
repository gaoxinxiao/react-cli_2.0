import React, { Suspense, lazy } from 'react'
import Tabs, { TabItem } from '../components/Tabs'
import { resolve } from 'path';
// import LazyComp from './lazy' 

const LazyComp = lazy(() => import('./lazy'))


class App extends React.Component {
    render() {
        return <div>
            <Tabs>
                <TabItem>第一个</TabItem>
                <TabItem>第二个</TabItem>
                <TabItem>第三个</TabItem>
            </Tabs>
        </div>
    }
}

let data = '';
let promise = '';

function requestData() {
    if (data) return data;
    if (promise) throw promise;

    promise = new Promise(resolve => {
        setTimeout(() => {
            data = 'gxxxxx';
            resolve();
        }, 2000)
    })
    throw promise;
}

function SuspenseData() {
    const data = requestData();
    return <div>{data}</div>
}

export default () => (
    <Suspense fallback='LOADING.........'>
        {/* <SuspenseData /> */}
        <LazyComp/>
    </Suspense>
)


