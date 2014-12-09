var modalModule = (function( $ ){
	'use strict';

	var
	_conf = {
		backgroundColor: 'rgba(0,0,0,0.7)',
		doAnimate: true,
		hasBtn : true,
		content:{
			iconURL:'',
			heading:'',
			message:'',
		},
		style:{
			cancleBtn:{
				'width':'130px',
				'height':'40px',
				'margin-left': 'auto',
				'margin-right': 'auto',
				'margin-top' : '15px',
				'bottom':'20px',
				'cursor':'pointer',
				'background-color': '#338dac',
				'color':'#fff',
				'font-weight':'',
				'font-size':'16px',
				'border-radius': '3px',
				'padding-top':'8px',
				'border-bottom':'2px solid #70c3e0'
			}
		}
	},
	
	_screen = null,
	_centerWrap = null,
	_loadingIcon = null,
	_modalTitle = null,
	_cancleBtn = null,
	_modalDescription = null,		
	_body = null,
	_animTimeout = null,
	_animCount = 0,

	_setIfAnimate = function( flag ){
		_conf.doAnimate = flag;
	},

	_getConfig = function(){
		return _conf;
	},

	_modalIn = function( conf ){

		if(_body.find(_screen).length === 0){
			_conf = _extend(_conf, conf);
			_cancleBtn = $('<div>')
				.css(_conf.style.cancleBtn)
				.html('Cancle')
				.on('mouseover',function(){  $(this).css({ }); })
				.on('click',function(){
					_modalOut();
				});

			_screen = $('<div>')
				.css({
					'background-color': _conf.backgroundColor,
					position: 'fixed',
					width: '100%',
					height: '100%',
					'z-index': 200
				});


			_modalTitle = $('<div>')
				.css({
					'font-size':'18px',
					'color':'#225373',
					'font-weight':'bold',
					'margin-top':'10px'
				})
				.html(_conf.content.heading);

			_modalDescription = $('<div>')
				.css({
					'margin-top':'10px','color':'#225373',
				})
				.html(_conf.content.message);

			_centerWrap = $('<div>')
				.css({
					width:'400px',
					height: 'auto',
					'background-color':'#fff',
					'border-radius':'5px',
					'margin-top': '200px',
					'margin-right': 'auto',
					'margin-left': 'auto',
					'text-align' :'center',
					padding: '20px'
				});

			_loadingIcon = $('<img>')
				.css({})
				.attr('src',_conf.content.iconURL);

			_centerWrap
				.append(_loadingIcon)
				.append(_modalTitle)
				.append(_modalDescription);

			if( _conf.hasBtn ) _centerWrap.append(_cancleBtn);
			
			_screen
				.append(_centerWrap)
				.prependTo(_body).hide().fadeIn();

			if( _conf.doAnimate ) _runAnimation();
		}
	},

	_modalOut = function(){
		_screen.fadeOut(function(){
			$(this).remove();
		});
		clearTimeout(_animTimeout);
	},

	_runAnimation = function(){
		_animCount ++ ;
		_loadingIcon.css({
			'-webkit-transform': 'rotate('+ _animCount * 5 + 'deg)'
		})
		_animTimeout = setTimeout(function(){ _runAnimation(); }, 33);
	},

	_getCancleBtn = function(){
		return _cancleBtn;
	},

	_extend = function(conf1, conf2){
		if(typeof conf2 === 'undefined') return conf1;
	    for(var i in conf2){
	        if(typeof conf1[i] === 'undefined') conf1[i] = conf2[i];
	        else if(typeof conf2[i] === 'confect') conf1[i] = extend(conf1[i], conf2[i]);
	        else conf1[i] = (conf1[i] != conf2[i]? conf2[i] : conf1[i]);
	    }
	    return conf1;
	};


	$(function(){
		_body = $('body');
	});

	return{
		setIfAnimate: _setIfAnimate,
		modalIn  : _modalIn,
		modalOut : _modalOut,
		getCancleBtn: _getCancleBtn
	}

})( jQuery );