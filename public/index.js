$(document).ready(function(){
    $('#who').keydown(function(event){
      if (event.keyCode == 13) {
          event.preventDefault();
          console.log("enter");
          $('.js-howMuch-group').show();
          $('.js-who-group').hide();
      }
    })

    $('#how-much').keydown(function(event){
      if (event.keyCode == 13)
        event.preventDefault();
        console.log("enter");
    })

})
