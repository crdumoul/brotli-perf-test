
<!-- //
(function () {
    var app;
    
    app = {

        embedMode: 'htmlembed',
        showMouseOver: false,

        config: {
            embedID: 'br-button',
            embedClass: 'br-button'
        },

        tplVars: {
            images: {
                roots: {
                    cdn: {
                        http: 'http://' + 'medals.bizrate.com/',
                        https: 'https://' + 'medals.bizrate.com/'
                    },
                    medals: {
                        http: 'http://medals.bizrate.com',
                        https: 'https://medals.bizrate.com'
                    }
                },
                paths: {
                    body: ['cdn', 'medals/summary/' + 18893 + '_medal_summary.gif'],
                    arrow: ['cdn', 'templates/images/tooltip-arrow.png'],
                    bar: ['cdn', 'templates/images/bar-bg.png'],
                    textArrow: ['cdn', 'templates/images/text-arrow.png']
                }
            },
            linkText: 'See detailed store ratings',
            titleText: 'Bizrate Store Ratings Summary',
            registeredText: '',
            participatingText: '',
            target: 'http://www.bizrate.com/ratings_guide/merchant_detail__mid--' + 18893 + '.html?rf=sur',
            certified: true,
			MID: '18893',		
			CDNSourcePath: 'medals.bizrate.com/',				
			merchantName: '',
			ratingsCount: '1,000,000',
			showReviewNumber: true,				
			ffCustomerSupport: '7.9',
			ffOverallRating: '8.5',
			ffOnTimeDelivery: '8.6',	
			ffLikelihoodToBuyAgain: '8.4',
			smallImage: ((typeof bizrate !== "undefined" && bizrate.small != null && bizrate.small === 'true') ? true : false),
			registered: false,
			participating: false,
            arrow: '',
            isShowingTooltip: false
        },

		escapeString:function (mString) {
			return mString.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
		},

	    setShowMouseOver: function () {
	    	if (this.getTplVar('certified') && (this.isNotBlank(this.getTplVar('ratingsCount'))) && (this.isNotBlank(this.getTplVar('ffCustomerSupport')))
	    		&& (this.isNotBlank(this.getTplVar('ffCustomerSupport'))) && (this.isNotBlank(this.getTplVar('ffOverallRating'))) && (this.isNotBlank(this.getTplVar('ffOnTimeDelivery')))
	    		&& (this.isNotBlank(this.getTplVar('ffLikelihoodToBuyAgain')))
	    		&& (this.isNotBlank(this.getTplVar('CDNSourcePath')))
	    	) {
	    		this.showMouseOver = true;
	    	}
	    	if (this.getTplVar('registered') || this.getTplVar('participating')) {
				this.showMouseOver = true;
	    	}
	    	safeMerchantName = this.escapeString("Rakuten.com Shopping");
	    	this.tplVars['merchantName'] = safeMerchantName;
	    	this.tplVars['registeredText'] = safeMerchantName + " is a Registered Store in Bizrate's customer feedback program.  Your feedback will help improve their business and inform other customers.  Please be sure to complete a Bizrate survey after every purchase!";
	    	this.tplVars['participatingText'] = safeMerchantName  + " is a Participating Store in Bizrate's customer feedback program.  Your feedback will help improve their business and inform other customers.  Please be sure to complete a Bizrate survey after every purchase!";

	        if (this.getCookie(safeMerchantName, "cl")) {
	            this.showMouseOver = false;
	        }
	    },
        getCookie:function(name, id) {
            var cookieName = name + "_" + this.getTplVar('MID') + "_" + id + "=";
            var cookies = document.cookie;

            if (cookies.length > 0) {
                var start = cookies.indexOf(cookieName);
                if (start != -1) {
                    start += cookieName.length;
                    end = cookies.indexOf(";", start);
                    if (end == -1){ end = cookies.length; }
                    return unescape(cookies.substring(start, end));
                }
            }
        },
        setCookie:function(name, id) {
            var cookieName = name + "_" + this.getTplVar('MID') + "_" + id;
            document.cookie = cookieName + "=1;path=/;"
        },
        image: function (name) {
            var h, im, rName, p, r, out;
            if (window.location.protocol === 'https:') {
                h = 'https';
            }
            else {
                h = 'http';
            }
            if (this.tplVars.images.paths[name] === undefined) {
                throw (name + " is not a valid image");
            }
            else {
                im = this.tplVars.images.paths[name];
                if (im.length !== 2) {
                    throw ("Image format for " + name + " is invalid.");
                }
                rName = im[0];
                p = im[1];
                if (this.tplVars.images.roots[rName] === undefined) {
                    throw (rName + " is not a valid root.");
                }
                else if (this.tplVars
                             .images.roots[rName][h] === undefined) {
                    throw (h + " is not defined for " + rName);
                }
                else {
                    r = this.tplVars.images.roots[rName][h];
                    out = (r + p);
                    return out;
                }
            }
        },

        getTplVar: function (name) {
            return this.tplVars[name];
        },

        initEnv: function () {
            if (window.BR_ENV !== undefined) {
                this.env = window.BR_ENV;
            }
            if (window.BR_EMBEDMODE !== undefined) {
                this.embedMode = window.BR_EMBEDMODE;
            }

            return true;
        },

        loadScript: function (url, callback) {
            var sc;
            sc = document.createElement('script');
            sc.type = 'text/javascript';
            if (callback !== undefined) {
                if (sc.readyState) {
                    sc.onreadystatechange = function() {
                        if (sc.readyState == 'loaded' ||
                              sc.readyState == 'complete') {
                            sc.onreadystatechange = null;
                            callback();
                        }
                    };
                }
                else {
                    sc.onload = function() {
                        callback();
                    };
                }
            }
            sc.src = url;
            document.getElementsByTagName("head")[0].appendChild(sc);
            return true;
        },

        fetchAllButtons: function () {
            var allLinks = document.getElementsByTagName("a");
            var allClassLinks = [];
            for (var i = 0; i < allLinks.length; i++) {
                if (allLinks[i].className == this.config.embedClass) {
                    allClassLinks.push(allLinks[i]);
                }
            }
            return allClassLinks;
        },
        init: function () {

            var _this, bId;
            _this = this;
            app.initEnv();
            app.setShowMouseOver();
            if (app.embedMode === 'jsembed') {
                bId = app.renderButton();
            }
            if (app.embedMode === 'jsembed') {
            	app.activateButton(bId);
            }
            else if (app.embedMode === 'htmlembed') {
            	app.activateButtons();
            }
            return true;
        },

        activateButtons: function () {
            var buttons, _this;
            _this = this;
            buttons = _this.fetchAllButtons();
            for (var i = 0; i < buttons.length; i++) {
                var anc = buttons[i];
                _this.setStyle(anc, _this.buttonAnchorCss());
                _this.render(anc);
            }
        },

        activateButton: function (bId) {
            var b;
            b = this.fetchButton(bId);
            this.render(b);
            return true;
        },

        fetchButton: function (bId) {
            return document.getElementById(bId);
        },

        render: function (b) {
            var d;
            d = this.renderTooltip();
            this.registerActions(b, d);
            return true;
        },

        closeTooltip: function (tooltip) {
            app.tplVars.isShowingTooltip = false;
            tooltip.style.display = "none";
            return true;
        },

        intToPx: function (val) {
            return (val.toString(10) + 'px');
        },

        showTooltip: function (tooltip, btn) {
            var o, y, x, h, arrH, arrW,
                bh, bw, ttW, ww,
                arrX, arrXDir, arrYPos,
                arrCss, vt, tiptop;
            vt = window.pageYOffset;
            ww = null;
            arrW = 19;
            arrH = 29;
            bh = parseInt(btn.style.height, 10);
            bw = parseInt(btn.style.width, 10);
            ttW = parseInt(tooltip.style.width, 10);
            o = app.objectPosition(btn);
            h = parseInt(tooltip.style.height, 10);
            y = (o[1] - (h + (arrH / 2)));
            arrCss = {};
            // Y Below
            if ((y < 0) || y < vt) {
                y = (o[1] + (bh + (arrH / 2)));
                arrCss.backgroundPosition = 'center top';
                arrCss.bottom = 'auto';
                arrCss.top = this.intToPx(-arrH);
                tiptop = y+8;
            }
            // Y Above
            else {
                arrCss.backgroundPosition = 'center bottom';
                arrCss.top = 'auto';
                arrCss.bottom = this.intToPx(-arrH);
                tiptop = y-8;
            }
			x = o[0] + bw - ttW;
            // X Left Edge
            if (x < 0) {
                x = o[0];
                arrCss.right = 'auto';
                arrCss.left = this.intToPx((bw / 2) - (arrW / 2));

            }
            // X Right Edge
            else if ((ww - (x + parseInt(ttW, 10))) < 0) {
                x = o[0] + parseInt(bw, 10) - parseInt(ttW, 10);
                arrCss.left = 'auto';
                arrCss.right = this.intToPx((parseInt(bw, 10) / 2) - (arrW / 2));

            }
            // X Non Edge
            else {
                arrCss.right = 'auto';
                arrCss.left = this.intToPx(((parseInt(ttW, 10) / 2) - (arrW / 2)));

            }
            tooltip.style.top = this.intToPx(tiptop);
            tooltip.style.left = this.intToPx(x);
            arr.style.backgroundPosition = arrCss.backgroundPosition;
            arr.style.top = arrCss.top;
            arr.style.bottom = arrCss.bottom;
            arr.style.left = arrCss.left;
            arr.style.right = arrCss.right;
            app.tplVars.isShowingTooltip = true;
            tooltip.style.display = "";
            return true;
        },

        objectPosition: function (obj) {
            var curleft = 0;
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                      curleft += obj.offsetLeft;
                      curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return [curleft,curtop];
        },

        registerActions: function (b, d) {
            var r, _this;
            _this = this;
            app.tplVars.isShowingTooltip = false;
            // BEGIN mobile exception
            var deviceAgent = navigator.userAgent.toLowerCase();
    		var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    		var mapName = this.getTplVar('MID') + "_medal";
            if(agentID) {// && !(document.getAttribute(mapName).length > 0)) {
                var pageLink = _this.fetchAllButtons()[0];
            	pageLink.onclick = function (e) {
            			e.preventDefault();
						if (!app.tplVars.isShowingTooltip && _this.showMouseOver) {
		                    _this.showTooltip(d, b);
		                } else {
		                	window.open(_this.getTplVar('target'));
		                };
                    };
            } else {
                b.onmouseover = function (e) {
                    if (!app.tplVars.isShowingTooltip && _this.showMouseOver) {
                        _this.showTooltip(d, b);
                    }
                    return true;
                };
                d.onmouseover = function (e) {
                    if (!app.tplVars.isShowingTooltip && _this.showMouseOver) {
                        _this.showTooltip(d, b);
                    }
                    return true;
                };
            }
            b.onmouseout = function (e) {
                app.tplVars.isShowingTooltip = false;
                window.setTimeout(function () {
                    if (!app.tplVars.isShowingTooltip){
                        _this.closeTooltip(d);
                    }
                    return true;
                }, 2000);
                return true;
            };
            d.onmouseout = function (e) {
                app.tplVars.isShowingTooltip = false;
                window.setTimeout(function () {
                    if (!app.tplVars.isShowingTooltip){
                        _this.closeTooltip(d);
                    }
                    return true;
                }, 2000);
                return true;
            };
            return true;
        },

        cssURL: function (im) {
            return ('URL(' + im + ')');
        },

        renderTooltip: function () {
            var d, t, x, ebd, bda, bdi, _this;
            var merchantNameWords, certifiedWords, ratingCountWords;
            var overallRating, shopAgainRating, ontimeRating, supportRating;
            _this = this;
            merchantNameWords = document.createElement("div");
            _this.setStyle(merchantNameWords,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '176px',
                    left: '17px',
                    color: '#0062a9',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '14px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '1.15'
                }
            );
            certifiedWords = document.createElement("div");
            _this.setStyle(certifiedWords,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '160px',
                    left: '17px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '11px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '1.15'
                }
            );
            ratingCountWords = document.createElement("div");
            _this.setStyle(ratingCountWords,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '146px',
                    left: '17px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '11px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '9px'
                }
            );
            overallRating = document.createElement("div");
            _this.setStyle(overallRating,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '48px',
                    left: '15px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '9px'
                }
            );
            shopAgainRating = document.createElement("div");
            _this.setStyle(shopAgainRating,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '48px',
                    left: '108px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '9px'
                }
            );
            ontimeRating = document.createElement("div");
            _this.setStyle(ontimeRating,{
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '48px',
                    left: '205px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '9px'
                }
            );
            supportRating = document.createElement("div");
            _this.setStyle(supportRating, {
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '48px',
                    left: '299px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '10px',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    lineHeight: '9px'
                }
            );
            registered = document.createElement("div");
            _this.setStyle(registered, {
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '90px',
                    left: '17px',
                    color: '#333333',
                    fontFamily: 'Arial, Helvetica, sans-serif',
					fontVariant: 'normal',
					fontWeight: 'normal',
                    fontSize: '12px'
                }
            );

            d = document.createElement("div");
            _this.setStyle(d, {
                    backgroundColor: '#FFF',
                    border: '1px solid #06397B',
                    width: '376px',
                    height: '284px',
                    padding: '1px',
                    marginLeft: '-5px',
                    zIndex: '2147483647',
                    boxShadow: '3px 3px 3px 0px #B9B9B9',
                    MozBoxShadow: '3px 3px 3px 0px #B9B9B9',
                    WebkitBoxShadow: '3px 3px 3px 0px #B9B9B9',
                    MsBoxShadow: '3px 3px 3px 0px #B9B9B9',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    display: 'none'
                }
            );
            t = document.createElement("div");
            _this.setStyle(t, {
                    position: 'relative',
                    height: '26px',
                    lineHeight: '26px',
                    color: '#FFF',
                    backgroundImage: this.cssURL(this.image('bar')),
                    backgroundColor: '#3588CC',
                    repeat: 'repeat-y',
                    textAlign: 'center',
                    fontSize: '14px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
					fontWeight: 'normal',
 					fontVariant: 'normal',
                    cursor: 'default'
                }
            );
            bd = document.createElement("div");
            _this.setStyle(bd, {
                    width: '372px',
                    height: '254px',
                    textAlign: 'left',
                    position: 'relative'
                }
            );
            bda = document.createElement("a");
            _this.setStyle(bda, {
                    textDecoration: 'none',
                    position: 'absolute',
                    bottom: '8px',
                    left: '13px',
                    color: '#0062AB',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: '12px',
					fontWeight: 'normal',
 					fontVariant: 'normal',
                    lineHeight: '1.15',
                    backgroundImage: this.cssURL(this.image('textArrow')),
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    paddingRight: '13px'
                }
            );
            bdi = document.createElement("img");
            _this.setStyle(bdi, {
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    border: '0px'
                }
            );
            arr = document.createElement("div");
            _this.setStyle(arr, {
                    position: 'absolute',
                    bottom: '-33px',
                    right: '32px',
                    backgroundImage: this.cssURL(this.image('arrow')),
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center bottom',
                    width: '19px',
                    height: '29px'
                }
            );
            t.innerHTML = this.getTplVar('titleText');
            x = document.createElement("div");
            _this.setStyle(x, {
                    height: '26px',
                    lineHeight: '26px',
                    position: 'absolute',
                    top: '0px',
                    right: '10px',
                    color: '#FFF',
                    fontWeight: 'bold',
                    cursor: 'pointer',
 					fontVariant: 'normal',
                    fontSize: '14px',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                }
            );
            x.onclick = function () {
                _this.setCookie(_this.getTplVar('merchantName'), "cl");
                _this.setShowMouseOver();
                _this.closeTooltip(d);
                return false;
            };

            x.innerHTML = "X";
            t.appendChild(x);
            bdi.setAttribute('src', this.image('body'));
            bda.setAttribute('href', this.getTplVar('target'));
            bda.setAttribute('target', '_blank');
            bda.innerHTML = this.getTplVar('linkText');
            certifiedWords.innerHTML = "Customer Certified";
            ratingCountWords.innerHTML = 'Over ' + '<b>' + this.getTplVar('ratingsCount') + ' verified</b>' + ' customers have rated this store';
	        overallRating.innerHTML = this.getDisplayRating('ffOverallRating');
	        ontimeRating.innerHTML = this.getDisplayRating('ffOnTimeDelivery');
	        supportRating.innerHTML = this.getDisplayRating('ffCustomerSupport');
	        shopAgainRating.innerHTML = this.getDisplayRating('ffLikelihoodToBuyAgain');
            bd.appendChild(bdi);

            if (_this.getTplVar('certified')) {
            	merchantNameWords.innerHTML = this.getTplVar('merchantName');
            	bd.appendChild(merchantNameWords);
	            bd.appendChild(certifiedWords);
	            if (_this.getTplVar('showReviewNumber')) {
	            	bd.appendChild(ratingCountWords);
	            }
	            bd.appendChild(overallRating);
				bd.appendChild(ontimeRating);
				bd.appendChild(supportRating);
				bd.appendChild(shopAgainRating);
	            bd.appendChild(bda);

			} else if (_this.getTplVar('registered')) {
				merchantNameWords.innerHTML = this.getTplVar('merchantName');
				registered.innerHTML = this.getTplVar('registeredText');
				bd.appendChild(registered);
            	bd.appendChild(merchantNameWords);
			} else if (_this.getTplVar('participating')) {
				merchantNameWords.innerHTML = this.getTplVar('merchantName');
				registered.innerHTML = this.getTplVar('participatingText');
				bd.appendChild(registered);
            	bd.appendChild(merchantNameWords);
			}
            d.appendChild(t);
            d.appendChild(bd);
            d.appendChild(arr);
            app.tplVars.arrow = arr;
            var bObj = document.getElementsByTagName('body').item(0);
            bObj.appendChild(d);

            return d;
        },

		isNotBlank: function(str) {
    		return !(!str || 0 === str.length);
		},

		getDisplayRating: function (words) {
			return this.getTplVar(words) + ' out of 10';
		},

        isQuirksMode: function () {
            return (document.compatMode === 'BackCompat');
        },

        generateId: function () {
            return (this.config.embedID + '-' +
                    Math.ceil(Math.random() * 100000000));
        },

        buttonAnchorCss: function () {
            return {
                height: (this.tplVars.smallImage) ? '37px' : '73px',
                width: (this.tplVars.smallImage) ? '112px' : '125px',
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'inline-block'
            };
        },

        buttonImageCss: function () {
            return {
                height: (this.tplVars.smallImage) ? '37px' : '73px',
                width: (this.tplVars.smallImage) ? '112px' : '125px',
                border: '0px'
            };
        },

        renderButton: function () {
            var b, _this, im, id, dum;
            _this = this;
            dum = document.createElement("div");
            b = document.createElement("a");
            _this.setStyle(b, this.buttonAnchorCss());
            im = document.createElement("img");
             _this.setStyle(im, this.buttonImageCss());
            im.setAttribute('src', this.image('button'));
            b.appendChild(im);
            id = this.generateId();
            b.setAttribute('id', id);
            dum.innerHTML = b;
            var bObj = document.getElementsByTagName('body').item(0);
            bObj.appendChild(dum);
            return id;
        },

        setStyle: function ( objId, propertyObject ) {
            for (var property in propertyObject) {
                if(property == 'float') {
                    objId.style['cssFloat'] = propertyObject[property];
                    objId.style['styleFloat'] = propertyObject[property];
                    objId.style[property] = propertyObject[property];
                } else {
                    objId.style[property] = propertyObject[property];
                }

            }
        }
    };

    setTimeout(app.init, 500);
    return true;
})();
//-->
