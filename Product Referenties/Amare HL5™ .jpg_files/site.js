var mixinArray = [];
var appVueGlobal = {};
var appVueGlobalShopping = {};

// Global clipboard copy utility function
// Works on desktop and mobile browsers including iOS Safari
var ClipboardUtil = {
    copyText: function (text, onSuccess, onError) {
        var fallbackCopy = function (text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            textArea.style.fontSize = "16px"; // Prevent zoom on iOS
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            textArea.setSelectionRange(0, text.length); // For iOS
            var successful = false;
            try {
                successful = document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy failed: ', err);
            }
            document.body.removeChild(textArea);
            return successful;
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                if (onSuccess) onSuccess();
            }).catch(function (err) {
                console.error('Clipboard API failed, using fallback: ', err);
                if (fallbackCopy(text)) {
                    if (onSuccess) onSuccess();
                } else if (onError) {
                    onError(err);
                }
            });
        } else {
            if (fallbackCopy(text)) {
                if (onSuccess) onSuccess();
            } else if (onError) {
                onError(new Error('Copy failed'));
            }
        }
    }
};