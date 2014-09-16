// Global common Parameter
var GlobalParam = {
	siteURL			: location.protocol + '//' + location.host + '/',
	webSquareSuffix	: '.xml',
	educarSuffix	: '.educar',	// cache
	thekSuffix		: '.thek',		// no cache

	w2xPath : function() {
		var path = location.href;
		var webSquare_cache_URL = '/websquare/educar.jsp?w2xPath=/static';
		var webSquare_nocache_URL = '/websquare/thek.jsp?w2xPath=/static';
		if (path.indexOf(webSquare_cache_URL) >= 0) {
			path = path.substring(location.href.indexOf(webSquare_cache_URL) + webSquare_cache_URL.length);
		} else if (path.indexOf(webSquare_nocache_URL) >= 0) {
			path = path.substring(location.href.indexOf(webSquare_nocache_URL) + webSquare_nocache_URL.length);
		}
		path = path.substring(0, path.indexOf('.xml'));
		return path.substring(0, path.lastIndexOf('/'));
	}(),
	w2xFile : function() {
		var path = location.href;
		var webSquare_cache_URL = '/websquare/educar.jsp?w2xPath=/static';
		var webSquare_nocache_URL = '/websquare/thek.jsp?w2xPath=/static';
		if (path.indexOf(webSquare_cache_URL) >= 0) {
			path = path.substring(location.href.indexOf(webSquare_cache_URL) + webSquare_cache_URL.length);
		} else if (path.indexOf(webSquare_nocache_URL) >= 0) {
			path = path.substring(location.href.indexOf(webSquare_nocache_URL) + webSquare_nocache_URL.length);
		}
		path = path.substring(0, path.indexOf('.xml') + 4);
		return path.substring(path.lastIndexOf('/'));
	}(),

	indexClientWeb : '/web/index.educar',
	indexClientMobile : '',
	indexAdmin : '',

	sessionURL : function() {
		var URL = new Array();
		return URL;
	}(),
	nonSessionURL : function() {
		var URL = new Array();
		// web login, \ud68c\uc6d0\uac00\uc785
		URL.push('/web/login/login.xml');
		URL.push('/web/login/memberStepNameCertification.xml');
		URL.push('/web/login/memberStepClauseAgreement.xml');
		URL.push('/web/login/memberStepDataInput.xml');
		URL.push('/web/login/memberStepJoinCompletion.xml');
		return URL;
	}()
};

// Global common Function
var GlobalFunc = {
	isMobile : function() {
		var userAgent = navigator.userAgent||navigator.vendor||window.opera;
		// @see http://detectmobilebrowsers.com/ - Regex updated: 18 October 2012
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4)));
	},
	referrerClient : function() {
		var indexURL = this.isMobile() ? GlobalParam.indexClientMobile : GlobalParam.indexClientWeb;
		var referrer = document.referrer;
		// referrer \uc815\ubcf4\uac00 \ub2e4\ub978 \ub3c4\uba54\uc778 \uc811\uc18d\uc77c \uacbd\uc6b0\uc5d4 \uba54\uc778\ud654\uba74 URL \uc815\ubcf4\ub97c \ubc18\ud658\ud55c\ub2e4.
		if (referrer !== '' && (referrer.indexOf('http') >= 0 && referrer.indexOf(document.domain) < 0)) {
			referrer = indexURL;
		} else if (location.search.indexOf('returnUrl=') >= 0) {
			referrer = location.search.substring(location.search.indexOf('returnUrl=') + 'returnUrl='.length);
		}
		return referrer;
	},
	nonSessionReferrerClient : function() {
		var indexURL = this.isMobile() ? GlobalParam.indexClientMobile : GlobalParam.indexClientWeb;
		var referrer = this.referrerClient();
		if (referrer == indexURL) {
			return referrer;
		}

		var nonSessionURL = GlobalParam.nonSessionURL;
		var i = 0, length = nonSessionURL.length, valid = true;
		for (i; i < length; i++) {
			if (referrer.indexOf(nonSessionURL[i]) >= 0) {
				valid = false;
				break;
			}
		}
		return valid ? referrer : indexURL;
	}
};

// WebSquare common parameter
var WQParam = {
	status : 0,
	message : '',
	forwardURL : ''
};

