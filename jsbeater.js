function jsbFile(songFile, callback, t = 240) {
	const audioCtx = new AudioContext()
	const audioEle = new Audio()
	var audioSourceNode
	var analyserNode
	var bufferLength
	var dataArray
	var threshold = t

	audioEle.src = songFile
	audioEle.autoplay = true
	audioEle.preload = 'auto'
	audioEle.loop = true

	audioSourceNode = audioCtx.createMediaElementSource(audioEle)
	analyserNode = audioCtx.createAnalyser()
	analyserNode.fftSize = 256
	bufferLength = analyserNode.frequencyBinCount
	dataArray = new Float32Array(bufferLength)

	audioSourceNode.connect(analyserNode)
	analyserNode.connect(audioCtx.destination)

	processBeats(analyserNode, dataArray, bufferLength, threshold, callback)
}

function jsbMic(callback, t = 180) {
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
	navigator.getUserMedia({video:false, audio:true}, (stream) => { micStream(stream, callback, t) }, console.log)
}

function micStream(stream, callback, t) {
	var audioCtx = new AudioContext()
	var analyserNode
	var bufferLength
	var dataArray
	var threshold = t
	
	micStream = audioCtx.createMediaStreamSource(stream)

	analyserNode = audioCtx.createAnalyser()
	analyserNode.fftSize = 256
	bufferLength = analyserNode.frequencyBinCount
	dataArray = new Float32Array(bufferLength)

	micStream.connect(analyserNode)
	analyserNode.connect(audioCtx.destination)

	processBeats(analyserNode, dataArray, bufferLength, threshold, callback)
}

function processBeats(analyserNode, dataArray, bufferLength, threshold, callback) {
	requestAnimationFrame(() => { processBeats(analyserNode, dataArray, bufferLength, threshold, callback) })

	analyserNode.getFloatFrequencyData(dataArray)

	for (let i = 0; i < bufferLength; i++) {
		// Magic formula
		const barHeight = (dataArray[i] + 140) * 2

		if(barHeight > threshold) {
			callback(barHeight)
		}
	}
}