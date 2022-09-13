import {Component, createContext, h, render} from 'preact';

interface Props {

}

interface State {

}

class IndexPage extends Component<Props, State> {
    render() {
        return <div>IndexPage</div>
    }
}

render(<IndexPage/>, document.getElementById('app'));
