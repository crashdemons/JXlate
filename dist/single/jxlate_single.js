/* @P1@ */
var manifest=[];
if(typeof addcredits  == 'function') addcredits("foo.js",1.0,"crashdemons","Credits and Easter Egg script");

var foi=0
var foe=0;
var fos="";

function addcredits(fn,vr,au,ds){ manifest.push(Array(fn,vr,au,ds));}

function foo(o){
	foe=o;
	foe.value="";
	foe.focus();

	fos="Hello There.  You have accessed the seekrit credits list.\n";
	for(var i=0;i<manifest.length;i++)
		fos+="\n"+manifest[i][0]+" - v"+manifest[i][1]+" by "+manifest[i][2]+" - "+manifest[i][3];

	var foa=foc(fos);
	for(var i=0;i<foa.length;i++) foto(fos.charAt(i),foa[i])
}
function foto(ch,dv){
	setTimeout(
		function() {
				foe.value+=ch;
		},
		dv
	);

}
function fov(fn){
	for(var i=0;i<manifest.length;i++) if(fn==manifest[i][0]) return manifest[i][1];
	return "";
}

function foc(s){
	var fodt=0;
	var foa=s.split("")
	for(var i=0;i<foa.length;i++){
		fodt+=Math.floor((Math.random() * 150) + 1);

		var isLetterL=/[a-z]/g.test(foa[i]);
		var isLetterU=/[A-Z]/g.test(foa[i]);
		var isNumber=/[0-9]/g.test(foa[i]);
		var isWS=/\s/g.test(foa[i]);
		var dv=200;
		if     (isLetterL) dv=50;
		else if(isLetterU) dv=125;
		else if(isNumber ) dv=250;
		else if(isWS     ) dv=25;

		fodt+=dv + Math.floor((Math.random() * 50) + 1);
		foa[i]=fodt;
		if(isWS     ) fodt+=100;//delay next word beginning.
	}
	return foa
}
/* @P2@ */
if(typeof addcredits  == 'function') addcredits("ui.js",2.0,"crashdemons","JXlate UI script and overarching operations.")
var oForm=null;
var mode=0;
var mode_bases=[256,'mc',2,8,10,16,'32r','32h','32c',64,85,'ue'];//values used internally to represent each base in shorthand.
//var mode_names=['Text','Morse','Binary','Octal','Decimal','Hexadecimal','Base32Rfc','Base32Hex','Base32Ckr','Base64','Ascii85','UrlEncode'];//unused array
function xlate_text(s,baseFrom,baseTo){//translate a string from one base to another
	var a=input2buffer(s,baseFrom);//preformat the input into an array of units in that base
	a=array_base2base(a,baseFrom,baseTo);//process the array for conversion
	return buffer2output(a,baseTo);//postformat the output back into readable form.
}
function xlate_switch(mode,newmode){//mode is changing - retrieve all of the parameters needed to start a translation and prepare the form.
	text=oForm.elements["text"].value;

	base=mode_bases[mode];
	newbase=mode_bases[newmode];

	tbox_switch(newbase);
	if(text=="") return;


	if(base=="32r" && newbase==64 && text=="uuddlrlrba") return foo(oForm.elements["text"]);

	text=xlate_text(text,base,newbase);
	oForm.elements["text"].value=text;
	oForm.elements["text"].focus();

}
function xlate_poll(){//poll the UI for mode radio-box changes.
	//console.log("x");
	var newmode=getCheckedRadioValue("mode");
	if(newmode!=mode){//check if the selected radio button has been changed
		console.log("changed! "+mode+"->"+newmode);
		xlate_switch(mode,newmode);//trigger a translation
		mode=newmode;//change the current mode value.
	}
}
function xlate_init(){//set initial values and states
	if(oForm==null){
		oForm=document.getElementById('frmInput');
		document.getElementById("rad0").checked=true;//clearing old form input
		oForm.elements["text"].value="";//clearing old form input
		oForm.elements["text"].focus();
	}
	document.getElementById('header').innerHTML = "JXlate "+fov("jxlate.html");//set the version text header



	var options = document.getElementById("options");
	if (options.addEventListener) {// add a listener for scrolling over the mode selector - allowing easier conversion
		options.addEventListener("mousewheel", MouseWheelHandler, false);// IE9, Chrome, Safari, Opera
		options.addEventListener("DOMMouseScroll", MouseWheelHandler, false);// Firefox
	}
	else options.attachEvent("onmousewheel", MouseWheelHandler);// IE 6/7/8


	tbox_init(oForm.elements["text"]);
	tbox_addtooln(0);
	tbox_addtooln(1);
	tbox_addtooln(2);
	tbox_addtooln(3);
	tbox_addtooln(4);

	setInterval("xlate_poll()",100);//poll the radio selector for changes, using an event for this has some issues between browsers.
}

function getCheckedRadioValue(sname){//get the current value of a radio selector
	var radios = document.getElementsByName(sname);
	for (var i = 0, length = radios.length; i < length; i++) if (radios[i].checked) return radios[i].value;
	return undefined;
}

function MouseWheelHandler(e) {//handle scrollwheel events
	// cross-browser wheel delta
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));//calculate the number of steps the wheel has moved. (signed for direction)

	var target=-1;
	var radios = document.getElementsByName("mode");
	for (var i = 0, length = radios.length; i < length; i++)//find the current selected radio input
		if (radios[i].checked){
			//console.log("i="+i);
			target=modp(i-delta,mode_bases.length); radios[i].checked=false;//target the (current-scrollclicks) radio, in visual order.
		}
	//console.log(target);

	for (var i = 0, length = radios.length; i < length; i++)//find the targetted radio input and check it (will force a mode change and translation)
		if (i==target) radios[i].checked=true;



	return false;

}
function modp(n,d){//modulo that causes smaller negatives (|n|<d) to count from the righthand side (max value) instead of the stock behavior.
	while(n<0) n+=d;
	return (n%d);
}

