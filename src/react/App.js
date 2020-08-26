import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Body from './components/app_body/Body';
import Backdrop from './components/app_backdrop/Backdrop';

import { channels } from '../shared/constants';
const { ipcRenderer } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
      appConnection: false
    }
  }

  componentDidMount() {
    ipcRenderer.send(channels.APP_INFO);

    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion, appConnection } = arg;
      this.setState({ appName, appVersion, appConnection });
    });
  }

  render() {
    const { appName, appVersion, appConnection } = this.state;
    console.log(`${appName} ${appVersion}`)

    return (
      <CSSTransition
        in={true}
        appear={true}
        timeout={300}
        classNames='fade'
      >
        <>
          {appConnection ?
            <Body /> :
            <Backdrop />
          }
        </>
      </CSSTransition>
    );
  }
}

export default App;