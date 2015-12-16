$(document).ready(function(){
    $('#person-name').keydown(function(event){
      if (event.keyCode == 13)
        event.preventDefault();
        console.log("enter");
    })
})
