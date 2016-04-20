Router.configure({
  loadingTemplate: 'loading'
});
Router.route('main',{
  path:'/',
  template: 'main',
  waitOn: function() {
    return Meteor.subscribe('newcollections');
  },
  data: function () {
    var page = location.search.slice(1);
    if(page === 'tovar' || page === 'advantages' || page === 'reviews' || page === 'views'){
      var objDowb = {
        tovar: 708,
        advantages: 1920,
        views: 2474,
        reviews: 4850
      }
      $("body,html").animate({scrollTop: objDowb[page] }, 800);
      
    }
  }
});


Router.route('razdelnyy',{
  path:'/razdelnyy/:name/',
  template: 'razdelnyy',
   waitOn: function() {
    var id = this.params.name;
    return Meteor.subscribe('tovarName', id);
  }/*,
  onBeforeAction: function(){
    this.next()
  },
  action: function () {
    console.log(this.params.page + 'asddddddddddddddddddddd');
    
  }*/
});