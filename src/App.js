import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import PizzaForm from './components/PizzaForm';
import PizzaStages from './components/PizzaStages';
import MainSection from './components/MainSection';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <PizzaForm />
                <PizzaStages />
                <MainSection />
            </div>
        </Provider>
    );
};

export default App;
