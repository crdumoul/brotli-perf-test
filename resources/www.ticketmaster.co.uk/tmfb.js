
var TMFB = Class.create( {
    tlog: TMDebug.gen_tlog( 'tmfb' ),

    initialize: function ( config ) {
        this.tlog('initialize');
        this.enabled = config.enable;
        this.loaded = false;
		this.deferred = jQuery.Deferred();
        this.omn_ready = false;
        this.load_failed = false;
		this.prop_tu = config.prop_tu;
        this.app_id = config.app_id;
        this.api_version = config.api_version;
        var port = document.location.port === "" ? ""
            : ':' + document.location.port;
        this.backend = config.backend === undefined
            ? 'https://' + document.location.hostname + port
            : config.backend;
        this.backend += '/json/facebook';
        this.channel_url = document.location.protocol + '//' +
            document.location.hostname + port +
            '/facebook/fb_xd_channel.html';
        this.ajax_timeout = config.ajax_timeout === undefined ? 10 * 1000
            : config.ajax_timeout * 1000;
        this.load_timeout = config.load_timeout === undefined ? 0
            : config.load_timeout * 1000;
        this.omn_timeout = config.omn_timeout === undefined ? 0
            : config.omn_timeout * 1000;
        this.retry_timeout = config.retry_timeout === undefined
            ? this.ajax_timeout : config.retry_timeout * 1000;
        this.ajax_defaults = {
            timeout: this.ajax_timeout,
            error: this._on_ajax_error.bind(this)
        };

        this.xfbml_container_ids = config.xfbml_container_ids
            ? config.xfbml_container_ids : [];
        this.lang_code = config.lang_code;
        this.fobs = {};
        this.perms = {};
        this._after_load_list = [];
        this._after_load_failed_list = [];
        this._after_login_list = [];
        this._after_logout_list = [];
        this._after_omn_ready_list = [];

        if ( !this.enabled || window.fbAsyncInit ) {
            this.tlog('not enabled, skipping FB lib init');
            return;
        }
        window.fbAsyncInit = this._init_cb.bind(this);
        new OnWindowLoad( function () {
            // In case some third party tries to inject a bad FB object
            // into our Javascript, thwart them by removing it.
            window.FB = null;

            if ( this.load_timeout )
                this.load_timer = window.setTimeout(
                    this._load_failed.bind(this), this.load_timeout);
            if ( this.omn_timeout )
                this.omn_timer = window.setTimeout(
                    this._omn_ready.bind(this), this.omn_timeout);

            var e = document.createElement('script');
            e.async = true;
            e.src = document.location.protocol + '//connect.facebook.net/' + this.lang_code + '/sdk.js';
            document.getElementById('fb-root').appendChild(e);
        }.bind(this));
        this.tlog('initialize done');
    },

    _init_cb: function () {
        var ids = this.xfbml_container_ids,
            parse_xfbml_init = ids.length ? false : true;

        this.tlog('_init_cb called');
        FB.init({ appId: this.app_id, channelUrl: this.channel_url,
                  version: this.api_version,
                  oauth: true, status: false, xfbml: parse_xfbml_init });

        if ( !parse_xfbml_init ) {
            for( var i = 0; i < ids.length; i++ ) {
                var el = document.getElementById( ids[i] );
                if ( el ) {
                    FB.XFBML.parse(el);
                }
            }
        }

        FB.getLoginStatus(function (response) {
            this._login_status = response.status;
            if ( !response.authResponse ) {
                this.tlog('user not connected', response);
                this._init_finalize();
                return;
            }
            this.tlog('have connected user', response.authResponse);
            this.start_get_user(this.uid(), function (user) {
                if ( !user ) return;
                user.facebook.is_self = true;
                this._init_finalize();
            }.bind(this));
        }.bind(this), true);
    },

    _init_finalize: function () {
        this.tlog('_init_finalize called');
        this.loaded = true;
		this.deferred.resolve();
        if ( this.load_timer ) {
            window.clearTimeout(this.load_timer);
            delete this.load_timer;
        }
        this._after_load_cb();
        this._apply_after_logout();
        this._apply_after_login();
        this._omn_ready();
        this.tlog('_init_cb done');
    },

    _on_ajax_error: function (jqXHR, textStatus, errorThrown) {
        this.tlog('Error in FB AJAX request:', jqXHR, errorThrown);
        if ( !this.loaded ) this._load_failed();
    },

    is_connected: function () {
        if ( !this.loaded ) return false;
        return this._is_connected();
    },

    _is_connected: function () {
        return FB && this.session() ? true : false;
    },

    is_logged_in: function (callback) {
        if ( !callback )
            return this._is_connected() ||
                (this._login_status && this._login_status == 'not_authorized');
        else if ( FB )
            return FB.getLoginStatus(function (response) {
                this._login_status = response.status;
                callback(this._is_connected() ||
                         response.status == 'not_authorized');
            }.bind(this), true);
        else return callback(false);
    },

    check_perms: function (perms) {
        if ( !perms ) return false;
        var arr = perms.split(',');
        for ( var i = 0; i < arr.length; i++ )
            if ( !this.perms[arr[i]] ) return false;
        return true;
    },

    login: function ( callback, perms ) {
        this.tlog('login', perms);
        if ( this.is_connected() && (!perms || this.check_perms(perms)) ) {
            if ( callback ) callback(true);
            return;
        }
        if ( !this.is_connected() )
            this.loaded = false;
        if ( perms )
            FB.login(this._login_cb.bind(this, callback, perms),
                     { scope: perms });
        else
            FB.login(this._login_cb.bind(this, callback, null));
    },

    _login_cb: function ( callback, perms, response ) {
        if ( !response.authResponse || !this._is_connected() ) {
            this.loaded = true;
            this.perms = {};
            this.tlog("connect denied", response);
            if ( callback ) callback(false, response);
            return;
        }
        this.tlog("connect allowed", response);
        var finish = function() {
            if ( !callback ) return;
            if ( perms && !this.check_perms(perms) ) {
                this.tlog("insufficient perms");
                callback(false, response);
            }
            else {
                callback(true, response);
            }
        };
        if ( this.user() ) {
            if ( !this.loaded ) {
                this.loaded = true;
                this._apply_after_login(finish.bind(this), response);
                return;
            }
            this.start_get_permissions(finish.bind(this));
            return;
        }
        this.start_get_user(this.uid(), function (user) {
            if ( !user ) {
                if ( callback ) callback(false, response);
                return;
            }
            user.facebook.is_self = true;
            this.loaded = true;
            this._apply_after_login(finish.bind(this), response);
        }.bind(this));
    },

    logout: function ( callback ) {
        if ( !this.is_connected() ) {
            if ( callback ) callback();
        }
        else {
            if ( callback )
                FB.logout(this._logout_cb.bind(this, callback));
            else
                FB.logout();
        }
    },

    _logout_cb: function ( callback, response ) {
        this.tlog("logout done", response);
        callback();
    },

    after_load: function ( callback ) {
        if ( this.loaded ) callback();
        else this._after_load_list.push(callback);
    },

    _after_load_cb: function () {
        this.tlog('_after_load_cb');
        var next;
        while ( (next = this._after_load_list.shift()) ) next();
    },


    after_load_failed: function ( callback ) {
        if ( this.load_failed ) callback();
        else this._after_load_failed_list.push(callback);
    },

    _load_failed: function () {
        this.tlog('_load_failed called');
        var do_omn = false;
        if ( this.load_timer ) {
            window.clearTimeout(this.load_timer);
            delete this.load_timer;
        }
        if ( this.omn_timer ) {
            do_omn = true;
            window.clearTimeout(this.omn_timer);
            delete this.omn_timer;
        }
        this.load_failed = true;
        var next;
        while ( (next = this._after_load_failed_list.shift()) ) next();
        if ( do_omn ) this._omn_ready();
        this.tlog('_load_failed done');
    },

    after_login: function ( callback ) {
        this._after_login_list.push(callback);
        if ( this.is_connected() )
            callback();
    },

    _apply_after_login: function (callback, login_response) {
        this.tlog('_apply_after_login');
        if ( !this.is_connected() )
            return;
        this.start_get_permissions(function (perms_response) {
            for ( var i = 0; i < this._after_login_list.length; i++ )
                (this._after_login_list[i])();
            if ( callback ) callback(true, login_response);
        }.bind(this));
    },

    after_logout: function ( callback ) {
        if ( !this.loaded )
            this._after_logout_list.push(callback);
        else if ( !this.is_connected() ) {
            callback();
            FB.Event.subscribe('auth.logout', callback);
        }
        else {
            FB.Event.subscribe('auth.logout', callback);
        }
    },

    _apply_after_logout: function () {
        this.tlog('_apply_after_logout');
        var next;
        while ( (next = this._after_logout_list.shift()) )
            this.after_logout(next);
    },

    after_omn_ready: function ( callback ) {
        if ( this.omn_ready ) callback();
        else this._after_omn_ready_list.push(callback);
    },

    _omn_ready: function () {
        this.tlog('_omn_ready');
        if ( this.omn_ready ) return;
        if ( this.omn_timer ) {
            window.clearTimeout(this.omn_timer);
            delete this.omn_timer;
        }
        var next;
        while ( (next = this._after_omn_ready_list.shift()) ) next();
        this.omn_ready = true;
    },

    send_invite_dialog: function (args) {
        FB.ui({
            method: 'send',
            name: args.action_text,
            description:args.msg_text,
            link: args.msg_link,
            picture: args.picture
        });
    },

    _escquot: function (str) {
        return str.replace(/"/g, '&quot;');
    },

    call_backend_with_retry: function (args) {
        var now = (new Date()).getTime();
        if ( !args.retry )
            args.retry = { start: now };
        else if ( args.retry.start === undefined )
            args.retry.start = now;
        args.args = jQuery.extend(args.args, { retry: args.retry.data });
        var ajax_args;

        return jQuery.ajax(ajax_args = jQuery.extend({
            type: "get",
            url: args.uri,
            data: args.args,
            dataType: "jsonp",
            success: function (data, textStatus, jqXHR) {
                if ( data.error && data.error.retry ) {
                    if ( !this._should_retry(args.retry) ) {
                        this.tlog('call_backend_with_retry giving up',
                                  (now - args.retry.start) / 1000);
                        if ( ajax_args.error )
                            ajax_args.error(jqXHR, textStatus, 'retry timeout');
                        return;
                    }
                    args.retry.data = data.error.retry;
                    this.tlog('call_backend_with_retry retrying',
                              args.retry);
                    window.setTimeout(
                        this.call_backend_with_retry.bind(this, args),
                        1000);
                    return;
                }
                args.callback(data, textStatus, jqXHR);
            }.bind(this)
        }, this.ajax_defaults, (args.settings || {})));
    },

    _should_retry: function (retry) {
        var timeout = retry.timeout || this.retry_timeout;
        var min_ticks = Math.ceil(timeout / 1000.0) / 2 + 1;
        if ( min_ticks < 2 ) min_ticks = 2;
        if ( !retry.ticks )
            retry.ticks = 1;
        else
            retry.ticks++;

        return retry.ticks < min_ticks ||
               (new Date()).getTime() - retry.start < timeout;
    },

    fob_set: function (uid, type, data) {
        if ( !this.fobs[uid] )
            this.fobs[uid] = {};
        this.fobs[uid][type] = data;
        return this.fobs[uid];
    },

    publish_to_feed_dialog: function (info, properties, callback) {
        var args = { method: 'feed' };

        this._add_publish_to_feed_args(args, info, properties);
        FB.ui(args, callback);
    },

    publish_to_feed: function (message, info, properties, callback) {
        var uid = this.uid();
        var args = { message: message };

        this._add_publish_to_feed_args(args, info, properties);
        this.login(function () {
            FB.api('/' + uid + '/feed', 'post', args, callback);
        });
    },

    _add_publish_to_feed_args: function (args, info, properties) {
        var permitted = [
            'name', 'link', 'picture', 'caption', 'description', 'actions'
        ];

        for ( var i = 0; i < permitted.length; i++ )
            if ( info[permitted[i]] !== undefined )
                args[permitted[i]] = info[permitted[i]];
        if ( args.caption === undefined ) args.caption = ' ';
        if ( args.description === undefined ) args.description = ' ';

        // added properties to description  for showing in newsfeed 
		if ( this.prop_tu && properties && properties['Date'] && properties['Venue'] 
			&& properties['Location'] && !jQuery.trim(args.description) ) {
			
			var reg = new RegExp('([^\\d]+)\\[_date\\]([^\\d]+)\\[_venue\\]([^\\d]+)\\[_location\\]'),
				rep = '$1' + properties['Date'] + '$2' + properties['Venue'] + '$3' + properties['Location']; 

			args.description = this.prop_tu.replace(reg, rep);			
		}
    },

    send_dialog: function (to, info, callback) {
        var args = { method: 'send', to: to, app_id: this.app_id };

        this._add_send_args(args, info);
        FB.ui(args, callback);
    },

    _add_send_args: function (args, info) {
        var permitted = [
            'name', 'link', 'picture', 'description'
        ];

        for ( var i = 0; i < permitted.length; i++ )
            if ( info[permitted[i]] !== undefined )
                args[permitted[i]] = info[permitted[i]];
        if ( args.description === undefined ) args.description = ' ';
    },

    session: function () {
        var session;
        // Facebook can throw an error about OAuth not supported if
        // you attempt to get auth response it before it's fully
        // initialized on IE 7; this can happen in the omniture callback
        try { session = FB.getAuthResponse(); }
        catch (e) { return null; }

        // Cache session, in case it gets wiped out when the user denies
        // us an extended permission
        if ( !session )
            session = this._session;
        else
            this._session = session;
        return session;
    },

    start_get_friends: function (callback) {
        if ( this.user().facebook.friends ) {
            callback(this.user().facebook.friends);
            return;
        }
        this.call_backend_with_retry({
            uri: this.backend,
            args: { cmd: 'get_friends', user: this.uid(),
                    session: this.session() },
            callback: function (data, textStatus, jqXHR) {
                if ( data.error ) {
                    this.tlog('start_get_friends error', data.error);
                    return;
                }
                if ( data.users === undefined ) data.users = [];
                var friends = jQuery.map(data.users, function (user) {
                    var fob = this.fob_set(user.id, 'facebook', user);
                    fob.facebook.is_friend = true;
                    return fob;
                }.bind(this));
                this.user().facebook.friends = friends;
                this.tlog('start_get_friends done, doing callback');
                if ( callback ) callback(friends);
            }.bind(this)
        });
    },

    start_get_permissions: function (callback) {
        FB.api('/me/permissions', function (response) {
            var i;
            this.perms = {};
            var self = this;
            if ( response && response.data && response.data.length )
               var data = response.data;
                jQuery.each( data, function(i, v) {
                    if(v.permission && v.status == "granted") {
                        self.perms[v.permission] = 1;
                    }
                });
            if ( callback ) callback(response);
        }.bind(this));
    },

    start_get_user: function (uid, callback) {
        if ( this.fobs[uid] && this.fobs[uid].facebook ) {
            callback(this.fobs[uid]);
            return;
        }
        this.call_backend_with_retry({
            uri: this.backend,
            args: { cmd: 'get_user', user: uid, session: this.session() },
            callback: function (data, textStatus, jqXHR) {
                if ( data.error ) {
                    this.tlog('start_get_user error', data.error);
                    if ( !this.loaded ) this._load_failed();
                    return;
                }
                if ( data.users === undefined || !data.users.length ) {
                    this.tlog('start_get_user error: no user returned');
                    if ( !this.loaded ) this._load_failed();
                    return;
                }
                var user = data.users[0];
                var fob = this.fob_set(user.id, 'facebook', user);
                this.tlog('start_get_user done, doing callback');
                if ( callback ) callback(fob);
            }.bind(this)
        });
    },

    start_get_wall_post: function (post_id, callback) {
        FB.api('/' + post_id, callback);
    },

    start_delete_wall_post: function (post_id, callback) {
        FB.api('/' + post_id, 'delete', callback);
    },

    uid: function () {
        var session = this.session();
        return session ? session.userID : null;
    },

    user: function () {
        var uid = this.uid();
        return uid !== null ? this.fobs[uid] : null;
    }
} );