/*
function generateOption(parent){
	var el=document.createElement("li");
}
functions generateOptions(){
	var parent=document.getElementById("options");

}
*/
if(typeof addcredits  == 'function') addcredits("ascii85.js",2009,"Jacob Rus","Ascii85 Encoder")

/*
JavaScript Base64 and Ascii85 encoder/decoder, by Jacob Rus.

--------------------

Copyright (c) 2009 Jacob Rus

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var shorten = function (array, number) {
  // remove 'number' characters from the end of 'array', in place (no return)
  for (var i = number; i > 0; i--) { array.pop(); };
};
var rstrip = function (string, character) {
  // strip trailing 'character' characters from the end of the string 'string'
  var i = string.length;
  while (string[i - 1] === character) { i--; };
  return string.slice(0, i);
};

var ascii85 = this.ascii85 = (function () {
  var ascii85 = {};
  ascii85.Ascii85CodecError = function (message) { this.message = message; };
  ascii85.Ascii85CodecError.prototype.toString = function () {
    return 'Ascii85CodecError' + (this.message ? ': ' + this.message : '');
  };
  var assertOrBadInput = function (expression, message) {
    if (!expression) { throw new ascii85.Ascii85CodecError(message) };
  };
  ascii85.encode = function (bytes) {
    assertOrBadInput(!(/[^\x00-\xFF]/.test(bytes)), 'Input contains out-of-range characters.'); // disallow two-byte chars
    var padding = '\x00\x00\x00\x00'.slice((bytes.length % 4) || 4);
    bytes += padding; // pad with null bytes
    var out_array = [];
    for (var i=0, n=bytes.length; i < n; i+=4) {
      var newchars = (
        (bytes.charCodeAt(i)   << 030) +
        (bytes.charCodeAt(i+1) << 020) +
        (bytes.charCodeAt(i+2) << 010) +
        (bytes.charCodeAt(i+3)));
      if (newchars === 0) {
        out_array.push(0x7a); // special case: 4 null bytes -> 'z'
        continue;
      };
      var char1, char2, char3, char4, char5;
      char5 = newchars % 85; newchars = (newchars - char5) / 85;
      char4 = newchars % 85; newchars = (newchars - char4) / 85;
      char3 = newchars % 85; newchars = (newchars - char3) / 85;
      char2 = newchars % 85; newchars = (newchars - char2) / 85;
      char1 = newchars % 85;
      out_array.push(char1 + 0x21, char2 + 0x21, char3 + 0x21,
                     char4 + 0x21, char5 + 0x21);
    };
    shorten(out_array, padding.length);
    return '<~' + String.fromCharCode.apply(String, out_array) + '~>'
  };
  ascii85.decode = function (a85text) {
    assertOrBadInput ((a85text.slice(0,2) === '<~') && (a85text.slice(-2) === '~>'), 'Invalid initial/final ascii85 characters');
    // kill whitespace, handle special 'z' case
    a85text = a85text.slice(2,-2).replace(/\s/g, '').replace('z', '!!!!!');
    assertOrBadInput(!(/[^\x21-\x75]/.test(a85text)), 'Input contains out-of-range characters.');
    var padding = '\x75\x75\x75\x75\x75'.slice((a85text.length % 5) || 5);
    a85text += padding; // pad with 'u'
    var newchars, out_array = [];
    var pow1 = 85, pow2 = 85*85, pow3 = 85*85*85, pow4 = 85*85*85*85;
    for (var i=0, n=a85text.length; i < n; i+=5) {
      newchars = (
        ((a85text.charCodeAt(i)   - 0x21) * pow4) +
        ((a85text.charCodeAt(i+1) - 0x21) * pow3) +
        ((a85text.charCodeAt(i+2) - 0x21) * pow2) +
        ((a85text.charCodeAt(i+3) - 0x21) * pow1) +
        ((a85text.charCodeAt(i+4) - 0x21)));
      out_array.push(
        (newchars >> 030) & 0xFF,
        (newchars >> 020) & 0xFF,
        (newchars >> 010) & 0xFF,
        (newchars)        & 0xFF);
    };
    shorten(out_array, padding.length);
    return String.fromCharCode.apply(String, out_array);
  };
  return ascii85;
})();

// var hobbes = (
//   'Man is distinguished, not only by his reason, but by this ' +
//   'singular passion from other animals, which is a lust of the mind, that ' +
//   'by a perseverance of delight in the continued and indefatigable ' +
//   'generation of knowledge, exceeds the short vehemence of any carnal ' +
//   'pleasure.'
// );
// var a85testencode = ascii85.encode(hobbes);
// var a85testdecode = ascii85.decode(a85testencode);
// var b64testencode = base64.encode(hobbes);
// var b64testdecode = base64.decode(b64testencode);
// var b64utestencode = base64_urlsafe.encode(hobbes);
// var b64utestdecode = base64_urlsafe.decode(b64utestencode);
// console.log('Original:\n' + hobbes);
// console.log('Ascii85:\n' + a85testencode);
// console.log('Decoded:\n' + a85testdecode);
// console.log('Base64:\n' + b64testencode);
// console.log('Decoded:\n' + b64testdecode);
// console.log('Base64 URL:\n' + b64utestencode);
// console.log('Decoded:\n' + b64utestdecode);


if(typeof addcredits  == 'function') addcredits("base32.js","2013-04-24","Thomas Peri","`Nibbler` - A Multi-Base Encoder http://www.tumuski.com/ (only used for Base32 at this time)")

/*
Copyright (c) 2010-2013 Thomas Peri
http://www.tumuski.com/

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true,
	eqeqeq: true, plusplus: true, regexp: true, newcap: true, immed: true */
// (good parts minus bitwise and strict, plus white.)

