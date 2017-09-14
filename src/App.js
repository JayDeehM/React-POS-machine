import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {qty:0};
    this.buy = this.buy.bind(this);
    this.bawas = this.bawas.bind(this);
  }

  buy() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
    this.props.handleAdd(this.props.name);
  }

  bawas() {
    this.setState({qty: this.state.qty - 1});
    this.props.handleTotal(-this.props.price);
  }

  render() {
    return (
      <div>
        <p>{this.props.name} = ${this.props.price} </p>
        <button onClick={this.buy}>Add</button>
      </div>
    )
  }
}


class ProductList extends Component {

constructor(props) {
  super(props);
  this.state={total:0,
    productList: [
        {name: "Rice", price: 10},
        {name: "Adobo", price: 30},
        {name: "Laing", price: 20},
        {name: "Bulalo", price: 90}
      ], cartList: []};
  this.calcTotal = this.calcTotal.bind(this);
  this.addProduct = this.addProduct.bind(this);
  this.removeProduct = this.removeProduct.bind(this);
}

calcTotal(price) {
  this.setState({total: this.state.total + price});   
}

addProduct(name) {
  console.log(name + ' added to cart!')
  this.setState({cartList: this.state.cartList.concat(name)});
}

removeProduct(name) {
  console.log(name + ' removed from cart!')
  this.setState({cartList: this.state.cartList.concat(name)});
}

  render() {
    var component = this;
    var products = this.state.productList.map(function(prod){
        return (
            <Product name={prod.name} price={prod.price} handleAdd={component.addProduct} handleTotal={component.calcTotal} />
        );
    });


    return (
      <div>
        {products}
        <Cart cartItems={this.state.cartList} cartList={component.state.cartList}/>
        <Total total={component.state.total}/> 
      </div>
    )
  }
}

class Cart extends Component {
  render() {
    var cartItems = this.props.cartItems.map(function(cart){
    return (
      <div>
        {cart}
      </div>
    );
    });
    console.log(this.props.cartList)
    return (
      <div> 
        <h1>Items selected:</h1>
          <ul>
            {cartItems}
          </ul>
      </div>
    )
  }
}

class Total extends Component {
  render() {
    return (
      <div> 
        <h1>Total Balance: ${this.props.total} </h1>
      </div>
    )
  }
}

export default ProductList;
