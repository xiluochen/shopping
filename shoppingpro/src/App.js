import { useRoutes } from 'react-router';
import { createGlobalStyle } from 'styled-components';

import routes from './routes';

const BaseStyle = createGlobalStyle`
  .App {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  
  .main-box {
    width: 1200px;
    margin: 0 auto;
  }
  
  .box-800 {
    width: 800px;
    margin: 0 auto;
  }
  
  .clearfix::before,
  .clearfix::after {
    display: table;
    overflow: hidden;
    clear: both;
  }
  
  .float-left {
    float: left;
  }
  .float-right {
    float: right;
  }
  
  .transition-threes {
    transition: all .3s;
  }
  
  .transition-fives {
    transition: all .5s;
  }
`;

function App() {
  const RouteView = ()=>(useRoutes(routes));
  
  return (
    <div className="App">
      <BaseStyle></BaseStyle>
      <RouteView/>
    </div>
  );
}

export default App;
