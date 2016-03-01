// $Id: datepicker.js,v 1.2.36.2 2008-12-11 07:20:08 hwu Exp $ 
/**
 * DatePicker widget using Prototype and Scriptaculous.
 * (c) 2007 Mathieu Jondet <mathieu@eulerian.com>
 * Eulerian Technologies
 *
 * DatePicker is freely distributable under the same terms as Prototype.
 *
 */

/**
 * DatePickerFormatter class for matching and stringifying dates.
 *
 * By Arturas Slajus <x11@arturaz.net>.
 */
var DatePickerFormatter = Class.create();
DatePickerFormatter.prototype = {
    /**
     * Create a DatePickerFormatter.
     *
     * format: specify a format by passing 3 value array consisting of
     *   "yyyy", "mm", "dd". Default: ["yyyy", "mm", "dd"].
     *
     * separator: string for splitting the values. Default: "-".
     *
     * Use it like this:
     *   var df = new DatePickerFormatter(["dd", "mm", "yyyy"], "/");
     *   df.current_date();
     *   df.match("7/7/2007");
     */
    initialize: function(format, separator) {
        if (Object.isUndefined(format))
	 format = ["yyyy", "mm", "dd"];
        if (Object.isUndefined(separator))
	 separator = "-";

        this._format 	= format;
        this.separator	= separator;
                
        this._format_year_index	= format.indexOf("yyyy");
        this._format_month_index= format.indexOf("mm");
        this._format_day_index	= format.indexOf("dd");
                
        this._year_regexp	= /^\d{4}$/;
        this._month_regexp 	= /^0\d|1[012]|\d$/;
        this._day_regexp 	= /^0\d|[12]\d|3[01]|\d$/;
    },
    
    /**
     * Match a string against date format.
     * Returns: [year, month, day]
     */
    match: function(str) {
        var d = str.split(this.separator);
        
        if (d.length < 3)
	 return false;
        
        var year = d[this._format_year_index].match(this._year_regexp);
        if (year) { year = year[0] } else { return false }
        var month = d[this._format_month_index].match(this._month_regexp);
        if (month) { month = month[0] } else { return false }
        var day = d[this._format_day_index].match(this._day_regexp);
        if (day) { day = day[0] } else { return false }
        
        return [year, month, day];
    },
    
    /**
     * Return current date according to format.
     */
    current_date: function() {
        var d = new Date;
        return this.date_to_string(
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate()
       );
    },
    
    /**
     * Return a stringified date accordint to format.
     */
    date_to_string: function(year, month, day, separator) {
        if (Object.isUndefined(separator))
	 separator = this.separator;

        var a = [0, 0, 0];
        a[this._format_year_index]	= year;
        a[this._format_month_index] 	= month.toPaddedString(2);
        a[this._format_day_index] 	= day.toPaddedString(2);
        
        return a.join(separator);
    }
}; 


/**
 * DatePicker
 */

var DatePicker	= Class.create();