// WebSquare common Function
var WQFunc = {
	// config.xml \uc815\uc758\ub418\uc5b4 \uc788\uc74c
	errorHandler : function(submitResultObj) {
		WQParam.status = WebSquare.xml.getValue(submitResultObj, 'response/status');
		WQParam.message = WebSquare.xml.getValue(submitResultObj, 'response/message');
		WQParam.forwardURL = WebSquare.xml.getValue(submitResultObj, 'response/forwardURL');

		if (WQParam.status < 0 && WQParam.message !== '') {
			return this.showMessageDialog(WQParam.message, WQParam.forwardURL);
		}
		return false;
	},

	validate : function() {
		var i = 0;
		for (i; i < arguments.length ; i++) {
			var pluginName = arguments[i].getPluginName();
			if (pluginName == 'group') {
				if (!this.validateGrp(arguments[i])) {
					return false;
				}
			} else if (pluginName == 'tabContainer' || pluginName == 'switch') {
				var contents = arguments[i].getChildren();
				var j = 0;
				for (j; j < contents.length; j++) {
					if (!this.validate(contents[j])) {
						arguments[i].setSelectedIndex(j);
						return false;
					}
				}
			}
		}
		return true;
	},
	validateGrp : function(group) {
		var childArr = group.getChildren();
		var i = 0;
		for (i; i < childArr.length; i++) {
			var checkObj = childArr[i];
			//var id = checkObj.id;
			var pluginName = checkObj.getPluginName();
			if (pluginName == 'group') {
				if (this.validateGrp(checkObj)) {
					continue;
				} else {
					return false;
				}
			} else if (checkObj.validate) {
				if (checkObj.validate()) {
					continue;
				} else {
					return false;
				}
			}
		}
		return true;
	},
	validateMsg : function(label) {
		var invalidType = this.getType();	// invalid \ud0c0\uc785
		var invalidValue = this.getValue();	// invalid \ud0c0\uc785\ubcc4 \uc124\uc815\uac12
		var callerObj = this.getCaller();	// validate \ud638\ucd9c\ud55c \ucef4\ud3ec\ub10c\ud2b8
		var message = label || callerObj.element.getAttribute('title') || '\uc785\ub825';

		switch (invalidType) {
			case 'mandatory' :
				message += ' \ud56d\ubaa9\uc740 \ud544\uc218\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				break;
			case 'maxLength' :
				if (callerObj.getMinLength() == callerObj.getMaxLength()) {
					message += ' \ud56d\ubaa9\uc740 ' + invalidValue + ' \uc790\ub9ac\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				} else {
					message += ' \ud56d\ubaa9\uc740 \ucd5c\ub300 ' + invalidValue + ' \uc790\ub9ac \uc774\ud558\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				}
				break;
			case 'minLength' :
				if (callerObj.getMinLength() == callerObj.getMaxLength()) {
					message += ' \ud56d\ubaa9\uc740 ' + invalidValue + ' \uc790\ub9ac\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				} else {
					message += ' \ud56d\ubaa9\uc740 \ucd5c\uc18c ' + invalidValue + ' \uc790\ub9ac \uc774\uc0c1\uc73c\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				}
				break;
			case 'maxByteLength' :
				if (callerObj.getMinByteLength() == callerObj.getMaxByteLength()) {
					message += ' \ud56d\ubaa9\uc740 ' + invalidValue + ' Byte \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				} else {
					message += ' \ud56d\ubaa9\uc740 \ucd5c\ub300 ' + invalidValue + ' Byte \uc774\ud558\ub85c \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				}
				break;
			case 'minByteLength' :
				if (callerObj.getMinByteLength() == callerObj.getMaxByteLength()) {
					message += ' \ud56d\ubaa9\uc740 ' + invalidValue + ' Byte \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				} else {
					message += ' \ud56d\ubaa9\uc740 \ucd5c\uc18c ' + invalidValue + ' Byte \uc774\uc0c1 \uc785\ub825\ud574\uc57c \ud569\ub2c8\ub2e4.';
				}
				break;
			case 'allowChar' :
				message += ' \ud56d\ubaa9\uc5d0 \ud5c8\uc6a9\ub418\uc9c0 \uc54a\ub294 \ubb38\uc790\uc5f4\uc774 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.';
				break;
			case 'ignoreChar' :
		}
		return message;
	},

	// WebSquare Object get style value
	getStyle : function(obj, attribute) {
		var obj_style;
		var default_value = (attribute == 'width' || attribute == 'height') ? 0 : '';
		try { // IE refresh bug fix.
			obj_style = obj.getAttribute('style');
		} catch (e) {
			return default_value;
		}
		if (!obj_style || obj_style.indexOf(attribute) < 0) {
			return default_value;
		}
		var attribute_style = obj_style.substring(obj_style.indexOf(attribute));
		var attribute_style_end_point = attribute_style.indexOf(';');
		return parseInt(attribute_style.substring(attribute_style.indexOf(':') + 1, attribute_style_end_point < 0 ? attribute_style.length : attribute_style_end_point));
	},
	// WebSquare Object set style attribute
	setStyle : function(obj, attribute, value) {
		var style = ';' + attribute + ':' + value + ';';
		var org_style = obj.getAttribute('style');
		if (!org_style || org_style.indexOf(attribute) < 0) {
			obj.setAttribute('style', style);
			return false;
		}
		var set_style  = org_style.substring(0, org_style.indexOf(attribute));
			set_style += org_style.substring(org_style.indexOf(';', org_style.indexOf(attribute)));
		obj.setAttribute('style', set_style + style);
		return false;
	},

	// Dialog (floating layer) show
	showDialog : function(floatingGrpId, floatingId, closeBeforeScript) {
		if (document.getElementById(floatingGrpId) === null) {
			return false;
		}
		var dialog = {};
		dialog.wqGrpObject = eval(floatingGrpId);
		dialog.wqGrpObject.show();

		function moveDocumentCenter() {
			dialog.object   = document.getElementById(floatingId);
			dialog.$object  = jQuery(dialog.object);
			dialog.wqObject = eval(floatingId);
			dialog.width    = dialog.wqObject.getSize('width') || dialog.$object.width();
			dialog.height   = dialog.wqObject.getSize('height') || dialog.$object.height();
			dialog.top  = Math.floor((document.documentElement.clientHeight / 2) - (dialog.height / 2));
			dialog.left = Math.floor((document.documentElement.clientWidth / 2) - (dialog.width / 2));
			if (jQuery.browser.msie) {
				dialog.cssText = '';
				dialog.cssTextArray = dialog.object.style.cssText.split(';');
				dialog.cssTextIndex = 0;
				for (dialog.cssTextIndex = 0; dialog.cssTextIndex < dialog.cssTextArray.length; dialog.cssTextIndex++) {
					var cssText = jQuery.trim(dialog.cssTextArray[dialog.cssTextIndex]);
					if (cssText.indexOf('top') >= 0 || cssText.indexOf('left') >= 0 || cssText == ';') {
						continue;
					}
					dialog.cssText += cssText + ';';
				}
				dialog.object.style.cssText = dialog.cssText + ';top:' + dialog.top + 'px !important;left:' + dialog.left + 'px !important';
				dialog.wqObject.show();
			} else {
				dialog.object.style.setProperty('top', dialog.top + 'px', 'important');
				dialog.object.style.setProperty('left', dialog.left + 'px', 'important');
			}
		}
		jQuery(window.top).unbind('resize').bind('resize', function() {
			moveDocumentCenter();
		}).resize();

		$('.w2floatingLayer_close_button').unbind('click').bind('click', function() {
			if (closeBeforeScript && typeof closeBeforeScript === 'function') {
				closeBeforeScript.call();
			}
			dialog.wqGrpObject.hide();
			return false;
		});
	},

	// MessageDialog (floating layer) show / close
	showMessageDialog : function(message, forwardURL, focusElement, closeBeforeScript) {
		if (document.getElementById('grpFloatingMessage') === null || document.getElementById('txtMessage') === null) {
			return false;
		}
		txtMessage.setLabel(message.replace(/\\n/gi, '<br>'));

		this.showDialog('grpFloatingMessage', 'floatingMessage');

		// MessageDialog close
		txtClose.focus();
		$('.w2floatingLayer_close_button, .close').unbind('click').bind('click', function() {
			grpFloatingMessage.hide();
			if (forwardURL && typeof forwardURL != 'undefined' && forwardURL !== '') {
				location.href = forwardURL;
			}
			if (focusElement && typeof focusElement != 'undefined') {
				if (jQuery.isFunction(focusElement.focus)) {
					focusElement.focus();
				} else {
					$(document.getElementById(focusElement.getID())).focus();
				}
			}
			if (closeBeforeScript && typeof closeBeforeScript === 'function' && $(this).hasClass('close')) {
				closeBeforeScript.call();
			}
			return false;
		});
	},
	/**
	 * email \uc790\ub3d9\uc644\uc131 \uc120\ud0dd
	 * @param changeObject combobox object
	 * @param targetObject inputbox object
	 */
	changeCboEmail : function(changeObject, targetObject) {
		targetObject.setValue(changeObject.getValue());
		if (changeObject.getValue() === '') {
			targetObject.setDisabled(false);
			// targetObject.focus();
		} else {
			targetObject.setDisabled(true);
		}
	},
	/**
	 * response InstanceNode\uc758 date formatter \uc801\uc6a9
	 * @param instanceName instance \uba85
	 * @param nodeName \ubcc0\uacbd\ud560 node \uba85
	 * @param separator \uad6c\ubd84\uc790
	 */
	setDateFormatterInstanceNode : function(instanceName, nodeName, separator) {
		var node_array = WebSquare.ModelUtil.findInstanceNodes(instanceName);
		switch (node_array.length) {
			case 0 :
				return false;
			case 1 :
				var node_xpath = instanceName + '/' + nodeName;
				var node_value = WebSquare.ModelUtil.getInstanceValue(node_xpath);
				if (node_value.length == 8) {
					WebSquare.ModelUtil.setInstanceValue(node_xpath + 'Formatter', DateFunc.addDelim(node_value, '-'));
				}
				break;
			default :
				for (var i = 1; i <= node_array.length; i++) {
					var node_xpath = instanceName + '[' + i + ']/' + nodeName;
					var node_value = WebSquare.ModelUtil.getInstanceValue(node_xpath);
					if (node_value.length != 8) {
						continue;
					}
					WebSquare.ModelUtil.setInstanceValue(node_xpath + 'Formatter', DateFunc.addDelim(node_value, '-'));
				}
		}
	},
	/**
	 * response InstanceNode\uc758 \uc804\ud654\ubc88\ud638 formatter \uc801\uc6a9
	 * InstanceNode\uc758 value \ub97c \uac00\uc9c0\uace0 \uc804\ud654\ubc88\ud638\ub97c 123-1234-1234 \ud615\uc2dd\uc73c\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @param instanceName instance \uba85
	 * @param nodeName \ubcc0\uacbd\ud560 node \uba85
	 */
	setTelFormatterInstanceNode : function(instancePath, nodeName) {
		var _tel = {};
		switch (arguments.length) {
			case 2 :
				_tel.nodeName2 = nodeName.substring(0, nodeName.length - 1) + '2';
				_tel.nodeName3 = nodeName.substring(0, nodeName.length - 1) + '3';
				break;
			case 4 :
				_tel.nodeName2 = arguments[2];
				_tel.nodeName3 = arguments[3];
				break;
			default :
				alert('\uc798\ubabb\ub41c WQFunc.setTelFormatterInstanceNode \ud638\ucd9c\uc785\ub2c8\ub2e4.');
				return false;
		}
		_tel.telFormatter = WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + nodeName) + '-' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' +  _tel.nodeName2) + '-' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' +  _tel.nodeName3);
		WebSquare.ModelUtil.setInstanceValue(instancePath + '/' + nodeName + 'Formatter', _tel.telFormatter);
	},
	/**
	 * response InstanceNode\uc758 \uc8fc\uc18c formatter \uc801\uc6a9
	 * InstanceNode\uc758 value \ub97c \uac00\uc9c0\uace0 \uc8fc\uc18c\ub97c 123-123 \uc11c\uc6b8\uc2dc \uc778\uc758\ub3d9 1 \uc0c1\uc138\uc8fc\uc18c \ud615\uc2dd\uc73c\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @param instanceName instance \uba85
	 * @param nodeName \ubcc0\uacbd\ud560 node \uba85
	 */
	setAddrFormatterInstanceNode : function(instancePath, zipNodeName, addrNodeName) {
		var _addr = {};
		switch (arguments.length) {
			case 3 :
				_addr.zipNodeName2 = zipNodeName.substring(0, zipNodeName.length - 1) + '2';
				_addr.addrNodeName2 = addrNodeName.substring(0, addrNodeName.length - 1) + '2';
				_addr.addrNodeName3 = addrNodeName.substring(0, addrNodeName.length - 1) + '3';
				_addr.addrNodeNameAdd = addrNodeName.substring(0, addrNodeName.length - 1) + 'Add';
				break;
			case 7 :
				_addr.zipNodeName2 = arguments[3];
				_addr.addrNodeName2 = arguments[4];
				_addr.addrNodeName3 = arguments[5];
				_addr.addrNodeNameAdd = arguments[6];
				break;
			default :
				alert('\uc798\ubabb\ub41c WQFunc.setAddrFormatterInstanceNode \ud638\ucd9c\uc785\ub2c8\ub2e4.');
				return false;
		}
		_addr.addrFormatter = WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + zipNodeName)
							+ '-' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + _addr.zipNodeName2)
							+ ' ' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + addrNodeName)
							+ ' ' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + _addr.addrNodeName2)
							+ ' ' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + _addr.addrNodeName3)
							+ ' ' + WebSquare.ModelUtil.getInstanceValue(instancePath + '/' + _addr.addrNodeNameAdd);
		WebSquare.ModelUtil.setInstanceValue(instancePath + '/' + addrNodeName + 'Formatter', _addr.addrFormatter);
	},
	/*
	 * \ud604\uc7ac \ub144\ub3c4\uc5d0 \ub530\ub978 \ub144\ub3c4 selectBox InstnaceNode \uc0dd\uc131
	 * \uc0dd\uc131 \uacb0\uacfc node \uba85 : cboYears
	 * \ud654\uba74\uc5d0\uc11c setNodeSet('cboYears/vector/data', '@value'); \ud615\ud0dc\ub85c \uc0ac\uc6a9
	 * \ub450\ubc88\uc9f8 argument\uc758 \uac12\uc73c\ub85c \uc2dc\uc791\ub144\ub3c4 \uc124\uc815(\ud604\uc7ac\ub144\ub3c4 - arguments[1])
	 * @param maxCnt \ub144\ub3c4 \uac2f\uc218(default : 10)
	 */
	createYearInstance : function(maxCnt) {
		if (typeof maxCnt !== 'number') {
			maxCnt = 10;
		}
		//\ud604\uc7ac \ub144\ub3c4 \uc870\ud68c
		maxYear = parseInt(WebSquare.date.getCurrentServerDate('yyyy'));
		switch (arguments.length) {
			case 1 :
				break;
			case 2 :
				maxYear = maxYear - Number(arguments[1]);
				break;
			default :
				alert('\uc798\ubabb\ub41c WQFunc.createYearInstance \ud638\ucd9c\uc785\ub2c8\ub2e4.');
				return false;
		}

		var yearVector = new WebSquare.collection.Vector();
		for (var i = 0; i < maxCnt; i++) {
			yearVector.addElement(maxYear - i);
		}
		WebSquare.ModelUtil.setInstanceNode(yearVector.toDocument(), 'cboYears', null , 'replaceAll' );
	}
};

