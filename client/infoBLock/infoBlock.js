Template.infoBlock.events({
    'click .infoBlockButt': function (e) {
        var modal = {
            name: $('#name2').val(),
            number:$('#number2').val(),
            email:$('#infoEmail').val()
        }
                        var checkEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test($('#infoEmail').val());
if(checkEmail){
    if(modal.name && modal.number){
            Meteor.call('Calls',modal, function (err, res) {
                if(err){
                    console.log('error methods moadal2');
                }else{
                    ga('send', 'event', 'akcia', 'send_akcia');
                    yaCounter35842265.reachGoal('akcia');
                    $('#modal3').openModal();

Meteor.call('sendEmailZvonok',modal.name, modal.number, modal.email, function (err, res) {
                if(err){
                    console.log('err email');
                }else{
                    console.log('asda');

                }      
            });




                }

            });       
        }else{
            alert('Вы не заполнели все поля');
        }
    }else{
        alert('Ел. Почта введена некорректно');
        
    }
    }
});