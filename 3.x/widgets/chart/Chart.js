/*!
 * Ext JS Library 3.1.1
 * Copyright(c) 2006-2010 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.chart.Chart
 * @extends Ext.FlashComponent
 * ��Ext.chart�ṩ�˿��ӻ�����չʾ��������������������Flash��ͼ��������Ext.chart��Ext.data.Store�ṩʵʱ���Զ��İ󶨡�Ҫ�޸�һ��ͼ���������йۣ�look and feel�������˽�{@link #chartStyle}��{@link #extraStyle}�����������The Ext.chart package provides the capability to visualize data with flash based charting.
 * Each chart binds directly to an Ext.data.Store enabling automatic updates of the chart.
 * To change the look and feel of a chart, see the {@link #chartStyle} and {@link #extraStyle} config options.
 * @constructor
 * @xtype chart
 */
 
 Ext.chart.Chart = Ext.extend(Ext.FlashComponent, {
    refreshBuffer: 100,
    
    /**
     * @cfg {String} backgroundColor ������ɫ
     * @hide
     */

    /**
     * @cfg {Object} chartStyle
     * ����ͼ������ʽ�����µ�ֵ��Ĭ�ϵ�ֵ�������޸ĸ����Ի�<b>���ǵ�</b>Ĭ�ϵġ�Ӧʹ��{@link #extraStyle}�Ų����Ĭ�ϵ���ʽ����Ӱ�죬Ҳ�ܼ����Զ������ʽ��Sets styles for this chart. This contains default styling, so modifying this property will <b>override</b>
     * the built in styles of the chart. Use {@link #extraStyle} to add customizations to the default styling. 
     */
    chartStyle: {
        padding: 10,
        animationEnabled: true,
        font: {
            name: 'Tahoma',
            color: 0x444444,
            size: 11
        },
        dataTip: {
            padding: 5,
            border: {
                color: 0x99bbe8,
                size:1
            },
            background: {
                color: 0xDAE7F6,
                alpha: .9
            },
            font: {
                name: 'Tahoma',
                color: 0x15428B,
                size: 10,
                bold: true
            }
        }
    },
    
    /**
     * @cfg {String} url
     * ͼ��Flash�ļ����ص�Դ�ļ���Ĭ����Ext.chart.Chart.CHART_URL��ֵ��Ӧ���޸Ĵ�ֵΪ���صġ�The url to load the chart from. This defaults to Ext.chart.Chart.CHART_URL, which should
     * be modified to point to the local charts resource.
     */
    
    /**
     * @cfg {Object} extraStyle
     * ��Ĭ����ʽ�����¼���򸲸ǾͿ����޸�ͼ������ʽ��Contains extra styles that will be added or overwritten to the default chartStyle. Defaults to <tt>null</tt>.
     * For a detailed list of the options available, visit the YUI Charts site 
     * at <a href="http://developer.yahoo.com/yui/charts/#basicstyles">http://developer.yahoo.com/yui/charts/#basicstyles</a><br/>
     * ���õ�ѡ�Some of the options availabe:<br />
     * <ul style="padding:5px;padding-left:16px;list-style-type:inherit;">
     * <li><b>padding</b> - The space around the edge of the chart's contents. Padding does not increase the size of the chart.</li>
     * <li><b>animationEnabled</b> - A Boolean value that specifies whether marker animations are enabled or not. Enabled by default.</li>
     * <li><b>����font</b> - An Object defining the font style to be used in the chart. Defaults to <tt>{ name: 'Tahoma', color: 0x444444, size: 11 }</tt><br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>name</b> - font name</li>
     *      <li><b>color</b> - font color (hex code, ie: "#ff0000", "ff0000" or 0xff0000)</li>
     *      <li><b>size</b> - font size in points (numeric portion only, ie: 11)</li>
     *      <li><b>bold</b> - boolean</li>
     *      <li><b>italic</b> - boolean</li>
     *      <li><b>underline</b> - boolean</li>
     *  </ul>
     * </li>
     * <li><b>�߿�border</b> - An object defining the border style around the chart. The chart itself will decrease in dimensions to accomodate the border.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color</b> - border color (hex code, ie: "#ff0000", "ff0000" or 0xff0000)</li>
     *      <li><b>size</b> - border size in pixels (numeric portion only, ie: 1)</li>
     *  </ul>
     * </li>
     * <li><b>����background</b> - An object defining the background style of the chart.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color</b> - border color (hex code, ie: "#ff0000", "ff0000" or 0xff0000)</li>
     *      <li><b>image</b> - an image URL. May be relative to the current document or absolute.</li>
     *  </ul>
     * </li>
     * <li><b>��Եlegend</b> - An object defining the legend style<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>display</b> - location of the legend. Possible values are "none", "left", "right", "top", and "bottom".</li>
     *      <li><b>spacing</b> - an image URL. May be relative to the current document or absolute.</li>
     *      <li><b>padding, border, background, font</b> - same options as described above.</li>
     *  </ul></li>
     * <li><b>��ʾUI dataTip</b> - An object defining the style of the data tip (tooltip).<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>padding, border, background, font</b> - same options as described above.</li>
     *  </ul></li>
     * <li><b>x���y�� xAxis and yAxis</b> - An object defining the style of the style of either axis.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color</b> - same option as described above.</li>
     *      <li><b>size</b> - same option as described above.</li>
     *      <li><b>showLabels</b> - boolean</li>
     *      <li><b>labelRotation</b> - a value in degrees from -90 through 90. Default is zero.</li>
     *  </ul></li>
     * <li><b>majorGridLines and minorGridLines</b> - An object defining the style of the style of the grid lines.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color, size</b> - same options as described above.</li>
     *  </ul></li></li>
     * <li><b>zeroGridLine</b> - An object defining the style of the style of the zero grid line.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color, size</b> - same options as described above.</li>
     *  </ul></li></li>
     * <li><b>majorTicks and minorTicks</b> - An object defining the style of the style of ticks in the chart.<br/>
     *  <ul style="padding:5px;padding-left:26px;list-style-type:circle;">
     *      <li><b>color, size</b> - same options as described above.</li>
     *      <li><b>length</b> - the length of each tick in pixels extending from the axis.</li>
     *      <li><b>display</b> - how the ticks are drawn. Possible values are "none", "inside", "outside", and "cross".</li>
     *  </ul></li></li>
     * </ul>
     */
    extraStyle: null,
    
    /**
     * @cfg {Object} seriesStyles
     * Contains styles to apply to the series after a refresh. Defaults to <tt>null</tt>.
     */
    seriesStyles: null,
    
    /**
     * @cfg {Boolean} disableCaching
     * True to add a "cache buster" to the end of the chart url. Defaults to true for Opera and IE.
     */
    disableCaching: Ext.isIE || Ext.isOpera,
    disableCacheParam: '_dc',

    initComponent : function(){
        Ext.chart.Chart.superclass.initComponent.call(this);
        if(!this.url){
            this.url = Ext.chart.Chart.CHART_URL;
        }
        if(this.disableCaching){
            this.url = Ext.urlAppend(this.url, String.format('{0}={1}', this.disableCacheParam, new Date().getTime()));
        }
        this.addEvents(
            'itemmouseover',
            'itemmouseout',
            'itemclick',
            'itemdoubleclick',
            'itemdragstart',
            'itemdrag',
            'itemdragend',
            /**
             * @event beforerefresh
             * Fires before a refresh to the chart data is called.  If the beforerefresh handler returns
             * <tt>false</tt> the {@link #refresh} action will be cancelled.
             * @param {Chart} this
             */
            'beforerefresh',
            /**
             * @event refresh
             * ͼ������ˢ�º���¼���Fires after the chart data has been refreshed.
             * @param {Chart} this
             */
            'refresh'
        );
        this.store = Ext.StoreMgr.lookup(this.store);
    },

    /**
     * ����ͼ��ʵ����ĳ����ʽ��Sets a single style value on the Chart instance.
     *
     * @param name {String} Name of the Chart style value to change.Ҫ�ı���ʽ������
     * @param value {Object} New value to pass to the Chart style.ͼ����ʽ����ֵ
     */
     setStyle: function(name, value){
         this.swf.setStyle(name, Ext.encode(value));
     },

    /**
     * ��ͼ��ʵ������ʽ���¸�λ��Resets all styles on the Chart instance.
     * 
     * @param styles {Object} Initializer for all Chart styles.ͼ��ȫ�����ʽ
     */
    setStyles: function(styles){
        this.swf.setStyles(Ext.encode(styles));
    },

    /**
     * ͼ����ȫ��Sets the styles on all series in the Chart.
     *
     * @param styles {Array} Initializer for all Chart series styles.
     */
    setSeriesStyles: function(styles){
        this.seriesStyles = styles;
        var s = [];
        Ext.each(styles, function(style){
            s.push(Ext.encode(style));
        });
        this.swf.setSeriesStyles(s);
    },

    setCategoryNames : function(names){
        this.swf.setCategoryNames(names);
    },

    setTipRenderer : function(fn){
        var chart = this;
        this.tipFnName = this.createFnProxy(function(item, index, series){
            var record = chart.store.getAt(index);
            return fn(chart, record, index, series);
        }, this.tipFnName);
        this.swf.setDataTipFunction(this.tipFnName);
    },

    setSeries : function(series){
        this.series = series;
        this.refresh();
    },

    /**
     * �ı�ͼ�����󶨵�Store����ˢ�¡�Changes the data store bound to this chart and refreshes it.
     * @param {Store} store ���ڸ�ͼ����Store��The store to bind to this chart
     */
    bindStore : function(store, initial){
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un("datachanged", this.refresh, this);
                this.store.un("add", this.delayRefresh, this);
                this.store.un("remove", this.delayRefresh, this);
                this.store.un("update", this.delayRefresh, this);
                this.store.un("clear", this.refresh, this);
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                scope: this,
                datachanged: this.refresh,
                add: this.delayRefresh,
                remove: this.delayRefresh,
                update: this.delayRefresh,
                clear: this.refresh
            });
        }
        this.store = store;
        if(store && !initial){
            this.refresh();
        }
    },

    onSwfReady : function(isReset){
        Ext.chart.Chart.superclass.onSwfReady.call(this, isReset);
        this.swf.setType(this.type);

        if(this.chartStyle){
            this.setStyles(Ext.apply({}, this.extraStyle, this.chartStyle));
        }

        if(this.categoryNames){
            this.setCategoryNames(this.categoryNames);
        }

        if(this.tipRenderer){
            this.setTipRenderer(this.tipRenderer);
        }
        if(!isReset){
            this.bindStore(this.store, true);
        }
        this.refresh.defer(10, this);
    },

    delayRefresh : function(){
        if(!this.refreshTask){
            this.refreshTask = new Ext.util.DelayedTask(this.refresh, this);
        }
        this.refreshTask.delay(this.refreshBuffer);
    },

    refresh : function(){
        if(this.fireEvent('beforerefresh', this) !== false){
	        var styleChanged = false;
	        // convert the store data into something YUI charts can understand
	        var data = [], rs = this.store.data.items;
	        for(var j = 0, len = rs.length; j < len; j++){
	            data[j] = rs[j].data;
	        }
	        //make a copy of the series definitions so that we aren't
	        //editing them directly.
	        var dataProvider = [];
	        var seriesCount = 0;
	        var currentSeries = null;
	        var i = 0;
	        if(this.series){
	            seriesCount = this.series.length;
	            for(i = 0; i < seriesCount; i++){
	                currentSeries = this.series[i];
	                var clonedSeries = {};
	                for(var prop in currentSeries){
	                    if(prop == "style" && currentSeries.style !== null){
	                        clonedSeries.style = Ext.encode(currentSeries.style);
	                        styleChanged = true;
	                        //we don't want to modify the styles again next time
	                        //so null out the style property.
	                        // this causes issues
	                        // currentSeries.style = null;
	                    } else{
	                        clonedSeries[prop] = currentSeries[prop];
	                    }
	                }
	                dataProvider.push(clonedSeries);
	            }
	        }
	
	        if(seriesCount > 0){
	            for(i = 0; i < seriesCount; i++){
	                currentSeries = dataProvider[i];
	                if(!currentSeries.type){
	                    currentSeries.type = this.type;
	                }
	                currentSeries.dataProvider = data;
	            }
	        } else{
	            dataProvider.push({type: this.type, dataProvider: data});
	        }
	        this.swf.setDataProvider(dataProvider);
	        if(this.seriesStyles){
	            this.setSeriesStyles(this.seriesStyles);
	        }
            this.fireEvent('refresh', this);
        }
    },

    createFnProxy : function(fn, old){
        if(old){
            delete window[old];
        }
        var fnName = "extFnProxy" + (++Ext.chart.Chart.PROXY_FN_ID);
        window[fnName] = fn;
        return fnName;
    },
    
    onDestroy: function(){
        Ext.chart.Chart.superclass.onDestroy.call(this);
        this.bindStore(null);
        var tip = this.tipFnName;
        if(!Ext.isEmpty(tip)){
            delete window[tip];
        }
    }
});
Ext.reg('chart', Ext.chart.Chart);
Ext.chart.Chart.PROXY_FN_ID = 0;

