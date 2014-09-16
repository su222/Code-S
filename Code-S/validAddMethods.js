/** pattern */
ValidFunc.addMethod('pattern', function(value, element, param) {
	return this.optional(element) || param.test(value);
}, 'Invalid format.');

/** \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638 (Social Security number) */
ValidFunc.addMethod('ssn', function(value, element, param) {
	function valid() {
		if (value.length == 14 && value.charAt(6) == '-') {
			value = value.replace('-', '');
		} else if (value.length != 13) {
			return false;
		}
		var regexp = new RegExp('^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))[0-8][0-9]{6}$');
		if (!regexp.test(value)) {
			return false;
		} else {
			var validSsn = {
				sex		: value.charAt(6), // \uc131\ubcc4
				year	: ((this.sex === '1' || this.sex === '2' || this.sex === '5' || this.sex === '6') ? '19' : '20') + value.substring(0, 2), // \uc131\ubcc4\uc5d0 \ub530\ub77c \ucd9c\uc0dd\ub144\ub3c4 \uc124\uc815
				month	: value.substring(2, 4),
				day		: value.substring(4, 6),
				key		: '234567892345',
				sum		: 0
			};
			// \uc6d4\uc5d0 \ub530\ub978 \uc77c\uc5d0 \ud574\ub2f9\ud558\ub294 \ub450\uc790\ub9ac\uc758 \uc801\ud569\uc131 \uac80\uc0ac (\uc724\ub144 \ud3ec\ud568)
			if (validSsn.month === '01' || validSsn.month === '03' || validSsn.month === '05'
					|| validSsn.month == '07' || validSsn.month === '08' || validSsn.month === '10' || validSsn.month === '12')	{
				if (validSsn.day > 31) {
					return false;
				}
			} else if (validSsn.month === '04' || validSsn.month === '06' || validSsn.month === '09' || validSsn.month === '11') {
				if (validSsn.day > 30) {
					return false;
				}
			} else if (validSsn.month === '02') {
				if ((validSsn.year % 4 === 0 && validSsn.year % 100 !== 0) || validSsn.year % 400 === 0) { // \uc724\ub144
					if (validSsn.day > 29) {
						return false;
					}
				} else {
					if (validSsn.day > 28) {
						return false;
					}
				}
			}
			// Algorithm
			switch (validSsn.sex) {
				case '1' :
				case '2' :
				case '3' :
				case '4' : // \uad6d\ub0b4 \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638
					var i = 0;
					for (i; i < 12; i++) {
						validSsn.sum += value.charAt(i) * validSsn.key.charAt(i);
					}
					return Number(value.charAt(12)) === ((11 - validSsn.sum % 11) % 10);
				case '5' :
				case '6' :
				case '7' :
				case '8' : // \uc678\uad6d \ub4f1\ub85d\ubc88\ud638 for \uad6d\ub0b4\uac70\uc18c\uc2e0\uace0\ubc88\ud638 \ubd80\uc5ec\uc790
					var i = 0;
					for (i; i < 12; i++) {
						validSsn.sum += Number(value.charAt(i)) * ((i % 8) + 2);
					}
					return Number(value.charAt(12)) === ((11 - (validSsn.sum % 11)) % 10 + 2) % 10;
			}
			return false;
		}
	}
	return ValidFunc.optional(element) || (param === false) || valid(value);
}, '\uc62c\ubc14\ub978 \uc8fc\ubbfc\ub4f1\ub85d\ubc88\ud638\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694.');

/** \ud734\ub300\uc804\ud654\ubc88\ud638 */
ValidFunc.addMethod('mobile', function(value, element, param) {
	function valid() {
		if (value.length < 10 || value.length > 11) {
			return false;
		}
		var regexp = new RegExp('^(01[1|6|7|8|9])[1-9]+[0-9]{6,7}|(010[1-9][0-9]{7})$');
		if (!regexp.test(value)) {
			return false;
		} else {
			var validYn = false;
			var validTel = value.replace(/(^01.{1})([0-9]+)([0-9]{4})$/, '$1-$2-$3').split('-');
			// \ub3d9\uc77c \ubc88\ud638 \uac80\uc99d XXX-1111-1111/2222-2222 \ub4f1
			var regexp = new RegExp('([0-9])\d{' + (validTel[1].length + validTel[2].length - 1) + ',}');
			if (regexp.test(validTel[1] + validTel[2])) {
				return false;
			}
			// \ub3d9\uc77c \ubc88\ud638 \uac80\uc99d XXX-1212-1212 \ub4f1
			if (validTel[1].substring(0, 2) == validTel[1].substring(2)
					&& validTel[1].substring(0, 2) == validTel[2].substring(0, 2)
					&& validTel[2].substring(0, 2) == validTel[2].substring(2)) {
				return false;
			}
			validTel[1] = Number(validTel[1]);
			validTel[2] = Number(validTel[2]);
			switch (validTel[0]) {
				case '010' :
					if (validTel[1] >= 2000 && validTel[1] <= 9999) {
						validYn = true;
					}
					break;
				case '011' :
					if (validTel[1] >= 200 && validTel[1] <= 899) {
						validYn = true;
					} else if (validTel[1] >= 9000 && validTel[1] <= 9999) {
						validYn = true;
					} else if (validTel[1] >= 1700 && validTel[1] <= 1799) {
						validYn = true;
					}
					break;
				case '016' :
				case '019' :
					if (validTel[1] >= 200 && validTel[1] <= 899) {
						validYn = true;
					}
					if (validTel[1] >= 9000 && validTel[1] <= 9999) {
						validYn = true;
					}
					break;
				case '017' :
				case '018' :
					if (validTel[1] >= 200 && validTel[1] <= 899) {
						validYn = true;
					}
					break;
			}
			return validYn;
		}
	}
	return ValidFunc.optional(element) || (param === false) || valid(value);
}, '\uc62c\ubc14\ub978 \ud734\ub300\uc804\ud654\ubc88\ud638\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694');
