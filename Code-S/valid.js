/**
 * \uc720\ud6a8\uc131 \uac80\uc99d \uba54\uc2dc\uc9c0 JS
 */
var ValidMessage = {
	format : function(source, params) {
		if (arguments.length === 1) {
			return function() {
				var args = jQuery.makeArray(arguments);
				args.unshift(source);
				return ValidMessage.format.apply(this, args);
			};
		} else if (arguments.length > 2 && params.constructor != Array) {
			params = jQuery.makeArray(arguments).slice(1);
		}
		if (params.constructor != Array) {
			params = [ params ];
		}
		jQuery.each(params, function(i, n) {
			source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
		});
		return source;
	}
};

/**
 * \uc720\ud6a8\uc131 \uac80\uc99d \ud568\uc218 JS
 */
var ValidFunc = {
	defaults : {
		names : {},
		messages : {},
		errorType : 'alert'
	},
	init : function(options) {
		this.settings = jQuery.extend( true, {}, this.defaults, options );
		return this;
	},
	validate : function() {
		if (jQuery.isEmptyObject(this.settings)) {
			alert('ValidFunc \uac1d\uccb4\uac00 \uc0dd\uc131\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.');
			return false;
		}

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		function normalizeRule(data) {
			if (typeof data == 'string') {
				var transformed = {};
				jQuery.each(data.split(/\s/), function() {
					transformed[this] = true;
				});
				data = transformed;
			}
			return data;
		}

		function showMessage(element, rule) {
			var messageItem = ValidFunc.customName(element.getID()),
				messageContent = ValidFunc.defaultMessage(element.getID(), rule.method),
				messageRegex = /\$?\{(\d+)\}/g;
			if (typeof messageContent == 'function') {
				messageContent = messageContent.call(this, rule.parameters, element);
			} else if (messageRegex.test(messageContent)) {
				messageContent = ValidMessage.format(messageContent.replace(messageRegex, '{$1}'), rule.parameters);
			}
			return (messageItem || '') + messageContent;
		}

		var key = '', element = '', value = '', method = '', rules = '', rule = {}, result = '';
		for (key in this.settings.rules) {
			if (document.getElementById(key) === null) {
				if (document.getElementsByName(key).length > 0) {
					// key \uac12\uc774 radio, checkbox \ud615\ud0dc\uc758 name \uac12\uc73c\ub85c \uc694\uccad\ub41c \uacbd\uc6b0
					var $elements = jQuery(document.getElementsByName(key));
					var elementTagName = $elements[0].nodeName;
					var elementTypeName = $elements[0].type;
					var isSameElement = true;
					$elements.each(function() {
						if (elementTagName != this.nodeName || elementTypeName != this.type) {
							isSameElement = false;
						}
						return isSameElement;
					});
					if (isSameElement) {
						if (elementTagName.toLowerCase() == 'input' && elementTypeName.toLowerCase() == 'radio') {
							value = $elements.filter(':checked').val();
						} else {
							continue;
						}
					} else {
						continue;
					}
				} else {
					// \ubb38\uc11c \ub0b4\uc5d0 \uc874\uc7ac\ud558\uc9c0 \uc54a\uace0 \uc784\uc758 \ubcc0\uc218\uc77c \uacbd\uc6b0
					if (typeof this.settings.values == 'undefined' || typeof this.settings.values[key] == 'undefined') {
						continue;
					}
					value = this.settings.values[key];
				}

				rules = normalizeRule(this.settings.rules[key]);
				for (method in rules) {
					// \uac1d\uccb4\uac00 \uc874\uc7ac\ud558\uc9c0 \uc54a\uae30 \ub54c\ubb38\uc5d0 \uc784\uc758\ub85c \uc0dd\uc131\ud55c\ub2e4.
					element = {
						getID : function() {
							return key;
						},
						getValue : function() {
							if (typeof value == 'object') {
								return value;
							} else {
								return (value || '').toString().replace(/\r/g, '');
							}
						}
					};
					rule = { method: method, parameters: rules[method] };
					result = ValidFunc.methods[method].call(this, element.getValue(), element, rule.parameters);
					if (!result) {
						switch (this.settings.errorType) {
							case 'dialog' :
								if (this.settings.errorFocus && this.settings.errorFocus[key]) {
									WQFunc.showMessageDialog(showMessage(element, rule), '', this.settings.errorFocus[key]);
								} else {
									WQFunc.showMessageDialog(showMessage(element, rule), '');
								}
								break;
							case 'alert' :
							default :
								alert(showMessage(element, rule));
								if (this.settings.errorFocus && this.settings.errorFocus[key]) {
									if (jQuery.isFunction(this.settings.errorFocus[key].focus)) {
										this.settings.errorFocus[key].focus();
									} else {
										$(document.getElementById(this.settings.errorFocus[key])).focus();
									}
								}
						}
						return false;
					}
				}
			} else {
				// \ubb38\uc11c \ub0b4\uc5d0 \uc874\uc7ac\ud558\ub294 \uc6f9\uc2a4\ud018\uc5b4 \uac1d\uccb4\uc77c \uacbd\uc6b0
				element = eval(key);
				rules = normalizeRule(this.settings.rules[key]);
				for (method in rules) {
					rule = { method: method, parameters: rules[method] };
					result = ValidFunc.methods[method].call(this, (element.getValue() || '').toString().replace(/\r/g, ''), element, rule.parameters);
					if (!result) {
						switch (this.settings.errorType) {
							case 'dialog' :
								WQFunc.showMessageDialog(showMessage(element, rule), '', element);
								break;
							case 'alert' :
							default :
								alert(showMessage(element, rule));
								if (jQuery.isFunction(element.focus)) {
									element.focus();
								} else {
									$(document.getElementById(element.getID())).focus();
								}
						}
						return false;
					}
				}
				if (jQuery.isFunction(element.validate) && !element.validate()) {
					return false;
				}
			}
		}
		return true;
	},

	depend: function(param, element) {
		return this.dependTypes[typeof param]
			? this.dependTypes[typeof param](param, element)
			: true;
	},
	dependTypes : {
		'boolean': function(param, element) {
			return param;
		},
		'string' : function(param, element) {
			return document.getElementById(element.getID()) !== null;
		},
		'function': function(param, element) {
			return param(element);
		}
	},
	optional: function(element) {
		if (typeof element === 'undefined' || !jQuery.isFunction(element.getID) || !jQuery.isFunction(element.getValue)) {
			return false;
		}
		var value = element.getValue();
		if (typeof value == 'string') {
			value = jQuery.trim(value);
		}
		return 'dependency-mismatch' && !ValidFunc.methods.required.call(this, value, element);
	},
	getBytes : function(value, element) {
		if (ValidFunc.optional(element)) {
			return 0;
		} else if (typeof WebSquare == 'object' && typeof WebSquare.util == 'object' && typeof WebSquare.util.getStringByteSize == 'function') {
			return WebSquare.util.getStringByteSize(value);
		}
		function characterLength(characters, position) {
			if (characters.charCodeAt(position) > 128) {
				return 2;
			} else if (characters.charCodeAt(position) == 10) {
				return 2;
			} else {
				return 1;
			}
		}
		var bytes = 0;
		var characters_length = value.length;
		for (var position = 0; position < characters_length; position++) {
			bytes += characterLength(value, position);
		}
		return bytes;
	},
	methods : {
		required : function(value, element, param) {
			if (!ValidFunc.depend(param, element)) {
				return "dependency-mismatch";
			}
			return jQuery.trim(new String(value)).length > 0;
		},
		equalTo : function(value, element, param) {
			var isSuccess = true;
			if (typeof param == 'string' || typeof param == 'number') {
				if (document.getElementById(param) === null) {
					return (value === param);
				} else {
					return (value === param.getValue());
				}
			} else {
				for (var i = 0; param.length; i++) {
					if (document.getElementById(param) === null) {
						isSuccess = (value === param);
					} else {
						isSuccess = (value === param.getValue());
					}
					if (!isSuccess) {
						return isSuccess;
					}
				}
			}
			return isSuccess;
		},
		notEqualTo : function(value, elmenet, param) {
			var isSuccess = true;
			if (typeof param == 'string' || typeof param == 'number') {
				if (document.getElementById(param) === null) {
					return (value !== param);
				} else {
					return (value !== param.getValue());
				}
			} else {
				for (var i = 0; param.length; i++) {
					if (document.getElementById(param[i]) === null) {
						isSuccess = (value === param[i]);
					} else {
						isSuccess = (value === param[i].getValue());
					}
					if (isSuccess) {
						return !isSuccess;
					}
				}
			}
			return !isSuccess;
		},
		equalLength : function(value, element, param) {
			return ValidFunc.optional(element) || jQuery.trim(value).length === param;
		},
		minLength : function(value, element, param) {
			return ValidFunc.optional(element) || jQuery.trim(value).length >= param;
		},
		maxLength : function(value, element, param) {
			return ValidFunc.optional(element) || jQuery.trim(value).length <= param;
		},
		rangeLength : function(value, element, param) {
			var length = ValidFunc.getLength(jQuery.trim(value), element);
			return ValidFunc.optional(element) || (length >= param[0] && length <= param[1]);
		},
		minBytes : function(value, element, param) {
			return ValidFunc.optional(element) || ValidFunc.getBytes(jQuery.trim(value), element) >= param;
		},
		maxBytes : function(value, element, param) {
			return ValidFunc.optional(element) || ValidFunc.getBytes(jQuery.trim(value), element) <= param;
		},
		number: function(value, element) {
			return ValidFunc.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
		digits: function(value, element) {
			return ValidFunc.optional(element) || /^\d+$/.test(value);
		},
		min : function(value, element, param) {
			return ValidFunc.optional(element) || param === '' || value >= param;
		},
		max : function(value, element, param) {
			return ValidFunc.optional(element) || param === '' || value <= param;
		},
		range : function(value, element, param) {
			return ValidFunc.optional(element) || (value >= param[0] && value <= param[1]);
		},
		date : function(value, element) {
			var date = value.replace(/[-\/:]/g,'');
			if (date.length === 0) {
				return true;
			} else if (date.length < 8) {
				return false;
			}
			var yy = date.substring(0,4);
			var mm = date.substring(4,6);
			var dd = date.substring(6,8);
			var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (yy % 1000 !== 0 && yy % 4 === 0) {
				dateList[1] = 29;
			}
			return ValidFunc.optional(element) || (/^\d{4}[\/-]?\d{1,2}[\/-]?\d{1,2}$/.test(value) && 0 < yy && 0 < mm && mm <= 12 && 0 < dd && dd <= dateList[mm-1]);
		},
		minDate : function(value, element, param) {
			// \uac80\uc99d\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc9c1\uc811 \ud638\ucd9c\ud558\ub294 \uacbd\uc6b0\uac00 \ubc1c\uc0dd\ud560 \uc218 \uc788\uc73c\ubbc0\ub85c methods \ud3ec\ud568 \uc2a4\ud06c\ub9bd\ud2b8 \ucd94\uac00
			var valid_date = (typeof this.date == 'function' && this.date(param, element) || (typeof this.methods.date == 'function' && this.methods.date(param, element)));
			return ValidFunc.optional(element) || param === '' || (valid_date && value.replace(/[-\/]/g,'') >= param.replace(/[-\/]/g,''));
		},
		maxDate : function(value, element, param) {
			// \uac80\uc99d\uc2a4\ud06c\ub9bd\ud2b8\ub97c \uc9c1\uc811 \ud638\ucd9c\ud558\ub294 \uacbd\uc6b0\uac00 \ubc1c\uc0dd\ud560 \uc218 \uc788\uc73c\ubbc0\ub85c methods \ud3ec\ud568 \uc2a4\ud06c\ub9bd\ud2b8 \ucd94\uac00
			var valid_date = (typeof this.date == 'function' && this.date(param, element) || (typeof this.methods.date == 'function' && this.methods.date(param, element)));
			return ValidFunc.optional(element) || param === '' || (valid_date && value.replace(/[-\/]/g,'') <= param.replace(/[-\/]/g,''));
		},
		rangeDate : function(value, element, param) {
			return ValidFunc.optional(element) || (value.replace(/[-\/]/g,'') >= param[0].replace(/[-\/]/g,'') && value.replace(/[-\/]/g,'') <= param[1].replace(/[-\/]/g,''));
		},
		telephone : function(value, element) {
			return ValidFunc.optional(element) || /^\d{2,3}\d{3,4}\d{4}$/.test(value);
		},
		mobilephone : function(value, element) {
			return ValidFunc.optional(element) || /^[01][1][016789]\d{3,4}\d{4}$/.test(value);
		},
		email: function(value, element) {
			return ValidFunc.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},
		url: function(value, element) {
			return ValidFunc.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
		korean : function(value, element) {
			var i = 0, value_length = value.length, result = true;
			for (i; i < value_length; i++) {
				if (!((value.charCodeAt(i) > 0x3130 && value.charCodeAt(i) < 0x318F) || (value.charCodeAt(i) >= 0xAC00 && value.charCodeAt(i) <= 0xD7A3))) {
					result = false;
					break;
				}
			}
			return ValidFunc.optional(element) || result;
		},
		notKorean : function(value, element) {
			var i = 0, value_length = value.length, result = false;
			for (i; i < value_length; i++) {
				if (!((value.charCodeAt(i) > 0x3130 && value.charCodeAt(i) < 0x318F) || (value.charCodeAt(i) >= 0xAC00 && value.charCodeAt(i) <= 0xD7A3))) {
					result = true;
					break;
				}
			}
			return ValidFunc.optional(element) || result;
		}
	},
	addMethod: function(name, method, message) {
		ValidFunc.methods[name] = method;
		ValidFunc.messages[name] = (message != undefined ? message : ValidFunc.messages[name]);
	},
	messages : {
		required	: '\ud544\uc218\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		equalTo		: '\uac12\uc774 \uc11c\ub85c \ub2e4\ub985\ub2c8\ub2e4.',
		notEqualTo	: '\uc785\ub825\ud558\uc9c0 \ub9d0\uc544\uc57c \ud558\ub294 \uac12\uc774 \uc785\ub825\ub418\uc5c8\uc2b5\ub2c8\ub2e4.',
		equalLength	: ValidMessage.format('{0}\uae00\uc790\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		minLength	: ValidMessage.format('\uc801\uc5b4\ub3c4 {0}\uae00\uc790\ub294 \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		maxLength	: ValidMessage.format('{0}\uae00\uc790 \uc774\uc0c1\uc740 \uc785\ub825\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.'),
		rangeLength	: ValidMessage.format('{0}\uae00\uc790 \uc774\uc0c1 {1}\uae00\uc790 \uc774\ud558\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.'),
		minBytes	: ValidMessage.format('\uc801\uc5b4\ub3c4 {0}Byte \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		maxBytes	: ValidMessage.format('{0}Byte \uc774\uc0c1\uc740 \uc785\ub825\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.'),
		number		: '\uc22b\uc790\ub9cc \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		digits		: '\uc22b\uc790(digits)\ub9cc \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		min			: ValidMessage.format('{0} \uc774\uc0c1\uc73c\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.'),
		max			: ValidMessage.format('{0} \uc774\ud558\ub85c \uc785\ub825\ud574 \uc8fc\uc138\uc694.'),
		range		: ValidMessage.format('{0}\uc5d0\uc11c {1} \uc0ac\uc774\uc758 \uac12\uc744 \uc785\ub825\ud558\uc138\uc694.'),
		date		: '\ub0a0\uc9dc\uac00 \uc798\ubabb \uc785\ub825\ub410\uc2b5\ub2c8\ub2e4.',
		minDate		: ValidMessage.format('{0} \ub0a0\uc9dc \ub610\ub294 \uc774\ud6c4 \ub0a0\uc9dc\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		maxDate		: ValidMessage.format('{0} \ub0a0\uc9dc \ub610\ub294 \uc774\uc804 \ub0a0\uc9dc\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		rangeDate	: ValidMessage.format('{0}\uc5d0\uc11c {1} \ub0a0\uc9dc \uc0ac\uc774\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.'),
		telephone	: '\uc804\ud654\ubc88\ud638\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		mobilephone	: '\ud734\ub300\uc804\ud654\ubc88\ud638\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		email		: '\uc774\uba54\uc77c \uc8fc\uc18c\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		url			: 'URL \uc8fc\uc18c\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		korean		: '\ud55c\uae00\ub9cc \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.',
		notKorean	: '\ud55c\uae00\uc740 \uc785\ub825\ud558\uc2e4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.'
	},
	defaultMessage: function(elementID, method) {
		return this.findDefined(
				this.customMessage(elementID, method),
				this.messages[method],
				'No message defined for ' + elementID
			);
	},
	findDefined : function() {
		var i = 0;
		for(i; i < arguments.length; i++) {
			if (arguments[i] !== undefined) {
				return arguments[i];
			}
		}
		return undefined;
	},
	// return the custom message for the given element name and validation method
	customMessage: function(id, method) {
		var message = this.settings.messages[id];
		return message && (message.constructor == String
			? message
			: message[method]);
	},
	customName : function(id) {
		var name = this.settings.names[id];
		return name && (name.constructor == String
			? name + ' \ud56d\ubaa9\uc740 '
			: '');
	}
};
