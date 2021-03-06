
if (typeof jxlate === "undefined") {
    console.error("JXlate module loaded before core.");
} else
    jxlate.translator = {
        
        /**
         * Character set used for generating most other numeral system character sets.
         * 
         * Triacontakaidecimal (base32hex) string with extensions to contain the alphabet.
         * @type {String}
         */
        b32hex: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        
        /**
         * An array that contains the character set strings for each indexed numeral system, when available.
         * @type {Array}
         */
        base_charsets: [],
        
        /**
         * Initializes the translator object.
         * @return {undefined}
         */
        init: function () {
            this.fill_bases();
        },
        
        /**
         * Generates internal charset strings for each supported numeral system base.
         * @return {undefined}
         */
        fill_bases: function () {
            for (var b = 36; b >= 0; b--)
                this.base_charsets[b] = this.b32hex.substr(0, b).split("");
            this.base_charsets[26] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        }, //set some charset options for use in conversion functions.

        /**
         * check if the base ID is implemented as a numeral conversion or a special encoding (external function)
         * @param {String|number} base the numeral system base value
         * @return {Boolean} whether the base is a special encoding
         */
        isEncodedBase: function (base) {
            return (base === "32r" || base === "32h" || base === "32c" || base === 64 || base === 85 || base === "mc" || base === "ue" || base === "ucs2" || base === "utf8");
        },

        /**
         * Resolves any special encodings before and after performing base conversions, as a wrapper to normal conversions.
         * @param {Array} a The array of data to be converted as represented in the initial base/numeral system.
         * @param {String|number} baseFrom the base or numeral system to convert from
         * @param {String|number} baseTo the base or numeral system to convert to
         * @return {Array} An array containing the output parameters of the conversion: The array of data as represented in the final base/numeral system, the initial base, the final base.
         */
        array_prepareEncodings: function (a, baseFrom, baseTo) {
            var fromEncoded = this.isEncodedBase(baseFrom);
            var toEncoded = this.isEncodedBase(baseTo);
            if ((!fromEncoded) && (!toEncoded))
                return [a, baseFrom, baseTo];//if the input unit array is neither encoded nor being encoded, just return it to array_base2base for numeral conversion.
            var s = "";

            if (fromEncoded) {//catch all of the encoded strings coming in that need to be decoded before translation.
                if (baseFrom === 64)
                    s = atob(a[0]);
                else if (baseFrom === "ue")
                    s = unescape(a[0]);//I know this is deprecated, but decodeURI does not do what I need.
                else if (baseFrom === "32r")
                    s = base32rfc.decode(a[0]);
                else if (baseFrom === "32h")
                    s = base32hex.decode(a[0]);
                else if (baseFrom === "32c")
                    s = base32ckr.decode(a[0]);
                else if (baseFrom === 85)
                    s = ascii85.decode(a[0]);
                else if (baseFrom === "mc")
                    s = morse.decode(a);
                else if (baseFrom === "ucs2")
                    s = convert_encoding(a[0], 'ucs2', 'iso88591');
                else if (baseFrom === "utf8")
                    s = convert_encoding(a[0], 'utf8', 'iso88591');
                //else if(baseFrom==="n")    s=array_base2base(a,this.radix_prompt(),256).join("");
                a = s.split("");//decode the single BaseX entry into chars (base256)
                baseFrom = 256;//set up the parameter for the char->numeral array conversion.
            }
            if (toEncoded) {//if the input is due to be translated to another base, let's do it here.
                a = this.array_base2base(a, baseFrom, 256);//translate the array into char values if it isn't already.
                s = a.join("");
                if (baseTo === 64)
                    a = [btoa(s)];
                else if (baseTo === "ue")
                    a = [this.urlencode(s)];
                else if (baseTo === "32r")
                    a = [base32rfc.encode(s)];
                else if (baseTo === "32h")
                    a = [base32hex.encode(s)];
                else if (baseTo === "32c")
                    a = [base32ckr.encode(s)];
                else if (baseTo === 85)
                    a = [ascii85.encode(s)];
                else if (baseTo === "mc")
                    a = [morse.encode(s)];
                else if (baseTo === "ucs2")
                    a = [convert_encoding(s, 'iso88591', 'ucs2')];
                else if (baseTo === "utf8")
                    a = [convert_encoding(s, 'iso88591', 'utf8')];
                //else if(baseTo==="n")    a=array_base2base(a,256,this.radix_prompt());
                baseFrom = baseTo;//we've encoded this to the new base, so lets set From to the current state - which disables any base conversion in array_base2base
            }

            return [a, baseFrom, baseTo];//output modified parameters.
        },
        
        /**
         * Prompt for a base number to perform arbitrary conversions with.
         * @throws {String} "no entry" if no entry was made, "invalid radix" if an unsupported base value was entered.
         * @return {number} the base value entered by the user.
         */
        radix_prompt: function () {
            var n = prompt("Please enter the radix (base) to convert with. (only 2-36 supported)", "");
            if (n === null)
                throw "no entry";
            n = parseInt(n);
            if (n < 2 || n > 36)
                throw "invalid radix";
            return n;
        },
        
        /**
         * Converts an array of data between two bases / numeral systems
         * @param {Array} a An array of data in to convert from the initial base
         * @param {String|number} baseFrom The base or numeral system to convert from, or "n" to prompt for an arbitrary radix
         * @param {String|number} baseTo The base or numeral system to convert to, or "n" to prompt for an arbitrary radix
         * @return {Array} The array of data as converted to the final base.
         */
        array_base2base: function (a, baseFrom, baseTo) {//convert arrays of numerals from one base to another - implements support for Base64
            if (baseFrom === "n")
                baseFrom = this.radix_prompt();
            if (baseTo === "n")
                baseTo = this.radix_prompt();

            var params = this.array_prepareEncodings(a, baseFrom, baseTo);//resolves any encodings before regular numeral conversions.
            a = params[0];//our prep function returns the parameters as an array after it's done, let's get them back where they need to be.
            baseFrom = params[1];
            baseTo = params[2];


            if (baseFrom === baseTo)
                return a;//the from and to bases are the same - no conversion necessary!
            for (var i = 0, len = a.length; i < len; i++)
                a[i] = this.base2base(a[i], baseFrom, baseTo);//do a base conversion on each array element (unit in the From Base) to the To base.
            return a;
        },

        /**
         * Converts a number-string in a given numeral system to another numeral system.
         * 
         * Only individual numbers (like "12302") are converted by this function, it does not handle a list or multiple numbers.
         * @param {String} snum The numeral string in the initial base
         * @param {String|number} baseFrom the numeral system to convert from
         * @param {String|number} baseTo the numeral system to convert to
         * @return {String} The equivalent numeral string in the final base
         */
        base2base: function (snum, baseFrom, baseTo) {//convert a numeral of one base system into another base system numeral
            if (baseFrom === baseTo)
                return snum;//same base - output the input
            var d = this.numeral2dec(snum, baseFrom);//convert numeral system A to decimal
            return this.dec2numeral(d, baseTo);//convert decimal to numeral system B
        },

        /**
         * Converts a number-string in a given numeral system to decimal
         * @param {String|number} snum The numeral string in the given base
         * @param {String|number} sbase The base to convert from
         * @return {Number} The equivalent decimal value of the input
         */
        numeral2dec: function (snum, sbase) {
            var base = parseInt(String(sbase).replace(/\D/g, ''));

            if (base === 10)
                return parseInt(snum);//decimal to decimal, nothing to do except make sure the output is an integer.
            if (base === 256)
                return snum.charCodeAt(0);//single byte to decimal, easy enough.

            //numeral string representation to decimal, for each digit, decimal+=digitvalue*(base^place)
            var d = 0;
            var imax = snum.length - 1;
            for (var i = 0; i <= imax; i++) {
                var sdig = snum.substr(i, 1);//current digit of numeral string
                var n = this.numeraldigit2dec(sdig, sbase);//retrieve the decimal value of the single digit in the numeral system
                var p = imax - i;//determine the 0-based 'place' in the numeral that the digit is at.  this is a reverse index in the range [imax,0]
                var v = n * Math.pow(base, p);//digitvalue*(base^place) to calculate the decimal value of the digit at it's 'place' in the numeral. (eg: F in F00 -> 3840)
                d += v;
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
        },

        /**
         * Converts a decimal value to a given numeral system number-string.
         * @param {number} d the decimal value to convert
         * @param {String|number} sbase the base to convert to
         * @return {String} the equivalent number-string in the given base
         */
        dec2numeral: function (d, sbase) {
            var base = parseInt(String(sbase).replace(/\D/g, ''));//replace any non-digit chars and cast/interpret to an Integer.

            if (base === 10)
                return d.toString();//decimal to decimal, nothing to do except to ensure a String
            if (base === 256)
                return String.fromCharCode(d);//decimal to byte, enough said

            //decimal to an arbitrary-base numeral string
            var snum = "";
            while (d > 0) {
                var rem = d % base;//find last digit value of numeral
                var sdig = this.base_charsets[base][rem];//char representation of the digit
                d = Math.floor(d / base);//remove the last numeral digit from the integer (value-wise)
                snum = sdig + snum;//prepend because the last digit we process will be the most significant.
            }
            console.log(sbase + " " + base);
            return (snum === '') ? this.base_charsets[base][0] : snum;
        },

        /**
         * Converts a single digit string from a given numeral system to decimal.
         * 
         * Note: this method returns 0 for input digits that are invalid in the provided numeral system base (not present in the charset).
         * @param {String} sdig a string containing a single digit in the given numeral system
         * @param {String|number} base the base to convert from
         * @return {Number} the equivalent decimal value of the input digit.
         */
        numeraldigit2dec: function (sdig, base) {//retrieve the decimal value of a single digit in a numeral system
            var idx = this.base_charsets[base].indexOf(sdig);
            // there will be a problem here when your indexOf is the first character, since
            // you return 0 if it's not found, but indexOf will return 0 if the first char
            // is the matched item -CZ

            // No problem there, that's what I intended as far as Base2 through 16: Invalid digits become null in valid (0 value).
            // If this becomes a problem later we can return -1 and add a check to numeral2dec() and maybe not append it at all
            // -CD

            return (idx === -1) ? 0 : idx;
        },

//encodeURI is the sucessor to this, but it encodes LESS chars, some of which urlencode() does
//of particular interest, & and /  don't get encoded, which can lead to urlencoded inputs breaking URLs.
//escape() is deprecated (why?) but it catches more of these cases
        /**
         * Percent-encodes symbols in a string similarly to the PHP method of the same name.
         * 
         * Currently decoded using unescape().
         * @param {type} s The string to encode
         * @return {String} the encoded string
         */
        urlencode: function (s) {//TODO: urldecode does not decode plus signs as spaces and this method does not exactly match urlencode() output (spaces->%20)
            return escape(s).replace(/\+/g, "%2B");//inputs with + should be encoded as well... (escape converts spaces to %20)
        }

    };
