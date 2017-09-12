import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {qty:0};
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
    this.bawas = this.bawas.bind(this);
  }

  buy() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  }

  show() {
  this.props.handleShow(this.props.name);
  }

  bawas() {
    this.setState({qty: this.state.qty - 1});
    this.props.handleTotal(-this.props.price);
  }

  render() {
    return (
      <div>
        <p>{this.props.name} = ${this.props.price} </p>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <button onClick={this.bawas}>bawas</button>
        <h1>{this.state.qty}</h1>
      </div>
    )
  }
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    var product = {
      name:this.refs.name.value,
      price:parseInt(this.refs.price.value)
    };
    this.props.handleCreate(product)
    alert(product.name + " has been added!");
    this.refs.name.value = "";
    this.refs.price.value = "";
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input type="text" placeholder="Prod name" ref="name" />
        <input type="text" placeholder="Prod price" ref="price" />
        <br/>
        <button>Create Product</button>
      </form>
    );
  }

}

class ProductList extends Component {

constructor(props) {
  super(props);
  this.state={total:0,
    productList: [
        {name: "Android", price: 20},
        {name: "Phone", price: 10},
        {name: "Mobile", price: 50},
        {name: "Laptop", price: 90}
      ]};

  this.calcTotal = this.calcTotal.bind(this);
  this.createProduct = this.createProduct.bind(this);
}

calcTotal(price) {
  this.setState({total: this.state.total + price});   
}

showProduct(name) {
  alert ('You bought ' + name);
}

createProduct(product) {
  this.setState({ 
    productList: this.state.productList.concat(product)
  });
}

  render() {
    var component = this;
    var products = this.state.productList.map(function(prod){
        return (
            <Product name={prod.name} price={prod.price} handleShow={component.showProduct} handleTotal={component.calcTotal} />
        );
    });

    return (
      <div>
      <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={component.state.total}/> 
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