/**
 * ����ͼ����url��ַӦ������Ϊ���ص���Դ��Sets the url to load the chart from. This should be set to a local resource.
 * @static
 * @type String
 */
Ext.chart.Chart.CHART_URL = 'http:/' + '/yui.yahooapis.com/2.7.0/build/charts/assets/charts.swf';

/**
 * @class Ext.chart.PieChart
 * @extends Ext.chart.Chart
 * @constructor
 * @xtype piechart
 */
Ext.chart.PieChart = Ext.extend(Ext.chart.Chart, {
    type: 'pie',

    onSwfReady : function(isReset){
        Ext.chart.PieChart.superclass.onSwfReady.call(this, isReset);

        this.setDataField(this.dataField);
        this.setCategoryField(this.categoryField);
    },

    setDataField : function(field){
        this.dataField = field;
        this.swf.setDataField(field);
    },

    setCategoryField : function(field){
        this.categoryField = field;
        this.swf.setCategoryField(field);
    }
});
Ext.reg('piechart', Ext.chart.PieChart);

/**
 * @class Ext.chart.CartesianChart
 * @extends Ext.chart.Chart
 * @constructor
 * @xtype cartesianchart
 */
Ext.chart.CartesianChart = Ext.extend(Ext.chart.Chart, {
    onSwfReady : function(isReset){
        Ext.chart.CartesianChart.superclass.onSwfReady.call(this, isReset);

        if(this.xField){
            this.setXField(this.xField);
        }
        if(this.yField){
            this.setYField(this.yField);
        }
        if(this.xAxis){
            this.setXAxis(this.xAxis);
        }
        if(this.yAxis){
            this.setYAxis(this.yAxis);
        }
    },

    setXField : function(value){
        this.xField = value;
        this.swf.setHorizontalField(value);
    },

    setYField : function(value){
        this.yField = value;
        this.swf.setVerticalField(value);
    },

    setXAxis : function(value){
        this.xAxis = this.createAxis('xAxis', value);
        this.swf.setHorizontalAxis(this.xAxis);
    },

    setYAxis : function(value){
        this.yAxis = this.createAxis('yAxis', value);
        this.swf.setVerticalAxis(this.yAxis);
    },

    createAxis : function(axis, value){
        var o = Ext.apply({}, value), oldFn = null;
        if(this[axis]){
            oldFn = this[axis].labelFunction;
        }
        if(o.labelRenderer){
            var fn = o.labelRenderer;
            o.labelFunction = this.createFnProxy(function(v){
                return fn(v);
            }, oldFn);
            delete o.labelRenderer;
        }
        return o;
    }
});
Ext.reg('cartesianchart', Ext.chart.CartesianChart);