/**
 * Nibbler - Multi-Base Encoder
 *
 * version 2013-04-24
 *
 * Options:
 *   dataBits: The number of bits in each character of unencoded data.
 *   codeBits: The number of bits in each character of encoded data.
 *   keyString: The characters that correspond to each value when encoded.
 *   pad (optional): The character to pad the end of encoded output.
 *   arrayData (optional): If truthy, unencoded data is an array instead of a string.
 *
 * Example:
 *
 * var base64_8bit = new Nibbler({
 *     dataBits: 8,
 *     codeBits: 6,
 *     keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
 *     pad: '='
 * });
 * base64_8bit.encode("Hello, World!");  // returns "SGVsbG8sIFdvcmxkIQ=="
 * base64_8bit.decode("SGVsbG8sIFdvcmxkIQ==");  // returns "Hello, World!"
 *
 * var base64_7bit = new Nibbler({
 *     dataBits: 7,
 *     codeBits: 6,
 *     keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
 *     pad: '='
 * });
 * base64_7bit.encode("Hello, World!");  // returns "kZdmzesQV9/LZkQg=="
 * base64_7bit.decode("kZdmzesQV9/LZkQg==");  // returns "Hello, World!"
 *
 */
var Nibbler = function (options) {
	"use strict";

	// Code quality tools like jshint warn about bitwise operators,
	// because they're easily confused with other more common operators,
	// and because they're often misused for doing arithmetic.  Nibbler uses
	// them properly, though, for moving individual bits, so turn off the warning.
	/*jshint bitwise:false */

	var construct,

		// options
		pad, dataBits, codeBits, keyString, arrayData,

		// private instance variables
		mask, group, max,

		// private methods
		gcd, translate,

		// public methods
		encode, decode;

	// pseudo-constructor
	construct = function () {
		var i, mag, prev;

		// options
		pad = options.pad || '';
		dataBits = options.dataBits;
		codeBits = options.codeBits;
		keyString = options.keyString;
		arrayData = options.arrayData;

		// bitmasks
		mag = Math.max(dataBits, codeBits);
		prev = 0;
		mask = [];
		for (i = 0; i < mag; i += 1) {
			mask.push(prev);
			prev += prev + 1;
		}
		max = prev;

		// ouput code characters in multiples of this number
		group = dataBits / gcd(dataBits, codeBits);
	};

	// greatest common divisor
	gcd = function (a, b) {
		var t;
		while (b !== 0) {
			t = b;
			b = a % b;
			a = t;
		}
		return a;
	};

	// the re-coder
	translate = function (input, bitsIn, bitsOut, decoding) {
		var i, len, chr, byteIn,
			buffer, size, output,
			write;

		// append a byte to the output
		write = function (n) {
			if (!decoding) {
				output.push(keyString.charAt(n));
			} else if (arrayData) {
				output.push(n);
			} else {
				output.push(String.fromCharCode(n));
			}
		};

		buffer = 0;
		size = 0;
		output = [];

		len = input.length;
		for (i = 0; i < len; i += 1) {
			// the new size the buffer will be after adding these bits
			size += bitsIn;

			// read a character
			if (decoding) {
				// decode it
				chr = input.charAt(i);
				byteIn = keyString.indexOf(chr);
				if (chr === pad) {
					break;
				} else if (byteIn < 0) {
					throw 'the character "' + chr + '" is not a member of ' + keyString;
				}
			} else {
				if (arrayData) {
					byteIn = input[i];
				} else {
					byteIn = input.charCodeAt(i);
				}
				if ((byteIn | max) !== max) {
					throw byteIn + " is outside the range 0-" + max;
				}
			}

			// shift the buffer to the left and add the new bits
			buffer = (buffer << bitsIn) | byteIn;

			// as long as there's enough in the buffer for another output...
			while (size >= bitsOut) {
				// the new size the buffer will be after an output
				size -= bitsOut;

				// output the part that lies to the left of that number of bits
				// by shifting the them to the right
				write(buffer >> size);

				// remove the bits we wrote from the buffer
				// by applying a mask with the new size
				buffer &= mask[size];
			}
		}

		// If we're encoding and there's input left over, pad the output.
		// Otherwise, leave the extra bits off, 'cause they themselves are padding
		if (!decoding && size > 0) {

			// flush the buffer
			write(buffer << (bitsOut - size));

			// add padding string for the remainder of the group
			while (output.length % group > 0) {
				output.push(pad);
			}
		}

		// string!
		return (arrayData && decoding) ? output : output.join('');
	};

	/**
	 * Encode.  Input and output are strings.
	 */
	encode = function (input) {
		return translate(input, dataBits, codeBits, false);
	};

	/**
	 * Decode.  Input and output are strings.
	 */
	decode = function (input) {
		return translate(input, codeBits, dataBits, true);
	};

	this.encode = encode;
	this.decode = decode;
	construct();
};

//our base32 encodings
//I tried to use Nibbler for Base32/Ascii85 but I didn't have any luck at the time getting "standard" output...
base32rfc = new Nibbler({
    dataBits: 8,
    codeBits: 5,
    keyString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    pad: '='
});
base32ckr = new Nibbler({
    dataBits: 8,
    codeBits: 5,
    keyString: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
    pad: '='
});
base32hex = new Nibbler({
    dataBits: 8,
    codeBits: 5,
    keyString: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    pad: '='
});



// Caesarian Shift

// This code was written by Tyler Akins and is placed in the public domain.
// It would be nice if this header remained intact.  http://rumkin.com

// Requires util.js

if(typeof addcredits  == 'function') addcredits("caesar.js",2014,"Tyler Akins","Caesar cipher class")


//SwapSpaces(HTMLEscape(Caesar(1, document.encoder.text.value, document.encoder.N.value * 1)));

// Perform a Caesar cipher (ROT-N) encoding on the text
// encdec = -1 for decode, 1 for encode (kinda silly, but kept it like this
//    to be the same as the other encoders)
// text = the text to encode/decode
// inc = how far to shift the letters.
// key = the key to alter the alphabet
// alphabet = The alphabet to use if not A-Z
function Caesar(encdec, text, inc, key, alphabet)
{
   var s = "", b, i, idx;

   if (typeof(alphabet) != 'string')
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

   inc = inc * 1;

   key = MakeKeyedAlphabet(key, alphabet);

   if (encdec < 0)
   {
      inc = alphabet.length - inc;
      b = key;
      key = alphabet;
      alphabet = b;
   }

   for (i = 0; i < text.length; i++)
   {
      b = text.charAt(i);
      if ((idx = alphabet.indexOf(b)) >= 0)
      {
         idx = (idx + inc) % alphabet.length;
	 b = key.charAt(idx);
      }
      else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0)
      {
         idx = (idx + inc) % alphabet.length;
	 b = key.charAt(idx).toLowerCase();
      }
      s += b;
   }
   return s;
}

