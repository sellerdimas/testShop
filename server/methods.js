Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40sandboxfe4e63216a764ccab0a852a35d014554.mailgun.org:409e153296eacf781b73df952d87e3ba@smtp.mailgun.org:587';

  });






Meteor.methods({
  sendEmail: function (email, name, text, orderCart) {
    check([email, name, text], [String]);

    this.unblock();

    Email.send({
      to: 'sellerdimas@gmail.com',
      from: email,
      subject: name + ' ' + email,
      text: 'Имя и Фамилия: ' + name + '\n'  + 'Номер: ' + orderCart.checkOutPhone + '\n' + 'Город: ' + orderCart.checkoutCity + '\n'  + 'Отделения: ' + orderCart.Otdeleniya + '\n' + 'Доставка и оплата: ' + orderCart.dostavka + '\n'  + text
    });
    return 1;
  },
  sendEmailZvonok: function (name, number, email) {
    check([name, number, email], [String]);

    this.unblock();

    Email.send({
      to: 'sellerdimas@gmail.com',
      from: email,
      subject: name + ' ' + email,
      text: 'Имя: ' + name + '\n'  + 'Номер: ' + number + '\n'  + 'Емейл: ' + email + '\n'
    });
    return 1;
  }
});



Meteor.methods({
  Orders: function (value) {
    var date = new Date();
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    Orders.insert({
            header: value.header,
            firma: value.firma,
            price: value.price,
            sizeByst: value.sizeByst,
            sizeTrysu: value.sizeTrysu,
            quantity: value.quantity,
            color: value.color,
            name: value.name,
            number: value.number,
            date: date.toLocaleString("en-US", options),
            obrabotan: '-',
            salle: '1'
        });
    
  },
  Calls: function (modal) {
    var date = new Date();
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    Calls.insert({
            name: modal.name,
            number: modal.number,
            email: modal.email,
            date: date.toLocaleString("en-US", options)
        });  
  }
});