/**
 * @class Ext.chart.LineChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype linechart
 */
Ext.chart.LineChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'line'
});
Ext.reg('linechart', Ext.chart.LineChart);

/**
 * @class Ext.chart.ColumnChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype columnchart
 */
Ext.chart.ColumnChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'column'
});
Ext.reg('columnchart', Ext.chart.ColumnChart);

/**
 * @class Ext.chart.StackedColumnChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype stackedcolumnchart
 */
Ext.chart.StackedColumnChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'stackcolumn'
});
Ext.reg('stackedcolumnchart', Ext.chart.StackedColumnChart);

/**
 * @class Ext.chart.BarChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype barchart
 */
Ext.chart.BarChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'bar'
});
Ext.reg('barchart', Ext.chart.BarChart);

/**
 * @class Ext.chart.StackedBarChart
 * @extends Ext.chart.CartesianChart
 * @constructor
 * @xtype stackedbarchart
 */
Ext.chart.StackedBarChart = Ext.extend(Ext.chart.CartesianChart, {
    type: 'stackbar'
});
Ext.reg('stackedbarchart', Ext.chart.StackedBarChart);



/**
 * @class Ext.chart.Axis
 * ����ѿ���ͼ��ˮƽ�ʹ�ֱ���ᡣDefines a CartesianChart's vertical or horizontal axis.
 * @constructor
 */
