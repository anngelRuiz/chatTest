$(function(){
    var socket = io.connect();
    
                           
    

    
    
    // Variables to register
    var $userFormArea   = $('#mainSection');
    var $userForm       = $('#userForm');
    var $userName       = $('#userName');
    var $userAvatar     = $('#avatarBox').attr("src");
    
    // Variables for UI
    var $messageArea    = $('#chatContainer');    
    // Li
    var $users          = $('#users');
    var $messageForm    = $('#messageForm');
    var $message        = $('#message'); 
    var $chat           =  $('#chat');

    $messageForm.submit(function(e){
        e.preventDefault();
        socket.emit('send message', $message.val());
        $message.val('');
    });

    socket.on('new message', function(data){
       var date = formatAMPM(new Date());
       //$chat.append('<div class="well"><strong>' + data.user + '</strong>:' + data.msg + '</div>');
       $chat.append( '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ data.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ data.msg +'</p>' +
                                '<p><small>'+ date +'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>');  
    });

    $userForm.submit(function(e){
        e.preventDefault();
        socket.emit('new user', $userName.val(), function(data){
            if(data){
                $userFormArea.hide();
                $messageArea.show();
            }
        });
        $userName.val('');
    });

    socket.on('get users', function(data){
        var html = '';
        for(i = 0; i < data.length; i++){
            html += '<li class="list-group-item">' + data[i] + '</li>';
        }   

        $users.html(html);
    });
});