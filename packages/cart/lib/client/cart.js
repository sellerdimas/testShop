Cart.subscriptionHandles = {
	userOrders:Meteor.subscribe("Cart-userOrders")
};

Tracker.autorun(function(){
	if(!Session.equals('Cart-deviceId', undefined))
		Cart.subscriptionHandles.deviceOrders = Meteor.subscribe("Cart-deviceOrders", Session.get('Cart-deviceId'));
});

Tracker.autorun(function(){
	if(!Meteor.userId() && Session.equals('Cart-deviceId', undefined)){
		var deviceId = amplify.store("Cart-deviceId");
		if(!deviceId){
			deviceId = Random.id();
			amplify.store("Cart-deviceId", deviceId);
		}
		Session.set('Cart-deviceId', deviceId);
	}else if(Meteor.userId()){
		Cart.Items.find({
			userId:{$exists:false},
			deviceId: Session.get('Cart-deviceId')
		},{fields:{userId:1,deviceId:1}}).forEach(function(order){
			Cart.Items.update({
				_id:order._id
			},{
				$set:{userId:Meteor.userId()},
				$unset:{deviceId:1}
			},function(error){
				if(error)
					console.log(error);
			});
		});
		Session.set('Cart-deviceId', undefined);
	}
});

Session.setDefault('Cart-itemCount', 0);
Session.setDefault('Cart-itemTotal', 0);
Tracker.autorun(function(){
	var query = {};
	if(Meteor.userId())
		query.userId = Meteor.userId();
	else
		query.deviceId = Session.get('Cart-deviceId');
	
	var total = 0;
	var items = Cart.Items.find(query, {fields: {}});
	var counter = 0;
	items.forEach(function(item){
		var quantity = +item.itemCount;
		total += item.price * quantity;
		counter += quantity;	
	});
	
	
	Session.set('Cart-itemTotal', Math.floor(total*100)/100);
	Session.set('Cart-itemCount', counter);
});

Template.CartAddItemButton.events({
	'click .add-item':function(event, template){
		event.preventDefault();
		console.log(this);
		//TODO - need to take an attribute hash and send in all values
		
                var color = $('.colorPhoto .colorActive').attr('src');
   
            if(color){
            	var item = this;
		var pice = this.price;
		var count = $('.quantity').val();
		if(item._id){
			item.productId = item._id;
			delete item._id;
		}
		if(!Meteor.userId()){
			item.deviceId = Session.get('Cart-deviceId');
		}else{
			item.userId = Meteor.userId();
		}
		item.byst = $('.selectSizeByst').val();
		item.trysu = $('.selectSizeTrysu').val();
		item.itemCount = $('.quantity').val();
		item.colorPhoto = $('.colorPhoto .colorActive').attr('src');
		item.datafiel = new Date();
/*		item.name = $('#name').val();
		item.number = $('#namber').val();*/

                
		Cart.Items.insert(item);
				$('.errorCvet').fadeOut(100);
             $('#modal4').openModal();
            }else{
                $('.errorCvet').fadeIn(100);
        }


	}
});

Template.CartSummary.helpers({
	'itemCount':function(){
		return Session.get('Cart-itemCount');
	},
	'itemTotal':function(){
		return Session.get('Cart-itemTotal');
	},
	'itemsInCart':function(){
		return !Session.equals('Cart-itemCount', 0);
	}
});


var StripeCheckoutHandler;

Template.CartPayNow.events({
	'click #pay-now':function(event, template){
		event.preventDefault();
/*		StripeCheckoutHandler.open({
	      description: Session.get('Cart-itemCount') + ' items ($' + Session.get("Cart-itemTotal") + ')',
	      amount: Math.floor(Session.get("Cart-itemTotal") * 100)
	    });*/

	    var item = this;
	    var mas = item.items.collection._docs._map;
	    var orders = '';
	    for(key in mas){
/*	    	var size = mas[key].price + mas[key].tovarHeader + mas[key].byst + mas[key].trysu;
*/	
		orders += mas[key].tovarHeader + ' Цена: ' + mas[key].price  + ' Бюст: ' + mas[key].byst + ' Трусы: ' + mas[key].trysu +  ' Цвет: ' + mas[key].colorPhoto +  ' Кол-во: ' + mas[key].itemCount + '\n';
	    }
	       var orderCart = {
	       	orders: orders,
	       	nameAndLastName: $('#nameAndLastName').val(),
	       	checkOutPhone: $('#checkOutPhone').val(),
	       	checkoutEmail: $('#checkoutEmail').val(),
	       	checkoutCity: $('#checkoutCity').val(),
	       	Otdeleniya: $('#Otdeleniya').val(),
	       	dostavka: $( "input:checked" ).val() + ' ' + $( ".checkOutNall input:checked" ).val()
	    	
	    	}
	    	        var checkEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test($('#checkoutEmail').val());

  if(checkEmail){
if(orderCart.orders && orderCart.nameAndLastName && orderCart.checkOutPhone && orderCart.checkoutEmail && orderCart.checkoutCity && orderCart.Otdeleniya){
		    Meteor.call("OrderCart", orderCart, Session.get('Cart-deviceId'), function(error, result) {
		      if (error) {
		        alert(JSON.stringify(error));
		      }else{
		      	 
Meteor.call('sendEmail',orderCart.checkoutEmail, orderCart.nameAndLastName, orderCart.orders, orderCart, function (err, res) {
                if(err){
                	console.log('err email');
                }else{
                	   ga('send', 'event', 'zakaz', 'buy_kypalnik');
                    yaCounter35842265.reachGoal('main_zakaz');
		      	$('#modal3').openModal();

                }

          });




		      }
		     });
	 
	}else{
		alert('Не все поля заполнены');
	}
  }else{
  	alert('Ел. Почта введена некорректно');
  }
	
/*	    console.log(orderCart.orders, orderCart.nameAndLastName, orderCart.checkOutPhone, orderCart.checkoutEmail, orderCart.checkoutCity, orderCart.Otdeleniya);
*/	}
});

Router.route('/checkout', function () {
  this.render('CartItems', {
    data: function () { 
    	var query = {};
		if(Meteor.userId())
			query.userId = Meteor.userId();
		else
			query.deviceId = Session.get('Cart-deviceId');
			
		return {
    		items:Cart.Items.find(query, {sort: {datafiel: -1}}),
    		hasItems:!Session.equals('Cart-itemCount', 0),
    		itemCount:Session.get('Cart-itemCount'),
			itemTotal:Session.get('Cart-itemTotal')
    	};
    }
  });
});

/*Template.CartItem.events({
	'click .remove':function(event, template){
		event.preventDefault();
		Cart.Items.remove({_id:this._id});
	}
});*/
Template.CartItems.events({
	'click .updateOrder':function(event, template){
		event.preventDefault();
		$('#modal4').openModal();
	}
});

