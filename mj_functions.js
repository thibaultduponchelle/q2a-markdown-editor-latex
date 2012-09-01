var Preview = {
		swap: true,
		delay: 150,        // delay after keystroke before updating

		preview: null,     // filled in by Init below
		buffer: null,      // filled in by Init below

		timeout: null,     // store setTimout id
		mjRunning: false,  // true when MathJax is processing
		oldText: null,     // used to check if an update is needed

		Init: function (prev_id, buffer_id) {
				//alert(prev_id);
				//alert(buffer_id);
				this.preview = document.getElementById(prev_id);
				this.buffer = document.getElementById(buffer_id);
		},

		SwapBuffers: function () {
				var buffer = this.preview, preview = this.buffer;
				this.buffer = buffer; this.preview = preview;
				buffer.style.visibility = "hidden"; buffer.style.position = "absolute";
				preview.style.position = ""; preview.style.visibility = "";
		},

		Update: function () {
				if (this.timeout) { clearTimeout(this.timeout) }
				this.timeout = setTimeout(this.callback, this.delay);
		},

		CreatePreview: function (prev_id) {
				//alert(prev_id);
				Preview.timeout = null;
				if (this.mjRunning) return;
				var text = document.getElementById(prev_id).innerHTML;
				//var hidden = document.getElementById("preview");
				//alert(this.buffer.innerHTML);
				//hidden.value = this.buffer.innerHTML;

				if (text === this.oldtext) return;
				this.buffer.innerHTML = this.oldtext = text;
				this.mjRunning = true;
				MathJax.Hub.Queue(
["Typeset", MathJax.Hub, this.buffer],
["PreviewDone", this]
);
		},

		PreviewDone: function () {
				this.mjRunning = false;
				//this.SwapBuffers();
		}
};

Preview.callback = MathJax.Callback(["CreatePreview", Preview]);
Preview.callback.autoReset = true; 

