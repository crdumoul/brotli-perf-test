var nbaScoreboard = {
	calDate:'',
	date:'',
	time:'',
	numGameDays:6, /* 3 or 6 */
	scrollTime:'1200',
	daysLoaded:0,
	userInteracted:false,
	dataHost:'http://data.nba.com',
	calFeed:'/jsonp/1h/json/cms/noseason/schedule/calendar_easy.json',
	pollingInterval:10000,
	activeDay:1,
	dataDays:{},
	allGameDays:[],
	gameDays:[],
	scope:'natl',
	imgDir:'http://z.cdn.turner.com/nba/nba/.element/img/4.0/global/logos/512x512/bg.white/',
	isMobile:false,
	getParam: function(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	parseDate: function(date,time){
		var year = date.slice(0,4),
			month = date.slice(4,6),
			day = date.slice(6,8),
			hour = '00',
			min = '00';
		if(time){
			hour = time.slice(0,2);
			min = time.slice(2,4);
		}
		return new Date(year,(month-1),(day),hour,min);
	},
	formatDate: function(date) {
		var dow = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'],
			months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
		return dow[date.getDay()]+' '+months[date.getMonth()]+' '+date.getDate();
	},
	setStripWidth: function() {
		var scoreboardWidth = 1;
		$('#nbaScoreboard .day').each(function(){ scoreboardWidth += this.offsetWidth; });
		$('#nbaScoreboard .gamestrip').css('width',scoreboardWidth+'px');
		return scoreboardWidth;
	},
	setDayHeight:function() {
		if(this.isMobile) {
			var height = 'auto';
			if($('#nbaScoreboard .tile .tunein.active').length > 0) { height = '165px'; }
			$('#nbaScoreboard .day').css('height',height);
		}
	},
	animateGameStrip: function(pos,isUserClick) {
		if(isUserClick) { this.userInteracted = true; }
		if(pos == 0) { $('#nbaScoreboard .btnPrev').removeClass('active'); }
		else { $('#nbaScoreboard .btnPrev').addClass('active'); } 

		if(pos <= -($('.gamestrip')[0].offsetWidth - $('.viewport')[0].offsetWidth)) { $('#nbaScoreboard .btnNext').removeClass('active'); }
		else { $('#nbaScoreboard .btnNext').addClass('active'); }

		//Position dateline when there is no scrolling action, only matches when pos and scrollLeft are 0
		if(pos == $('#nbaScoreboard .viewport')[0].scrollLeft) { this.positionDateline(); }

		$('#nbaScoreboard .viewport').animate({scrollLeft: (-pos)+'px'},600);
	},
	animateElement:function(el,pos) {
		$(el).animate({left: pos+'px'},300,'swing');
	},
	scrollNext: function() {
		if( $('#nbaScoreboard .btnNext').hasClass('active') ) {
			var scrollBy = -($('#nbaScoreboard .viewport')[0].offsetWidth * .75),
				pos = -($('#nbaScoreboard .viewport')[0].scrollLeft);
			pos += scrollBy;
			if( pos < ($('#nbaScoreboard .viewport')[0].offsetWidth - $('#nbaScoreboard .gamestrip')[0].offsetWidth) ) {
				pos = $('#nbaScoreboard .viewport')[0].offsetWidth - $('#nbaScoreboard .gamestrip')[0].offsetWidth;
			}
			this.animateGameStrip(pos,true);
		}
	},
	scrollPrev:function() {
		if($('#nbaScoreboard .btnPrev').hasClass('active')) {
			var scrollBy = $('#nbaScoreboard .viewport')[0].offsetWidth * .75,
				pos = -($('#nbaScoreboard .viewport')[0].scrollLeft);
			pos += scrollBy;
			if(pos>0){pos=0;}
			this.animateGameStrip(pos,true);
		}
	},
	scrollToDay:function(num,noScroll) {
		this.setDayHeight();
		this.setStripWidth();
		if(noScroll){return;}
		else if( !this.userInteracted && $('#nbaScoreboard .gamestrip')[0].offsetWidth > $('#nbaScoreboard .viewport')[0].offsetWidth ) {
			if(num > 0 && num <= $('.day').length) {
				var day = $('.day')[num-1],
					pos = -(day.offsetLeft);
				if( pos < ($('#nbaScoreboard .viewport')[0].offsetWidth - $('#nbaScoreboard .gamestrip')[0].offsetWidth) ) {
					pos = $('#nbaScoreboard .viewport')[0].offsetWidth - $('#nbaScoreboard .gamestrip')[0].offsetWidth;
				}
				//Cover left border
				if(num>1) { pos -= 2; }

				if(this.isMobile) {
					//Mobile: Scroll to first live game if more than three games
					if( $(day).find('.tile').length > 3 && $(day).find('.tile.live').length > 0 ) {
						var indexFirstLive = $(day).find('.tile.live').index();
						//Only scroll as far as last three tiles in the current day
						if(indexFirstLive > $(day).find('.tile').length - 3) { indexFirstLive = $(day).find('.tile').length - 3; }
						if(indexFirstLive >= 1) {
							pos -= 98; //First tile
							if(indexFirstLive > 1) {
								pos -= ((indexFirstLive-1)*91); //Subsequent tiles
							}
						}
					}
				} else {
					//Desktop: Scroll forward more (hide finsihed games) to allow live games to be seen, if there are any
					if( $(day).find('.tile').length >= 10 && $(day).find('.tile.final').length < $(day).find('.tile').length ) {
						var tiles = $(day).find('.tile');
						if($(tiles[0]).hasClass('final')) {
							pos -= 105;
							if(tiles.length >= 11 && $(tiles[1]).hasClass('final')) {
								pos -= 99;
								if(tiles.length >= 12 && $(tiles[2]).hasClass('final')) {
									pos -= 99;
									if(tiles.length >= 13 && $(tiles[3]).hasClass('final')) {
										pos -= 99;
										if(tiles.length >= 14 && $(tiles[4]).hasClass('final')) {
											pos -= 99;
											if(tiles.length >= 15 && $(tiles[5]).hasClass('final')) {
												pos -= 99;
											}
										}
									}
								}
							}
							//Only scroll so far so next day is not in view
							if(pos < -($('#nbaScoreboard .day')[num].offsetLeft - $('#nbaScoreboard .viewport')[0].offsetWidth)) {
								pos = -($('#nbaScoreboard .day')[num].offsetLeft - $('#nbaScoreboard .viewport')[0].offsetWidth);
							}
						}
					}
				}
				this.animateGameStrip(pos,false);
			}
		}
	},
	init: function() {
		if(typeof nbaMobStatic !== 'undefined') { this.isMobile = true; }

		var h = document.getElementsByTagName('head')[0],
			l = document.createElement('link');
		l.rel = 'stylesheet';
		l.type = 'text/css';
		l.href = (this.isMobile) ? 'http://i.cdn.turner.com/nba/nba/.element/css/4.0/sect/scoreboard/scoreboard.mobile.css' : 'http://i.cdn.turner.com/nba/nba/.element/css/4.0/sect/scoreboard/scoreboard.css';
		l.media = 'all';
		h.appendChild(l);

		this.dataHost = (this.getParam('datahost')) ? this.getParam('datahost') : this.dataHost;
		$.ajax({
			type:'GET',
			cache:true,
			'dataType':'jsonp',
			'jsonpCallback':'nbaScoreboard.loadGameDays',
			'url':this.dataHost+this.calFeed,
			'error':function(e){}
		});

		/* Repostion dateline elements after scrolling */
		$('#nbaScoreboard .viewport').scroll(function(){
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function() {
				nbaScoreboard.positionDateline();
			}, 100));
		});
		/* Repostion dateline elements after landscape/portrait change */
		window.addEventListener('orientationchange',function(){
			nbaScoreboard.positionDateline();
		},false);

		$('#nbaScoreboard .btnPrev').on('click',function(){nbaScoreboard.scrollPrev();return false;});
		$('#nbaScoreboard .btnNext').on('click',function(){nbaScoreboard.scrollNext();return false;});
	},
	getClockHTML:function(game) {
		var clock = '&nbsp;', period = '';
		if(game.period_time.period_status == 'Final' || game.period_time.period_status == 'Halftime') {
			clock = game.period_time.period_status;
		} else if(game.period_time.game_clock !== '') {
			clock = game.period_time.game_clock;
			if(clock.indexOf(':') === -1) {
				clock = [':',
					(Math.ceil(clock) < 10) ? '0' : '',
					Math.ceil(clock)
				].join('');
				if(clock == ':60'){clock = '1:00';}
			}
			period = game.period_time.period_name.substring(0,1)+game.period_time.period_value;
		}
		if(parseInt(game.period_time.period_value) > 4) {
			period = 'OT'; 
			if(game.period_time.period_value !== '5') {
				period = (parseInt(game.period_time.period_value) - 4)+'/OT';
			}
		}
		return clock + ' ' + period;
	},
	liveUpdate: function(data) {
		var games = data.sports_content.games.game;
		for(var i=0; i<games.length; i++) {
			var game = games[i],
				gameID = game.id,
				status = ['','future','live','final'][game.period_time.game_status],
				clock = this.getClockHTML(game),
				hScore = game.home.score || 0,
				vScore = game.visitor.score || 0;

			if(game.period_time.period_status == 'CNCL') {
				clock = 'CANCELLED';
				status = 'final noscores';
			} else if(game.period_time.period_status == 'PPD') {
				clock = 'POSTPONED';
				status = 'final noscores';
			}
			$('#nbaTile'+gameID+' .clock').html(clock);
			$('#nbaTile'+gameID+' .visitor .score').html(vScore);
			$('#nbaTile'+gameID+' .home .score').html(hScore);

			//Display watch button if onAir flag is set to true for LP games; display button if game is live for TNT OT games
			if( (game.lp.home.video.onAir == 'true' || game.lp.visitor.video.onAir == 'true') || (status == 'live' && game.tnt_ot == '1') ) {
				$('#nbaTile'+gameID+' .tunein').addClass('active');
			} else {
				$('#nbaTile'+gameID+' .tunein').removeClass('active');
			}
			if(status == 'final') {
				if(parseInt(vScore) > parseInt(hScore)) {
					$('#nbaTile'+gameID+' .visitor .score').addClass('win');
				} else {
					$('#nbaTile'+gameID+' .home .score').addClass('win');
				}
			}
			if( !$('#nbaTile'+gameID).hasClass(status) ) {
				$('#nbaTile'+gameID).removeClass('future live final').addClass(status);
			}
		}
		var noScroll = (this.isMobile || $('#accessibilityMenu').css('display') == 'block') ? true : false;
		this.scrollToDay(this.activeDay,noScroll);
	},
	selectGameDays:function(){
		var prevGames = [],
			futureGames = [];
		for(var i=parseInt(this.calDate)-100,end=i+200; i<end; i++) {
			if(this.allGameDays[i]){
				if( i < parseInt(this.calDate) ) { prevGames.push(i); }
				else { futureGames.push(i); }
			}
		}
		if(prevGames.length == 0) {
			for(var j=0; j<this.numGameDays; j++) {
				this.gameDays.push( futureGames.shift() );
			}
		} else if(futureGames.length == 0) {
			var tempDays = [];
			for(var j=0; j<this.numGameDays; j++) {
				tempDays.push( prevGames.pop() );
			}
			this.gameDays = tempDays.reverse();
		} else {
			if(this.numGameDays === 3) {
				this.gameDays = [
					(futureGames.length > 1) ? prevGames.pop() : prevGames[ prevGames.length-2 ],
					(futureGames.length > 1) ? futureGames.shift() : prevGames[ prevGames.length -1],
					futureGames.shift()
				];
			} else {
				var offset = this.numGameDays - futureGames.length;
				this.gameDays = [
					(offset >= 1) ? prevGames[ prevGames.length - offset ] : prevGames.pop(),
					(offset >= 2) ? prevGames[ prevGames.length - (offset-1) ] : futureGames.shift(),
					(offset >= 3) ? prevGames[ prevGames.length - (offset-2) ] : futureGames.shift(),
					(offset >= 4) ? prevGames[ prevGames.length - (offset-3) ] : futureGames.shift(),
					(offset >= 5) ? prevGames[ prevGames.length - (offset-4) ] : futureGames.shift(),
					(offset >= 6) ? prevGames[ prevGames.length - (offset-5) ] : futureGames.shift()
				];
			}
		}
	},
	loadGameDays: function(data) {
		if(this.getParam('datetime')) {
			this.date = this.getParam('datetime').slice(0,8);
			this.time = this.getParam('datetime').slice(8,12);
		} else {
			var now = (typeof nbaCurrTime == 'undefined') ? new Date() : nbaCurrTime,
				month = (now.getMonth()+1).toString();
			if(month.length === 1){ month = '0'+month; }

			var date = now.getDate().toString();
			if(date.length === 1){ date = '0'+date; }

			var hr = now.getHours().toString();
			if(hr.length === 1){ hr = '0'+hr; }

			var min = now.getMinutes().toString();
			if(min.length === 1){ min = '0'+min; }

			this.date = now.getFullYear()+month+date;
			this.time = hr+min;
		}

		//Data includes a lot of dates, some with no games
		//Loop through data and store game dates as array
		var cal = data.sports_content.calendar;
		for(var prop in cal) {
			if( cal.hasOwnProperty(prop) && prop.match(/\d\d\d\d/) && cal[prop] !== '0') {
				var gameNum = parseInt(prop);
				this.allGameDays[ gameNum ] = cal[prop];
			}
		}

		//Game day is 3am - 3am. If before 3am, use previous date. Otherwise use current date
		if(parseInt(this.time) < 300) {
			var calDate = new Date( this.parseDate(this.date,this.time).getTime() - (12*60*60*1000) ),
				calMonth = (calDate.getMonth()+1).toString(),
				calDay = calDate.getDate().toString();
			if(calMonth.length === 1){ calMonth = '0'+calMonth; }
			if(calDay.length === 1){ calDay = '0'+calDay; }

			this.calDate = calDate.getFullYear()+calMonth+calDay;
		} else {
			this.calDate = this.date;
		}

		//Do not go beyond anchor_date or games_end
		if(parseInt(this.calDate) < parseInt(cal.anchor_date)) {
			this.calDate = cal.anchor_date;
		} else if(parseInt(this.calDate) > parseInt(cal.games_end)) {
			this.calDate = cal.games_end;
		}

		//Determine which days to display
		this.selectGameDays();

		//Add html container for each day and request its feed
		for(var i=0; i<this.gameDays.length; i++) {
			$('.gamestrip').append('<div class="day" id="nbaDay'+this.gameDays[i]+'"></div>');
			$.ajax({
				type:'GET',
				cache:true,
				'dataType':'jsonp',
				'jsonpCallback':'nbaScoreboard.getDayHTML',
				'url':this.dataHost+'/jsonp/5s/json/cms/noseason/scoreboard/'+this.gameDays[i]+'/games.json',
				'error':function(e){}
			});
		}

		var activeDay = 1;
		$('#nbaScoreboard .day').each(function(i){
			//If after noon the day immediately following this day, scroll beyond this day
			//Ex: If no games on Tuesday, scroll to Monday until noon Tuesday. Then scroll to next game day (Wednesday)
			var thisDate = $(this).attr('id').replace('nbaDay',''),
				oneDay = (24*60*60*1000),
				scrollDate = new Date(nbaScoreboard.parseDate(thisDate,nbaScoreboard.scrollTime).getTime() + oneDay);
			if(nbaScoreboard.parseDate(nbaScoreboard.date,nbaScoreboard.time) >= scrollDate && $('#nbaScoreboard .day').length >= (i+2)) {
				activeDay = i+2;
			}
		});
		this.activeDay = activeDay;
	},
	getDayHTML: function(data) {
		var games = data.sports_content.games.game,
			dayDate = this.formatDate(this.parseDate(games[0].date));
		var html = ['<div class="dateline">',
			'<span class="date">'+dayDate+'</span>',
			(games.length > 1) ? '<span class="numGames">('+games.length+' Games)</span>' : '',
			'</div>',
			(games.length > 0) ? '<a class="allScores" href="/gameline/'+games[0].date+'/?ls=iref:nba:scoreboard:allscores" title="Link to Gameline page for '+dayDate+'">All Scores <span>></span></a>' : '',
			'<div class="tiles">'
		];
		for(var i=0; i<games.length; i++) {
			var game = games[i];
			html.push( this.getTileHTML(game) );
		}
		html.push('</div>');
		$('#nbaDay'+games[0].date).html(html.join(''));

		//Increment count and display if all days have loaded
		this.daysLoaded++;
		if(this.daysLoaded === this.numGameDays) {
			$('#nbaScoreboard').show();
			setTimeout("nbaScoreboard.scrollToDay("+this.activeDay+")",1300);
		}
	},
	getTileHTML:function(game) {
		var gameHr = this.parseDate(game.date, game.time).getHours();
		if(gameHr == 0) { gameHr = 24; }
		var amPm = (gameHr == 24 || gameHr < 12) ? 'AM' : 'PM';
		if( gameHr > 12) { gameHr -= 12; }
		var gameMin = this.parseDate(game.date, game.time).getMinutes();
		if( gameMin == 0 ) { gameMin = '00'; }

		var status = ['','future','live','final'][game.period_time.game_status];
		var clock = this.getClockHTML(game);

		if(game.period_time.period_status == 'CNCL') {
			clock = 'CANCELLED';
			status = 'final noscores';
		} else if(game.period_time.period_status == 'PPD') {
			clock = 'POSTPONED';
			status = 'final noscores';
		}

		var html = ['<div id="nbaTile'+game.id+'" class="tile '+status+'">',
			'<a class="gameinfo" href="/games/'+game.date+'/'+game.visitor.team_key+game.home.team_key+'/gameinfo.html?ls=iref:nba:scoreboard" title="Link to game info page for '+game.visitor.nickname+' versus '+game.home.nickname+'">',
			'<div class="clock">'+clock+'</div>'
		];

		var broadcaster = '&nbsp;';
		if(this.scope == 'can') {
			//Canadian geo-targeting
			if(game.home.team_key == 'TOR' || game.visitor.team_key == 'TOR') {
				//Canadian broadcaster for Raptors is 'local' scope; no LEAGUE PASS
				if(game.broadcasters && game.broadcasters.tv && game.broadcasters.tv.broadcaster.length) {
					for(var i=0; i<game.broadcasters.tv.broadcaster.length; i++) {
						if(game.broadcasters.tv.broadcaster[i].scope == 'local' && game.broadcasters.tv.broadcaster[i].home_visitor == 'home' && game.home.team_key == 'TOR') {
							broadcaster = game.broadcasters.tv.broadcaster[i].display_name;
						} else if(game.broadcasters.tv.broadcaster[i].scope == 'local' && game.broadcasters.tv.broadcaster[i].home_visitor == 'visitor' && game.visitor.team_key == 'TOR') {
							broadcaster = game.broadcasters.tv.broadcaster[i].display_name;
						}
					}
				}
			} else {
				//If not Raptors, Canadian broadcaster is 'can' scope; default to LEAGUE PASS
				broadcaster = 'LEAGUE PASS';
				if(game.broadcasters && game.broadcasters.tv && game.broadcasters.tv.broadcaster.length) {
					for(var j=0; j<game.broadcasters.tv.broadcaster.length; j++) {
						if(game.broadcasters.tv.broadcaster[j].scope == 'can') {
							broadcaster = game.broadcasters.tv.broadcaster[j].display_name;
						}
					}
				}
			}
		} else if(game.lp && game.lp.lp_video == 'true') {
			//Domestic LP flags
			broadcaster = 'LEAGUE PASS';
		} else if(game.broadcasters && game.broadcasters.tv && game.broadcasters.tv.broadcaster.length) {
			//Domestic broadcaster scope is 'natl'
			for(var k=0; k<game.broadcasters.tv.broadcaster.length; k++) {
				if(game.broadcasters.tv.broadcaster[k].scope == 'natl') {
					broadcaster = game.broadcasters.tv.broadcaster[k].display_name;
				}
			}
		}

		html.push('<div class="broadcaster">'+broadcaster.replace(/NBATV/,'NBA TV').replace(/ Canada/,'').replace(/Sportsnet One/,'SN1').replace(/TSN\/Sportsnet1/,'TSN\/SN1').toUpperCase()+'</div><div class="matchup"><div class="visitor">',
			'<img src="'+this.imgDir+'svg/'+game.visitor.team_key+'.svg" onerror="this.onerror=null;this.src=\''+this.imgDir+'png/'+game.visitor.team_key+'.png\';">',
			'<div class="teamBox">',
			'<div class="score',
			(status=='final' && (parseInt(game.visitor.score) > parseInt(game.home.score))) ? ' win' : '',
			'">'+(game.visitor.score|0)+'</div>',
			'<div class="team">'+game.visitor.team_key+'</div>',
			'</div></div><div class="home">',
			'<img src="'+this.imgDir+'svg/'+game.home.team_key+'.svg" onerror="this.onerror=null;this.src=\''+this.imgDir+'png/'+game.home.team_key+'.png\';">',
			'<div class="teamBox">',
			'<div class="score',
			(status=='final' && (parseInt(game.home.score) > parseInt(game.visitor.score))) ? ' win' : '',
			'">'+(game.home.score|0)+'</div>',
			'<div class="team">'+game.home.team_key+'</div>',
			'</div></div></div>'
		);
		if(game.time == '') {
			html.push('<div class="time" style="text-align:center;">TBD</div>');
		} else {
			html.push('<div class="time',
				(gameHr.toString().length == 1) ? ' pad' : '',
				'">',
				gameHr + ':' + gameMin + '<span class="pmET"><div class="ampm">'+amPm+'</div><div class="ET">ET</div></span></div>'
			);
		}
		html.push('</a>');

		//Start polling for live data six hours before game time
		var sixHours = 6*60*60*1000;
		if( !this.dataDays[ game.date ] && (status == 'live' || status == 'future' && this.parseDate(this.date,this.time).getTime() >= (this.parseDate(game.date,game.time).getTime() - sixHours)) ) {
			setInterval( function() {
				$.ajax({
					type:'GET',
					cache:true,
					'dataType':'jsonp',
					'jsonpCallback':'nbaScoreboard.liveUpdate',
					'url':nbaScoreboard.dataHost+'/jsonp/5s/json/cms/noseason/scoreboard/'+game.date+'/games.json',
					'error':function(e){}
				});
			},this.pollingInterval);
			this.dataDays[ game.date ] = true;
		}

		//Watch button only appears for League Pass or TNT OT games; do not display for Canada users
		if( ((game.lp && game.lp.lp_video == 'true') || game.tnt_ot == '1') && this.scope !== 'can' ) {
			html.push('<a class="tunein',
				//Display watch button if onAir flag is set to true for LP games; display button if game is live for TNT OT games
				((game.lp.home.video.onAir == 'true' || game.lp.visitor.video.onAir == 'true') || (status == 'live' && game.tnt_ot == '1')) ? ' active' : '',
				'" href="" ',
				'data-membership-action="watch" ',
				'data-membership-analytics="scoreboard" ',
				'data-game-date="'+game.date+'" ',
				'data-game-id="'+game.id+'" ',
				'data-game-tricodes="'+game.visitor.team_key+game.home.team_key+'"',
				'title="Link to watch '+game.visitor.nickname+' versus '+game.home.nickname+'">',
				'<span>WATCH</span>',
				'</a>'
			);
		}
		html.push('</div>');
		return html.join('');
	},
	positionDateline:function(){
		var portWidth = $('#nbaScoreboard .viewport')[0].offsetWidth,
			stripLeft = -($('#nbaScoreboard .viewport')[0].scrollLeft),
			stripWidth = $('#nbaScoreboard .gamestrip')[0].offsetWidth;

		$('#nbaScoreboard .day').each(function(a){
			var dayWidth = this.offsetWidth,
				dayOffset = this.offsetLeft,
				dateWidth = $(this).find('.date')[0].offsetWidth,
				numGames = $(this).find('.numGames')[0],
				numGamesWidth = (numGames) ? numGames.offsetWidth : 30,
				allScores = $(this).find('.allScores')[0],
				allScoresWidth = (allScores) ? allScores.offsetWidth : 15,
				datelineWidth = $(this).find('.dateline')[0].offsetWidth,
				leftPad = 38,
				textWidth = dateWidth + numGamesWidth + numGamesWidth + leftPad,
				maxLeftPos = dayWidth - textWidth,
				leftPos = (-(stripLeft)) - dayOffset;
			if(leftPos > maxLeftPos){ leftPos = maxLeftPos; }
			if(leftPos < 0) { leftPos = 0; }

			nbaScoreboard.animateElement($(this).find('.dateline')[0],leftPos);

			if(allScores) {
				var rightPad = 36,
					inView = portWidth - (dayOffset + stripLeft),
					maxRightPos = -(dayWidth - datelineWidth - allScoresWidth - rightPad),
					rightPos = -(dayWidth - inView);
				if(rightPos > 0) { rightPos = 0; }
				else if(rightPos < maxRightPos) { rightPos = maxRightPos; }
				nbaScoreboard.animateElement($(allScores),rightPos);
			}
		});
	}
};