Ext.chart.Axis = function(config){
    Ext.apply(this, config);
};

Ext.chart.Axis.prototype =
{
    /**
     * �����͡�The type of axis.
     *
     * @property type
     * @type String
     */
    type: null,

    /**
     * ����������䷽������εġ�����ʹ��horizontal��ˮƽ�ģ�����vertical����ֱ�ģ�����The direction in which the axis is drawn. May be "horizontal" or "vertical".
     *
     * @property orientation
     * @type String
     */
    orientation: "horizontal",

    /**
     * ��Ϊtrue���������ÿһ��ᱻ����Ϊ�෴�ķ���If true, the items on the axis will be drawn in opposite direction.
     *
     * @property reverse
     * @type Boolean
     */
    reverse: false,

    /**
     * ȫ�ֺ������ַ����������ã�ʹ�ÿ��Բ���������ÿ����ǩ��ֵ��A string reference to the globally-accessible function that may be called to
     * determine each of the label values for this axis.
     *
     * @property labelFunction
     * @type String
     */
    labelFunction: null,

    /**
     * ��Ϊtrue��������֮ǰ�����ǩ���Ǹ���ǩ�����ء�If true, labels that overlap previously drawn labels on the axis will be hidden.
     *
     * @property hideOverlappingLabels
     * @type Boolean
     */
    hideOverlappingLabels: true
};

