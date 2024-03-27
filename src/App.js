import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import PizzaForm from './components/PizzaForm';
import PizzaStages from './components/PizzaStages';
import MainSection from './components/MainSection';

const App = () => {
    return (
        <Provider store={store}>
            <div style={styles.body}>
              <h2>PIZZA SHOP</h2>
                <PizzaForm />
                <PizzaStages />
                <MainSection />
            </div>
        </Provider>
    );
};

const styles = {
  body: {
    margin: '5%'
  }
}

export default App;
