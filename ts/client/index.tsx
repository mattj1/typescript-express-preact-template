import {Component, createContext, h, render} from 'preact';

class IndexPage extends Component {
    render() {
        return <div>Test</div>
    }
}

render(<IndexPage/>, document.getElementById('app'));