// common parameter
var CommonParam = {
	// default \uc0dd\ub144\uc6d4\uc77c\uc608\uc2dc
	exBirth : 'ex)19801030',
	// SNS \uc774\ub984
	SNSName : {
		twitter : "twitter",
		facebook : "facebook",
		metoday : "metoday",
		yozm : "yozm"
	}
};

// common util function
var CommonFunc = {
	// \uc774\uba54\uc77c \uc790\ub3d9 \uc14b\ud305
	setUserEmail : function(email) {
		var domainIndex = email.indexOf('@');
		var domain = email.substr(domainIndex + 1);
		txtEmail1.setValue(email.substr(0, domainIndex));
		txtEmail2.setValue(domain);
		cboEmail3.setValue(domain);
		if (cboEmail3.getSelectedIndex() > 0 ) {
			txtEmail2.setDisabled(true);
		}
	},
	// \uac80\uc0c9\uc5b4 \ud558\uc774\ub77c\uc774\ud2b8 \uae30\ub2a5 (default : red)
	highlight : function(key, content) {
		var color = '#ff0000';
		switch (arguments.length) {
			case 2 :
				break;
			case 3 :
				color = arguments[2];
				break;
			default :
				alert('\uc798\ubabb\ub41c CommonFunc.highlight() \ud638\ucd9c \uc785\ub2c8\ub2e4.');
				return false;
		}

		var keyIndex = content.indexOf(key);
		if (keyIndex > -1) {
			content = content.split(key).join('<span style="color:' + color + ';font-weight:bold;">' + key + '</span>');
		}
		return content;
	},
	/**
	 * \uc0dd\ub144\uc6d4\uc77c \ub4a4\uc5d0 \ucd94\uac00\ud558\uc5ec 13\uc790\ub9ac \ub9cc\ub4e4\uc5b4\uc900\ub2e4 1980\ub144 10\uc6d4 30\uc77c \ub0a8\uc790 \uacbd\uc6b0(8010301000000)
	 * @param  paramBirthDate \uc0dd\ub144\uc6d4\uc77c (19801030)
	 * @param  paramSex \uc131\ubcc4 (\ub0a8-M, \uc5ec-F)
	 * @return {String}
	 */
	birthSSNConvert : function(paramBirthDate, paramSex) {
		// ex)19801030 -> 801030
		var birthDate = paramBirthDate.substring(2);
		// ex)19801030 -> 19
		var birthYear = paramBirthDate.substring(0, 2);
		// \uc0dd\ub144 \uc55e2\uc790\ub9ac\uc5d0 \ub530\ub978 \ub0a8\uc790 \uc5ec\uc790 \uad6c\ubd84\uac12 \uc124\uc815
		if (birthYear <= "19") {
			if (paramSex == "M") {
				paramSex = "1";
			} else if (paramSex == "F") {
				paramSex = "2";
			}
		} else {
			if (paramSex == "M") {
				paramSex = "3";
			} else if (paramSex == "F") {
				paramSex = "4";
			}
		}
		// ex)19801030 -> 8010301000000
		return birthDate + paramSex + "000000";
	},
	/**
	 * \uc8fc\ubbfc\ubc88\ud638\ub85c \uc0dd\ub144\uc6d4\uc77c \uc870\ud68c
	 * @param \uc8fc\ubbfc\ubc88\ud638
	 * @return {String} \uc0dd\ub144\uc6d4\uc77c
	 */
	ssnBirthConvert : function(ssn) {
		ssn = ssn.replace('-', '');
		// \uc8fc\ubbfc\ubc88\ud638 \uc55e\uc790\ub9ac
		var ssn1 = ssn.substring(0, 6);
		// 2000\ub144 \uc774\ud6c4 \ucd9c\uc0dd\uc790 \uad6c\ubd84
		var sex = ssn.substring(6, 7);
		if (sex === '1' || sex === '2' || sex === '5' || sex === '6') {
			return ('19' + ssn1);
		} else if (sex === '3' || sex === '4' || sex === '7' || sex === '8') {
			return ('20' + ssn1);
		}
		return '';
	},
	/**
	 * \uc8fc\ubbfc\ubc88\ud638 \uc131\ubcc4\uc22b\uc790\ub85c \uc131\ubcc4 \uc870\ud68c(\ub0a8/\uc5ec)
	 * @param \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638 \ub4b7\uc790\ub9ac \uccab\ubc88\uc9f8 \uc22b\uc790
	 * @return {String} (\ub0a8/\uc5ec)
	 */
	ssnSexConvertKor : function(sexDigit) {
		if (sexDigit % 2 === 1) {
			return '\ub0a8';
		} else {
			return '\uc5ec';
		}
	},
	/**
	 * \ub9cc \ub098\uc774 \uacc4\uc0b0
	 * @param birth_date \uc0dd\uc77c
	 * @return {Number} \ub9cc \ub098\uc774
	 */
	getFullAge : function(birth_date) {
		var full_age = Number(0);
		if (birth_date.length < 8) {
			return full_age;
		}
		var today	= new Date();
		switch (arguments.length) {
			case 1 :
				break;
			case 2 :
				var inputDate = arguments[1];
				if (typeof inputDate !== 'undefined' && inputDate.length === 8) {
					today = new Date(inputDate.substring(0, 4), Number(inputDate.substring(4, 6)) - 1, inputDate.substring(6));
				}
				break;
			default :
				alert('\uc798\ubabb\ub41c CommonFunc.getFullAge \ud638\ucd9c\uc785\ub2c8\ub2e4.');
				break;
		}
		var year	= today.getFullYear();
		var month	= today.getMonth() + 1;
		var day		= today.getDate();

		full_age = year - birth_date.substring(0, 4);
		if (month < birth_date.substring(4, 6)) {
			// \ud604\uc7ac \uc6d4\uc774 \ud0dc\uc5b4\ub09c \ub2ec\ubcf4\ub2e4 \ube60\ub97c \uacbd\uc6b0 \ub9cc\ub098\uc774 \ucc28\uac10
			full_age--;
		} else if (month == birth_date.substring(4, 6) && day < birth_date.substring(6, 8)) {
			// \ud604\uc7ac \uc6d4\uc740 \ud0dc\uc5b4\ub09c \ub2ec\uacfc \uac19\uc73c\ub098 \ud604\uc7ac \uc77c\uc790\uac00 \ud0dc\uc5b4\ub09c \uc77c\uc790\ubcf4\ub2e4 \ube60\ub97c \uacbd\uc6b0 \ub9cc\ub098\uc774 \ucc28\uac10
			full_age--;
		}
		return full_age;
	},
	/*
	 * \ucc28\ubc88\ud638 \uc815\ud569\uc131 \uccb4\ud06c
	 */
	checkCarNo : function( sPlateNoType, sPlateNo ) {
		sPlateNo = sPlateNo.replace(/\s/g, "");	//\uacf5\ubc31\uc81c\uac70
		var sPlateLen = sPlateNo.length;
		// \ucc28\ub7c9\ubc88\ud638
		if( sPlateNoType == 1 ) {
			if ( sPlateLen == 7 ){
				car1 = "NN";
				car2 = sPlateNo.substring(0,2);
				car3 = sPlateNo.substring(2,3);
				car4 = sPlateNo.substring(3,7);
				car3 = this.convMotorGubun(car3);
				if ( car3 == "" ){
					 // alert("\ucc28\ub7c9\ubc88\ud638\ub97c \uc798\ubabb\uc785\ub825\ud558\uc600\uc2b5\ub2c8\ub2e4");
					  return false;
				}
			} else if ( sPlateLen == 8 ){
				car1 = sPlateNo.substring(0,2);
				car2 = sPlateNo.substring(2,3);
				car3 = sPlateNo.substring(3,4);
				car4 = sPlateNo.substring(4,8);
				car1 = this.convMotorSido(car1);
				if ( car1 == "" ){
					  //alert("\ucc28\ub7c9\ubc88\ud638\ub97c \uc798\ubabb\uc785\ub825\ud558\uc600\uc2b5\ub2c8\ub2e4");
					  return false;
				}
				if ( car2 != "0" ){
					car3 = this.convMotorGubun(car3);
					if ( car3 == "" ){
						//alert("\ucc28\ub7c9\ubc88\ud638\ub97c \uc798\ubabb\uc785\ub825\ud558\uc600\uc2b5\ub2c8\ub2e4");
						return false;
					}
				}
			} else if ( sPlateLen == 9 ){
				car1 = sPlateNo.substring(0,2);
				car2 = sPlateNo.substring(2,4);
				car3 = sPlateNo.substring(4,5);
				car4 = sPlateNo.substring(5,9);

				car1 = this.convMotorSido(car1);
				if ( car1 == "" ){
					  //alert("\ucc28\ub7c9\ubc88\ud638\ub97c \uc798\ubabb\uc785\ub825\ud558\uc600\uc2b5\ub2c8\ub2e4");
					  return false;
				}
				car3 = this.convMotorGubun(car3);
				if ( car3 == "" ){
					  //alert("\ucc28\ub7c9\ubc88\ud638\ub97c \uc798\ubabb\uc785\ub825\ud558\uc600\uc2b5\ub2c8\ub2e4");
					  return false;
				}
			} else {
				return false;
			}
		// \ucc28\ub300\ubc88\ud638
		} else {
			if ( sPlateLen != 6 ) {
		//alert("\ucc28\ub300\ubc88\ud638 \ub4b7 6\uc790\ub9ac\ub97c \uc785\ub825\ud558\uc138\uc694");
				return false;
			}
		}
		return true;
	},
	/*
	 *
	 */
	convMotorGubun : function(motor_gubun){
		switch(motor_gubun){
			case "\uac70" : return "01" ; break;
			case "\ub108" : return "02" ; break;
			case "\ub354" : return "03" ; break;
			case "\ub7ec" : return "04" ; break;
			case "\uba38" : return "05" ; break;
			case "\uace0" : return "06" ; break;
			case "\ub178" : return "07" ; break;
			case "\ub3c4" : return "08" ; break;
			case "\ub85c" : return "09" ; break;
			case "\ubaa8" : return "10" ; break;
			case "\uac00" : return "11" ; break;
			case "\ub098" : return "12" ; break;
			case "\ub2e4" : return "13" ; break;
			case "\ub77c" : return "14" ; break;
			case "\ub9c8" : return "15" ; break;

			case "\uad6c" : return "51" ; break;
			case "\ub204" : return "52" ; break;
			case "\ub450" : return "53" ; break;
			case "\ub8e8" : return "54" ; break;
			case "\ubb34" : return "55" ; break;

			case "\ubd80" : return "61" ; break;
			case "\uc218" : return "62" ; break;
			case "\uc6b0" : return "63" ; break;
			case "\uc8fc" : return "64" ; break;
			case "\ucd94" : return "65" ; break;
			case "\ucfe0" : return "66" ; break;
			case "\ud22c" : return "67" ; break;
			case "\ud478" : return "68" ; break;
			case "\ud6c4" : return "69" ; break;

			case "\uadf8" : return "71" ; break;
			case "\ub290" : return "72" ; break;
			case "\ub4dc" : return "73" ; break;
			case "\ub974" : return "74" ; break;
			case "\ubbc0" : return "75" ; break;

			case "\ube0c" : return "81" ; break;
			case "\uc2a4" : return "82" ; break;
			case "\uc73c" : return "83" ; break;
			case "\uc988" : return "84" ; break;
			case "\uce20" : return "85" ; break;
			case "\ud06c" : return "86" ; break;
			case "\ud2b8" : return "87" ; break;
			case "\ud504" : return "88" ; break;
			case "\ud750" : return "89" ; break;

			case "\ubcf4" : return "91" ; break;
			case "\uc18c" : return "92" ; break;
			case "\uc624" : return "93" ; break;
			case "\uc870" : return "94" ; break;
			case "\ucd08" : return "95" ; break;
			case "\ucf54" : return "96" ; break;
			case "\ud1a0" : return "97" ; break;
			case "\ud3ec" : return "98" ; break;
			case "\ud638" : return "99" ; break;

			case "\ubc84" : return "17" ; break;

			case "\uc11c" : return "30" ; break;
			case "\uc5b4" : return "31" ; break;
			case "\uc800" : return "32" ; break;
			case "\ucc98" : return "33" ; break;
			case "\ucee4" : return "34" ; break;
			case "\ud130" : return "35" ; break;
			case "\ud37c" : return "36" ; break;

	 // \uc601\uc5c5\uc6a9 ------------------------------------
			case "\ubc14" : return "21" ; break;
			case "\uc0ac" : return "22" ; break;
			case "\uc544" : return "23" ; break;
			case "\uc790" : return "24" ; break;
			case "\ucc28" : return "25" ; break;
			case "\uce74" : return "26" ; break;
			case "\ud0c0" : return "27" ; break;
			case "\ud30c" : return "28" ; break;
			case "\ud558" : return "29" ; break;

			case "\ud5c8" : return "16" ; break;
		}
		return '';
	},
	/*
	 *
	 */
	convMotorSido : function(motor_sido) {
		switch(motor_sido){
			case "\uc11c\uc6b8" : return "01" ; break;
			case "\ubd80\uc0b0" : return "02" ; break;
			case "\uacbd\uae30" : return "03" ; break;
			case "\uac15\uc6d0" : return "04" ; break;
			case "\ucda9\ubd81" : return "05" ; break;
			case "\ucda9\ub0a8" : return "06" ; break;
			case "\uc804\ubd81" : return "07" ; break;
			case "\uc804\ub0a8" : return "08" ; break;
			case "\uacbd\ubd81" : return "09" ; break;
			case "\uacbd\ub0a8" : return "10" ; break;
			case "\uc81c\uc8fc" : return "11" ; break;
			case "\ub300\uad6c" : return "12" ; break;
			case "\uc778\ucc9c" : return "13" ; break;
			case "\uad11\uc8fc" : return "14" ; break;
			case "\ub300\uc804" : return "15" ; break;
			case "\uc6b8\uc0b0" : return "16" ; break;
		}
		return '';
	},
	/*
	 * SNS \ud31d\uc5c5\ub9c1\ud06c \uc124\uc815
	 */
	popupSNSLink : function(requestOptions) {
		if (typeof requestOptions == 'string') {
			requestOptions = {
				SNSName : requestOptions
			};
		}
		var settingOptions = {
			//\ud604\uc7ac \ud398\uc774\uc9c0 \uc8fc\uc18c \uc124\uc815
			url : location.href,
			//\ud604\uc7ac \ud398\uc774\uc9c0 \uc81c\ubaa9 \uc124\uc815
			title : document.title
		};
		for (key in requestOptions) {
			settingOptions[key] = requestOptions[key];
		}
		if (settingOptions.url.indexOf('http') !== 0) {
	    	settingOptions.url = location.protocol + "//" + location.host + settingOptions.url;
	    }
		// \ub9c1\ud06c\uc8fc\uc18c
		var linkUrl = "";
		switch(settingOptions.SNSName) {
			case 'twitter':
				linkUrl = "http://twitter.com/home?status="+encodeURIComponent(settingOptions.title) + " " + encodeURIComponent(settingOptions.url);
				break;
			case 'facebook':
				linkUrl = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(settingOptions.url)+"&t="+encodeURIComponent(settingOptions.title);
				break;
			case 'metoday':
				linkUrl = "http://me2day.net/posts/new?new_post[body]="+encodeURIComponent(settingOptions.title) + " " + encodeURIComponent(settingOptions.url);
				break;
			case 'yozm':
				linkUrl = "http://yozm.daum.net/api/popup/prePost?sourceid=41&link="+encodeURIComponent(settingOptions.url) + "&prefix=" + encodeURIComponent(settingOptions.title);
				break;
		}
		window.open(linkUrl,"sharer","toolbar=0,status=0,width=626,height=436,resizable=1");
	},
	/**
	 * \uc811\uc18d\uc790\uc758 OS\uac00 MAC\uc778\uc9c0 \ud655\uc778\ud55c\ub2e4.
	 */
	OSMacCheck : function() {
		var ua = navigator.userAgent;
		return (ua.indexOf("Macintosh") >= 0) ? true : false;
	},
	repaceBracket : function(str) {
		return str.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
	}
};

