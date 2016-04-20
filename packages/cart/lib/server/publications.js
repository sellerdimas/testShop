Meteor.publish("Cart-userOrders", function () {
	check(arguments, [Match.Any]);
	if(this.userId){
		return [
			Cart.Items.find({userId:this.userId})
		];
	}
	this.ready();
});

Meteor.publish("Cart-deviceOrders", function(deviceId){
	check(arguments, [Match.Any]);
	if(deviceId){
		return [
			Cart.Items.find({deviceId:deviceId})
		];
	}
	this.ready();
});





Meteor.methods({
  OrderCart: function (orderCart, deviceId) {
    this.unblock();
    var items, result;
    if(this.userId)
      items = Cart.Items.find({userId:this.userId});
    else
      items = Cart.Items.find({deviceId:deviceId});


    items.forEach(function(item){
      Cart.Items.remove({_id:item._id});
    });
   OrdersCart.insert({
          Orders: orderCart.orders,
          nameAndLastName: orderCart.nameAndLastName,
          checkOutPhone: orderCart.checkOutPhone,
          checkoutEmail: orderCart.checkoutEmail,
          checkoutCity: orderCart.checkoutCity,
          Otdeleniya: orderCart.Otdeleniya,
          dostavka: orderCart.dostavka,
          obrabotan: '-'
           
        }); 

  }
});