+function(b){var a=function(){this.user=null;
this.$registrationButton;
this.$registrationForm;
this.$loginContainer;
this.showGigyaShareButton();
this.showGigyaLogin();
this.showGigyaConnections();
this._initEventHandlers()
};
a.DEFAULTS={};
a.prototype._initElements=function(){this.$registrationForm=b("#form-ctr-registration");
this.$loginContainer=b(".container-ctr-login")
};
a.prototype._initEventHandlers=function(){var c=this;
if(typeof gigya!=="undefined"){if(window.location.search.indexOf("gigya=true")!==-1){gigya.socialize.getUserInfo({callback:b.proxy(c.userInfoEventHandler,c)})
}b(".btn-ctr-logout").on("click.logout.qvc.account.data-api",function(){gigya.socialize.logout()
})
}};
a.prototype.showGigyaShareButton=function(){if(typeof gigya!=="undefined"&&typeof gigyaShowShareBarParamsJson!=="undefined"){var d=b("meta[property='og:url']").attr("content");
var e=b("meta[property='og:title']").attr("content");
var c=new gigya.socialize.UserAction();
c.setLinkBack(d);
c.setTitle(e);
c.setDescription(b("meta[property='og:description']").attr("content"));
c.addActionLink(e,d);
c.addMediaItem({type:"image",src:b("meta[property='og:image']").attr("content"),href:d});
gigyaShowShareBarParamsJson.userAction=c;
b("#gigyaShare").click(function(){gigya.socialize.showShareUI(gigyaShowShareBarParamsJson)
})
}};
a.prototype.showGigyaLogin=function(){var c=b("#gigyaLogin").data();
if(typeof gigya!=="undefined"&&c){var d={enabledProviders:c.enabledProviders,buttonsStyle:c.buttonsStyle,enable:c.enable,showTermsLink:c.showTermsLink,hideGigyaLink:c.hideGigyaLink,width:c.dimensions[0],height:c.dimensions[1],containerID:c.containerId,version:c.version};
gigya.socialize.showLoginUI(d);
gigya.socialize.addEventHandlers({onLogin:b.proxy(this.loginEventHandler,this)})
}};
a.prototype.showGigyaConnections=function(){var c=b("#gigyaConnections").data();
if(typeof gigya!=="undefined"&&c){var d={enabledProviders:c.enabledProviders,showTermsLink:c.showTermsLink,showEditLink:c.showEditLink,hideGigyaLink:c.hideGigyaLink,width:c.dimensions[0],height:c.dimensions[1],containerID:c.containerId};
gigya.socialize.showAddConnectionsUI(d);
gigya.socialize.addEventHandlers({onLogin:b.proxy(this.loginFromConnectionsPluginEventHandler,this)})
}};
a.prototype.loginEventHandler=function(e){this._initElements();
var d=this;
if(e&&e.UID&&e.UIDSignature&&e.signatureTimestamp&&e.user){this.user=e.user;
var f=b("#loginForm").attr("action");
var c={gigyaUid:e.UID,gigyaSignature:e.UIDSignature,gigyaTimestamp:e.signatureTimestamp};
if(b('#loginForm [name="j_validate"]').length>0){c.j_validate=b('#loginForm [name="j_validate"]').val()
}var g=getQueryStringParam("resource");
if(g){c.resource=g
}b.ajax({url:f,type:"POST",data:c,success:function(h){if(h&&h.status==="OK"){b(document).trigger(b.Event("successful.login.qvc.account",{responseData:h.data}))
}else{d._alterLoginModal(e.UID,e.UIDSignature,e.signatureTimestamp)
}},error:function(h){d._alterLoginModal(e.UID,e.UIDSignature,e.signatureTimestamp)
}})
}else{console.log("Unable to authenticate on Gigya service")
}};
a.prototype.loginFromConnectionsPluginEventHandler=function(e){var d=this;
b(".error-ctr-gigya").addClass("hide");
if(e&&e.user&&e.UID&&e.UIDSignature&&e.signatureTimestamp){this.user=e.user;
var f=b("#gigyaConnections").data("social-identity-href");
var c={gigyaUid:e.UID,gigyaSignature:e.UIDSignature,gigyaTimestamp:e.signatureTimestamp};
b.ajax({url:f,type:"POST",data:c,success:function(g){if(g&&g.status==="OK"){}else{console.log("Unable to add the social identity");
gigya.socialize.logout();
b(".error-ctr-gigya").removeClass("hide")
}},error:function(g){console.log("Unable to add the social identity");
gigya.socialize.logout();
b(".error-ctr-gigya").removeClass("hide")
}})
}else{console.log("Unable to authenticate on Gigya service");
gigya.socialize.logout();
b(".error-ctr-gigya").removeClass("hide")
}};
a.prototype.userInfoEventHandler=function(d){this._initElements();
var c=this;
if(d&&d.UID&&d.UIDSignature&&d.signatureTimestamp&&d.user){this.user=d.user;
c._appendGigyaFieldsToForm(c.$registrationForm,d.UID,d.UIDSignature,d.signatureTimestamp);
c._mapGigyaUserDataToForm(c.$registrationForm,d.user);
b(".form-ctr-password-field",c.$registrationForm).remove()
}else{console.log("Unable to authenticate on Gigya service")
}};
a.prototype._alterLoginModal=function(g,c,i){var d=this;
b(".ctr-social-login",d.$loginContainer).remove();
var f=b("<p/>").text(Granite.I18n.get("You're trying to login via social network for the first time. If you already have an account on QVC, please insert your email and password. Otherwise click register to create a new account."));
b(d.$loginContainer).prepend(f);
d._appendGigyaFieldsToForm(d.$loginContainer.find("form#loginForm"),g,c,i);
var h=b(".btn-ctr-registration-link",d.$loginContainer);
var e=h[0]?h[0].search:"";
if(e&&e.indexOf("?")===-1){e+="?"
}else{e+="&"
}e+="gigya=true";
h[0].search=e
};
a.prototype._appendGigyaFieldsToForm=function(d,e,c,h){var g=b("<input>").attr({name:"gigyaUid",id:"gigyaUid",value:e,type:"hidden"});
var f=b("<input>").attr({name:"gigyaSignature",id:"gigyaSignature",value:c,type:"hidden"});
var i=b("<input>").attr({name:"gigyaTimestamp",id:"gigyaTimestamp",value:h,type:"hidden"});
d.append(g).append(f).append(i)
};
a.prototype._mapGigyaUserDataToForm=function(e,d){var g={email:"email",firstName:"firstName",lastName:"lastName",gender:function(i){if(i.gender){switch(i.gender){case"m":return"Mr.";
case"f":return"Mrs."
}}},birthDate:function(j){if(j.birthDay&&j.birthMonth&&j.birthYear){var i=(j.birthDay<10?"0":"")+j.birthDay;
var k=(j.birthMonth<10?"0":"")+j.birthMonth;
return i+"/"+k+"/"+j.birthYear
}}};
for(var c in g){var f=g[c];
var h=null;
if(f instanceof Function){h=f(d)
}else{if(typeof f=="string"&&d[f]){h=d[f]
}}if(h!==null){b("#"+c,e).val(h)
}}};
b(document).ready(function(){window.QvcGigya=new a()
})
}(jQuery);