/**
 * \ub0a0\uc9dc \uad00\ub828 \ud568\uc218 \ubaa8\uc74c
 */
var DateFunc = {
	/**
	 * \uae30\uc900\uc77c\uc790\uc5d0 \uc6d4\uc744 \ub354\ud55c\ub2e4. \uae30\uc900\uc77c\uc790\uac00 \uc5c6\uc744 \uacbd\uc6b0 \ud604\uc7ac\uc77c\uc790\ub97c \uae30\uc900\uc73c\ub85c \ub354\ud574\uc900\ub2e4.
	 * @param add_month \ub354\ud574\uc904 \uac1c\uc6d4 \uc218
	 * @param delim \uad6c\ubd84\uc790
	 * @param standard_date \uae30\uc900\uc77c\uc790
	 * @returns \uae30\uc900\uc77c\uc790\uc5d0\uc11c \uac1c\uc6d4 \uc218\uac00 \ub354\ud574\uc900 \uc77c\uc790
	 */
	addMonth : function(add_month, delim, paramDate) {
		if (!paramDate) {
			paramDate = WebSquare.date.getCurrentServerDate('yyyyMMdd');
		}
		paramDate = paramDate.replace(/[^0-9]/g, '');
		var date_info = [ paramDate.substring(0, 4), paramDate.substring(4, 6), paramDate.substring(6, 8) ];
		var date_object = new Date(date_info[0], date_info[1] - 1, date_info[2]);
		date_object.setMonth(date_object.getMonth() + add_month);
		var return_date = date_object.getFullYear() + '-' + (date_object.getMonth() + 1 + 100).toString().substring(1) + '-' + (date_object.getDate() + 100).toString().substring(1);
		if (!delim) {
			delim = '';
		}
		return return_date.split('-').join(delim);
	},
	// \ub0a0\uc9dc\uc640 \uad6c\ubd84\uc790\ub97c \uc785\ub825\ubc1b\uc544 \uad6c\ubd84\uc790\ub97c \uc0bd\uc785\ud55c \ub0a0\uc9dc\ud615\uc2dd\uc73c\ub85c \ubc18\ud658\ud55c\ub2e4.
	addDelim : function(paramDate, delim, formatter) {
		if (formatter) {
			var returnDate = '';
			var cutPoint = 0;
			$.each(formatter.split(delim), function(idx, format) {
				returnDate += delim + paramDate.substr(cutPoint, format.length);
				cutPoint += format.length;
			});
			return returnDate.substring(delim.length);
		}
		switch (paramDate.length) {
			case 4 :
				delim = delim || ':';
				return paramDate.substring(0, 2) + delim + paramDate.substring(2);
			case 6 :
				delim = delim || '-';
				return paramDate.substring(0, 4) + delim + paramDate.substring(4);
			case 8 :
				delim = delim || '-';
				return paramDate.substring(0, 4) + delim + paramDate.substring(4, 6) + delim + paramDate.substring(6);
		}
		return paramDate;
	},
	// 'yyyyMMdd' \ud615\uc2dd\uc758 \ub0a0\uc9dc\ub97c \ubc1b\uc544 'yyyy\ub144 MM\uc6d4 dd\uc77c' \ud615\uc2dd\uc73c\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	formatKorean : function(paramDate) {
		paramDate = paramDate.replace(/[^0-9]/gi, '');
		if (paramDate.length != 8) {
			alert('\uc798\ubabb\ub41c DateFunc.formatKorean \ud638\ucd9c\uc785\ub2c8\ub2e4.');
			return false;
		}
		return paramDate.substring(0, 4) + '\ub144 ' + paramDate.substring(4, 6) + '\uc6d4 ' + paramDate.substring(6, 8) + '\uc77c';
	},
	/**
	 * \ub144\uc6d4\uc744 \ubc1b\uc544 \ud574\ub2f9 \ub144\uc6d4\uc758 \uc77c\uc218\ub97c \uad6c\ud55c\ub2e4.
	 * @param year \ub144\ub3c4
	 * @param month \uc6d4
	 */
	getDays : function(year, month) {
		year = Number(year);
		month = Number(month);
		var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (year % 1000 !== 0 && year % 4 === 0) {
			dateList[1] = 29;
		}
		return dateList[month - 1];
	}
};