DatePicker.prototype	= {
 Version	: '0.9.4',
 _relative	: null,
 _div		: null,
 _zindex	: 1,
 /* if true, after moving on next month navigation focus sets on firt cell else on last*/
 _navigateFork : true,
 _keepFieldEmpty: false,
 _daysInMonth	: [31,28,31,30,31,30,31,31,30,31,30,31],
 _dateFormat	: [ ["dd", "mm", "yyyy"], "/" ],
 _daysID        : [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
 /* language */
 _language	: 'fr',
 _language_month	: $H({
  'fr'	: [ 'Janvier', 'F&#233;vrier', 'Mars', 'Avril', 'Mai', 'Juin', 
   'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'D&#233;cembre' ],
  'en'	: [ 'January', 'February', 'March', 'April', 'May',
   'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  'es'	: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
  'ca'  : [ 'Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
  'it'	: [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
   'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre' ],
  'de'	: [ 'Januar', 'Februar', 'M&#228;rz', 'April', 'Mai', 'Juni',
   'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ],
  'pt'	: [ 'Janeiro', 'Fevereiro', 'Mar&#231;o', 'Abril', 'Maio', 'Junho',
   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
  'hu'	: [ 'Janu&#225;r', 'Febru&#225;r', 'M&#225;rcius', '&#193;prilis', 
   'M&#225;jus', 'J&#250;nius', 'J&#250;lius', 'Augusztus', 'Szeptember', 
   'Okt&#243;ber', 'November', 'December' ],
  'lt'  : [ 'Sausis', 'Vasaris', 'Kovas', 'Balandis', 'Gegu&#382;&#279;',
   'Bir&#382;elis', 'Liepa', 'Rugj&#363;tis', 'Rus&#279;jis', 'Spalis', 
   'Lapkritis', 'Gruodis' ],
  'nl'	: [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni',
   'juli', 'augustus', 'september', 'oktober', 'november', 'december' ],
  'dk'	: [ 'Januar', 'Februar', 'Marts', 'April', 'Maj',
   'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December' ],
  'no'	: [ 'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
   'Juli', 'August', 'September', 'Oktober', 'November', 'Desember' ],
  'lv'	: [ 'Janv&#257;ris', 'Febru&#257;ris', 'Marts', 'Apr&#299;lis', 'Maijs',
   'J&#363;nijs', 'J&#363;lijs', 'Augusts', 'Septembris', 'Oktobris', 
   'Novembris', 'Decemberis' ],
  'ja'	: [ '1&#26376;', '2&#26376;', '3&#26376;', '4&#26376;', '5&#26376;',
   '6&#26376;', '7&#26376;', '8&#26376;', '9&#26376;', '10&#26376;', 
   '11&#26376;', '12&#26376;' ],
  'fi'	: [ 'Tammikuu', 'Helmikuu', 'Maaliskuu', 'Huhtikuu', 'Toukokuu',
   'Kes&#228;kuu', 'Hein&#228;kuu', 'Elokuu', 'Syyskuu', 'Lokakuu', 
   'Marraskuu', 'Joulukuu' ],
  'ro'	: [ 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Junie',
   'Julie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie' ],
  'zh'	: [ '1&#32;&#26376;', '2&#32;&#26376;', '3&#32;&#26376;', 
   '4&#32;&#26376;', '5&#32;&#26376;', '6&#32;&#26376;', '7&#32;&#26376;', 
   '8&#32;&#26376;', '9&#32;&#26376;', '10&#26376;', '11&#26376;', '12&#26376;'],
  'sv'	: [ 'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
   'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December' ]
 }),
 _language_full_day : $H({
	'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'es': ['Domingo', 'Lunes', 'Martes', 'Mi&#233rcoles', 'Jueves', 'Viernes', 'S&#225bado'],
	'ca': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'fr': ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
	'mx': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'au': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'nz': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'gb': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'ie': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 }),
 _language_prev : $H({
	'en': 'Go to previous month',
	'es': 'Ir al mes anterior',
	'ca': 'Go to previous month',
	'fr': 'Mois pr&#233c&#233dent',
	'mx': 'Go to previous month',
	'au': 'Go to previous month',
	'nz': 'Go to previous month',
	'gb': 'Go to previous month',
	'ie': 'Go to previous month'
 }),
 _language_next : $H({
	'en': 'Go to next month',
	'es': 'Ir al mes siguiente',
	'ca': 'Go to next month',
	'fr': 'Mois suivant',
	'mx': 'Go to next month',
	'au': 'Go to next month',
	'nz': 'Go to next month',
	'gb': 'Go to next month',
	'ie': 'Go to next month'
 }),
/* Only EN has been updated */
 _language_day	: $H({
  'fr'	: [ 'L', 'M', 'M', 'J', 'V', 'S', 'D' ],
  'en'	: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
  'es'	: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
  'ca'  : [ 'Dl', 'Dm', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg'],
  'it'	: [ 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom' ],
  'de'	: [ 'S', 'M', 'D', 'M', 'D', 'F', 'S' ],
  'pt'	: [ 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S&#225;', 'Dom' ],
  'hu'	: [ 'H&#233;', 'Ke', 'Sze', 'Cs&#252;', 'P&#233;', 'Szo', 'Vas' ],
  'lt'  : [ 'Pir', 'Ant', 'Tre', 'Ket', 'Pen', '&Scaron;e&scaron;', 'Sek' ],
  'nl'	: [ 'ma', 'di', 'wo', 'do', 'vr', 'za', 'zo' ],
  'dk'	: [ 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L&#248;r', 'S&#248;n' ],
  'no'	: [ 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'L&#248;r', 'Sun' ],
  'lv'	: [ 'P', 'O', 'T', 'C', 'Pk', 'S', 'Sv' ],
  'ja'	: [ '&#26376;', '&#28779;', '&#27700;', '&#26408;', '&#37329;', 
   '&#22303;', '&#26085;' ],
  'fi'	: [ 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su' ],
  'ro'	: [ 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam', 'Dum' ],
  'zh'	: [ '&#21608;&#19968;', '&#21608;&#20108;', '&#21608;&#19977;', 
   '&#21608;&#22235;', '&#21608;&#20116;', '&#21608;&#20845;', 
   '&#21608;&#26085;' ],
  'sv'	: [ 'M&#229;n', 'Tis', 'Ons', 'Tor', 'Fre', 'L&#246;r', 
   'S&#246;n' ]
 }),
 _language_close	: $H({
  'fr'	: 'fermer',
  'en'	: 'close',
  'es'	: 'cierre',
  'ca'	: 'tancar',
  'it'	: 'fine',
  'de'	: 'schliessen',
  'pt'	: 'fim',
  'hu'	: 'bez&#225;r',
  'lt'  : 'udaryti',
  'nl'	: 'sluiten',
  'dk'	: 'luk',
  'no'	: 'lukk',
  'lv'	: 'aizv&#275;rt',
  'ja'	: '&#38281;&#12376;&#12427;',
  'fi'	: 'sulje',
  'ro'	: 'inchide',
  'zh'	: '&#20851;&#32;&#38381',
  'sv'	: 'st&#228;ng'
 }),
 /* date manipulation */
 _todayDate		: new Date(),
 _current_date		: null,
 _clickCallback		: Prototype.emptyFunction,
 _cellCallback		: Prototype.emptyFunction,
 _id_datepicker		: null,
 _disablePastDate	: false,
 _disableFutureDate	: true,
 _oneDayInMs		: 24 * 3600 * 1000,
 /* positionning */
 _topOffset		: 30,
 _leftOffset		: 0,
 _isPositionned		: false,
 _relativePosition 	: true,
 _relativeAppend    : false,
 _setPositionTop 	: 0,
 _setPositionLeft	: 0,
 _bodyAppend		: false,
 /* Effects Adjustment */
 _showEffect		: "appear", 
 _showDuration		: 1,
 _enableShowEffect 	: true,
 _closeEffect		: "fade", 
 _closeEffectDuration	: 0.3,
 _enableCloseEffect 	: true,
 _closeTimer		: null,
 _enableCloseOnBlur	: false,
 /* afterClose : called when the close function is executed */
 _afterClose	: Prototype.emptyFunction,
 /* return the name of current month in appropriate language */
 getMonthLocale	: function ( month ) {
  return	this._language_month.get(this._language)[month];
 },
 getLocaleClose	: function () {
  return	this._language_close.get(this._language);
 },
 _initCurrentDate : function () {
  /* Create the DateFormatter */
  this._df = new DatePickerFormatter(this._dateFormat[0], this._dateFormat[1]);
  /* check if value in field is proper, if not set to today */
  this._current_date = $F(this._relative);
  if (! this._df.match(this._current_date)) {
    this._current_date = this._df.current_date();
   /* set the field value ? */
   if (!this._keepFieldEmpty)
    $(this._relative).value = this._current_date;
  }
  var a_date = this._df.match(this._current_date);
  this._current_year 	= Number(a_date[0]);
  this._current_mon	= Number(a_date[1]) - 1;
  this._current_day	= Number(a_date[2]);
 },
 /* init */
 initialize	: function ( h_p ) {
  /* arguments */
  var _self = this;
  this._relative= h_p["relative"];
  this._relative_image= h_p["relative"] + "_image";
  if (h_p["language"])
   this._language = h_p["language"];
  this._zindex	= ( h_p["zindex"] ) ? parseInt(Number(h_p["zindex"])) : 1;
  if (!Object.isUndefined(h_p["keepFieldEmpty"]))
   this._keepFieldEmpty	= h_p["keepFieldEmpty"];
  if (Object.isFunction(h_p["clickCallback"])) 
   this._clickCallback	= h_p["clickCallback"];
  if (!Object.isUndefined(h_p["leftOffset"]))
   this._leftOffset	= parseInt(h_p["leftOffset"]);
  if (!Object.isUndefined(h_p["topOffset"]))
   this._topOffset	= parseInt(h_p["topOffset"]);
  if (!Object.isUndefined(h_p["relativePosition"]))
   this._relativePosition = h_p["relativePosition"];
  if (!Object.isUndefined(h_p["showEffect"]))
   this._showEffect 	= h_p["showEffect"];
  if (!Object.isUndefined(h_p["enableShowEffect"]))
   this._enableShowEffect	= h_p["enableShowEffect"];
  if (!Object.isUndefined(h_p["showDuration"]))
   this._showDuration 	= h_p["showDuration"];
  if (!Object.isUndefined(h_p["closeEffect"]))
   this._closeEffect 	= h_p["closeEffect"];
  if (!Object.isUndefined(h_p["enableCloseEffect"]))
   this._enableCloseEffect	= h_p["enableCloseEffect"];
  if (!Object.isUndefined(h_p["closeEffectDuration"]))
   this._closeEffectDuration = h_p["closeEffectDuration"];
  if (Object.isFunction(h_p["afterClose"]))
   this._afterClose	= h_p["afterClose"];
  if (!Object.isUndefined(h_p["externalControl"]))
   this._externalControl= h_p["externalControl"];
  if (!Object.isUndefined(h_p["dateFormat"])) 
   this._dateFormat	= h_p["dateFormat"];
  if (Object.isFunction(h_p["cellCallback"]))
   this._cellCallback	= h_p["cellCallback"];
  this._setPositionTop	= ( h_p["setPositionTop"] ) ? 
   parseInt(Number(h_p["setPositionTop"])) : 0;
  this._setPositionLeft	= ( h_p["setPositionLeft"] ) ? 
   parseInt(Number(h_p["setPositionLeft"])) : 0;
  if (!Object.isUndefined(h_p["enableCloseOnBlur"]) && h_p["enableCloseOnBlur"])
   this._enableCloseOnBlur	= true;
  if (!Object.isUndefined(h_p["disablePastDate"]) && h_p["disablePastDate"])
   this._disablePastDate	= true;
  if (!Object.isUndefined(h_p["relativeAppend"]) && h_p["relativeAppend"])
   this._relativeAppend    = true;
  if (!Object.isUndefined(h_p["disableFutureDate"]) && !h_p["disableFutureDate"])
   this._disableFutureDate	= false;
  this._id_datepicker		= 'datepicker-'+this._relative;
  this._id_datepicker_prev_label = this._id_datepicker+'-prev-label';
  this._id_datepicker_next_label = this._id_datepicker+'-next-label';
  this._id_datepicker_prev	= this._id_datepicker+'-prev';
  this._id_datepicker_next	= this._id_datepicker+'-next';
  this._id_datepicker_table = this._id_datepicker+'-table';
  this._id_datepicker_thead = this._id_datepicker+'-thead';
  this._id_datepicker_tbody = this._id_datepicker+'-tbody';
  this._id_datepicker_hdr = this._id_datepicker+'-header';
  this._id_datepicker_ftr = this._id_datepicker+'-footer';
  this._id_datepicker_days_wrap = this._id_datepicker+'-days-wrap'; 
  /* build up calendar skel */
  this._div = new Element('div', { 
                                    id : this._id_datepicker,
                                    className : 'datepicker',
                                    style : 'display: none; z-index:'+this._zindex,
									role  : 'application',
									tabindex : '-1',
									'aria-hidden': 'true'
                        });
  $(this._div).onmouseout = this.close.bind(this);
  $(this._div).onmouseover = function () { $(_self._id_datepicker).show() };

  this._div.innerHTML = 
  '<div class="popCal">' +
      '<div class="month-wrap">'+
        '<div id="'+this._id_datepicker_prev+'" class="datepicker-prev" role="button" aria-labelledby="'+this._id_datepicker_prev_label+'" tabindex="0">' + prev_arrow + '</div>' +
        '<div id="'+this._id_datepicker_hdr+'"  class="datepicker-header" role="heading" aria-live="assertive" aria-atomic="true"></div>'+
        '<div id="'+this._id_datepicker_next+'" class="datepicker-next" role="button" aria-labelledby="'+this._id_datepicker_next_label+'" tabindex="0">' + next_arrow + '</div>' +
      '</div>'+
      '<div id="'+this._id_datepicker_days_wrap+'" class="days-wrap"></div>'+
      '<table id="'+this._id_datepicker_table+'" border="0" cellpadding="0" aria-readonly="true" role="grid" aria-labelledby="'+this._id_datepicker_hdr+'" cellspacing="0" tabindex="0">' + 
        '<thead id="'+this._id_datepicker_thead+'" role="rowgroup"></thead>'+
        '<tbody id="'+this._id_datepicker_tbody+'" role="rowgroup"></tbody>' + 
        '<tfoot role="rowgroup">'+
          '<tr>'+
            '<td colspan="7" id="'+this._id_datepicker_ftr+'" role="gridcell"></td>'+
          '</tr>'+
        '</tfoot>'+
      '</table>'+
      '<span class="hideContent" id="'+this._id_datepicker_prev_label+'">'+this._language_prev.get(this._language)+'</span>'+
      '<span class="hideContent" id="'+this._id_datepicker_next_label+'">'+this._language_next.get(this._language)+'</span>'+
   '</div>';
  /* finally declare the event listener on input field */
  Event.observe(this._relative, 
    'click', this.click.bindAsEventListener(this), false);
  Event.observe(this._relative_image, 
    'click', this.click.bindAsEventListener(this), false);
  /* need to append on body when doc is loaded for IE */
  document.observe('dom:loaded', this.load.bindAsEventListener(this), false);
  /* automatically close when blur event is triggered */
  if ( this._enableCloseOnBlur ) {
   Event.observe(this._relative, 'blur', function (e) { 
    this._closeTimer = this.close.bind(this).delay(1); 
   }.bindAsEventListener(this));
   Event.observe(this._div, 'click', function (e) { 
    if (this._closeTimer) { 
     window.clearTimeout(this._closeTimer); 
     this._closeTimer = null; 
    } 
   });
  }
 },
 /**
  * load	: called when document is fully-loaded to append datepicker
  *		  to main object.
  */
 load		: function () {
  
  var _self = this;
  /* if externalControl defined set the observer on it */
  if (this._externalControl) 
   Event.observe(this._externalControl, 'click',
    this.click.bindAsEventListener(this), false);
  /* append to page */
  if (this._relativeAppend) {
   /* append to parent node */
   if ($(this._relative).parentNode) {
    this._div.innerHTML = this._wrap_in_iframe(this._div.innerHTML);
    $(this._relative).parentNode.appendChild( this._div );
   }
  } else {
   /* append to body */
   var body	= document.getElementsByTagName("body").item(0);
   if (body) {
    this._div.innerHTML = this._wrap_in_iframe(this._div.innerHTML);
    body.appendChild(this._div);
   }
   if ( this._relativePosition ) {
     var a_pos = Element.cumulativeOffset($(this._relative));
     this.setPosition(a_pos[1], a_pos[0]);
   } else {
    if (this._setPositionTop || this._setPositionLeft)
     this.setPosition(this._setPositionTop, this._setPositionLeft);
   }
  }
  
  /* init the date in field if needed */
  this._initCurrentDate();
  
  /* init days */
  this._buildDays();
  /* set the close locale content */
//  $(this._id_datepicker_ftr).innerHTML = this.getLocaleClose();
  /* declare the observers for UI control */
  Event.observe($(this._id_datepicker), 'keydown', 
  	function (e) {
      var target = $(document.activeElement), 
          prev   = $(_self._id_datepicker_prev),
          next   = $(_self._id_datepicker_next),
          table  = $(_self._id_datepicker_table),
          tbody  = $(_self._id_datepicker_tbody);
 
      if (!prev || !next || !table || !tbody) {
          return false;
      }
  
      switch (e.keyCode) {
	     case 9: 
           if (target == table) {
              e.preventDefault();
		      if (e.shiftKey) {
                next.focus();
              } else {
                prev.focus();
              }
           }
           break;
         case 13:
         case 32:
           e.preventDefault();
           if (target == prev) {
              _self.prevMonth();
           } else 
           if (target == next) {
             _self.nextMonth();
           } else 
           if (target == table) {
             var focus = tbody.getElementsByClassName('focus')[0];
             _self._selectDate(focus);
           }
           break;
         case 27:
           e.preventDefault();
           $(_self._relative).focus();
           _self.close();
           break;
         case 35:
           if (target == table) {
              e.preventDefault();
              _self.navigateFocus("lastday");
           }
           break;
         case 36: 
           if (target == table) {
              e.preventDefault();
              _self.navigateFocus("firstday");
           }
           break;
	     case 37:
           if (target == table) {
             e.preventDefault();
		     _self.navigateFocus("left"); 
           }
		   break;
		 case 38:
           if (target == table) {
             e.preventDefault();
		     _self.navigateFocus("top");
           }
		   break;
		 case 39:
           if (target == table) {
             e.preventDefault();
		     _self.navigateFocus("right");
           }
		   break;
		 case 40:
           if (target == table) { 
             e.preventDefault();
		     _self.navigateFocus("bottom");
           }
		   break;
      }   	  	     					
  	}, false);

  Event.observe($(this._id_datepicker_prev), 
    'click', this.prevMonth.bindAsEventListener(this), false); 
  Event.observe($(this._id_datepicker_next), 
    'click', this.nextMonth.bindAsEventListener(this), false);
  Event.observe($(this._id_datepicker_ftr), 
    'click', this.close.bindAsEventListener(this), false);
 },
 navigateFocus: function (nav) {
     var _self = this,
       focus = $(_self._id_datepicker_tbody).getElementsByClassName('focus')[0],
       tdlist = $(_self._id_datepicker_tbody).getElementsByClassName('active'),
       index1 = Array.prototype.indexOf.call(tdlist, focus),
       index2;

     switch (nav) {
       case "left": 
         index2 = index1 - 1;
           break;
       case "right":
         index2 = index1 + 1;
           break;     
       case "top":
         index2 = index1 - 7;
           break;
       case "bottom": 
         index2 = index1 + 7;
           break;
       case "firstday":
         index2 = 0;
           break;
       case "lastday":
         index2 = tdlist.length - 1;        
           break;        
     }  
     if (index2 * 0 !== 0) 
        return false;

     if (index1* 0 === 0 && index1 >= 0 && tdlist[index1]) {
     	 if ($(tdlist[index2])) {
             $(tdlist[index1]).removeClassName('focus');
             $(tdlist[index2]).addClassName('focus');
             $(_self._id_datepicker_table).setAttribute('aria-activedescendant', $(tdlist[index2]).readAttribute('id'));
 	     } else {
             if (index2 > index1) {
             	_self.nextMonth();
             } else {
                _self.prevMonth();
                 
             }
         }
     } 
     
 },
 set_activedescendant:  function () {
      var td, 
          td_active = $(this._id_datepicker_table).getElementsByClassName("active");
      
      if (td_active) { 
      	  td = (this._navigateFork) ? td_active[0] : td_active[td_active.length-1];
      }
      if (td) {
          var f_td = $(this._id_datepicker_table).getElementsByClassName('focus')[0];
         
          if (f_td){
		     f_td.removeClassName('focus');		
          }
 
         td.addClassName('focus'); 
         $(this._id_datepicker_table).setAttribute('aria-activedescendant', td.readAttribute('id')); 
      }
      
 },
 /* hack for buggy form elements layering in IE */
 _wrap_in_iframe	: function ( content ) {
  return	( Prototype.Browser.IE ) ?
   "<div style='height:172px;width:178px;background-color:transparent;align:left'><iframe width='100%' height='100%' marginwidth='0' marginheight='0' frameborder='0' src='about:blank' style='filter:alpha(Opacity=50);' tabindex='-1'></iframe><div style='position:absolute;background-color:white;top:2px;left:2px;width:180px'>" + content + "</div></div>" : content;
 },
 /**
  * visible	: return the visibility status of the datepicker.
  */
 visible	: function () {
  return	$(this._id_datepicker).visible();
 },
 /**
  * click	: called when input element is clicked
  */
 click		: function () {
  /* init the datepicker if it doesn't exists */
  if ( $(this._id_datepicker) == null ) this.load();
  if (!this._isPositionned && this._relativePosition) {
   /* position the datepicker relatively to element */
   var a_lt = Element.positionedOffset($(this._relative));
   $(this._id_datepicker).setStyle({
    'left'	: Number(a_lt[0]+this._leftOffset)+'px',
    'top'	: Number(a_lt[1]+this._topOffset)+'px'
   });
   this._isPositionned	= true;
  }
  if (!this.visible()) {
   this._initCurrentDate();
   this._redrawCalendar();
  }
  /* eval the clickCallback function */
  eval(this._clickCallback());
  /* Effect toggle to fade-in / fade-out the datepicker */
  if ( this._enableShowEffect ) {
   new Effect.toggle(this._id_datepicker, 
     this._showEffect, { duration: this._showDuration });
  } else {
   $(this._id_datepicker).show();
  }
  $(this._id_datepicker).setAttribute('aria-hidden', 'false'); 
  if ($(this._id_datepicker_table)) {
      $(this._id_datepicker_table).focus();
  } 

 },
 /**
  * close	: called when the datepicker is closed
  */
 close		: function () {
  $(this._id_datepicker).setAttribute('aria-hidden', 'true');
  $(this._relative).focus(); 
  if ( this._enableCloseEffect ) {
   switch(this._closeEffect) {
    case 'puff': 
     new Effect.Puff(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
    case 'blindUp': 
     new Effect.BlindUp(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
    case 'dropOut': 
     new Effect.DropOut(this._id_datepicker, { 
      duration : this._closeEffectDuration }); 
     break;
    case 'switchOff': 
     new Effect.SwitchOff(this._id_datepicker, { 
      duration : this._closeEffectDuration }); 
     break;
    case 'squish': 
     new Effect.Squish(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
    case 'fold': 
     new Effect.Fold(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
    case 'shrink': 
     new Effect.Shrink(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
    default: 
     new Effect.Fade(this._id_datepicker, { 
      duration : this._closeEffectDuration });
     break;
   };
  } else {
   $(this._id_datepicker).hide();
  }
  eval(this._afterClose());
 },
 /**
  * setDateFormat
  */
 setDateFormat	: function ( format, separator ) {
  if (Object.isUndefined(format))
   format	= this._dateFormat[0];
  if (Object.isUndefined(separator))
   separator	= this._dateFormat[1];
  this._dateFormat	= [ format, separator ];
 },
 /**
  * setPosition	: set the position of the datepicker.
  *  param : t=top | l=left
  */
 setPosition	: function ( t, l ) {
  var h_pos	= { 'top' : '0px', 'left' : '0px' };
  if (!Object.isUndefined(t))
   h_pos['top']	= Number(t)+this._topOffset+'px';
  if (!Object.isUndefined(l))
   h_pos['left']= Number(l)+this._leftOffset+'px';
  $(this._id_datepicker).setStyle(h_pos);
  this._isPositionned	= true;
 },
 /**
  * _getMonthDays : given the year and month find the number of days.
  */
 _getMonthDays	: function ( year, month ) {
  if (((0 == (year%4)) && 
   ( (0 != (year%100)) || (0 == (year%400)))) && (month == 1))
   return 29;
  return this._daysInMonth[month];
 },
 _buildDays: function () {
  var thead = $(this._id_datepicker_thead);
     
  /* generate day headers */
  var trDay	= new Element('tr');
  //trDay.setAttribute('role', 'row');
  var divDay = new Element('div');
  var days = this._language_day.get(this._language);
  var full_days = this._language_full_day.get(this._language);
  
  for (var i = 0; i < days.length; i++){
   var th = new Element('th');
   th.innerHTML	= full_days[i];
   th.className	= 'wday';
   th.setAttribute('scope', 'col');
   th.setAttribute('role', 'columnheader');
   th.id = this._id_datepicker + '_' + this._daysID[i];
   trDay.appendChild( th );

   var span = new Element('span');
   span.innerHTML = days[i];
   divDay.appendChild(span);
  }
  $(this._id_datepicker_days_wrap).innerHTML = divDay.innerHTML;
  thead.appendChild( trDay );
 },
 /**
  * _buildCalendar	: draw the days array for current date
  */
 _buildCalendar		: function () {
  var _self	= this;
  var tbody	= $(this._id_datepicker+'-tbody');
  try {
   while ( tbody.hasChildNodes() )
    tbody.removeChild(tbody.childNodes[0]);
  } catch ( e ) {};
  /* generate the content of days */
  
  /* build-up days matrix */
  var a_d	= [ [ 0, 0, 0, 0, 0, 0, 0 ] ,[ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0 ]
   ,[ 0, 0, 0, 0, 0, 0, 0 ]
  ];
  /* set date at beginning of month to display */
 // var d		= new Date(this._current_year, this._current_mon, 1, 12);
  var m_thru_s  = new Array('fr'); //add the mon - sun countries here
  var d		= new Date(this._current_year, this._current_mon, (m_thru_s.indexOf(this._language) == -1 ? 2 : 1 ), 12);
  /* start the day list on monday */
    var startIndex	= ( !d.getDay() ) ? 6 : d.getDay() - 1;
// Trying to get the week to start on Sunday
//  var startIndex	= ( !d.getDay() ) ? 6 : d.getDay();
  var nbDaysInMonth	= this._getMonthDays(
    this._current_year, this._current_mon);
  var daysIndex		= 1;
  for ( var j = startIndex; j < 7; j++ ) {
   a_d[0][j]	= { 
     d : daysIndex
    ,m : this._current_mon
    ,y : this._current_year 
    ,c : ((daysIndex == this._todayDate.getDate()) &&
          (this._current_mon  == this._todayDate.getMonth()) &&
          (this._current_year == this._todayDate.getFullYear())) ? 'today': null
   };
   daysIndex++;
  }
  var a_prevMY	= this._prevMonthYear();
  var nbDaysInMonthPrev	= this._getMonthDays(a_prevMY[1], a_prevMY[0]);
  for ( var j = 0; j < startIndex; j++ ) {
   a_d[0][j]	= { 
     d : Number(nbDaysInMonthPrev - startIndex + j + 1) 
    ,m : Number(a_prevMY[0])
    ,y : a_prevMY[1]
    ,c : 'outbound inactive'
   };
  }
  var switchNextMonth	= false;
  var currentMonth	= this._current_mon;
  var currentYear	= this._current_year;
  for ( var i = 1; i < 6; i++ ) {
   for ( var j = 0; j < 7; j++ ) {
    a_d[i][j]	= { 
      d : daysIndex
     ,m : currentMonth
     ,y : currentYear
     ,c : ( switchNextMonth ) ? 'outbound inactive' : ( 
      ((daysIndex == this._todayDate.getDate()) &&
        (this._current_mon  == this._todayDate.getMonth()) &&
        (this._current_year == this._todayDate.getFullYear())) ? 'today' : null)
    };
    daysIndex++;
    /* if at the end of the month : reset counter */
    if (daysIndex > nbDaysInMonth ) {
     daysIndex	= 1;
     switchNextMonth = true;
     if (this._current_mon + 1 > 11 ) {
      currentMonth = 0;
      currentYear += 1;
     } else {
      currentMonth += 1;
     }
    }
   }
  }
  /* generate days for current date */
  for ( var i = 0; i < 6; i++ ) {
   var tr	= new Element('tr');
   //tr.setAttribute('role', 'row');
   for ( var j = 0; j < 7; j++ ) {
    var h_ij	= a_d[i][j];
    var td	= new Element('td');
    td.setAttribute('role', 'gridcell');
    td.setAttribute('aria-readonly','true');
    td.setAttribute('aria-describedby', this._id_datepicker + '_' + this._daysID[j]);
    /* id is : datepicker-day-mon-year or depending on language other way */
    /* don't forget to add 1 on month for proper formmatting */
    var id	= $A([
     this._relative,
     this._df.date_to_string(h_ij["y"], h_ij["m"]+1, h_ij["d"], '-')
    ]).join('-');
    /* set id and classname for cell if exists */
    td.setAttribute('id', id);
    if (h_ij["c"])
     td.className	= h_ij["c"];
    /* on onclick : rebuild date value from id of current cell */
    var _curDate	= new Date();
    _curDate.setFullYear(h_ij["y"], h_ij["m"], h_ij["d"]);
    if ( this._disablePastDate || this._disableFutureDate ) {
     if ( this._disablePastDate ) {
      var _res	= ( _curDate >= this._todayDate ) ? true : false;
      this._bindCellOnClick( td, true, _res, h_ij["c"] );
     }
     if ( this._disableFutureDate ) {
      var _res	= ( this._todayDate.getTime() + this._oneDayInMs > _curDate.getTime() ) ? true : false;
      this._bindCellOnClick( td, true, _res,  h_ij["c"] );
     }
    } else {
     this._bindCellOnClick( td, false );
    }
    td.innerHTML= h_ij["d"];
    tr.appendChild( td );
   }
   tbody.appendChild( tr );
  }
  
  /* setup css-focus on table and reset aria-activedescendant attribute after change css-focus */
  this.set_activedescendant();
  
  return	tbody;
 },
 /**
  * _bindCellOnClick	: bind the cell onclick depending on status.
  */
 _bindCellOnClick	: function ( td, wcompare, compareresult, h_ij_c ) {
  var doBind	= false;
  if ( wcompare ) {
   if ( compareresult ) {
    doBind	= true;
   } else {
    td.className= ( h_ij_c ) ? 'nclick_outbound inactive' : 'nclick inactive';
	td.setAttribute('aria-disabled', 'true');
   }
  } else {
   doBind	= true;
  }
  if (doBind){
  	if (!td.className.match(/outbound/)) {
    	if(this._getTdIdFromInput() == td.readAttribute('id')) {
       		td.setAttribute('aria-selected','true');
    	} else {
       		td.setAttribute('aria-selected','false');
    	}
   		td.addClassName('active');
   		td.onclick	= this._selectDate.bind(this, td);  
  	} else {
		td.setAttribute('aria-disabled', 'true');
    }
  }
 },
 _getTdIdFromInput: function () {   
    var _self = this, 
        value = $(_self._relative).value,
        reg = new RegExp(this._df.separator, 'g');
 
    return (_self._relative + '-' + value).replace(reg, '-');
 },
 _selectDate: function (td) {
    var _self = this;
    $(_self._relative).value = String($(td).readAttribute('id')
      ).replace(_self._relative+'-','').replace(/-/g, _self._df.separator);
    /* if we have a cellCallback defined call it and pass it the cell */
    if (_self._cellCallback)
     _self._cellCallback(td);
    _self.close(); 
 },
 /**
  * nextMonth	: redraw the calendar content for next month.
  */
 _nextMonthYear	: function () {
  var c_mon	= this._current_mon;
  var c_year	= this._current_year;
  if (c_mon + 1 > 11) {
   c_mon	= 0;
   c_year	+= 1;
  } else {
   c_mon	+= 1;
  }
  return	[ c_mon, c_year ];
 },
 nextMonth	: function () {
  this._navigateFork = true;
  var a_next	= this._nextMonthYear();
  var _nextMon	= a_next[0];
  var _nextYear	= a_next[1];
  var _curDate	= new Date(); _curDate.setFullYear(_nextYear, _nextMon, 1);
  var _res	= ( this._todayDate.getTime() + this._oneDayInMs > _curDate.getTime() ) ? true : false;
  if ( this._disableFutureDate && !_res )
   return;
  this._current_mon	= _nextMon;
  this._current_year 	= _nextYear;
  this._redrawCalendar();
 },
 /**
  * prevMonth	: redraw the calendar content for previous month.
  */
 _prevMonthYear	: function () {
  var c_mon	= this._current_mon;
  var c_year	= this._current_year;
  if (c_mon - 1 < 0) {
   c_mon	= 11;
   c_year	-= 1;
  } else {
   c_mon	-= 1;
  }
  return	[ c_mon, c_year ];
 },


/* prev month disable */

 _prevMonthIsEnabled:function(_prevYear, _prevMon){
	var _curDate	= new Date(); 
  // The logic below forces the date comparison to be the 1st of the month prior to the displayed month against "today"
  // This means that while today is May 20, 2008 and we are viewing June 2008 we cannot get to May (the previous month)
  //  because  5/1 is not ">=" 5/20.  I have added the day of the month to make this comparison "day agnostic"
  //_curDate.setFullYear(_prevYear, _prevMon, 1);
  var _prevDay = _curDate.getDate();
  _curDate.setFullYear(_prevYear, _prevMon, _prevDay);
  var _res	= ( _curDate >= this._todayDate ) ? true : false;  
  return _res;
 },

 prevMonth	: function () {
  this._navigateFork = false;
  var a_prev	= this._prevMonthYear();
  var _prevMon	= a_prev[0];
  var _prevYear	= a_prev[1];
  var _res	= this._prevMonthIsEnabled(_prevYear, _prevMon);

  if ( this._disablePastDate && !_res )
   return;
  this._current_mon	= _prevMon;
  this._current_year	= _prevYear;
  this._redrawCalendar();
 },
 _redrawCalendar	: function () {
  this._setLocaleHdr(); 
  this._buildCalendar();
 },
 _setLocaleHdr	: function () {

  /* next link */
  var a_next	= this._nextMonthYear();
  var a_next_d = new Element('div').update( this.getMonthLocale(a_next[0]) );
  var a_next_t = a_next_d.innerHTML;
  $(this._id_datepicker_next).setAttribute('title',
   a_next_t+' '+a_next[1]);

  /* prev link */
  var a_prev	= this._prevMonthYear();
  var a_prev_d = new Element('div').update( this.getMonthLocale(a_prev[0]) );
  var a_prev_t = a_prev_d.innerHTML;

  $(this._id_datepicker_prev).setAttribute('title',
   a_prev_t+' '+a_prev[1]);
  
  if (!this._prevMonthIsEnabled(a_prev[1], a_prev[0])){
  	var orgClass = $(this._id_datepicker_prev).getAttribute('class');
  	if(!orgClass.include('datepicker-prev-disabled')){
  		$(this._id_datepicker_prev).setAttribute('class', orgClass + ' datepicker-prev-disabled');
  	}
  }
  else {
  	var orgClass = $(this._id_datepicker_prev).getAttribute('class');
  	if(orgClass.include('datepicker-prev-disabled')){
  		$(this._id_datepicker_prev).setAttribute('class', orgClass.replace(' datepicker-prev-disabled', ''));
  	}
  }

  /* header */
  $(this._id_datepicker_hdr).update(''+this.getMonthLocale(this._current_mon)+'&nbsp;'+this._current_year+'');
 }
};
