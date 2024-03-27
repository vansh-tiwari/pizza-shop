import React from 'react';
import { Provider } from 'react-redux';
import MainSection from './components/MainSection';
import PizzaForm from './components/PizzaForm';
import PizzaStages from './components/PizzaStages';
import store from './store/store';

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
    margin: '5%',
  },
};

export default App;
