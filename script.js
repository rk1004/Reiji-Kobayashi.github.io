let localStream = null;

navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then(function (stream) {
        // Success
    $('#my-video').get(0).srcObject = stream;
        localStream = stream;
    }).catch(function (error) {
    // Error
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
});

let localStream = null;
let peer = null;
let existingCall = null;

navigator.mediaDevices.getUserMedia({video: true, audio: true})
		    // 省略
});

peer = new Peer({
	key: 'bec8e281-f4da-4767-85ee-d3874159a387',
	debug: 3
});

peer.on('open', function(){
	$('#my-id').text(peer.id);
});

peer.on('error', function(err){
	alert(err.message);
});

peer.on('close', function(){
});

peer.on('disconnected', function(){
});

$('#make-call').submit(function(e){
  e.preventDefault();
  const call = peer.call($('#callto-id').val(), localStream);
  setupCallEventHandlers(call);
});

$('#end-call').click(function(){
  existingCall.close();
});

peer.on('call', function(call){
  call.answer(localStream);
  setupCallEventHandlers(call);
});

function setupCallEventHandlers(call){
	if (existingCall) {
		existingCall.close();
	};

  existingCall = call;

  call.on('stream', function(stream){
		addVideo(call,stream);
		setupEndCallUI();
		$('#their-id').text(call.remoteId);
	});
    // 省略
}

function setupCallEventHandlers(call){
    // 省略
    call.on('close', function(){
        removeVideo(call.remoteId);
        setupMakeCallUI();
    });
}


function addVideo(call,stream){
    $('#their-video').get(0).srcObject = stream;
}

function removeVideo(peerId){
     $('#' + peerId).remove();
}

function setupMakeCallUI(){
    $('#make-call').show();
    $('#end-call').hide();
}

function setupEndCallUI() {
    $('#make-call').hide();
    $('#end-call').show();
}
