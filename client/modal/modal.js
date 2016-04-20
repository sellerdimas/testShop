Template.modal2.events({
    'click .close': function (e) {
        $('#modal2').closeModal();

    }
});
Template.modal4.events({
    'click .close': function (e) {
        $('#modal4').closeModal();

    }
});
Template.modal4.events({
    'click .modal4Cart': function (e) {
        $('#modal4').closeModal();
        Router.go('checkout');

    }
});
Template.modal4.events({
    'click .cartA': function (e) {
         event.preventDefault();
     $('#modal4').closeModal();
        Router.go('razdelnyy', {name: this.productId});
             console.log(this.productId);

    }
});
Template.modal4.events({
    'click .modal4Next': function (e) {
        event.preventDefault();
        $('#modal4').closeModal();
        


    }
});
Template.modal3.events({
    'click .close': function (e) {
        $('#modal3').closeModal();
    }
});
Template.modal4.helpers({
    'itemCountAll':function(){
        return Session.get('Cart-itemCount');
    },
    'itemTotal':function(){
        return Session.get('Cart-itemTotal');
    },
    'itemsInCart':function(){
        return !Session.equals('Cart-itemCount', 0);
    },
    'items': function(){
        var query = {};
        if(Meteor.userId())
            query.userId = Meteor.userId();
        else
            query.deviceId = Session.get('Cart-deviceId');
            
            
        return Cart.Items.find(query, {sort: {datafiel: -1}});
            
        
    }
});

Template.modal2.events({
    'click .modalSendButt': function (e) {
        var modal = {
            name: $('#name1').val(),
            number:$('#number1').val(),
            email: $('#email1').val()
        }
        var emailZvonok = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test($('#email1').val());
       if(emailZvonok){
             if(modal.name && modal.number && modal.email){
            Meteor.call('Calls',modal, function (err, res) {
                if(err){
                    console.log('error methods moadal2');
                }else{
                     $('#modal2').closeModal();
                     ga('send', 'event', 'zvonok', 'zakaz_zvonka');
                     yaCounter35842265.reachGoal('zvonok');
                     $('#modal3').openModal();

                     Meteor.call('sendEmailZvonok',modal.name, modal.number, modal.email, function (err, res) {
                if(err){
                    console.log('err email');
                }else{


                }

          });
                     
                }

            });       
        }else{
            alert('Вы не заполнели все поля');
        }
       }
   
    }
});

Template.modal4.events({
    'blur .quantTovar':function(event, template){
        event.preventDefault();
        var quantity = $(event.target).val();
        Cart.Items.update({_id: this._id},{$set: {itemCount: quantity}})
    }
});
Template.modal4.events({
    'click .remove':function(event, template){
        event.preventDefault();
        Cart.Items.remove({_id:this._id});
    }
});