/**
 * @class Ext.chart.NumericAxis
 * @extends Ext.chart.Axis
 * ������Ϊ������λ���ᡣA type of axis whose units are measured in numeric values.
 * @constructor
 */
Ext.chart.NumericAxis = Ext.extend(Ext.chart.Axis, {
    type: "numeric",

    /**
     * ������ʱ����Сֵ���粻���þ�ȡ�Զ���������Ľ����The minimum value drawn by the axis. If not set explicitly, the axis minimum
     * will be calculated automatically.
     *
     * @property minimum
     * @type Number
     */
    minimum: NaN,

    /**
     * ������ʱ�����ֵ���粻���þ�ȡ�Զ���������Ľ����The maximum value drawn by the axis. If not set explicitly, the axis maximum
     * will be calculated automatically.
     *
     * @property maximum
     * @type Number
     */
    maximum: NaN,

    /**
     * ������֮����������The spacing between major intervals on this axis.
     *
     * @property majorUnit
     * @type Number
     */
    majorUnit: NaN,

    /**
     * ������֮��Ĵμ����The spacing between minor intervals on this axis.
     *
     * @property minorUnit
     * @type Number
     */
    minorUnit: NaN,

    /**
     * ��Ϊtrue����Щ��ǩ��ticks��gridlines���������󶼻���뵽�������Ҫ���Ҫ��Ԫ��������λ�þͻ������Сֵ�ġ�If true, the labels, ticks, gridlines, and other objects will snap to
     * the nearest major or minor unit. If false, their position will be based
     * on the minimum value.
     *
     * @property snapToUnits
     * @type Boolean
     */
    snapToUnits: true,

    /**
     * ��Ϊtrue���߽�ͻ��Զ����㣬����ͬʱ��С�����ֵ��������Ϊ�㡣If true, and the bounds are calculated automatically, either the minimum or
     * maximum will be set to zero.
     *
     * @property alwaysShowZero
     * @type Boolean
     */
    alwaysShowZero: true,

    /**
     * ���������õ������㷨�������ǡ�linear����logarithmic����The scaling algorithm to use on this axis. May be "linear" or "logarithmic".
     *
     * @property scale
     * @type String
     */
    scale: "linear"
});

/**
 * @class Ext.chart.TimeAxis
 * @extends Ext.chart.Axis
 * ��ʱ��Ϊ������λ���ᡣA type of axis whose units are measured in time-based values.
 * @constructor
 */
