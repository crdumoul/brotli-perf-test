rb.registerNamespace("rb.widget");rb.widget.facebook=rb.widget.base.extend({get_data:function(){return this._data},set_data:function(a){this._data=a},init:function(){this._super();this._data=null;this._currentItemIndex=0;this._title=null;this._summary=null;this._toggle=null;this._mainBody=null},_onLoad:function(b,a){this._super(b,a);this._title=this.getControl("Title");this._summary=this.getControl("Summary");this._toggle=$(".facebook-widget .heading-container");this._mainBody=$(".facebook-widget .body-block");this._delegates={onToggleClick:rb.createDelegate(this,this._onToggleClick)};this._toggle.on("click",this._delegates.onToggleClick)},_refresh:function(){if(this._data!=null){try{var b=this._data[this._currentItemIndex];this._bindPost(b)}catch(a){this._showError()}}else{this._showError()}},_bindPost:function(a){this._title.html(a.title);this._summary.html(a.summary)},_showError:function(){this._title.text(this.getText("GeneralErrorTitle","Redbox on Facebook"));this._summary.html(this.getText("GeneralErrorDescription",'Please visit <a href="http://www.facebook.com/redbox">Redbox on Facebook</a>!'))},_onToggleClick:function(){if(this._toggle.hasClass("block-expanded")){this._toggle.removeClass("block-expanded").addClass("block-collapsed");this._mainBody.removeClass("body-show").addClass("body-hide")}else{this._toggle.removeClass("block-collapsed").addClass("block-expanded");this._mainBody.removeClass("body-hide").addClass("body-show")}}});