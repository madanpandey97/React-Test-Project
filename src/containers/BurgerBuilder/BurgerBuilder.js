import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad:0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state ={
    //         ingredients: {
    //             salad:1,
    //             bacon:1,
    //             cheese:1,
    //             meat:1
    //         },
    //         totalPrice:4
    //     }
    // }
    state ={
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice:4,
        purchaseable:false,
        purchasing:false
    }
    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum , el)=> {
                return sum + el;
            }, 0);
            this.setState({purchaseable: sum>0})

    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        let updatedCount = 0
        if (oldCount>=1){
           updatedCount = oldCount - 1;
        }
       
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceMinus = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = this.state.totalPrice;
        if (oldCount >= 1 ){
            newPrice = oldPrice - priceMinus;
        }
        else{
            newPrice = oldPrice;
        }

        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler =() => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        alert('You Continue');
    }

    render() {
        return (
           <Aux>
               <Modal 
               show={this.state.purchasing}

               modalClosed={this.purchaseCancelHandler} > 
                   <OrderSummary
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
                   </Modal>
               <Burger ingredients={this.state.ingredients} />
               <Buildcontrols
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               purchaseable={this.state.purchaseable} 
               ordered={this.purchaseHandler}
               price={this.state.totalPrice}/>
           </Aux>
        );
    }
}

export default BurgerBuilder;