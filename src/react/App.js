import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Body from './components/body/Body';

import { channels } from '../shared/constants';
const { ipcRenderer } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: ''
    }
  }

  componentDidMount() {
    ipcRenderer.send(channels.APP_INFO);

    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  render() {
    const { appName, appVersion } = this.state;
    console.log(`${appName} ${appVersion}`)

    return (
      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames='fade'
      >
        <>
          <Body />
        </>
      </CSSTransition>
    );
  }
}

export default App;