document.Caesar_Loaded = 1;

function invertall() {
    var percent = '100%';
    /*if (!window.counter) {
        window.counter = 1;
    } else {
      window.counter++;
      if (window.counter % 2 == 0) {
          percent = '0%'
      }
    };   */

    var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    var css = 'html {-webkit-filter: invert('+percent+');' +
        '-moz-filter: invert('+percent+');' +
        '-o-filter: invert('+percent+');' +
        '-ms-filter: invert('+percent+'); ' +
        'filter: invert('+percent+'); ';

    if (navegador()[0] == 'Firefox') {
        css += 'filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'invert\'><feColorMatrix in=\'SourceGraphic\' type=\'matrix\' values=\'-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0\'/></filter></svg>#invert"); }';
    } else {
        css += ' } ';
    }

    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function navegador(){
  var N= navigator.appName, ua= navigator.userAgent, tem;
  var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
  return M;
 }
if(typeof addcredits === 'function') addcredits("morse.js",2,"crashdemons","Morse code translator functions")

var morse_cs=" ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";//morse code charset
//array of mose-code versions of the above.
var morse_cd=[
	"/",
	".-",
	"-...",
	"-.-.",
	"-..",
	".",
	"..-.",
	"--.",
	"....",
	"..",
	".---",
	"-.-",
	".-..",
	"--",
	"-.",
	"---",
	".--.",
	"--.-",
	".-.",
	"...",
	"-",

	"..-",
	"...-",
	".--",
	"-..-",
	"-.--",
	"--..",


	".----",
	"..---",
	"...--",
	"....-",
	".....",
	"-....",
	"--...",
	"---..",
	"----.",
	"-----"
]


function morse_decode(arr){
	var str="";
	for(var i=0,len=arr.length;i<len;i++){//foreach array item (1 char, encoded in morse)
		idx=morse_cd.indexOf(arr[i]);//find the index in our array
		if(arr[i]=="") continue;
		str+=(idx === -1) ? "?" : morse_cs[idx];//append the cleartext version (aligned to the same index) if any, if not "?"
	}
	return str;
}
function morse_encode(arr){
	var morse="";
	for(var i=0,len=arr.length;i<len;i++){//foreach array item (1 char)
		idx=morse_cs.indexOf(arr[i].toUpperCase());//find the index in our charset string
		morse+=(idx === -1) ? " " : morse_cd[idx]+" ";//append the morse translation if any, if not " "
	}
	return morse;
}

if(typeof addcredits  == 'function') addcredits("toolbox.js",1.0,"crashdemons","Text formatting tools")


var tools=[
	['replace','Replace one phrase with another'],
	['case','Toggle letter case'],
	['length','Find the total length'],
	['reverse','Reverse all characters'],
	['shift','Apply Caesar shift'],
	['invert','Invert bit values'],
	['greverse','Reverse groupings only'],
	['stripspaces','Remove spaces'],
];

var toolsets=[];

var tbox;
var tbox_textarea;
var tbox_shown=false;
var tbox_case=true;

function tbox_init(textarea){
	tbox=document.getElementById('tbox');
	tbox_textarea=textarea;
	tbox_hide();

	toolsets[0]=[2];
	toolsets[2]=[0,2,3,5,6,7];//TODO: add word-reversal.
	toolsets[8]=[0,2,3,5,6];
	toolsets[10]=[0,2,3,5,6];
	toolsets[16]=[0,1,2,3,5,6,7];
	toolsets[32]=[2,7];
	toolsets[64]=[2,7];
	toolsets[85]=[2];
	toolsets[256]=[0,1,2,3,4];
}
function tbox_switch(modestr){
	tbox_clear();
	var m=parseInt(modestr);
	if(isNaN(m)) m=0;
	var ts=toolsets[m];
	for(var i=0;i<ts.length;i++) tbox_addtooln(ts[i]);
}

function tbox_show(){
	tbox.style.display='block';
}
function tbox_hide(){
	tbox.style.display='none';
}
function tbox_toggle(){
	if(tbox_shown) tbox_hide();
	else           tbox_show();
	tbox_shown=!tbox_shown;
}

function tbox_setpos(x,y){
	var t = tbox;
	t.style.left=x+"px";
	t.style.top=y+"px";
}
function tbox_clear(){
	var t = tbox;
	while (t.lastChild) {
		t.removeChild(t.lastChild);
	}
}

function tbox_addtooln(i){ tbox_addtool(tools[i][0],tools[i][1]); }
function tbox_addtool(sname,sdesc){
	var sfunc="tbox_action_"+sname;

	var t = tbox;

	var tool=document.createElement("div");
	tool.className="tool";


	var img=document.createElement("img");
	img.title=sdesc;
	img.alt=sname;
	img.src="img/"+sname+".png";
	img.style.borderStyle="none";
	img.onclick=eval(sfunc);

	t.appendChild(tool);
	tool.appendChild(img);

}

function tbox_action_debug(){
	alert("wat");
}

function tbox_action_replace(){
	var search=prompt("Enter the string to replace","");
	if(search===null) return;
	var replace=prompt("Enter the string to replace with","");
	if(replace===null) return;
	tbox_textarea.value=replaceAll(search,replace,tbox_textarea.value);
}
function tbox_action_case(){
	if(tbox_case) tbox_textarea.value=tbox_textarea.value.toUpperCase();
	else          tbox_textarea.value=tbox_textarea.value.toLowerCase();
	tbox_case=!tbox_case;
}
function tbox_action_length(){
	var l=tbox_textarea.value.length;
	var sl= strippedlen(tbox_textarea.value);
	var out="Total length: "+l;
	var base=mode_bases[mode];
	if(base===2){
		out+="\nBit length: "+sl;
		out+="\nBytes: "+(sl/8);
	}else if(base===16){
		out+="\nDigits: "+sl+" (nibbles)";
		out+="\nBytes: "+(sl/2);
	}
	alert(out);
}
function tbox_action_reverse(){
	tbox_textarea.value=reverse(tbox_textarea.value);
}
function tbox_action_shift(){
	var shift=prompt("Please enter the caesar shift value","13");
	if(shift===null) return;
	shift=parseInt(shift);
	if(shift===0) return;
	tbox_textarea.value=Caesar(1,tbox_textarea.value,shift);
}

function tbox_action_invert(){//NOTE: uses 'mode' and 'mode_bases' global from ui.js
	var  base=mode_bases[mode];
	var tmp = xlate_text(tbox_textarea.value,base,2);
	tmp=invertbits(tmp);
	tbox_textarea.value = xlate_text(tmp,2,base);
}
function tbox_action_greverse(){
	tbox_textarea.value=tbox_textarea.value.split("").reverse().join("").split(" ").reverse().join(" ")
}
function tbox_action_stripspaces(){
	tbox_textarea.value=replaceAll(" ","",tbox_textarea.value);
	tbox_textarea.value=replaceAll("\t","",tbox_textarea.value);
	tbox_textarea.value=replaceAll("\r","",tbox_textarea.value);
	tbox_textarea.value=replaceAll("\n","",tbox_textarea.value);
}
//==============================================


function strippedlen(str){
	str=replaceAll(" ","",str);
	str=replaceAll("\t","",str);
	str=replaceAll("\r","",str);
	str=replaceAll("\n","",str);
	return str.length;
}

function invertbits(str){
	str=replaceAll("0","X",str);
	str=replaceAll("1","Y",str);
	str=replaceAll("X","1",str);
	str=replaceAll("Y","0",str);
	return str;
}



function reverse(s){
    return s.split("").reverse().join("");
}
function replaceAll(find, replace, str) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
// Utility functions

// Code was written by Tyler Akins and is placed in the public domain
// It would be nice if you left this header.  http://rumkin.com

if(typeof addcredits  == 'function') addcredits("util.js",2014,"Tyler Akins","Utility functions")

// Remove whitespace from beginning and end of text
function Trim(s)
{
   while (s.length && " \t\r\n".indexOf(s.charAt(0)) >= 0)
   {
      s = s.slice(1, s.length);
   }
   while (s.length && " \t\r\n".indexOf(s.charAt(s.length - 1)) >= 0)
   {
      s = s.slice(0, s.length - 1);
   }

   return s;
}


// Exchange characters in F for ones in T for the string S.  If T is not
// specified or not long enough, the characters are removed.
// "aaabbbC!!" = Tr("AaaBbbCcc", "ABc", "ab!")
// "Test thing" = Tr("Test\n thing", "\r\n")
function Tr(s, f, t)
{
   var o = '';

   if (typeof(t) != 'string')
   {
      t = '';
   }

   for (var i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      var idx = f.indexOf(c);
      if (idx >= 0)
      {
         if (idx < t.length)
	 {
            o += t.charAt(idx);
	 }
      }
      else
      {
         o += c;
      }
   }

   return o;
}


// Insert CR and LF characters into e, based on the position of those
// characters in T.
// If T = "ab\ncd" and E = "zyxw", the result will be "zy\nxw"
function InsertCRLF(t, e)
{
   var o = "", i, j;

   for (i = 0, j = 0; i < t.length; i ++)
   {
      if ("\r\n".indexOf(t.charAt(i)) >= 0)
      {
         o += t.charAt(i);
      }
      else
      {
         o += e.charAt(j ++);
      }
   }

   return o;
}


// Returns an alphabet with a key in front.
// Passing the key of "Four. Score! And Seven Days Ago?"
// will return  "FOURSCEANDVYGBHIJKLMPQTWXZ"
// key = the letters to include in the beginning
// alphaet = the alphabet to use (if not A-Z)
function MakeKeyedAlphabet(key, alphabet)
{
   var out = "";

   if (typeof(alphabet) != 'string')
      alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   else
      alphabet = alphabet.toUpperCase();

   if (typeof(key) != 'string')
      return alphabet;

   key = key.toUpperCase() + alphabet;
   for (var i = 0; i < key.length; i ++)
   {
      if (out.indexOf(key.charAt(i)) < 0 &&
          alphabet.indexOf(key.charAt(i)) >= 0)
      {
         out += key.charAt(i);
      }
   }

   return out;
}


// Make any string contain just alpha characters
function OnlyAlpha(str)
{
   var out = "";

   for (i = 0; i < str.length; i ++)
   {
      var b = str.charAt(i);
      if (b.toUpperCase() >= 'A' && b.toUpperCase() <= 'Z')
      {
         out += b;
      }
   }

   return out;
}


// Change a string into valid HTML text
function HTMLEscape(str)
{
   var out = "";

   for (var i = 0; i < str.length; i ++)
   {
      var c = str.charAt(i);
      if (c == '&')
         c = '&amp;';
      if (c == '>')
         c = '&gt;';
      if (c == '<')
         c = '&lt;';
      if (c == "\n")
         c = "<br>\n";
      out += c;
   }

   return out;
}


// Pass it a textarea object, get it resized automagically
function ResizeTextArea(obj)
{
   var s = obj.value + "\n";
   var newlines = 0;
   var max_chars = 0;
   var i, chars = 0, wide = 0;
   var obj_max_cols = 100, obj_min_cols = 40, obj_max_rows = 15;
   var scrollbar_width = 2;

   for (i = 0; i < s.length; i ++)
   {
      var c = s.charAt(i);
      if (c == "\n")
      {
         if (max_chars < chars)
	    max_chars = chars;
	 chars = 0;
	 newlines ++;
      }
      else
      {
         if (chars == obj_max_cols - scrollbar_width)
         {
	    max_chars = chars;
            j = i;
	    var c2 = s.charAt(j);
	    while (c2 != "\n" && c2 != ' ' && c2 != "\t" && j > 0)
	    {
	       j --;
	       c2 = s.charAt(j);
	    }
	    if (c2 != "\n" && j > 0)
	    {
	       // Not one big long line
	       newlines ++;
	       chars = 0;
	       i = j;
	    }
	    else
	    {
	       wide = 1;
	    }
         }
         else
         {
            chars ++;
         }
      }

      // Short-circuit
      if (obj_max_rows <= newlines + wide + 1 &&
         obj_max_cols <= max_chars + scrollbar_width)
      {
         obj.rows = obj_max_rows;
	 obj.cols = obj_max_cols;
	 return;
      }
   }

   obj.rows = Math.min(obj_max_rows, newlines + wide + 1);
   obj.cols = Math.min(Math.max(obj_min_cols, max_chars + scrollbar_width), obj_max_cols);
}


function Reverse_String(s)
{
   var o = '', i = s.length;

   while (i --)
   {
      o += s.charAt(i);
   }

   return o;
}


// Returns 1 if there was no change, 0 if it is not the same
// Saves value in the element if it was changed, so subsequent calls
// to this function will return 1 until it changes again.
// Don't use this function like this:
//   if (IsUnchanged(x) && IsUnchanged(y) && IsUnchanged(z)) { ... }
// The logic code could short-circuit on X or Z (depending on how it
// gets parsed) and will jump to the 'if' block without evaluating
// all of the variables.  Use this instead:
//   if (IsUnchanged(x) * IsUnchanged(y) * IsUnchanged(z)) { ... }
//   if (IsUnchanged(x) + IsUnchanged(y) + IsUnchanged(z) == 3) { ... }
function IsUnchanged(e)
{
   var v;

   if (e.type == 'checkbox')
   {
      v = e.checked.toString();
   }
   else
   {
      v = e.value;
   }

   if (v != e.getAttribute('_oldValue'))
   {
      e.setAttribute('_oldValue', v);
      return 0;
   }

   return 1;
}


// Makes a tableau out of a passed in key
// Key should be 25 characters!
function HTMLTableau(key)
{
   var out = '';

   for (var i = 0; i < 25; i ++)
   {
      if (i > 0 && i % 5 == 0)
      {
         out += "<br>\n";
      }
      if (i % 5)
      {
         out += " ";
      }
      out += key.charAt(i);
   }

   return "<tt>" + out + "</tt>";
}


// Change multiple spaces into &nbsp; to preserve padding.
function SwapSpaces(in_str)
{
   var out = '';
   var multi = 1;

   for (var i = 0; i < in_str.length; i ++)
   {
      var c = in_str.charAt(i);

      if (c == ' ')
      {
         if (multi)
	 {
	    out += '&nbsp;';
	    multi = 0;
	 }
	 else
	 {
	    out += ' ';
	    multi = 1;
	 }
      }
      else if (multi && (c == '\r' || c == '\n' || c == '\t'))
      {
         out = out.slice(0, out.length - 1) + '&nbsp;' + c;
         multi = 0;
      }
      else
      {
         out += c;
	 multi = 0;
      }
   }

   if (out.charAt(out.length - 1) == ' ')
   {
      out = out.slice(0, out.length - 1) + '&nbsp;';
   }

   return out;
}


// Return a letter frequency count
// Caches information for faster retrieval by multiple functions
// and faster calculation when text is being typed into the forms.
var LetterFrequency_LastText = '';
var LetterFrequency_LastFreq = new Array();
function LetterFrequency(text)
{
   var n = new Array();
   var i = 0, j;

   if (LetterFrequency_LastText == text)
   {
      return LetterFrequency_LastFreq;
   }

   if (text.slice(0, LetterFrequency_LastText.length) ==
       LetterFrequency_LastText)
   {
      n = LetterFrequency_LastFreq;
      i = LetterFrequency_LastText.length;
   }

   for (j = text.length; i < j; i ++)
   {
      var c = text.charAt(i);
      if (! n[c])
      {
         n[c] = 1;
      }
      else
      {
         n[c] ++;
      }
   }

   LetterFrequency_LastText = text;
   LetterFrequency_LastFreq = n;

   return n;
}


// Returns true if the number passed in is prime
// 2 is considered the first prime.
var PrimeList = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
   53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
function IsPrime(n)
{
   // Get rid of the baddies.
   if (n < 2 || n != Math.floor(n)) {
      return false;
   }

   // Quick check for all numbers < 100
   for (var i = 0; i < PrimeList.length; i ++) {
      if (PrimeList[i] == n) {
         return true;
      }
      if (PrimeList[i] > n) {
         return false;
      }
   }

   // Build list of primes needed to do the check
   var m = Math.floor(Math.sqrt(n));
   var m2 = PrimeList[PrimeList.length - 1];
   if (m2 < m) {
      while (m2 <= m) {
	 m2 += 2;
         if (IsPrime(m2)) {
	    PrimeList[PrimeList.length] = m2;
	 }
      }
   }

   // Now we just cycle through the primes
   for (var i = 0; PrimeList[i] <= m; i ++) {
      var d = n / PrimeList[i];
      if (d == Math.floor(d)) {
         return false;
      }
   }

   return true;
}


// Returns the prime factors of a number as an array
// I don't work with negative numbers or zero or non-integers.
function GetFactors(n)
{
   var factors = new Array();
   if (n < 1 || n != Math.floor(n))
   {
      return factors;
   }

   // Check if the number is prime
   if (IsPrime(n)) {
      factors[factors.length] = n;
      return factors;
   }

   // Start building a list of factors
   // This also populates PrimeList with enough primes for us to use
   var index = 0;
   var skipCheck = 0;
   while (skipCheck || ! IsPrime(n)) {
      var d = n / PrimeList[index];
      if (d == Math.floor(d)) {
         if (PrimeList[index] != factors[factors.length - 1]) {
	    factors[factors.length] = PrimeList[index];
	 }
	 n = d;
	 skipCheck = 0;
      } else {
         index ++;
	 skipCheck = 1;
      }
   }
   if (n != factors[factors.length - 1]) {
      factors[factors.length] = n;
   }

   return factors;
}


// Returns true if the numbers we are comparing are coprime.
// Returns false if either one is a non-integer or zero.
// Returns true if either is one.
var CoprimeCache = new Array();
var CoprimeCacheNum = new Array();
function IsCoprime(a, b)
{
   var a_factors = false, b_factors = false;

   if (a < 1 || b < 1 || a != Math.floor(a) || b != Math.floor(b)) {
      return false;
   }
   if (a == 1 || b == 1) {
      return true;
   }

   // Check if we cached either "a" or "b" so we don't need to refactor
   // them again.
   for (var i = 0; i < CoprimeCacheNum.length; i ++) {
      if (CoprimeCacheNum[i] == a) {
         a_factors = CoprimeCache[i];
      }
      if (CoprimeCacheNum[i] == b) {
         b_factors = CoprimeCache[i];
      }
   }

   // Get factors
   if (! a_factors) {
      a_factors = GetFactors(a);
   }
   if (! b_factors) {
      b_factors = GetFactors(b);
   }

   // Set up the cache again
   CoprimeCache = [a_factors, b_factors];
   CoprimeCacheNum = [a, b];

   var a_idx = 0;
   var b_idx = 0;
   while (a_idx < a_factors.length && b_idx < b_factors.length)
   {
      if (a_factors[a_idx] < b_factors[b_idx]) {
         a_idx ++;
      } else if (a_factors[a_idx] > b_factors[b_idx]) {
         b_idx ++;
      } else {
         // Common factor
         return false;
      }
   }
   return true;
}


document.Util_Loaded = 1;

if(typeof addcredits  == 'function') addcredits("xlate.format.js",8,"crashdemons","Numeral System formatting functions")

//preformatter function that changes and splits the text to an array of single units for array_base2base to translate.
//non-numeral strings and encodings tend to have just a single item.
function input2buffer(s,base){
	if(base==256){
		return s.split("");//strings are split by char
	}else if(base=="ue"){
		return [s];//urlencode is handled all was 1 item passed to a function
	}else if(base==2){
		return s.replace(/ /g,'').match(/.{1,8}/g);//strip spaces and split into 8-bit entries for binary.
	}else if(base==16){
		return s.toUpperCase().replace(/ /g,'').match(/.{1,2}/g);//strip spaces and split into 2-digit entries for hex
	}else if(base=="32r" ||base=="32h" ||base=="32c"){
		return [s.replace(/\s/g, '').toUpperCase()];//strip spaces spaces and uppercase as a single item for Base32 decoding.
	}else if(base==64){
		return [s.replace(/\s/g, '')];//similar to the above, but for Base64 decoding all as one item.
	}else if(base==85){
		s=s.replace(/\s/g, '');
		if(s.substr( 0,2)!="<~") s="<~"+s;//allow inputs without the adobe marker characters - our decoder requires them.
		if(s.substr(-2,2)!="~>") s+="~>";
		return [s];//single item to pass to decoder.
	}
	return s.split(" ");//all other items are split by spaces.
}

//postformatter function that joins and changes the output from array_base2base to be readable.
function buffer2output(a,base){
	if(base==256){
		return strstripnongraph(a.join(""));//do not display any special/control characters etc.
	}else if(base==2){
		for(var i=0;i<a.length;i++) a[i]=pad(a[i],8);//make sure the binary output is in groups of 8 bits all displayed.
	}else if(base==16){
		for(var i=0;i<a.length;i++) a[i]=pad(a[i],2);//make sure hex shows both 2 digits for each byte
	}else if(base=="32r" ||base=="32h" ||base=="32c" || base==64 || base==85 || base=="mc" || base=="ue"){
		return a[0];//various encodings return a single item result.
	}
	return a.join(" ");
}

function pad(num, size) {//pad a numerical string with 0's to reach a certain length
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
function strstripnongraph(s){//remove non-graphing chars.
	var out="";
	for(var i=0;i<s.length;i++){
		a=s.charCodeAt(i);
		if(isGraphable(a)) out+=s.substr(i,1)
		else out+=" ";//replace nongraphing with spaces, actually - not splitting.
	}
	return out
}
function isReadable(a){//graphing ASCII chars, determined by charcode value
	return ( (a>=0x20 && a<=0x7E) || a==0x0d || a==0x0a || a==0x09 );
}
function isGraphable(a){//additional graphing ISO-8859-1 chars, determined by charcode value
	return ( isReadable(a) || (a>=0xA0 && a<=0xFF));
}

if(typeof addcredits === 'function') addcredits("xlate.js",8,"crashdemons","Binary Translation library for numeral systems (extensions added for encoding libraries)")

var b32hex="0123456789ABCDEFGHIJKLMNOPQRSTUV";//Triacontakaidecimal
var base_charsets=[];
fill_bases();


function fill_bases(){ for(var b=32;b>=0;b--) base_charsets[b]=b32hex.substr(0,b).split(""); }//set some charset options for use in conversion functions.

//check if the base ID is a numeral conversion or an encoding (external function)
function isEncodedBase(base){ return (base==="32r" ||base==="32h" ||base==="32c" || base===64 || base===85 || base==="mc" || base==="ue");}


//resolves any encodings before regular numeral conversions.
function array_prepareEncodings(a,baseFrom,baseTo){
	var fromEncoded=isEncodedBase(baseFrom);
	var toEncoded=isEncodedBase(baseTo);
	if( (!fromEncoded) && (!toEncoded) ) return [a,baseFrom,baseTo];//if the input unit array is neither encoded nor being encoded, just return it to array_base2base for numeral conversion.
	var s="";

	if(fromEncoded){//catch all of the encoded strings coming in that need to be decoded before translation.
		try{
			if(     baseFrom===64   ) s=atob(a[0]);
			else if(baseFrom==="ue" ) s=unescape(a[0]);//I know this is deprecated, but decodeURI does not do what I need.
			else if(baseFrom==="32r") s=base32rfc.decode(a[0]);
			else if(baseFrom==="32h") s=base32hex.decode(a[0]);
			else if(baseFrom==="32c") s=base32ckr.decode(a[0]);
			else if(baseFrom===85   ) s=  ascii85.decode(a[0]);
			else if(baseFrom==="mc" ) s=morse_decode(a);
		}catch(e){
			console.log("Encoding Error - Invalid encoded string");//do nothing - invalid baseX string should yield no output.
		}
		a=s.split("");//decode the single BaseX entry into chars (base256)
		baseFrom=256;//set up the parameter for the char->numeral array conversion.
	}
	if(toEncoded){//if the input is due to be translated to another base, let's do it here.
		a=array_base2base(a,baseFrom,256);//translate the array into char values if it isn't already.
		s=a.join("")
		if(     baseTo===64   ) a=[btoa(s)];
		else if(baseTo==="ue" ) a=[urlencode(s)];
		else if(baseTo==="32r") a=[base32rfc.encode(s)];
		else if(baseTo==="32h") a=[base32hex.encode(s)];
		else if(baseTo==="32c") a=[base32ckr.encode(s)];
		else if(baseTo===85   ) a=[  ascii85.encode(s)];
		else if(baseTo==="mc" ) a=[    morse_encode(s)];
		baseFrom=baseTo;//we've encoded this to the new base, so lets set From to the current state - which disables any base conversion in array_base2base
	}

	return [a,baseFrom,baseTo];//output modified parameters.
}
function array_base2base(a,baseFrom,baseTo){//convert arrays of numerals from one base to another - implements support for Base64
	var params=array_prepareEncodings(a,baseFrom,baseTo);//resolves any encodings before regular numeral conversions.
	a=params[0];//our prep function returns the parameters as an array after it's done, let's get them back where they need to be.
	baseFrom=params[1];
	baseTo=params[2];

	if(baseFrom===baseTo) return a;//the from and to bases are the same - no conversion necessary!
	for(var i=0,len=a.length;i<len;i++) a[i]=base2base(a[i], baseFrom, baseTo);//do a base conversion on each array element (unit in the From Base) to the To base.
	return a;
}


function base2base(snum, baseFrom, baseTo){//convert a numeral of one base system into another base system numeral
	if(baseFrom===baseTo) return snum;//same base - output the input
	var d=numeral2dec(snum,baseFrom);//convert numeral system A to decimal
	return dec2numeral(d,baseTo);//convert decimal to numeral system B
}


function numeral2dec(snum,sbase){
	base=parseInt(String(sbase).replace(/\D/g,''));

	if(base===10) return parseInt(snum);//decimal to decimal, nothing to do except make sure the output is an integer.
	if(base===256) return snum.charCodeAt(0);//single byte to decimal, easy enough.

	//numeral string representation to decimal, for each digit, decimal+=digitvalue*(base^place)
	var d=0;
	var imax=snum.length-1;
	for(var i=0;i<=imax;i++){
		var sdig=snum.substr(i,1);//current digit of numeral string
		var n=numeraldigit2dec(sdig,sbase);//retrieve the decimal value of the single digit in the numeral system
		var p=imax-i;//determine the 0-based 'place' in the numeral that the digit is at.  this is a reverse index in the range [imax,0]
		var v=n*Math.pow(base,p);//digitvalue*(base^place) to calculate the decimal value of the digit at it's 'place' in the numeral. (eg: F in F00 -> 3840)
		d+=v
		//console.log("i:"+i+" dig:"+sdig+" form: "+v+"="+n+"*("+base+"^"+p+")")
	}
	/*
	a bit insane and unreadable, but for fun:
	for (
		var i=0,d=0,imax=snum.length-1,sdig=0,n=0,p=0,v=0 ;
		i<=imax ;
		i++, sdig=snum.substr(i,1), n=numeraldigit2dec(sdig,sbase), p=imax-i, v=n*Math.pow(base,p), d+= v
	) {}
	return d;
	*/
	return d;
}


function dec2numeral(d,sbase){
	base=parseInt(String(sbase).replace(/\D/g,''));//replace any non-digit chars and cast/interpret to an Integer.

	if(base===10) return d.toString();//decimal to decimal, nothing to do except to ensure a String
	if(base===256) return String.fromCharCode(d);//decimal to byte, enough said

	//decimal to an arbitrary-base numeral string
	var snum="";
	while(d>0){
		var rem=d%base;//find last digit value of numeral
		var sdig=base_charsets[sbase][rem];//char representation of the digit
		d=Math.floor(d/base);//remove the last numeral digit from the integer (value-wise)
		snum=sdig+snum;//prepend because the last digit we process will be the most significant.
	}
	return (snum === '') ? "0" : snum;
}


function numeraldigit2dec(sdig,base){//retrieve the decimal value of a single digit in a numeral system
	var idx=base_charsets[base].indexOf(sdig);
	// there will be a problem here when your indexOf is the first character, since
	// you return 0 if it's not found, but indexOf will return 0 if the first char
	// is the matched item -CZ

	// No problem there, that's what I intended as far as Base2 through 16: Invalid digits become null in valid (0 value).
	// If this becomes a problem later we can return -1 and add a check to numeral2dec() and maybe not append it at all
	// -CD

	return (idx === -1) ? 0 : idx;
}

//encodeURI is the sucessor to this, but it encodes LESS chars, some of which urlencode() does
//of particular interest, & and /  don't get encoded, which can lead to urlencoded inputs breaking URLs.
//escape() is deprecated (why?) but it catches more of these cases
function urlencode(s){
	return escape(s).replace("+","%2B");//inputs with + should be encoded as well... (escape converts spaces to %20)
}