/**
 * \ubb38\uc790\uc5f4\uc758 \uc88c\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  _total_len {Number} \uc804\uccb4 \uae38\uc774
 * @param  _pad_char {String} \uc88c\uce21\uc5d0 \ucc44\uc6b8 \ubb38\uc790
 * @return {String}
 */
String.prototype.lpad = function(_total_len, _pad_char) {
	_total_len = (_total_len === null || typeof _total_len == 'undefined') ? this.length : _total_len;
	_pad_char = (_pad_char === null || typeof _pad_char == 'undefined') ? ' ' : _pad_char;
	var _return_char = this.substring(0, _total_len);
	while (_return_char.length < _total_len) {
		_return_char = _pad_char + _return_char;
	}
	return _return_char.substring(_return_char.length - _total_len);
};

/**
 * \uc22b\uc790\uc758 \uc88c\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  _total_len {Number} \uc804\uccb4 \uae38\uc774
 * @param  _pad_char {String} \uc88c\uce21\uc5d0 \ucc44\uc6b8 \ubb38\uc790
 * @return {String}
 */
Number.prototype.lpad = function(_total_len, _pad_char) {
	_total_len = (_total_len === null || typeof _total_len == 'undefined') ? this.toString().length : _total_len;
	_pad_char = (_pad_char === null || typeof _pad_char == 'undefined') ? ' ' : _pad_char;
	var _return_char = this.toString().substring(0, _total_len);
	while (_return_char.length < _total_len) {
		_return_char = _pad_char + _return_char;
	}
	return _return_char.substring(_return_char.length - _total_len);
};