Ext.chart.TimeAxis = Ext.extend(Ext.chart.Axis, {
    type: "time",

    /**
     * ������ʱ����Сֵ���粻���þ�ȡ�Զ���������Ľ����The minimum value drawn by the axis. If not set explicitly, the axis minimum
     * will be calculated automatically.
     *
     * @property minimum
     * @type Date
     */
    minimum: null,

    /**
     * ������ʱ�����ֵ���粻���þ�ȡ�Զ���������Ľ����The maximum value drawn by the axis. If not set explicitly, the axis maximum
     * will be calculated automatically.
     *
     * @property maximum
     * @type Number
     */
    maximum: null,

    /**
     * ������֮����������The spacing between major intervals on this axis.
     *
     * @property majorUnit
     * @type Number
     */
    majorUnit: NaN,

    /**
     * majorUnit��ʱ���ʽ��The time unit used by the majorUnit.
     *
     * @property majorTimeUnit
     * @type String
     */
    majorTimeUnit: null,

    /**
     * ������֮��Ĵμ����The spacing between minor intervals on this axis.
     *
     * @property majorUnit
     * @type Number
     */
    minorUnit: NaN,

    /**
     * minorUnit��ʱ���ʽ��The time unit used by the minorUnit.
     *
     * @property majorTimeUnit
     * @type String
     */
    minorTimeUnit: null,

    /**
     * ��Ϊtrue����Щ��ǩ��ticks��gridlines���������󶼻���뵽�������Ҫ���Ҫ��Ԫ��������λ�þͻ������Сֵ�ġ�If true, the labels, ticks, gridlines, and other objects will snap to
     * the nearest major or minor unit. If false, their position will be based
     * on the minimum value.
     *
     * @property snapToUnits
     * @type Boolean
     */
    snapToUnits: true
});

/**
 * @class Ext.chart.CategoryAxis
 * @extends Ext.chart.Axis
 * �Է��಻ͬ����ʾ���ᡣA type of axis that displays items in categories.
 * @constructor
 */
Ext.chart.CategoryAxis = Ext.extend(Ext.chart.Axis, {
    type: "category",

    /**
     * �������������ʾ��������ơ�A list of category names to display along this axis.
     *
     * @property categoryNames
     * @type Array
     */
    categoryNames: null
});

/**
 * @class Ext.chart.Series
 * ͼ�������Series�ࡣSeries class for the charts widget.
 * @constructor
 */
Ext.chart.Series = function(config) { Ext.apply(this, config); };

Ext.chart.Series.prototype =
{
    /**
     * series�����͡�The type of series.
     *
     * @property type
     * @type String
     */
    type: null,

    /**
     * ���ǿɶ���series���ơ�The human-readable name of the series.
     *
     * @property displayName
     * @type String
     */
    displayName: null
};

/**
 * @class Ext.chart.CartesianSeries
 * @extends Ext.chart.Series
 * ͼ������еĵѿ���Series�����CartesianSeries class for the charts widget.
 * @constructor
 */
Ext.chart.CartesianSeries = Ext.extend(Ext.chart.Series, {
    /**
     * ����x���ֵ���ֶ���ʲô����ֵ����������Դ��items��The field used to access the x-axis value from the items from the data source.
     *
     * @property xField
     * @type String
     */
    xField: null,

    /**
     * ����y���ֵ���ֶ���ʲô����ֵ����������Դ��items��The field used to access the y-axis value from the items from the data source.
     *
     * @property yField
     * @type String
     */
    yField: null
});

/**
 * @class Ext.chart.ColumnSeries
 * @extends Ext.chart.CartesianSeries
 * ͼ������е���Series�����ColumnSeries class for the charts widget.
 * @constructor
 */
Ext.chart.ColumnSeries = Ext.extend(Ext.chart.CartesianSeries, {
    type: "column"
});

/**
 * @class Ext.chart.LineSeries
 * @extends Ext.chart.CartesianSeries
 * ͼ������е���Series�����LineSeries class for the charts widget.
 * @constructor
 */
Ext.chart.LineSeries = Ext.extend(Ext.chart.CartesianSeries, {
    type: "line"
});

/**
 * @class Ext.chart.BarSeries
 * @extends Ext.chart.CartesianSeries
 * ͼ������е���״Series�����BarSeries class for the charts widget.
 * @constructor
 */
Ext.chart.BarSeries = Ext.extend(Ext.chart.CartesianSeries, {
    type: "bar"
});


/**
 * @class Ext.chart.PieSeries
 * @extends Ext.chart.Series
 * ͼ������е�ͼ�������PieSeries class for the charts widget.
 * @constructor
 */
Ext.chart.PieSeries = Ext.extend(Ext.chart.Series, {
    type: "pie",
    dataField: null,
    categoryField: null
});