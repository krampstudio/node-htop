$(document).ready(function(){
    
    /**
     * Display a message
     * @param {String} type - the message type in info, alert, warn, etc.
     * @param {String} text - the message 
     * @param {Boolean} clear - clear the msg box
     */
    function msg(type, text, clear){
        var $msgBox = $('#messages');
        if(clear === true){
            $msgBox.empty();
        }
        $msgBox.append("<p class='text-"+type+"'>"+text+"</p>");
    }

    /**
     * Change the state of the controls btns
     */
    function toggleCtrlState(){
        $('.controls .btn').toggleClass('disabled');
    }
    
    /**
     * Request informations about system
     * @param {Function} cb - executed once the infos are retireved
     */
    function getSysInfos(cb){
        $.getJSON('/sysinfos', function(data){
            if(data){
                $('#platform').text(data.platform);
                $('#cpus > .count').text(data.cpus.count);
                $('#cpus > .model').text(data.cpus.model);
                cb();
             }
        });
    }
    
    /**
     * Helps you to translate stats to ui widgets
     * @class
     */
    var StatDisplayer = {
        
        /**
         * store the jquery elements for each stat widget
         * @type {Object}
         */
        _containers : {
            uptime  : $('#uptime > .value'),
            loadP1  : $('#loadavg .p1'),
            loadP5  : $('#loadavg .p5'),
            loadP15 : $('#loadavg .p15'),
            memFree : $('#mem .memfree'),
            memBar  : $('#mem > .progress > .bar-success'),
            swapFree: $('#swap .swapfree'),
            swapBar : $('#swap > .progress > .bar-success')
        },

        /**
         * zero prepender
         * @private
         * @param {Number} i - the number to be zero prepended
         * @returns {Strin} the number to display
         */
        _zprep : function(i){
            return (i >= 0 && i < 10) ? '0' + i : i;
        },

        /**
         * round to the decimal
         * @private
         * @param {Number} i - the input number
         * @param {Number} i - the number of decimals
         * @returns {Number} the output 
         */
        _dec : function(i, num){
            var f = Math.pow(10, num);
            return Math.round(i * f) / f;
        }, 

        /**
         * display the uptime
         * @param {Object} values - the stats
         */
        uptime : function(values){
            var h = Math.floor(values.uptime / 3600),
                    m = Math.floor((values.uptime / 60) % 60),
                    s = values.uptime % 60;
             this._containers.uptime.text(this._zprep(h) + ':' + this._zprep(m) + ':' + this._zprep(s));
        },

        /**
         * display the load avg
         * @param {Object} values - the stats
         */
        load : function(values){
            this._containers.loadP1.text(this._dec(values.p1, 2));
            this._containers.loadP5.text(this._dec(values.p5, 2));
            this._containers.loadP15.text(this._dec(values.p15, 2));
        },
        
        /**
         * display the memory
         * @param {Object} values - the stats
         */
        mem : function(values){
            var mu = values.memtotal - values.memfree,
                mpu = this._dec(((mu * 100)  / values.memtotal), 1),
                mpf = this._dec(100 - mpu, 1),
                su = values.swaptotal - values.swapfree,
                spu = this._dec(((su * 100) / values.swaptotal), 1),
                spf = this._dec(100 - spu, 1);
            this._containers.memFree.text(mpf);
            this._containers.memBar.width(mpu + '%');
            this._containers.swapFree.text(spf);
            this._containers.swapBar.width(spu + '%');
        }
    };

    //keep the socket instance
    var statSock = null;
    
    /**
     * Start stat retrieving using a web socket
     */
    function start(){
        if(statSock === null){                
            statSock= io.connect('/stat');
            statSock.on('stat', function (data) {
                var displayer = StatDisplayer[data.type];
                if(typeof displayer === 'function'){
                    displayer.call(StatDisplayer, data.values);
                }
            });
        } else {
            statSock.socket.reconnect();
        }
        statSock.on('connect', function(){
            msg('success', "Retrieving data...", true);
        });
    }
    
    /**
     * Stop stat retrieval
     */
    function stop(){
        if(statSock){
            statSock.socket.disconnect();
            msg('info', "Stopped", true);
        }
    }
    
    //sequential 
    
    msg('info', 'Retrieving system infos...');
    
    //get system data
    getSysInfos(function(){
        $('#start').removeClass('disabled');
        msg('info', 'Ready', true);            
    });
    
    //bind start 
    $('#start').click(function(){
        toggleCtrlState(); 
        start();
        return false;
    });
    
    //bind stop
    $('#stop').click(function(){
        toggleCtrlState(); 
        stop();
        return false;
    });
});