/**
 * \ubb38\uc790\uc5f4\uc758 \uc6b0\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  _total_len {Number} \uc804\uccb4 \uae38\uc774
 * @param  _pad_char {String} \uc6b0\uce21\uc5d0 \ucc44\uc6b8 \ubb38\uc790
 * @return {String}
 */
String.prototype.rpad = function(_total_len, _pad_char) {
	_total_len = (_total_len === null || typeof _total_len == 'undefined') ? this.length : _total_len;
	_pad_char = (_pad_char === null || typeof _pad_char == 'undefined') ? ' ' : _pad_char;
	var _return_char = this;
	while (_return_char.length < _total_len) {
		_return_char += _pad_char;
	}
	return _return_char.substring(0, _total_len);
};

/**
 * \uc22b\uc790\uc758 \uc6b0\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  _total_len {Number} \uc804\uccb4 \uae38\uc774
 * @param  _pad_char {String} \uc6b0\uce21\uc5d0 \ucc44\uc6b8 \ubb38\uc790
 * @return {String}
 */
Number.prototype.rpad = function(_total_len, _pad_char) {
	_total_len = (_total_len === null || typeof _total_len == 'undefined') ? this.toString().length : _total_len;
	_pad_char = (_pad_char === null || typeof _pad_char == 'undefined') ? ' ' : _pad_char;
	var _return_char = this.toString();
	while (_return_char.length < _total_len) {
		_return_char += _pad_char;
	}
	return _return_char.substring(0, _total_len);
};

