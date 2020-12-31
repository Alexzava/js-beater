# [JS-Beater](https://github.com/alexzava/js-beater)

Interact with audio file or microphone from your browser.

Try the [demo here](https://alexzava.com/js-beater/examples/playFromMic.html)

## How to use

### Play from microphone

``` html
<script src="jsbeater.js"></script>
<script>
	window.onload = () => {
		let threshold = 180 // Default 180
		jsbMic(example, t)
	}

	function example() {
		console.log("Hello World!")
	}
</script>
```

### Play from file

``` html
<script src="jsbeater.js"></script>
<script>
	window.onload = () => {
		let threshold = 240 // Default 240
		jsbFile("filename.mp3", example, t)
	}

	function example() {
		console.log("Hello World!")
	}
</script>
```

## Examples

[Play from microphone](examples/playFromMic.html)

[Play from file](examples/playFromFile.html)

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.