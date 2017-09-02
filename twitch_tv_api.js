var regularUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
var images = document.getElementsByClassName('user-logo');
var channelNames = document.getElementsByClassName('channel-link');
var streamStates = document.getElementsByClassName('stream-state');

var smallerCols = document.getElementsByClassName('smaller-cols');
var largerCols =  document.getElementsByClassName('larger-cols');


document.onreadystatechange = function(){
  if(document.readyState == 'complete'){
    if(window.screen.width >= 800){
      for(var i = 0; i < smallerCols.length; i++){
        smallerCols[i].classList.add('col-xs-1');
        smallerCols[i].classList.remove('col-xs-4');
        largerCols[i].classList.add('col-xs-11');
        largerCols[i].classList.remove('col-xs-8');
       }
     }  
   }
  }


window.onresize = function(){
  if(window.screen.width >= 800){
    for(var i = 0; i < smallerCols.length; i++){
      smallerCols[i].classList.add('col-xs-1');
      smallerCols[i].classList.remove('col-xs-4');
      largerCols[i].classList.add('col-xs-11');
      largerCols[i].classList.remove('col-xs-8');
    }
  }
  
  else if(window.screen.width < 800){
    for(var j = 0; j < smallerCols.length; j++){
      smallerCols[j].classList.add('col-xs-4');
      smallerCols[j].classList.remove('col-xs-1');
      largerCols[j].classList.add('col-xs-8');
      largerCols[j].classList.remove('col-xs-11');
    }
  }
}





function fetchUsers(userArr, i){
  
  return new Promise(function(resolve, reject){
    
    function recur(userArr, i){   
      let jsonObj = new XMLHttpRequest();
      jsonObj.responseType = 'json';
      console.log(i);
      if(i == userArr.length-1) resolve(userArr);
    
      jsonObj.onreadystatechange = function(){      
        if(this.readyState == 4 && this.status == 200){
          let response = this.response;
       
          if(response.error == 'Not Found'){
            channelNames[i].textContent = 'user \'' + userArr[i] + '\' not found - ';
            images[i].src = 'javascript:void(0);';
            images[i].alt = 'No image';
            }
       
          else if(images[i].src === '' && channelNames[i].textContent == 'Channel Name:'){
            images[i].src = response.logo;
            images[i].alt = 'No image';
            channelNames[i].textContent = response.display_name + ' - ';
            }
         }
      
        else if(this.status !== 0 && this.status !== 200) {
               console.log('status code: ' + this.status)
        }
       }

      jsonObj.open('GET', 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/users/' + userArr[i], true);
      jsonObj.send();
    
      if(i < userArr.length-1) recur(userArr, i+1);
    }
    recur(userArr, i);
  })
}



function fetchChannels(userArr, i){

  return new Promise(function(resolve, reject){
    
    function recur(userArr, i){   
      let jsonObj = new XMLHttpRequest();
      jsonObj.responseType = 'json';

      if(i == userArr.length-1) resolve(userArr);
   
      jsonObj.onreadystatechange = function(){      
        if(this.readyState == 4 && this.status == 200){
          let response = this.response;
       
          if(response.error == 'Not Found') channelNames[i].href = 'javascript:void(0);';
          else channelNames[i].href = response.url;
         }
      
        else if(this.status !== 0 && this.status !== 200) {
               console.log('status code: ' + this.status)
        }
       }

      jsonObj.open('GET', 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/' + userArr[i], true);
      jsonObj.send();
    
      if(i < userArr.length-1) recur(userArr, i+1);
    }
    recur(userArr, i);
  })
}
  
  
  
              

function fetchStreams(userArr, i){

  return new Promise(function(resolve, reject){
    
    function recur(userArr, i){   
      let jsonObj = new XMLHttpRequest();
      jsonObj.responseType = 'json';

      if(i == userArr.length-1) resolve();
    
      jsonObj.onreadystatechange = function(){      
        if(this.readyState == 4 && this.status == 200){
          let response = this.response;
       
          if(response.error == 'Not Found') streamStates[i].textContent = 'User not found';
          else if(response.stream == null) streamStates[i].textContent = 'Currently not streaming';
          else if(response.stream !== null) {
            streamStates[i].textContent = 'Streaming: ' + response.stream.game + ' | FPS: ' + Math.round(response.stream.average_fps) + ' | Viewers: ' + response.stream.viewers;
            
          }
         }
      
        else if(this.status !== 0 && this.status !== 200) {
               console.log('status code: ' + this.status)
        }
       }

      jsonObj.open('GET', 'https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/' + userArr[i], true);
      jsonObj.send();
    
      if(i < userArr.length-1) recur(userArr, i+1);
    }
    recur(userArr, i);
   })
}


fetchUsers(regularUsers, 0).then(function(userArr){
  return fetchChannels(regularUsers, 0);
}).then(function(userArr){
  return fetchStreams(regularUsers, 0);
})