/**
 * \ubb38\uc790\uc5f4\uc744 3\uc790\ub9ac \ub2e8\uc704\uc758 \uc22b\uc790 \ud615\uc2dd\uc73c\ub85c \ucf64\ub9c8 \ucd94\uac00\ud558\uc5ec \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @returns {String}
 */
String.prototype.addComma = function() {
	//return Number(this).toLocaleString().split('.')[0];
	var _amount = this.split('.');
	var _integer = _amount[0];
	var _decimal = _amount.length > 1 ? '.' + _amount[1] : '';
	var _regex = /(^[+-]?\d+)(\d{3})/;
  	while (_regex.test(_integer)) {
  		_integer = _integer.replace(_regex, '$1' + ',' + '$2');
  	}
  	return _integer + _decimal;
};

/**
 * \uc22b\uc790\ub97c 3\uc790\ub9ac \ub2e8\uc704\uc758 \uc22b\uc790 \ud615\uc2dd\uc73c\ub85c \ucf64\ub9c8 \ucd94\uac00\ud558\uc5ec \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @returns {String}
 */
Number.prototype.addComma = function() {
	var _amount = this.toString().split('.');
	var _integer = _amount[0];
	var _decimal = _amount.length > 1 ? '.' + _amount[1] : '';
	var _regex = /(^[+-]?\d+)(\d{3})/;
  	while (_regex.test(_integer)) {
  		_integer = _integer.replace(_regex, '$1' + ',' + '$2');
  	}
  	return _integer + _decimal;
};

/**
 * \ubb38\uc790\uc5f4\uc744 \uc22b\uc790\ub9cc \ucd94\ucd9c\ud558\uc5ec \uc22b\uc790\ud615\uc73c\ub85c \ubc18\ud658\ud55c\ub2e4.
 * @returns {Number}
 */
String.prototype.getNumber = function() {
	var number = this.replace(/[^0-9]/g, '');
	return (number === '' ? 0 : number);
};

/**
 * \uc22b\uc790\ud615\uc5d0\uc11c\ub3c4 \ud638\ucd9c\ud560 \uc218 \uc788\uc73c\ubbc0\ub85c \ubc29\uc5b4\ucf54\ub4dc \uc801\uc6a9
 * @see String.prototype.getNumber
 * @returns {Number}
 */
Number.prototype.getNumber = function() {
	return this + 0;
};
